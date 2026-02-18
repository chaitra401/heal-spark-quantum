import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import PageTransition from "@/components/PageTransition";
import StatCard from "@/components/StatCard";
import GlassCard from "@/components/GlassCard";
import { Activity, Brain, Database, Users, Shield, Cpu } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const trainingData = Array.from({ length: 20 }, (_, i) => ({
  round: i + 1,
  loss: Math.max(0.1, 0.9 - i * 0.04 + Math.random() * 0.05),
  accuracy: Math.min(0.98, 0.6 + i * 0.02 + Math.random() * 0.02),
}));

const recentActivity = [
  { time: "2 min ago", event: "Federated round #47 completed", type: "success" },
  { time: "8 min ago", event: "Hospital B uploaded 1,200 records", type: "info" },
  { time: "15 min ago", event: "Digital twin created for Patient #4521", type: "info" },
  { time: "32 min ago", event: "Model v2.3 saved to registry", type: "success" },
  { time: "1 hr ago", event: "Quantum circuit calibrated (4 qubits)", type: "info" },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">DTQFL Health Intelligence Overview</p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Brain} label="Training Rounds" value="47" change="+3 today" trend="up" />
          <StatCard icon={Activity} label="Model Accuracy" value="96.8%" change="+1.2%" trend="up" />
          <StatCard icon={Database} label="Total Records" value="12,450" change="+1,200" trend="up" />
          <StatCard icon={Users} label="Active Hospitals" value="5" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Training Progress */}
          <GlassCard className="lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Training Progress</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trainingData}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(187, 80%, 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(187, 80%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 18%)" />
                <XAxis dataKey="round" stroke="hsl(215, 15%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220, 40%, 10%)",
                    border: "1px solid hsl(220, 30%, 18%)",
                    borderRadius: "8px",
                    color: "hsl(200, 20%, 95%)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="accuracy"
                  stroke="hsl(187, 80%, 50%)"
                  fill="url(#colorAcc)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Recent Activity */}
          <GlassCard>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`mt-1.5 h-2 w-2 rounded-full ${
                      item.type === "success" ? "bg-success" : "bg-info"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{item.event}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Loss Chart */}
        <GlassCard className="mt-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Training Loss</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trainingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 18%)" />
              <XAxis dataKey="round" stroke="hsl(215, 15%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 40%, 10%)",
                  border: "1px solid hsl(220, 30%, 18%)",
                  borderRadius: "8px",
                  color: "hsl(200, 20%, 95%)",
                }}
              />
              <Line
                type="monotone"
                dataKey="loss"
                stroke="hsl(270, 60%, 60%)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Dashboard;
