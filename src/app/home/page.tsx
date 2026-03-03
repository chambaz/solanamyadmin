"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ArrowRight, FileText, Zap } from "lucide-react";

const features = [
  {
    title: "Create Projects",
    description:
      "Each project has an associated program ID, IDL, and custom metadata. Create projects for mainnet, devnet, or a local validator.",
  },
  {
    title: "Real Time Snapshots",
    description:
      "When account data is changed a new snapshot is automatically created. Each snapshot can be viewed and explored independently.",
  },
  {
    title: "Snapshot Diffs",
    description:
      "Every account change has an associated diff allowing teams to examine changes in account data over time.",
  },
  {
    title: "Favorites & Labels",
    description:
      "Users can favorite specific accounts and give accounts custom labels to make browsing and consuming account data easier.",
  },
  {
    title: "Custom Views",
    description:
      "Views allow users to group accounts from differing account types. Keep your most important accounts at your fingertips.",
  },
  {
    title: "Search & Filter",
    description:
      "Search accounts directly by pubkey or by custom label and filter accounts with an advanced field type filter.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Logo size={32} className="text-foreground" />
          <span className="text-xl font-semibold">SolanaMyAdmin</span>
        </div>
        <Link href="/dashboard">
          <Button variant="outline" className="gap-2">
            Launch Studio
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center px-6 pt-20 pb-16">
        {/* Badge */}
        <div className="flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm mb-8">
          <Zap className="h-4 w-4" />
          <span>Public beta is live</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center max-w-4xl leading-tight tracking-tight">
          The Operating System for Solana Programs
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-2xl">
          Inspect, label, and manage your on-chain data with a powerful explorer
          built for developers and teams building on Solana.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4 mt-10">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              <Zap className="h-4 w-4" />
              Get Started
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="gap-2">
            <FileText className="h-4 w-4" />
            Read docs
          </Button>
        </div>

        {/* App Preview */}
        <div className="mt-16 w-full max-w-5xl">
          <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
            {/* Window Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            {/* App Preview Content - 3 Column Layout Skeleton */}
            <div className="flex h-[400px] bg-background"></div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Everything you need to manage program data
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="space-y-3">
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={24} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">SolanaMyAdmin</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built for Solana developers
          </p>
        </div>
      </footer>
    </div>
  );
}
