import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

const mockOrders = [
  { id: "MO-2026-001", date: "2026-03-28", items: "Letter A (Neon, 25cm)", total: 58, status: "Delivered" as const },
  { id: "MO-2026-002", date: "2026-04-02", items: "Geometric Vase (Silk, 30cm)", total: 72, status: "Shipped" as const },
  { id: "MO-2026-003", date: "2026-04-07", items: "Car Emblem (Matte, 15cm)", total: 34, status: "Processing" as const },
];

const statusColor: Record<string, string> = {
  Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  Shipped: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Processing: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const Orders = () => (
  <div className="min-h-screen pt-24 px-6 max-w-3xl mx-auto pb-20">
    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl font-bold mb-10">
      My Orders
    </motion.h1>

    <div className="space-y-4">
      {mockOrders.map((order, i) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="glass rounded-xl p-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-display font-semibold text-sm">{order.id}</p>
              <p className="text-xs text-muted-foreground">{order.items}</p>
              <p className="text-xs text-muted-foreground">{order.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-display font-bold text-primary">${order.total}</span>
            <Badge className={`text-xs ${statusColor[order.status]}`}>{order.status}</Badge>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Orders;
