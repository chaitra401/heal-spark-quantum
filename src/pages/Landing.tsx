import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dna, Brain, Shield, Activity, ArrowRight, Cpu, Network } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Dna,
    title: "Digital Twin Engine",
    description: "Create precise digital replicas of patient data for advanced simulation and analysis.",
  },
  {
    icon: Brain,
    title: "Quantum Neural Network",
    description: "Hybrid classical-quantum variational circuits for superior classification accuracy.",
  },
  {
    icon: Network,
    title: "Federated Learning",
    description: "Train across multiple hospitals without sharing sensitive patient data.",
  },
  {
    icon: Shield,
    title: "Privacy Preserving",
    description: "Secure parameter exchange ensures patient data never leaves the hospital.",
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description: "Live training dashboards with loss curves, accuracy metrics, and round tracking.",
  },
  {
    icon: Cpu,
    title: "Model Registry",
    description: "Version-controlled global models with full audit trails and reproducibility.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="fixed top-0 z-50 w-full border-b border-border glass-strong">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Dna className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">DTQFL</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button size="sm" className="gradient-primary text-primary-foreground border-0">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
        <div className="absolute inset-0 opacity-30">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <Cpu className="h-3.5 w-3.5" />
              Quantum-Enhanced Healthcare AI
            </div>
            <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
              <span className="gradient-text">Digital Twin</span>{" "}
              Quantum Federated Learning
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              A privacy-preserving AI platform for breast cancer detection and fetal health
              classification using quantum variational neural networks and federated learning.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="gradient-primary text-primary-foreground border-0 gap-2 px-8">
                  Launch Platform <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-border text-foreground">
                  View Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Platform Capabilities
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              End-to-end quantum-enhanced machine learning pipeline for healthcare diagnostics.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 transition-all duration-300 hover:border-primary/20"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 DTQFL Health Intelligence Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
