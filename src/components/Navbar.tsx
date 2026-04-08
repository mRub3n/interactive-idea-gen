import { Link } from "react-router-dom";
import { ShoppingCart, Layers } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const Navbar = () => {
  const { itemCount } = useCart();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Layers className="h-6 w-6 text-primary transition-transform group-hover:rotate-12" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            MOMENTO <span className="text-primary">3D</span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Categories
          </Link>
          <Link to="/orders" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            My Orders
          </Link>
          <Link to="/cart" className="relative group">
            <ShoppingCart className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            {itemCount > 0 && (
              <Badge className="absolute -top-2 -right-3 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground">
                {itemCount}
              </Badge>
            )}
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
