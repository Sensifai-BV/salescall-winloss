import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { APP_METADATA } from "@/lib/sensifai/app-metadata";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Terminal,
  Eye,
  Key,
  Layers,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  BarChart3,
  FileSpreadsheet,
  Headphones,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Marketing Navigation Bar */}
      <Navbar
        appName={APP_METADATA.name}
        logoSrc="/logo.png"
        primaryColor={APP_METADATA.primaryColor}
        navLinks={[
          { label: "Intelligence Studio", href: "/workspace" },
          { label: "Capabilities", href: "#features" },
          { label: "MEDDPICC Standards", href: "#standards" },
          { label: "Developer API", href: "#api" },
          { label: "Pricing", href: "#pricing" },
        ]}
        ctaLabel="Launch Intelligence Studio"
        ctaHref="/workspace"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Subtle Brand Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-indigo-600/5 to-transparent pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>SENSIFAI AI ENGINE · WIN/LOSS INTELLIGENCE & CRM AUTO-FILL</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.14]">
            Win/Loss Intelligence & CRM Auto-Fill <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              from B2B Sales Calls
            </span>
          </h1>

          {/* Clean Plain-Text Subheadline */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Eliminate manual CRM note fatigue. Ingest sales call audio recordings, meeting transcripts, and deal notes to extract core win/loss drivers, MEDDPICC qualification criteria, competitor battlecard moments, and CRM update payloads in under sixty seconds.
          </p>

          {/* Hero CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/workspace"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all duration-150 hover:shadow-lg"
            >
              <Sparkles className="h-4 w-4" />
              <span>Launch Intelligence Studio</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
            <Link
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 shadow-2xs transition-all duration-150"
            >
              <Eye className="h-4 w-4 text-slate-500" />
              <span>Explore Capabilities</span>
            </Link>
          </div>

          {/* Trust Metrics Strip */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto border-t border-slate-200">
            {APP_METADATA.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="font-mono text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Browser Mockup Frame Showcase */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto rounded-2xl border border-slate-300/80 bg-white shadow-2xl overflow-hidden">
          {/* macOS / Chrome Window Header */}
          <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-400 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-400 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-400 inline-block" />
            </div>
            <div className="px-6 py-1 rounded-md bg-white border border-slate-200 text-xs text-slate-600 font-mono text-center max-w-xs truncate shadow-2xs">
              https://salescall-winloss.sensifai.com/workspace
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Sensifai Live</span>
            </div>
          </div>

          {/* Platform Screenshot Preview */}
          <div className="relative aspect-video w-full bg-slate-900 overflow-hidden min-h-[300px] sm:min-h-[460px] md:min-h-[540px]">
            <Image
              src="/images/platform-ui.png"
              alt="SalesCall WinLoss Live Workspace Interface"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white space-y-1">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-600">
                  LIVE WORKSPACE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold">
                  B2B Sales Call Deal Health & MEDDPICC Telemetry
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
                  Automated sales call qualification, competitor displacement moments, pricing objection mining, and CRM auto-fill payloads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section (Asymmetric Bento Grid) */}
      <section id="features" className="py-16 md:py-24 bg-white border-y border-slate-200 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Core Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Bespoke Deal Intelligence for Modern RevOps
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Combining Sensifai AI multimodal intelligence with deterministic sales qualification rules to prevent deal slippage and protect win rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Feature Card 1: MEDDPICC Field Extraction (7 cols) */}
            <div className="md:col-span-7 bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 flex flex-col justify-between overflow-hidden shadow-2xs">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  MEDDPICC Field Extraction & Deal Health Scoring
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Automatically identifies Metrics, Economic Buyer, Decision Criteria, Decision Process, Implicated Pain, Champion status, and Competitor displacement angles directly from prospect speech with verbatim quotes.
                </p>
              </div>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 mt-6 min-h-[190px] sm:min-h-[240px]">
                <Image
                  src="/images/feature-1.jpg"
                  alt="MEDDPICC Extraction Feature"
                  fill
                  loading="eager"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Feature Card 2: Competitor Battlecards (5 cols) */}
            <div className="md:col-span-5 bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 flex flex-col justify-between overflow-hidden shadow-2xs">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Competitor Battlecard Moments & Objection Mining
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Detects competitor mentions, feature comparisons, and pricing objections in real time. Highlights exact rep responses and links objection rationale to product roadmaps.
                </p>
              </div>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 mt-6 min-h-[190px] sm:min-h-[240px]">
                <Image
                  src="/images/hero.jpg"
                  alt="Competitor Battlecard Feature"
                  fill
                  loading="eager"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Feature Card 3: Pipeline Risk Telemetry (5 cols) */}
            <div className="md:col-span-5 bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 flex flex-col justify-between overflow-hidden shadow-2xs">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Pipeline Risk Telemetry & Ghosting Signal Detection
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Surfaces critical deal hazards including budget freezes, missing executive sponsorship, procurement friction, and timeline ambiguity before deals stall.
                </p>
              </div>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 mt-6 min-h-[190px] sm:min-h-[240px]">
                <Image
                  src="/images/feature-2.jpg"
                  alt="Pipeline Risk Telemetry Feature"
                  fill
                  loading="eager"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Feature Card 4: CRM Auto-Fill & Commitments (7 cols) */}
            <div className="md:col-span-7 bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 flex flex-col justify-between overflow-hidden shadow-2xs">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  One-Click CRM Auto-Fill & Commitment Task Dispatch
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Generates clean structured CRM update payloads for Salesforce, HubSpot, and custom internal systems, with automatic assignment of rep promises and customer deliverables.
                </p>
              </div>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 mt-6 min-h-[190px] sm:min-h-[240px]">
                <Image
                  src="/images/feature-3.jpg"
                  alt="CRM Auto-Fill Feature"
                  fill
                  loading="eager"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualification Taxonomy Standards Section */}
      <section id="standards" className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Qualification Framework
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Standardized MEDDPICC Deal Health Matrix
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every sales conversation is graded against four deterministic qualification tiers with explicit revenue execution protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {APP_METADATA.qualificationTiers.map((tier, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: tier.color }}
                />
                <span className="text-xs font-bold text-slate-400">
                  0{idx + 1}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{tier.tier}</h3>
                <div className="text-xs font-semibold text-blue-600 mt-0.5">{tier.label}</div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{tier.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section #api: B2B Headless REST API (Mandatory for E2E Audit) */}
      <section id="api" className="py-16 md:py-24 bg-white border-t border-slate-200 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Developer Ecosystem
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              B2B Headless REST API
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Integrate automated sales call transcription, MEDDPICC extraction, and win/loss analytics directly into your sales dialer, CRM, or revenue operations pipeline.
            </p>
          </div>

          {/* Security Guarantee Banner */}
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <ShieldCheck className="h-4 w-4" />
                <span>Dedicated Application Keys · Zero Account Identity Leakage</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                B2B integrations authenticate via isolated cryptographic application tokens (starting with sensi_live_ or sc_live_). Your personal Sensifai Logto account credentials and internal developer identifiers are strictly protected and never exposed in API payloads, logs, or responses.
              </p>
            </div>
            <Link
              href="/workspace?tab=api"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shrink-0 shadow-md"
            >
              <Key className="h-3.5 w-3.5" />
              <span>Manage API Keys</span>
            </Link>
          </div>

          {/* 3 Core Endpoints Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3 shadow-2xs hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-mono text-[11px] font-bold">
                  POST /api/v1/process
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">Bearer Token</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Automated Call Intake</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit sales call transcript or meeting notes. Receives instant MEDDPICC scores, win/loss drivers, competitor mentions, and structured CRM sync payload.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3 shadow-2xs hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-mono text-[11px] font-bold">
                  GET /api/v1/standards
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">Public Catalog</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Taxonomy & Thresholds</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Programmatically query standardized MEDDPICC criteria, qualification tiers, and deal risk thresholds for automated pipeline forecasting.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3 shadow-2xs hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-sky-100 text-sky-800 font-mono text-[11px] font-bold">
                  GET /api/v1/keys
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">Application Keys</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Key Lifecycle & Rotation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mint dedicated application bearer keys, monitor timestamped usage, and instantly revoke compromised tokens without affecting user login sessions.
              </p>
            </div>
          </div>

          {/* Code & Response Preview */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-slate-900 rounded-2xl p-5 text-white font-mono text-xs border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-800">
                <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>cURL Request Example</span>
                </span>
                <span>Bash / Terminal</span>
              </div>
              <pre className="text-slate-300 overflow-x-auto text-[11px] leading-relaxed pt-1">
{`curl -X POST https://salescall-winloss.sensifai.com/api/v1/process \\
  -H "Authorization: Bearer sc_live_4d9f12ab..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Acme Cloud Infrastructure Deal",
    "stage": "Decision & Procurement Review",
    "transcript": "VP of Infra: If we can benchmark latency below 45ms, this cuts our Kafka headcount by half. We cleared budget with our CFO."
  }'`}
              </pre>
            </div>

            <div className="bg-slate-900 rounded-2xl p-5 text-white font-mono text-xs border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-800">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>JSON Response Payload</span>
                </span>
                <span>200 OK · JSON</span>
              </div>
              <pre className="text-emerald-300 overflow-x-auto text-[11px] leading-relaxed pt-1">
{`{
  "success": true,
  "reportId": "SC-20261117-8492",
  "result": {
    "qualificationGrade": "STRONG_WIN_TRACK",
    "confidenceScore": 95,
    "meddpicc": {
      "metrics": "65% latency reduction and 240 engineering hours saved",
      "economicBuyer": "VP of Infrastructure with single-signature authority"
    },
    "winLossDrivers": [
      { "factor": "Latency Benchmark", "impact": "positive" }
    ],
    "crmSyncPayload": {
      "stage": "Contract Execution",
      "riskLevel": "low"
    }
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Transparent Pricing
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Prepaid Metered Usage
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No recurring seat licenses, minimum commitments, or annual lock-ins. Pay strictly for each sales call analyzed.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold">
            <span>PAY AS YOU GO</span>
          </div>
          <div>
            <div className="text-5xl font-extrabold text-slate-900 font-mono tracking-tight">
              €0.05
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              per sales call analysis request
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Includes full audio transcription, MEDDPICC qualification scoring, competitor battlecard extraction, pipeline risk telemetry, and structured CRM auto-fill payloads metered directly from your Sensifai prepaid wallet.
          </p>
          <div className="space-y-2.5 text-left border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Free instant exploration with rich enterprise call presets</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Full Headless B2B REST API with dedicated application keys</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Zero Logto ID exposure guarantee for enterprise security</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Instant wallet balance synchronization with zero revert</span>
            </div>
          </div>
          <Link
            href="/workspace"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all duration-150 hover:shadow-lg"
          >
            <Sparkles className="h-4 w-4" />
            <span>Launch Intelligence Studio</span>
          </Link>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-white border-t border-slate-200 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Answers & Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {APP_METADATA.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-2 shadow-2xs"
              >
                <h3 className="font-bold text-slate-900 text-sm">{faq.question}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 bg-slate-900 text-slate-400 text-xs px-4 sm:px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">
              SalesCall WinLoss · Win/Loss Intelligence & CRM Auto-Fill
            </div>
            <p className="text-slate-500 max-w-md">
              Sensifai AI Engine multimodal call intelligence for B2B sales teams, founders, and revenue operations leaders.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/workspace" className="hover:text-white transition-colors">
              Workspace
            </Link>
            <Link href="#api" className="hover:text-white transition-colors">
              Developer API
            </Link>
            <Link href="#standards" className="hover:text-white transition-colors">
              Taxonomy
            </Link>
            <Link href="https://sensifai.com/marketplace" className="hover:text-white transition-colors">
              Sensifai Marketplace
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
