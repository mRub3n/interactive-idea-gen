export type EditableNodeType = "color" | "text" | "toggle";

export interface EditableNode {
  name: string;
  label: string;
  type: EditableNodeType;
  defaultValue: string | boolean;
  options?: string[];
}

export interface Product {
  id: string;
  name: string;
  category: "ornate-letters" | "auto-custom" | "home-decor";
  categoryLabel: string;
  basePrice: number;
  image: string;
  description: string;
  editableNodes: EditableNode[];
}

export interface Material {
  id: string;
  name: string;
  priceMultiplier: number;
  color: string;
}

export const materials: Material[] = [
  { id: "matte", name: "Matte", priceMultiplier: 1.0, color: "#888888" },
  { id: "silk", name: "Silk", priceMultiplier: 1.3, color: "#c0b0d0" },
  { id: "neon", name: "Neon", priceMultiplier: 1.6, color: "#00ffcc" },
];

export const colorOptions = [
  "#00e5ff", "#ff006e", "#ffbe0b", "#8338ec", "#3a86ff",
  "#06d6a0", "#ef476f", "#ffd166", "#ffffff", "#1a1a2e",
];

export const products: Product[] = [
  {
    id: "letter-a",
    name: "Letter A — Monumental",
    category: "ornate-letters",
    categoryLabel: "Ornate Letters",
    basePrice: 29,
    image: "/placeholder.svg",
    description: "A bold, ornate letter A for shelf or wall display.",
    editableNodes: [
      { name: "body_color", label: "Body Color", type: "color", defaultValue: "#00e5ff", options: colorOptions.map(String) },
      { name: "label_text", label: "Custom Label", type: "text", defaultValue: "MOMENTO" },
      { name: "glow", label: "LED Glow", type: "toggle", defaultValue: true },
    ],
  },
  {
    id: "letter-b",
    name: "Letter B — Classic",
    category: "ornate-letters",
    categoryLabel: "Ornate Letters",
    basePrice: 29,
    image: "/placeholder.svg",
    description: "Elegant letter B with detailed ornamental surface.",
    editableNodes: [
      { name: "body_color", label: "Body Color", type: "color", defaultValue: "#ff006e" },
      { name: "label_text", label: "Custom Label", type: "text", defaultValue: "MOMENTO" },
      { name: "glow", label: "LED Glow", type: "toggle", defaultValue: false },
    ],
  },
  {
    id: "car-emblem",
    name: "Car Emblem — Custom Logo",
    category: "auto-custom",
    categoryLabel: "Auto Custom",
    basePrice: 45,
    image: "/placeholder.svg",
    description: "Custom 3D car emblem for dashboards or keychains.",
    editableNodes: [
      { name: "body_color", label: "Main Color", type: "color", defaultValue: "#3a86ff" },
      { name: "label_text", label: "Text Engraving", type: "text", defaultValue: "TURBO" },
    ],
  },
  {
    id: "gear-knob",
    name: "Gear Shift Knob",
    category: "auto-custom",
    categoryLabel: "Auto Custom",
    basePrice: 55,
    image: "/placeholder.svg",
    description: "Ergonomic 3D-printed gear shift knob with custom grip.",
    editableNodes: [
      { name: "body_color", label: "Knob Color", type: "color", defaultValue: "#8338ec" },
      { name: "glow", label: "Glow Ring", type: "toggle", defaultValue: true },
    ],
  },
  {
    id: "geometric-vase",
    name: "Geometric Vase",
    category: "home-decor",
    categoryLabel: "Home Decor",
    basePrice: 39,
    image: "/placeholder.svg",
    description: "Low-poly geometric vase, perfect centerpiece.",
    editableNodes: [
      { name: "body_color", label: "Vase Color", type: "color", defaultValue: "#06d6a0" },
      { name: "label_text", label: "Inscription", type: "text", defaultValue: "" },
    ],
  },
  {
    id: "lamp-shade",
    name: "Parametric Lamp Shade",
    category: "home-decor",
    categoryLabel: "Home Decor",
    basePrice: 65,
    image: "/placeholder.svg",
    description: "Intricate parametric lamp shade with light diffusion patterns.",
    editableNodes: [
      { name: "body_color", label: "Color", type: "color", defaultValue: "#ffbe0b" },
      { name: "glow", label: "Inner LED", type: "toggle", defaultValue: true },
    ],
  },
];

export function calculatePrice(basePrice: number, sizeCm: number, materialId: string): number {
  const material = materials.find((m) => m.id === materialId) || materials[0];
  const sizeMultiplier = 0.5 + (sizeCm - 10) / 40 * 1.5;
  return Math.round(basePrice * sizeMultiplier * material.priceMultiplier);
}
