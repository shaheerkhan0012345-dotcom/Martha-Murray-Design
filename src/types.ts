export interface MaterialOption {
  id: string;
  name: string;
  hex: string;
  textureName: string;
  description: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  secondaryImage: string;
  tags: string[];
  materials: MaterialOption[];
}

export interface FurnitureProduct {
  id: string;
  name: string;
  category: string;
  designer: string;
  year: string;
  description: string;
  image: string;
  specs: string[];
}

export interface ProjectExhibit {
  id: string;
  title: string;
  location: string;
  year: string;
  category: string;
  image: string;
}
