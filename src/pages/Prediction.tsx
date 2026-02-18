import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

interface PredictionResult {
  label: string;
  confidence: number;
  details: string;
}

const Prediction = () => {
  const [predicting, setPredicting] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [dataset, setDataset] = useState<"breast" | "fetal">("breast");

  const breastFeatures = [
    "Radius Mean", "Texture Mean", "Perimeter Mean", "Area Mean",
    "Smoothness Mean", "Compactness Mean",
  ];

  const fetalFeatures = [
    "Baseline FHR", "Accelerations", "Fetal Movement",
    "Uterine Contractions", "Light Decelerations", "Severe Decelerations",
  ];

  const features = dataset === "breast" ? breastFeatures : fetalFeatures;

  const handlePredict = () => {
    setPredicting(true);
    setTimeout(() => {
      if (dataset === "breast") {
        setResult({
          label: "Benign",
          confidence: 0.947,
          details: "Low malignancy probability detected. Digital twin analysis confirms benign characteristics.",
        });
      } else {
        setResult({
          label: "Normal",
          confidence: 0.892,
          details: "Fetal health indicators within normal range. Quantum model confidence: high.",
        });
      }
      setPredicting(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Prediction</h1>
          <p className="text-muted-foreground">Single patient prediction with confidence scoring</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <div className="mb-4 flex gap-2">
              <Button
                variant={dataset === "breast" ? "default" : "outline"}
                size="sm"
                onClick={() => { setDataset("breast"); setResult(null); }}
                className={dataset === "breast" ? "gradient-primary text-primary-foreground border-0" : "border-border text-foreground"}
              >
                Breast Cancer
              </Button>
              <Button
                variant={dataset === "fetal" ? "default" : "outline"}
                size="sm"
                onClick={() => { setDataset("fetal"); setResult(null); }}
                className={dataset === "fetal" ? "gradient-primary text-primary-foreground border-0" : "border-border text-foreground"}
              >
                Fetal Health
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {features.map((f) => (
                <div key={f} className="space-y-1">
                  <Label className="text-xs text-muted-foreground">{f}</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              ))}
            </div>

            <Button
              onClick={handlePredict}
              disabled={predicting}
              className="mt-6 w-full gradient-primary text-primary-foreground border-0 gap-2"
            >
              {predicting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Target className="h-4 w-4" />}
              {predicting ? "Analyzing..." : "Run Prediction"}
            </Button>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Result</h3>
            {!result ? (
              <div className="flex h-64 items-center justify-center">
                <p className="text-muted-foreground">Submit patient data to see prediction</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-success" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{result.label}</p>
                    <p className="text-sm text-muted-foreground">Classification Result</p>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-mono text-primary">{(result.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-3 rounded-full gradient-primary"
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-secondary p-4">
                  <p className="text-sm text-foreground">{result.details}</p>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <p className="mb-1 text-xs font-medium text-muted-foreground">MODEL INFO</p>
                  <p className="text-sm text-foreground">DTQFL v2.3 • 4-qubit variational circuit • Federated round #47</p>
                </div>
              </motion.div>
            )}
          </GlassCard>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Prediction;
