import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Box } from "lucide-react";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";

const cats = [
  { id: "all", label: "All" },
  { id: "ornate-letters", label: "Ornate Letters" },
  { id: "auto-custom", label: "Auto Custom" },
  { id: "home-decor", label: "Home Decor" },
];

const Gallery = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "all";
  const [filter, setFilter] = useState(initialCat);

  const filtered = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl font-bold mb-8">
        Product Gallery
      </motion.h1>

      <div className="flex gap-2 mb-10 flex-wrap">
        {cats.map((c) => (
          <Button key={c.id} variant={filter === c.id ? "default" : "outline"} size="sm" className="rounded-full" onClick={() => setFilter(c.id)}>
            {c.label}
          </Button>
        ))}
      </div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {filtered.map((p) => (
          <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Link to={`/configure/${p.id}`} className="block group">
              <div className="glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300">
                <div className="aspect-[4/3] bg-muted/20 flex items-center justify-center relative overflow-hidden">
                  <Box className="h-20 w-20 text-muted-foreground/20 group-hover:text-primary/30 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-sm font-bold text-primary">Starting from ${p.basePrice}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground mb-1">{p.categoryLabel}</p>
                  <h3 className="font-display font-semibold">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Gallery;
