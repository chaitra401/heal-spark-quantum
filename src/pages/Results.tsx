import DashboardLayout from "@/components/DashboardLayout";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

const confusionData = [
  { name: "True Pos", value: 185 },
  { name: "True Neg", value: 142 },
  { name: "False Pos", value: 8 },
  { name: "False Neg", value: 5 },
];

const pieColors = ["hsl(187, 80%, 50%)", "hsl(210, 80%, 55%)", "hsl(0, 72%, 51%)", "hsl(38, 92%, 50%)"];

const featureImportance = [
  { feature: "Radius", importance: 0.92 },
  { feature: "Perimeter", importance: 0.88 },
  { feature: "Texture", importance: 0.76 },
  { feature: "Area", importance: 0.85 },
  { feature: "Smoothness", importance: 0.64 },
  { feature: "Compactness", importance: 0.72 },
  { feature: "Concavity", importance: 0.81 },
  { feature: "Symmetry", importance: 0.58 },
];

const rocData = Array.from({ length: 20 }, (_, i) => ({
  fpr: i / 20,
  tpr: Math.min(1, (i / 20) ** 0.3),
}));

const radarData = [
  { metric: "Accuracy", value: 96.8 },
  { metric: "Precision", value: 95.9 },
  { metric: "Recall", value: 97.4 },
  { metric: "F1-Score", value: 96.6 },
  { metric: "AUC-ROC", value: 98.2 },
  { metric: "Specificity", value: 94.7 },
];

const Results = () => {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Results & Visualization</h1>
          <p className="text-muted-foreground">Model performance analysis</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Confusion Matrix */}
          <GlassCard>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Confusion Matrix</h3>
            <div className="grid grid-cols-2 gap-2">
              {confusionData.map((item, i) => (
                <div
                  key={item.name}
                  className={`flex flex-col items-center justify-center rounded-lg p-6 ${
                    i < 2 ? "bg-primary/10" : "bg-destructive/10"
                  }`}
                >
                  <span className="text-3xl font-bold text-foreground">{item.value}</span>
                  <span className="mt-1 text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Performance Radar */}
          <GlassCard>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Performance Metrics</h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(220, 30%, 18%)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} />
                <Radar
                  dataKey="value"
                  stroke="hsl(187, 80%, 50%)"
                  fill="hsl(187, 80%, 50%)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Feature Importance */}
          <GlassCard>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Feature Importance</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={featureImportance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 18%)" />
                <XAxis type="number" stroke="hsl(215, 15%, 55%)" fontSize={12} domain={[0, 1]} />
                <YAxis type="category" dataKey="feature" stroke="hsl(215, 15%, 55%)" fontSize={11} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220, 40%, 10%)",
                    border: "1px solid hsl(220, 30%, 18%)",
                    borderRadius: "8px",
                    color: "hsl(200, 20%, 95%)",
                  }}
                />
                <Bar dataKey="importance" fill="hsl(187, 80%, 50%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* ROC Curve */}
          <GlassCard>
            <h3 className="mb-4 text-lg font-semibold text-foreground">ROC Curve (AUC = 0.982)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={rocData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 18%)" />
                <XAxis dataKey="fpr" stroke="hsl(215, 15%, 55%)" fontSize={12} label={{ value: "FPR", position: "bottom", fill: "hsl(215, 15%, 55%)" }} />
                <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220, 40%, 10%)",
                    border: "1px solid hsl(220, 30%, 18%)",
                    borderRadius: "8px",
                    color: "hsl(200, 20%, 95%)",
                  }}
                />
                <Bar dataKey="tpr" fill="hsl(270, 60%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Results;
