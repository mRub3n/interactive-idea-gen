import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Box, Car, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

const categories = [
  { id: "ornate-letters", label: "Ornate Letters", icon: Box, description: "Bold typographic sculptures for shelf & wall.", color: "from-primary/20 to-primary/5" },
  { id: "auto-custom", label: "Auto Custom", icon: Car, description: "Emblems, knobs & accessories for your ride.", color: "from-accent/20 to-accent/5" },
  { id: "home-decor", label: "Home Decor", icon: Home, description: "Vases, lamps & statement pieces.", color: "from-primary/10 to-accent/10" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const Index = () => {
  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-[70vh] overflow-hidden px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center relative z-10 max-w-3xl">
          <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight leading-none mb-6">
            Crafting<br />
            <span className="text-gradient-cyan">Dimensions.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Premium 3D-printed objects, fully customizable. Choose your model, pick your finish, make it yours.
          </p>
          <Link to="/gallery">
            <Button size="lg" className="gap-2 text-base font-semibold rounded-full px-8">
              Explore Models <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Bento Categories */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="font-display text-3xl font-bold mb-10">
          Browse by Category
        </motion.h2>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={fadeUp}>
              <Link to={`/gallery?category=${cat.id}`} className="block group">
                <div className={`glass rounded-2xl p-8 h-64 flex flex-col justify-between bg-gradient-to-br ${cat.color} hover:border-primary/40 transition-all duration-300`}>
                  <cat.icon className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-1">{cat.label}</h3>
                    <p className="text-sm text-muted-foreground">{cat.description}</p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm mt-3 group-hover:gap-2 transition-all">
                      Browse Models <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="font-display text-3xl font-bold mb-10">
          Featured Models
        </motion.h2>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <motion.div key={p.id} variants={fadeUp}>
              <Link to={`/configure/${p.id}`} className="block group">
                <div className="glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300">
                  <div className="aspect-square bg-muted/30 flex items-center justify-center relative overflow-hidden">
                    <Box className="h-16 w-16 text-muted-foreground/30 group-hover:text-primary/40 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-sm font-semibold text-primary">Starting from ${p.basePrice}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{p.categoryLabel}</p>
                    <h3 className="font-display font-semibold text-sm">{p.name}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
