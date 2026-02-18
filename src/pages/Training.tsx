import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Cpu, Activity, Zap, Server } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const hospitals = ["Hospital A", "Hospital B", "Hospital C", "Hospital D", "Hospital E"];

const Training = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [round, setRound] = useState(0);
  const [data, setData] = useState<{ round: number; loss: number; accuracy: number }[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTraining = () => {
    setIsRunning(true);
  };

  const pauseTraining = () => {
    setIsRunning(false);
  };

  const resetTraining = () => {
    setIsRunning(false);
    setRound(0);
    setData([]);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRound((prev) => {
          const next = prev + 1;
          if (next > 50) {
            setIsRunning(false);
            return prev;
          }
          setData((d) => [
            ...d,
            {
              round: next,
              loss: Math.max(0.05, 0.85 - next * 0.016 + Math.random() * 0.03),
              accuracy: Math.min(0.99, 0.55 + next * 0.009 + Math.random() * 0.01),
            },
          ]);
          return next;
        });
      }, 800);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const currentLoss = data.length > 0 ? data[data.length - 1].loss.toFixed(4) : "—";
  const currentAcc = data.length > 0 ? (data[data.length - 1].accuracy * 100).toFixed(1) + "%" : "—";

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Federated Training</h1>
            <p className="text-muted-foreground">Quantum Variational Neural Network</p>
          </div>
          <div className="flex gap-2">
            {!isRunning ? (
              <Button onClick={startTraining} className="gradient-primary text-primary-foreground border-0 gap-2">
                <Play className="h-4 w-4" /> Start
              </Button>
            ) : (
              <Button onClick={pauseTraining} variant="outline" className="gap-2 border-border text-foreground">
                <Pause className="h-4 w-4" /> Pause
              </Button>
            )}
            <Button onClick={resetTraining} variant="outline" className="gap-2 border-border text-foreground">
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <StatCard icon={Zap} label="Current Round" value={`${round}/50`} />
          <StatCard icon={Activity} label="Loss" value={currentLoss} />
          <StatCard icon={Cpu} label="Accuracy" value={currentAcc} />
          <StatCard icon={Server} label="Active Clients" value="5" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Accuracy</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 18%)" />
                <XAxis dataKey="round" stroke="hsl(215, 15%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} domain={[0.5, 1]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220, 40%, 10%)",
                    border: "1px solid hsl(220, 30%, 18%)",
                    borderRadius: "8px",
                    color: "hsl(200, 20%, 95%)",
                  }}
                />
                <Line type="monotone" dataKey="accuracy" stroke="hsl(187, 80%, 50%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Loss</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={data}>
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
                <Line type="monotone" dataKey="loss" stroke="hsl(270, 60%, 60%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* Hospital Clients */}
        <GlassCard className="mt-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Federated Clients</h3>
          <div className="grid gap-3 md:grid-cols-5">
            {hospitals.map((h, i) => (
              <div key={h} className="rounded-lg bg-secondary p-4 text-center">
                <Server className="mx-auto mb-2 h-6 w-6 text-primary" />
                <p className="text-sm font-medium text-foreground">{h}</p>
                <p className="text-xs text-muted-foreground">
                  {isRunning ? (
                    <span className="text-success">● Training</span>
                  ) : round > 0 ? (
                    <span className="text-warning">● Idle</span>
                  ) : (
                    <span className="text-muted-foreground">● Ready</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Training;
