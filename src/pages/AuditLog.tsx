import DashboardLayout from "@/components/DashboardLayout";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import { FileText, CheckCircle, AlertCircle, Server, Brain } from "lucide-react";

const auditEntries = [
  { id: 1, time: "2026-02-18 14:32", type: "training", event: "Federated round #47 completed", details: "Accuracy: 96.8%, Loss: 0.091", icon: Brain },
  { id: 2, time: "2026-02-18 14:28", type: "upload", event: "Hospital B uploaded dataset", details: "1,200 records • breast_cancer_v3.csv", icon: Server },
  { id: 3, time: "2026-02-18 14:15", type: "model", event: "Global model v2.3 saved", details: "4-qubit QVNN • FedAvg aggregation", icon: CheckCircle },
  { id: 4, time: "2026-02-18 13:45", type: "training", event: "Federated round #46 completed", details: "Accuracy: 96.2%, Loss: 0.098", icon: Brain },
  { id: 5, time: "2026-02-18 13:10", type: "prediction", event: "Batch prediction completed", details: "340 patients • breast cancer dataset", icon: FileText },
  { id: 6, time: "2026-02-18 12:55", type: "training", event: "Federated round #45 completed", details: "Accuracy: 95.8%, Loss: 0.105", icon: Brain },
  { id: 7, time: "2026-02-18 12:30", type: "upload", event: "Hospital D uploaded dataset", details: "890 records • fetal_health_ctg.csv", icon: Server },
  { id: 8, time: "2026-02-18 11:50", type: "alert", event: "Quantum circuit recalibrated", details: "Gate fidelity improved to 99.2%", icon: AlertCircle },
  { id: 9, time: "2026-02-18 11:20", type: "model", event: "Global model v2.2 archived", details: "Superseded by v2.3", icon: CheckCircle },
  { id: 10, time: "2026-02-18 10:00", type: "training", event: "Federated round #44 completed", details: "Accuracy: 95.1%, Loss: 0.112", icon: Brain },
];

const typeColors: Record<string, string> = {
  training: "text-primary",
  upload: "text-info",
  model: "text-success",
  prediction: "text-accent",
  alert: "text-warning",
};

const AuditLog = () => {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
          <p className="text-muted-foreground">Complete system activity trail</p>
        </div>

        <GlassCard>
          <div className="space-y-0 divide-y divide-border">
            {auditEntries.map((entry) => (
              <div key={entry.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary ${typeColors[entry.type]}`}>
                  <entry.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{entry.event}</p>
                  <p className="text-xs text-muted-foreground">{entry.details}</p>
                </div>
                <span className="shrink-0 text-xs font-mono text-muted-foreground">{entry.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </PageTransition>
    </DashboardLayout>
  );
};

export default AuditLog;
