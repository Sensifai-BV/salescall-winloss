/**
 * Sensifai Application Metadata for SalesCall WinLoss
 *
 * Clean, plain-text descriptions with ZERO raw markdown syntax (**bold**, ###, backticks)
 * or broken escape sequences.
 */

export const APP_CONFIG = {
  id: "salescall-winloss",
  appId: "salescall-winloss",
  name: "SalesCall WinLoss",
  tagline: "Win/Loss Intelligence & CRM Auto-Fill From Sales Calls",
  category: "sales-tech",
  primaryColor: "#2563EB",
  archetype: "bento",
  version: "0.1.0",
  pricing: {
    type: "pay_as_go",
    costPerCheck: "€0.05",
    currency: "EUR",
    unit: "sales call analysis",
    description:
      "Prepaid usage-based billing at five euro cents per sales call transcript or audio evaluation, MEDDPICC extraction, competitor battlecard logging, and CRM sync payload generation metered transparently from your Sensifai wallet.",
  },
  shortDescription:
    "Transform B2B sales call recordings into win/loss drivers, MEDDPICC field extracts, competitor battlecard moments, and CRM auto-fill payloads in under 60 seconds.",
  longDescription:
    "SalesCall WinLoss is an automated win/loss intelligence and CRM population engine built for B2B sales teams, founders, and revenue operations leaders. In under 60 seconds, it ingests sales call audio recordings, meeting transcripts, and deal notes to extract core win/loss drivers, identify competitor mentions, log pricing objections, and generate structured CRM fields ready for one-click synchronization. Account executives and sales reps routinely skip manual CRM updates, leaving sales leadership and revenue operations guessing why high-stakes opportunities were won or lost. When deals stall or fall through, executives are left with vague anecdotes rather than actionable data. Post-call reviews remain slow, inconsistent across reps, and devoid of structured evidence trails. SalesCall WinLoss replaces guesswork with high-precision Sensifai AI multimodal intelligence and deterministic sales qualification rules. It transcribes and structures prospect dialogue, scores deals across standard MEDDPICC criteria (Metrics, Economic Buyer, Decision Criteria, Decision Process, Pain, Champion, and Competition), flags hidden pipeline risks like ghosting signals or procurement hurdles, and maps rep commitments to automated follow-up tasks metered transparently at €0.05 per call from your Sensifai prepaid wallet.",
  canonicalUrl: "https://salescall-winloss.sensifai.com",
  gatekeeperUrl: "https://gatekeeper.sensifai.com",
  aiGatewayUrl: "https://llm.sensifai.com",
  stats: [
    { value: "< 60s", label: "Call Analysis Turnaround" },
    { value: "95.8%", label: "MEDDPICC Extraction Accuracy" },
    { value: "4.8x", label: "Faster CRM Note Completion" },
    { value: "€0.05", label: "Metered Cost per Call" },
  ],
  features: [
    {
      id: "meddpicc-extraction",
      title: "MEDDPICC Field Extraction & Deal Health Scoring",
      description:
        "Automatically identifies Metrics, Economic Buyer, Decision Criteria, Decision Process, Implicated Pain, Champion status, and Competitor displacement angles directly from prospect speech with verbatim quotes.",
      imageSrc: "/images/feature-1.jpg",
    },
    {
      id: "competitor-battlecards",
      title: "Competitor Battlecard Moments & Objection Mining",
      description:
        "Detects competitor mentions, feature comparisons, and pricing objections in real time. Highlights exact rep responses and links objection rationale to product roadmaps.",
      imageSrc: "/images/feature-2.jpg",
    },
    {
      id: "risk-flags",
      title: "Pipeline Risk Telemetry & Ghosting Signal Detection",
      description:
        "Surfaces critical deal hazards including budget freezes, missing executive sponsorship, procurement friction, and timeline ambiguity before deals stall.",
      imageSrc: "/images/feature-3.jpg",
    },
    {
      id: "crm-autofill",
      title: "One-Click CRM Auto-Fill & Commitment Task Dispatch",
      description:
        "Generates clean structured CRM update payloads for Salesforce, HubSpot, and custom internal systems, with automatic assignment of rep promises and customer deliverables.",
      imageSrc: "/images/hero.jpg",
    },
  ],
  useCases: [
    "B2B sales teams automating post-call CRM note entry and MEDDPICC deal qualification",
    "RevOps leaders analyzing deal loss drivers, pricing pushback, and competitor displacement trends",
    "Sales managers auditing pipeline risks, rep commitments, and ghosting signals",
    "Product marketing teams gathering real-world competitor battlecard mentions from prospect calls",
  ],
  qualificationTiers: [
    {
      tier: "Tier 1 - Strong Win Track",
      label: "Qualified & Champion Engaged",
      description: "Economic Buyer engaged, quantifiable metrics agreed, champion active, clear mutual action plan.",
      color: "#059669",
    },
    {
      tier: "Tier 2 - Advancing with Gaps",
      label: "Validation in Progress",
      description: "Pain established and criteria defined, but economic buyer unconfirmed or competitor evaluation ongoing.",
      color: "#0284C7",
    },
    {
      tier: "Tier 3 - Pipeline Risk",
      label: "Objection & Delay Flags",
      description: "Severe pricing pushback, budget ambiguity, or procurement legal hurdles requiring senior sales intervention.",
      color: "#EA580C",
    },
    {
      tier: "Tier 4 - Attrition Hazard",
      label: "Displacement / Loss Imminent",
      description: "Direct competitor lock-in, unaddressed product gap, or stakeholder disengagement signal.",
      color: "#DC2626",
    },
  ],
  faqs: [
    {
      question: "How does SalesCall WinLoss process sales calls and transcripts?",
      answer:
        "Our engine applies Sensifai AI multimodal intelligence to transcribe and analyze sales calls, meeting recordings, and transcript files. It parses prospect sentiment, speaker intent, and sales qualification criteria against deterministic MEDDPICC rules.",
    },
    {
      question: "Can SalesCall WinLoss auto-fill Salesforce and HubSpot CRMs?",
      answer:
        "Yes. SalesCall WinLoss produces structured, schema-validated JSON payloads designed for direct CRM sync, complete with field mappings for deal stage, next steps, budget range, and qualification notes.",
    },
    {
      question: "How does prepaid wallet billing work?",
      answer:
        "Every sales call evaluation is metered at exactly five euro cents (€0.05) directly from your Sensifai prepaid wallet. There are no recurring seat fees, minimums, or long-term contracts.",
    },
    {
      question: "Can we integrate SalesCall WinLoss via our internal sales tools or dialers?",
      answer:
        "Yes. SalesCall WinLoss provides a headless B2B REST API (POST /api/v1/process) with dedicated developer API keys, standards taxonomy endpoints, and webhook events for automated ingestion from Gong, Zoom, or telephony systems.",
    },
  ],
};

export const APP_METADATA = APP_CONFIG;
