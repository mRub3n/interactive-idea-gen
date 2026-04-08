# MOMENTO 3D — Premium 3D Printing E-Commerce Platform

## Design System

- **Theme**: Dark mode default, deep charcoal (`#0a0a0a`) background
- **Accents**: Electric Cyan + Soft Slate
- **UI Style**: Glassmorphism cards/sidebars, Bento Grid layouts
- **Animations**: Framer Motion for fluid transitions throughout
- **Typography**: Large, bold, Apple-esque minimalism

## Pages & Components

### 1. Navigation Bar

- Minimal top bar with logo "MOMENTO 3D"
- Links: Categories, My Orders
- Cart icon with item counter badge
- Glassmorphism background effect

### 2. Homepage — The Discovery Hub

- **Hero Section**: Large typography "Crafting Dimensions." with subtle animated gradient
- **Bento Grid**: 3 category cards (Ornate Letters, Auto Custom, Home Decor) with placeholder images, hover animations, and "Browse Models" buttons
- **Product Gallery**: Grid of 3D model preview cards with hover effect showing "Starting from $XX"

### 3. Product Gallery Page

- Filterable grid by category
- Cards with image, name, starting price
- Hover scale + price reveal animation

### 4. 3D Configurator — The Core Experience

- **Layout**: 70/30 split — 3D canvas left, Control Lab sidebar right
- **3D Canvas**: React Three Fiber scene with rotating grid floor, placeholder 3D object, orbit controls
- **Control Lab Sidebar** (Glassmorphism floating panel):
  - **Section A — Model Selection**: Letter picker (A-Z grid)
  - **Section B — Appearance**: Color pickers + material selector (Matte, Silk, Neon)
  - **Section C — Personalization**: Text input that updates a label on the 3D model
  - **Section D — Dimensions**: Slider (10cm–50cm)
- **Dynamic Pricing Footer**: Sticky bar showing calculated price based on size/material selections

### 5. Cart Page

- List of configured items with thumbnails
- Summary with total price
- Checkout button (UI only)

### 6. My Orders Page

- Mock order history with status badges

## Technical Approach

- React Three Fiber (`@react-three/fiber@^8.18`) + Drei (`@react-three/drei@^9.122.0`) for 3D
- Framer Motion for page/component animations
- Tailwind CSS with custom dark theme CSS variables
- React Router for navigation
- Local state management (useState/useContext) for configurator state and cart
- Simulated pricing logic based on size + material  
**Modular Data Architecture (Crucial):**
  - Define a JSON structure for products that includes an `editableNodes` array. Each node should have properties: `name`, `type` (color|text|toggle), and `defaultValue`.
  - The Configurator UI must be dynamically generated from this JSON. If I add a new node to the JSON, the sidebar should automatically show a new control.
  - **State Sync:** Ensure the 3D model's materials are linked via refs to the sidebar's state for zero-latency color updates.