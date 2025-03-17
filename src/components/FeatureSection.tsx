"use client";
import { motion } from "framer-motion";
import { Code2, Users, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Real-time Collaboration",
    description: "Code together in real-time with zero latency",
  },
  {
    icon: Users,
    title: "Team Rooms",
    description: "Create private rooms and invite your team members",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Blazingly fast performance with instant updates",
  },
  {
    icon: Lock,
    title: "Secure",
    description: "End-to-end encryption for your code and communications",
  },
];

export const FeatureSection = () => {
  return (
    <section className="py-24 bg-black/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <feature.icon className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
