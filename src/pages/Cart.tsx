import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { items, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Link to="/gallery">
          <Button variant="outline" className="rounded-full">Browse Models</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 max-w-3xl mx-auto pb-20">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-display text-4xl mb-10">
        Your Cart
      </motion.h1>

      <div className="space-y-4 mb-10">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="glass rounded-2xl p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: item.color + "22" }}>
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: item.color }} />
              </div>
              <div>
                <p className="font-display">{item.productName}</p>
                <p className="text-xs text-muted-foreground">
                  {item.material} · {item.size}cm{item.label ? ` · "${item.label}"` : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display text-accent">${item.price}</span>
              <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors duration-300">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-muted-foreground">Total</span>
          <span className="font-display text-3xl text-accent">${totalPrice}</span>
        </div>
        <Button size="lg" className="w-full rounded-full font-medium text-base bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
