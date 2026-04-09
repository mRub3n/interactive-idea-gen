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
  { id: "matte", name: "Matte Linen", priceMultiplier: 1.0, color: "#C8B8A6" },
  { id: "silk", name: "Silk Terracotta", priceMultiplier: 1.3, color: "#C4754B" },
  { id: "neon", name: "Linen Apricot", priceMultiplier: 1.6, color: "#FFB997" },
];

export const colorOptions = [
  "#FFB997", "#C4754B", "#8B6F5A", "#A3B18A", "#DAD7CD",
  "#D4A373", "#E9C46A", "#F4A261", "#264653", "#FEFCF5",
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
      { name: "body_color", label: "Body Color", type: "color", defaultValue: "#D4A373", options: colorOptions.map(String) },
      { name: "label_text", label: "Custom Engraving", type: "text", defaultValue: "MOMENTO" },
      { name: "glow", label: "Warm Glow", type: "toggle", defaultValue: true },
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
      { name: "body_color", label: "Body Color", type: "color", defaultValue: "#C4754B" },
      { name: "label_text", label: "Custom Engraving", type: "text", defaultValue: "MOMENTO" },
      { name: "glow", label: "Warm Glow", type: "toggle", defaultValue: false },
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
      { name: "body_color", label: "Main Color", type: "color", defaultValue: "#8B6F5A" },
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
      { name: "body_color", label: "Knob Color", type: "color", defaultValue: "#A3B18A" },
      { name: "glow", label: "Warm Ring", type: "toggle", defaultValue: true },
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
      { name: "body_color", label: "Vase Color", type: "color", defaultValue: "#DAD7CD" },
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
      { name: "body_color", label: "Color", type: "color", defaultValue: "#E9C46A" },
      { name: "glow", label: "Inner Warmth", type: "toggle", defaultValue: true },
    ],
  },
];

export function calculatePrice(basePrice: number, sizeCm: number, materialId: string): number {
  const material = materials.find((m) => m.id === materialId) || materials[0];
  const sizeMultiplier = 0.5 + (sizeCm - 10) / 40 * 1.5;
  return Math.round(basePrice * sizeMultiplier * material.priceMultiplier);
}
