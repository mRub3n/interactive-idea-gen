import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import { products, materials, colorOptions, calculatePrice } from "@/data/products";
import { useCart, CartItem } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Scene3D from "@/components/Scene3D";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Configurator = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = products.find((p) => p.id === productId);

  const isLetterProduct = product?.category === "ornate-letters";

  const [selectedLetter, setSelectedLetter] = useState("A");
  const [color, setColor] = useState(() => {
    const colorNode = product?.editableNodes.find((n) => n.type === "color");
    return (colorNode?.defaultValue as string) || "#00e5ff";
  });
  const [materialId, setMaterialId] = useState("matte");
  const [labelText, setLabelText] = useState(() => {
    const textNode = product?.editableNodes.find((n) => n.type === "text");
    return (textNode?.defaultValue as string) || "";
  });
  const [size, setSize] = useState(20);
  const [glow, setGlow] = useState(() => {
    const toggleNode = product?.editableNodes.find((n) => n.type === "toggle");
    return (toggleNode?.defaultValue as boolean) ?? false;
  });

  const price = useMemo(
    () => calculatePrice(product?.basePrice || 29, size, materialId),
    [product, size, materialId]
  );

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    const item: CartItem = {
      id: crypto.randomUUID(),
      productId: product.id,
      productName: isLetterProduct ? `Letter ${selectedLetter}` : product.name,
      letter: isLetterProduct ? selectedLetter : undefined,
      color,
      material: materialId,
      size,
      label: labelText,
      price,
    };
    addItem(item);
    navigate("/cart");
  };

  // Build dynamic controls from editableNodes
  const renderNodeControls = () =>
    product.editableNodes.map((node) => {
      switch (node.type) {
        case "color":
          return (
            <div key={node.name} className="space-y-3">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">{node.label}</Label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className="w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110"
                    style={{
                      backgroundColor: c,
                      borderColor: color === c ? "hsl(187 100% 50%)" : "transparent",
                      boxShadow: color === c ? `0 0 12px ${c}` : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          );
        case "text":
          return (
            <div key={node.name} className="space-y-3">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">{node.label}</Label>
              <Input
                value={labelText}
                onChange={(e) => setLabelText(e.target.value)}
                placeholder="Enter text..."
                className="bg-muted/50 border-border/50"
                maxLength={20}
              />
            </div>
          );
        case "toggle":
          return (
            <div key={node.name} className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">{node.label}</Label>
              <Switch checked={glow} onCheckedChange={setGlow} />
            </div>
          );
        default:
          return null;
      }
    });

  return (
    <div className="min-h-screen pt-16 flex flex-col lg:flex-row">
      {/* 3D Canvas — 70% */}
      <div className="flex-1 lg:w-[70%] relative">
        <Scene3D
          letter={selectedLetter}
          color={color}
          materialType={materialId}
          labelText={labelText}
          glow={glow}
          size={size}
        />
      </div>

      {/* Control Lab Sidebar — 30% */}
      <motion.aside
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="lg:w-[30%] lg:min-w-[360px] glass-strong lg:h-[calc(100vh-4rem)] overflow-y-auto flex flex-col"
      >
        <div className="p-6 flex-1 space-y-8">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Control Lab</p>
            <h2 className="font-display text-2xl font-bold">{product.name}</h2>
          </div>

          {/* Section A — Letter Selection (only for letter products) */}
          {isLetterProduct && (
            <div className="space-y-3">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">Select Letter</Label>
              <div className="grid grid-cols-9 gap-1.5">
                {letters.map((l) => (
                  <button
                    key={l}
                    onClick={() => setSelectedLetter(l)}
                    className={`h-8 rounded-md text-xs font-bold transition-all duration-200 ${
                      selectedLetter === l
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic controls from editableNodes */}
          {renderNodeControls()}

          {/* Material */}
          <div className="space-y-3">
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">Material</Label>
            <div className="flex gap-2">
              {materials.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMaterialId(m.id)}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    materialId === m.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Size Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">Dimensions</Label>
              <span className="text-sm font-mono text-primary">{size} cm</span>
            </div>
            <Slider value={[size]} onValueChange={([v]) => setSize(v)} min={10} max={50} step={1} />
          </div>
        </div>

        {/* Pricing Footer */}
        <div className="p-6 border-t border-border/50 bg-muted/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-display text-3xl font-bold text-primary">${price}</span>
          </div>
          <Button onClick={handleAddToCart} size="lg" className="w-full rounded-full gap-2 font-semibold text-base">
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </motion.aside>
    </div>
  );
};

export default Configurator;
