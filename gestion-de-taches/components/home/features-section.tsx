"use client";

import { ListTodo, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

function Feature({ icon, title, description, delay }: FeatureProps) {
  return (
    <motion.div 
      className="flex flex-col items-center gap-4 text-center p-6 rounded-lg hover:bg-background/50 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <ListTodo className="h-8 w-8" />,
      title: "Organisation simple",
      description: "Créez, organisez et gérez vos tâches en quelques clics.",
      delay: 0.1,
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Suivi du temps",
      description: "Suivez le temps passé sur chaque tâche et améliorez votre productivité.",
      delay: 0.2,
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Accomplissement",
      description: "Visualisez vos progrès et célébrez vos accomplissements.",
      delay: 0.3,
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
            Fonctionnalités principales
          </h2>
          <p className="max-w-[600px] mx-auto text-muted-foreground">
            Découvrez comment TaskMaster peut transformer votre gestion quotidienne.
          </p>
        </motion.div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}