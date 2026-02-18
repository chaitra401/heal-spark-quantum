import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";

const DatasetUpload = () => {
  const [files, setFiles] = useState<{ name: string; size: string; status: string }[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files).map((f) => ({
      name: f.name,
      size: `${(f.size / 1024).toFixed(1)} KB`,
      status: "validated",
    }));
    setFiles((prev) => [...prev, ...dropped]);
  };

  const simulateUpload = () => {
    setFiles((prev) => [
      ...prev,
      { name: "breast_cancer_wisconsin.csv", size: "124.3 KB", status: "validated" },
      { name: "fetal_health_ctg.csv", size: "89.7 KB", status: "validated" },
    ]);
  };

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Dataset Upload</h1>
          <p className="text-muted-foreground">Upload CSV datasets for training</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-colors ${
                dragOver ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-2 text-lg font-medium text-foreground">Drop CSV files here</p>
              <p className="mb-4 text-sm text-muted-foreground">Supports breast cancer & fetal health datasets</p>
              <Button onClick={simulateUpload} className="gradient-primary text-primary-foreground border-0">
                Load Sample Datasets
              </Button>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Uploaded Files</h3>
            {files.length === 0 ? (
              <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
            ) : (
              <div className="space-y-3">
                {files.map((file, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 rounded-lg bg-secondary p-3"
                  >
                    <FileText className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-success" />
                  </motion.div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>

        {/* Dataset Info */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <GlassCard>
            <h4 className="mb-2 font-semibold text-foreground">Breast Cancer Wisconsin</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              569 instances, 30 features. Binary classification (malignant/benign).
            </p>
            <div className="flex gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Binary</span>
              <span className="rounded-full bg-info/10 px-3 py-1 text-xs text-info">30 features</span>
            </div>
          </GlassCard>
          <GlassCard>
            <h4 className="mb-2 font-semibold text-foreground">Fetal Health CTG</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              2,126 instances, 21 features. Multi-class classification (normal/suspect/pathological).
            </p>
            <div className="flex gap-2">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">Multi-class</span>
              <span className="rounded-full bg-info/10 px-3 py-1 text-xs text-info">21 features</span>
            </div>
          </GlassCard>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default DatasetUpload;
