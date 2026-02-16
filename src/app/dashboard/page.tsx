"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/ui/logo";
import {
  Plus,
  Upload,
  ArrowLeft,
  ChevronDown,
  LogOut,
  User,
  Database,
  Layers,
  TrendingUp,
  FileCode,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TemplateOption = "marginfi-v2" | "klend" | "drift-v2" | "custom";
type NetworkOption = "mainnet" | "devnet" | "localnet";

interface Template {
  id: TemplateOption;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const templates: Template[] = [
  {
    id: "marginfi-v2",
    name: "marginfi-v2",
    description: "Lending protocol with leveraged positions",
    icon: <Database className="h-8 w-8" />,
  },
  {
    id: "klend",
    name: "klend",
    description: "Kamino Lending protocol",
    icon: <Layers className="h-8 w-8" />,
  },
  {
    id: "drift-v2",
    name: "drift-v2",
    description: "Perpetual futures DEX",
    icon: <TrendingUp className="h-8 w-8" />,
  },
  {
    id: "custom",
    name: "Custom IDL",
    description: "Upload your own program IDL",
    icon: <FileCode className="h-8 w-8" />,
  },
];

export default function DashboardPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [step, setStep] = useState<"select" | "configure">("select");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateOption | null>(null);

  // Form state for custom IDL
  const [projectName, setProjectName] = useState("");
  const [programAddress, setProgramAddress] = useState("");
  const [network, setNetwork] = useState<NetworkOption>("mainnet");
  const [idlFileName, setIdlFileName] = useState<string | null>(null);

  const handleTemplateSelect = (templateId: TemplateOption) => {
    setSelectedTemplate(templateId);
    if (templateId === "custom") {
      setStep("configure");
    } else {
      // For pre-built templates, show configure step with pre-filled data
      setStep("configure");
    }
  };

  const handleBack = () => {
    setStep("select");
    setSelectedTemplate(null);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    // Reset state after dialog closes
    setTimeout(() => {
      setStep("select");
      setSelectedTemplate(null);
      setProjectName("");
      setProgramAddress("");
      setNetwork("mainnet");
      setIdlFileName(null);
    }, 200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdlFileName(file.name);
    }
  };

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link href="/home" className="flex items-center gap-2">
            <Logo size={32} className="text-foreground" />
            <span className="text-xl font-semibold">SolanaMyAdmin</span>
          </Link>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="hidden sm:inline">demo@solanamyadmin.com</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Projects</h1>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Existing Project Card */}
          <Link href="/">
            <Card className="group cursor-pointer transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardTitle className="text-lg">Project 0 Explorer</CardTitle>
                <CardDescription>
                  Internal marginfi program explorer for Project 0 team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                    mainnet
                  </span>
                  <span className="text-xs text-muted-foreground">
                    marginfi-v2
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Create New Project Card */}
          <Card
            className="cursor-pointer border-dashed hover:border-primary/50 hover:bg-muted/50 transition-all"
            onClick={() => setIsDialogOpen(true)}
          >
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] py-8">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">Create Project</p>
              <p className="text-xs text-muted-foreground mt-1">
                Add a new program explorer
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Create Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-2xl">
          {step === "select" ? (
            <>
              <DialogHeader>
                <DialogTitle>Create a new project</DialogTitle>
                <DialogDescription>
                  Select a template to get started or upload your own IDL
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={cn(
                      "flex flex-col items-start p-4 rounded-lg border border-border text-left transition-all",
                      "hover:border-primary/50 hover:bg-muted/50",
                      selectedTemplate === template.id &&
                        "border-primary bg-primary/5"
                    )}
                  >
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-3">
                      {template.icon}
                    </div>
                    <span className="font-medium">{template.name}</span>
                    <span className="text-sm text-muted-foreground mt-1">
                      {template.description}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBack}
                    className="h-8 w-8"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <DialogTitle>
                      {selectedTemplate === "custom"
                        ? "Configure Custom Project"
                        : `Configure ${selectedTemplateData?.name}`}
                    </DialogTitle>
                    <DialogDescription>
                      {selectedTemplate === "custom"
                        ? "Enter your project details and upload an IDL"
                        : "Customize your project settings"}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Project Name */}
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="My Solana Project"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>

                {/* Program Address */}
                <div className="space-y-2">
                  <Label htmlFor="program-address">Program Address</Label>
                  <Input
                    id="program-address"
                    placeholder="MFv2hWf31Z9kbCa1snEPYctwafyhdvnV7FZnsebVacA"
                    value={programAddress}
                    onChange={(e) => setProgramAddress(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>

                {/* Network */}
                <div className="space-y-2">
                  <Label htmlFor="network">Network</Label>
                  <Select
                    value={network}
                    onValueChange={(v) => setNetwork(v as NetworkOption)}
                  >
                    <SelectTrigger id="network">
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mainnet">Mainnet</SelectItem>
                      <SelectItem value="devnet">Devnet</SelectItem>
                      <SelectItem value="localnet">Localnet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* IDL Upload (only for custom) */}
                {selectedTemplate === "custom" && (
                  <div className="space-y-2">
                    <Label>IDL File</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleFileChange}
                        className="hidden"
                        id="idl-upload"
                      />
                      <label
                        htmlFor="idl-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        {idlFileName ? (
                          <span className="text-sm font-medium">
                            {idlFileName}
                          </span>
                        ) : (
                          <>
                            <span className="text-sm font-medium">
                              Click to upload IDL
                            </span>
                            <span className="text-xs text-muted-foreground mt-1">
                              JSON file only
                            </span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                )}

                {/* Create Button */}
                <Button className="w-full" size="lg">
                  Create Project
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
