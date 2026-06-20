import { CollectionItem, FurnitureProduct, ProjectExhibit } from './types';

import contemporaryImg from './assets/images/poliform_contemporary_1781864978393.jpg';
import minimalistImg from './assets/images/poliform_minimalist_1781865002133.jpg';
import closetImg from './assets/images/poliform_closet_1781865022825.jpg';
import detailImg from './assets/images/poliform_detail_chair_1781865045663.jpg';

// Image paths matching generated files exactly (or fallback if needed)
export const IMAGES = {
  contemporary: contemporaryImg,
  minimalist: minimalistImg,
  closet: closetImg,
  detail: detailImg
};

export const COLLECTIONS: CollectionItem[] = [
  {
    id: 'contemporary',
    title: 'Contemporary',
    subtitle: 'THE ESSENCE OF REFINED LIVING',
    description: 'Crafting spaces that harmonize modern aesthetics with timeless elegance, our contemporary interior designs breathe life into every room, redefining the essence of chic living.',
    image: IMAGES.contemporary,
    secondaryImage: IMAGES.detail,
    tags: ['ELEGANT', 'SPACIOUS', 'WARM LIGHTING'],
    materials: [
      {
        id: 'c-canapa',
        name: 'Canapa Fabric',
        hex: '#D7CFBC',
        textureName: 'Linen Blend',
        description: 'An elegant organic textured linen weave in neutral beige, offering high breathability and a tactile, lived-in luxury feel.'
      },
      {
        id: 'c-darkelm',
        name: 'Black Elm',
        hex: '#2B251F',
        textureName: 'Elm Wood',
        description: 'Varnished Elm with deep charcoal grain notes, adding a rich architectural anchor to low-profile tables and panels.'
      },
      {
        id: 'c-travertine',
        name: 'Travertine Classico',
        hex: '#E3DCCE',
        textureName: 'Porous Stone',
        description: 'Roman cross-cut travertine with a matte polished finish and natural micro-cavities that scatter warm ambient rays.'
      }
    ]
  },
  {
    id: 'minimalist',
    title: 'Minimalist',
    subtitle: 'SILENCE IN DESIGN & GEOMETRY',
    description: 'Stripping away the superfluous to celebrate pure geometric form, textured monoliths, and pristine white spaces. A quiet dialogue between raw stone and daylight.',
    image: IMAGES.minimalist,
    secondaryImage: IMAGES.detail,
    tags: ['MONOLITHIC', 'ORGANIC STONE', 'MATTE FINISH'],
    materials: [
      {
        id: 'm-calacatta',
        name: 'Calacatta Gold',
        hex: '#F3EFE9',
        textureName: 'Polished Marble',
        description: 'Luminous white base traversed by subtle grey streams and delicate golden veins, defining central monolithic fireplace mantels.'
      },
      {
        id: 'm-smokedoak',
        name: 'Spessart Oak',
        hex: '#3E342B',
        textureName: 'Smoked Timber',
        description: 'Deep smoked Oak treated with thermal treatments for an intense dark brown coloration that accentuates linear architectural frames.'
      },
      {
        id: 'm-boucle',
        name: 'Bouclé Natural',
        hex: '#EDE9E2',
        textureName: 'Textured Wool',
        description: 'A heavy luxury woolen knit of looped fibers, tactilely cozy yet highly architectural. Gently absorbs sound and light.'
      }
    ]
  },
  {
    id: 'architectural',
    title: 'Systemized',
    subtitle: 'TAILORED SPATIAL ARCHITECTURE',
    description: 'Bespoke built-in wardrobe systems and open-flow dressing zones designed to blend seamlessly into modern master suites. Masterful joinery meet precise engineering.',
    image: IMAGES.closet,
    secondaryImage: IMAGES.detail,
    tags: ['ARCHITECTURAL', 'INTEGRATED LED', 'OAK WOOD'],
    materials: [
      {
        id: 's-gold',
        name: 'Champagne Metal',
        hex: '#D0C3A9',
        textureName: 'Brushed Alum',
        description: 'Anodized brushed aluminum hardware with light gold undertones, catching linear LED halos with soft reflections.'
      },
      {
        id: 's-moka',
        name: 'Moka Oak',
        hex: '#342F2A',
        textureName: 'Stained Veneer',
        description: 'An elegant dark brown wood structure paired with micro-porous textures that reflect exquisite luxury detailing.'
      },
      {
        id: 's-leather',
        name: 'Castoro Leather',
        hex: '#7A6E61',
        textureName: 'Saddle Leather',
        description: 'Full-grain Italian master-hide with water-resistant treatments, shielding the base drawers with a velvet-matte grip.'
      }
    ]
  }
];

export const PRODUCTS: FurnitureProduct[] = [
  {
    id: 'p-saintgermain',
    name: 'Saint-Germain Sofa',
    category: 'Sofa Systems',
    designer: 'Jean-Marie Massaud',
    year: '2021',
    description: 'A system of sofas with curved, organic lines. All elements feature enveloping and round shapes, encouraging comfort and relaxed conversations in modular layouts.',
    image: IMAGES.contemporary,
    specs: ['Frame: Metal and wood', 'Cushioning: Multi-density polyurethane foam', 'Removable cover: Bouclé / Linen blend']
  },
  {
    id: 'p-leclaire',
    name: 'Le Club Armchair',
    category: 'Armchairs',
    designer: 'Jean-Marie Massaud',
    year: '2020',
    description: 'Inspired by the massive leather armchairs of the exclusive clubs of the last century, Le Club replicates their volume but with a highly synthesized, sculptural geometry.',
    image: IMAGES.detail,
    specs: ['Structure: Molded polyurethane', 'Upholstery: Full-grain non-removable luxury leather', 'Weight: 22kg']
  },
  {
    id: 'p-lexington',
    name: 'Lexington System',
    category: 'Wardrobe Systems',
    designer: 'Jean-Marie Massaud',
    year: '2022',
    description: 'A pillar-based walk-in closet system that allows for bespoke transparency and dual-sided views. Features light metal framing and warm integrated shelf backlighting.',
    image: IMAGES.closet,
    specs: ['Uprights: Painted micro-texture aluminum', 'Shelves: Spessart oak veneer', 'Lighting: Safe low-voltage 24V LEDs']
  },
  {
    id: 'p-mondrian',
    name: 'Mondrian Coffee Table',
    category: 'Coffee Tables',
    designer: 'Jean-Marie Massaud',
    year: '2019',
    description: 'An organic set of overlapping architectural geometric tables, customizable with diverse finishes from Classico Travertine to glossy marble blocks.',
    image: IMAGES.minimalist,
    specs: ['Structure: Casting aluminum in metallic finishes', 'Top: Oval or round Calacatta gold marble / Black Elm', 'Height: Available in 38cm and 48cm options']
  }
];

export const PROJECTS: ProjectExhibit[] = [
  {
    id: 'proj-timber-garage',
    title: 'Double Garage Twilight Lodge',
    location: 'New York',
    year: '2025',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-wood-villa',
    title: 'Dusk Cascade Villa',
    location: 'New York',
    year: '2024',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-fireplace-gallery',
    title: 'Modern Fireside Salon',
    location: 'New York',
    year: '2025',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-folding-terrace',
    title: 'Folding Glass Terrace',
    location: 'New York',
    year: '2025',
    category: 'Wellness Villa',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-culinary-studio',
    title: 'Carrara Oak Culinary Studio',
    location: 'New York',
    year: '2023',
    category: 'Apparel Suite',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-curved-kitchen',
    title: 'Architectural Curved Kitchen',
    location: 'New York',
    year: '2024',
    category: 'Apparel Suite',
    image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-stone-firepit',
    title: 'Single-Story Stone Firepit Lounge',
    location: 'New York',
    year: '2025',
    category: 'Wellness Villa',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-wood-panel',
    title: 'Oak Panel Master Kitchen Plan',
    location: 'New York',
    year: '2024',
    category: 'Apparel Suite',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  }
];
