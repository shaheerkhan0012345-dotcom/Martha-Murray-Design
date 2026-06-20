import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing middleware
app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Function declarations for Gemini Tool Calling
const createInquiryDeclaration: FunctionDeclaration = {
  name: "create_inquiry",
  description: "Enters or schedules a design consultation inquiry with user contact coordinates.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "Full name of the contact" },
      email: { type: Type.STRING, description: "Email address of the contact" },
      phone: { type: Type.STRING, description: "Phone number of the contact (optional)" },
      projectType: { 
        type: Type.STRING, 
        description: "The category of MMD design project they want to discuss.",
        enum: ["Remodel", "Commercial", "SDH Linens", "Bespoke Lighting", "Other"] 
      },
      message: { type: Type.STRING, description: "Message detailing custom design goals or spatial requirements" }
    },
    required: ["name", "email", "message"]
  }
};

// Simple database in memory to store inquiries made by the AI Agent
interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
  timestamp: string;
}
const inquiriesDatabase: Inquiry[] = [];

// API: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiConfigured: !!apiKey });
});

// API: Get inquiries (for internal debugging or client state tracking)
app.get("/api/inquiries", (req, res) => {
  res.json({ inquiries: inquiriesDatabase });
});

// API: Post Chat Session to Martha Murray's AI Spatial Specialist
app.post("/api/chat", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY is not configured in Secrets. Please add it to Settings > Secrets." 
      });
    }

    const { history, message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "No message provided." });
    }

    // Format chat history to comply with the new @google/genai SDK
    // System instruction tells the model who it represents
    const systemInstruction = `You are Martha's AI Spatial Consultant representing "Martha Murray Design" (MMD).
Martha Murray Design is located in Bend, Oregon. Since 2002, MMD specializes in bespoke, timeless residential remodels, modern small commercial interiors, atmospheric lighting curation, and exclusive fine SDH European linens.

Your personality is sophisticated, calm, deeply knowledgeable, welcoming, and elegant—like our physical work. Avoid tech-jargon or generic assistant behavior. Refer to ourselves as "we" or "our studio".

Your primary function is to:
1. Greet visitors, explain our design philosophy (warm, minimalist, tactile, durable over temporary trends), and help them navigate our expertise.
2. Answer questions about residential design, commercial spaces, and selecting the finest SDH lines.
3. If the user wants to start a consultation or request design assistance, collect their name, email, phone (optional), project Type, and brief message, then invite them to submit it.
4. When they provide enough key information (Name, Email, Message), call the 'create_inquiry' tool. This will submit the request. Explain that Martha Murray will personally review it and get back to them within 24 hours.`;

    const contents = [];

    // Map passed history items
    if (history && Array.isArray(history)) {
      for (const h of history) {
        contents.push({
          role: h.role === 'model' ? 'model' : 'user',
          parts: [{ text: h.text }]
        });
      }
    }

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Make the content generation call
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        tools: [{ functionDeclarations: [createInquiryDeclaration] }]
      }
    });

    const text = result.text || "";
    const functionCalls = result.functionCalls;

    let inquiryCreated = null;

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      if (call.name === "create_inquiry") {
        const args = call.args as any;
        const newInquiry: Inquiry = {
          id: `inq_${Math.random().toString(36).substr(2, 9)}`,
          name: args.name,
          email: args.email,
          phone: args.phone || "N/A",
          projectType: args.projectType || "Remodel",
          message: args.message,
          timestamp: new Date().toISOString()
        };
        inquiriesDatabase.push(newInquiry);
        inquiryCreated = newInquiry;

        // Run a second small generation to let the model respond appropriately to the successful submission
        const followUpContents = [...contents, {
          role: 'model',
          parts: [{ text: "Certainly! I've executed the tool call to record your inquiry. Please standby as I confirm the scheduling." }]
        }, {
          role: 'user',
          parts: [{ text: "The system successfully recorded the consultation inquiry entry with coordinates. Let me know it is scheduled perfectly." }]
        }];

        const confirmResult = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: followUpContents,
          config: {
            systemInstruction,
            temperature: 0.3
          }
        });

        return res.json({
          reply: confirmResult.text || "Your consultation inquiry has been filed perfectly with MMD! We will contact you within 24 business hours.",
          inquiryCreated: newInquiry
        });
      }
    }

    return res.json({
      reply: text,
      inquiryCreated: null
    });
  } catch (error: any) {
    console.error("Gemini Assistant Route Error:", error);
    res.status(500).json({ error: error.message || "Internal error generated during processing." });
  }
});

// Setup Vite Dev Server / Static Files Serving
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bespoke server launched securely on port ${PORT}`);
  });
}

start();
