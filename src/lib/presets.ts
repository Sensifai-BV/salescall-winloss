/**
 * Preset Scenarios for SalesCall WinLoss
 *
 * All presets contain clean, plain-text sentences with zero raw markdown syntax,
 * zero model names, and rich domain-accurate B2B sales qualification details.
 */

export interface CallPreset {
  id: string;
  name: string;
  company: string;
  dealValue: string;
  callDuration: string;
  channelType: "audio" | "transcript" | "notes";
  stage: string;
  outcome: "won" | "lost" | "in_review";
  summary: string;
  transcriptSnippet: string;
  meddpicc: {
    metrics: string;
    economicBuyer: string;
    decisionCriteria: string;
    decisionProcess: string;
    identifyPain: string;
    champion: string;
    competition: string;
    overallScore: number;
  };
  winLossDrivers: Array<{
    factor: string;
    impact: "positive" | "negative" | "neutral";
    quote: string;
    confidence: number;
  }>;
  competitors: Array<{
    name: string;
    mentions: number;
    context: string;
    battlecardTip: string;
  }>;
  objections: Array<{
    objection: string;
    category: "pricing" | "security" | "feature" | "migration";
    resolution: string;
    status: "resolved" | "unresolved";
  }>;
  crmPayload: {
    dealName: string;
    amount: number;
    stage: string;
    closeDate: string;
    nextStep: string;
    primaryContact: string;
    painPoint: string;
    competitors: string[];
  };
  commitments: Array<{
    id: string;
    owner: "rep" | "prospect";
    promise: string;
    dueDate: string;
    completed: boolean;
  }>;
  telemetry: {
    winProbability: number;
    ghostingRisk: number;
    salesVelocityDays: number;
    qualificationGrade: "A" | "B" | "C" | "D";
  };
}

export const CALL_PRESETS: CallPreset[] = [
  {
    id: "preset-acme-enterprise",
    name: "Acme Data Cloud — $140k ARR Migration Call",
    company: "Acme Cloud Infrastructure Ltd",
    dealValue: "$140,000 ARR",
    callDuration: "34m 12s",
    channelType: "audio",
    stage: "Decision & Procurement Review",
    outcome: "won",
    summary: "High-conviction technical evaluation call where VP of Infrastructure confirmed real-time streaming pipeline superiority over legacy batch solutions and approved moving to contract signature pending standard SOC2 verification.",
    transcriptSnippet: "VP of Infra: If we can benchmark latency below 45 milliseconds across our European nodes, this cuts our Kafka management headcount by half. We have already cleared budget with our CFO for Q2 roll-out. Just send us the verified SOC2 Type II audit report by Thursday and we will sign the order form on Monday.",
    meddpicc: {
      metrics: "Targets 65% latency reduction and saving 240 engineering hours per quarter on pipeline maintenance.",
      economicBuyer: "VP of Infrastructure with delegated $250k single-signature procurement authority.",
      decisionCriteria: "Sub-50ms latency, SOC2 Type II compliance, zero data retention tier for GDPR.",
      decisionProcess: "Security audit sign-off within 5 business days, followed by standard MSA signature.",
      identifyPain: "Current data ingestion pipeline experiences 18-minute lag, causing real-time fraud alerts to misfire.",
      champion: "Enterprise Lead Architect who conducted the successful two-week technical sandbox trial.",
      competition: "Snowflake streaming engine and Databricks Delta Live Tables evaluated but rejected due to high query costs.",
      overallScore: 92,
    },
    winLossDrivers: [
      {
        factor: "Engine Latency Benchmark",
        impact: "positive",
        quote: "Your engine maintained 38ms latency during our peak volume test, beating all competing alternatives.",
        confidence: 0.98,
      },
      {
        factor: "Predictable Usage Pricing",
        impact: "positive",
        quote: "We appreciate knowing our monthly bill does not spike unpredictably compared to compute credits.",
        confidence: 0.94,
      },
      {
        factor: "Executive Buyer Sponsorship",
        impact: "positive",
        quote: "We have already cleared budget with our CFO for Q2 roll-out.",
        confidence: 0.96,
      },
    ],
    competitors: [
      {
        name: "Snowflake",
        mentions: 3,
        context: "Prospect compared streaming query credit burn and found Snowflake 2.4x more costly for continuous ingestion.",
        battlecardTip: "Emphasize fixed per-gigabyte streaming ingestion rather than compute cluster warehouse uptime.",
      },
      {
        name: "Databricks",
        mentions: 2,
        context: "Prospect felt Delta Live Tables required excessive Spark configuration overhead for frontline data engineers.",
        battlecardTip: "Highlight zero-ops automated schema inference without needing PySpark tuning.",
      },
    ],
    objections: [
      {
        objection: "Requires external SOC2 Type II validation before IT infosec clearance.",
        category: "security",
        resolution: "Account executive dispatched active SOC2 Type II portal link with NDA countersign.",
        status: "resolved",
      },
      {
        objection: "Prospect inquired whether multi-region failover incur additional cross-region egress charges.",
        category: "pricing",
        resolution: "Clarified that egress is capped under standard enterprise SLA.",
        status: "resolved",
      },
    ],
    crmPayload: {
      dealName: "Acme Cloud - Enterprise Data Stream 2026",
      amount: 140000,
      stage: "Contract Execution",
      closeDate: "2026-11-24",
      nextStep: "Countersign MSA and schedule technical deployment kickoff.",
      primaryContact: "David Vance (VP Infrastructure)",
      painPoint: "High streaming latency and prohibitive cluster costs with legacy warehouse.",
      competitors: ["Snowflake", "Databricks"],
    },
    commitments: [
      {
        id: "task-1",
        owner: "rep",
        promise: "Deliver final SOC2 Type II compliance dossier and DPA to Infosec team.",
        dueDate: "Thursday 5:00 PM",
        completed: true,
      },
      {
        id: "task-2",
        owner: "prospect",
        promise: "Submit signed order form through legal procurement portal.",
        dueDate: "Monday 10:00 AM",
        completed: false,
      },
    ],
    telemetry: {
      winProbability: 95,
      ghostingRisk: 5,
      salesVelocityDays: 22,
      qualificationGrade: "A",
    },
  },
  {
    id: "preset-finvelo-payments",
    name: "FinVelo Global — $85k Gateway Renewal & Expansion",
    company: "FinVelo International Payments",
    dealValue: "$85,000 ARR",
    callDuration: "28m 45s",
    channelType: "transcript",
    stage: "Discovery & Qualification",
    outcome: "lost",
    summary: "Disqualification call where the buyer revealed their CFO enacted a strict enterprise-wide freeze on new vendor contracts for the remainder of the fiscal year, opting to extend incumbent contract terms.",
    transcriptSnippet: "Head of Engineering: Look, our dev team loved the API documentation and test suite, but our CFO just issued a strict mandate that any new vendor onboarding is frozen until next fiscal year. Our incumbent offered us an eight percent discount to renew for twenty-four months, and our finance director already signed off. We simply cannot switch right now.",
    meddpicc: {
      metrics: "Unquantified upside; cost delta of 12% vs discounted incumbent renewal.",
      economicBuyer: "CFO was never accessed directly; decision delegated down to finance procurement committee.",
      decisionCriteria: "Cost minimization and zero migration downtime strictly prioritized over API developer ergonomics.",
      decisionProcess: "Unilateral CFO budget freeze overriding departmental preferences.",
      identifyPain: "Moderate developer dissatisfaction with incumbent legacy webhook latency, but pain not felt by executive leadership.",
      champion: "Senior Software Engineer advocated internally but lacked political leverage over finance.",
      competition: "Stripe and Adyen entrenched across global banking licenses.",
      overallScore: 41,
    },
    winLossDrivers: [
      {
        factor: "Executive Budget Freeze",
        impact: "negative",
        quote: "Our CFO just issued a strict mandate that any new vendor onboarding is frozen until next fiscal year.",
        confidence: 0.99,
      },
      {
        factor: "Incumbent Multi-Year Lock-In",
        impact: "negative",
        quote: "Our incumbent offered us an eight percent discount to renew for twenty-four months.",
        confidence: 0.95,
      },
      {
        factor: "Lack of Access to Economic Buyer",
        impact: "negative",
        quote: "Our finance director already signed off without reviewing the technical evaluation.",
        confidence: 0.92,
      },
    ],
    competitors: [
      {
        name: "Stripe",
        mentions: 5,
        context: "Incumbent payment provider offered retention discount and waived international conversion fees.",
        battlecardTip: "Dissect hidden FX markup and dispute management fees rather than headline gateway basis points.",
      },
      {
        name: "Adyen",
        mentions: 1,
        context: "Evaluated previously for unified omnichannel POS terminals.",
        battlecardTip: "Focus on frictionless headless integration for pure digital transactions.",
      },
    ],
    objections: [
      {
        objection: "Migration downtime risks during peak seasonal transaction periods.",
        category: "migration",
        resolution: "Account executive proposed dual-routing shadow rollout, but rejected due to internal bandwidth.",
        status: "unresolved",
      },
      {
        objection: "Annual prepayment required whereas incumbent invoices monthly in arrears.",
        category: "pricing",
        resolution: "Flexible quarterly terms offered, but overruled by corporate procurement freeze.",
        status: "unresolved",
      },
    ],
    crmPayload: {
      dealName: "FinVelo - Global Gateway Expansion 2026",
      amount: 85000,
      stage: "Closed Lost",
      closeDate: "2026-11-15",
      nextStep: "Re-engage in Q3 prior to incumbent contract renewal window.",
      primaryContact: "Elena Rostova (Head of Engineering)",
      painPoint: "Vendor consolidation freeze and incumbent retention discount.",
      competitors: ["Stripe"],
    },
    commitments: [
      {
        id: "task-1",
        owner: "rep",
        promise: "Log loss reasons in RevOps database and set reminder for Q3 renewal review.",
        dueDate: "Friday 12:00 PM",
        completed: true,
      },
    ],
    telemetry: {
      winProbability: 8,
      ghostingRisk: 88,
      salesVelocityDays: 45,
      qualificationGrade: "D",
    },
  },
  {
    id: "preset-healthbridge-clinical",
    name: "HealthBridge Network — $210k Workflow Automation",
    company: "HealthBridge Integrated Care",
    dealValue: "$210,000 ARR",
    callDuration: "42m 18s",
    channelType: "notes",
    stage: "Security & Legal Verification",
    outcome: "in_review",
    summary: "High-value healthcare deal progressing through clinical validation with strong physician champion backing, but currently subject to strict HIPAA Business Associate Agreement review and custom SLA negotiations.",
    transcriptSnippet: "Chief Medical Information Officer: The clinical staff feedback has been exceptional; our doctors estimate saving over two hours per shift on administrative charting. However, before our legal board can ratify the agreement, we must verify that all audio processing conforms to our hybrid on-premises encryption model and that your data pipeline includes automatic PHI redaction at the edge.",
    meddpicc: {
      metrics: "Saves 2.5 hours per physician shift, reducing overtime expense by an estimated $420,000 annually.",
      economicBuyer: "Chief Medical Officer and VP of Clinical Operations co-sponsoring the project.",
      decisionCriteria: "100% HIPAA compliance, automated PHI sanitization, seamless EHR integration via FHIR protocols.",
      decisionProcess: "Security audit by outside hospital compliance auditor followed by board subcommittee sign-off.",
      identifyPain: "Severe clinical documentation burnout leading to 14% physician turnover rate.",
      champion: "CMIO (Chief Medical Information Officer) actively championing the solution across hospital departments.",
      competition: "Nuance DAX and Epic App Orchard native add-ons evaluated; rejected due to high rigid per-seat pricing.",
      overallScore: 78,
    },
    winLossDrivers: [
      {
        factor: "Physician Time Savings ROI",
        impact: "positive",
        quote: "Our doctors estimate saving over two hours per shift on administrative charting.",
        confidence: 0.97,
      },
      {
        factor: "Compliance Timeline Friction",
        impact: "neutral",
        quote: "Before our legal board can ratify the agreement, we must verify hybrid on-premises encryption.",
        confidence: 0.91,
      },
      {
        factor: "Executive Champion Engagement",
        impact: "positive",
        quote: "The clinical staff feedback has been exceptional across all pilot departments.",
        confidence: 0.95,
      },
    ],
    competitors: [
      {
        name: "Nuance DAX",
        mentions: 4,
        context: "Hospital currently pays premium annual licenses for specialty departments but seeks enterprise-wide coverage.",
        battlecardTip: "Demonstrate open API flexibility and half the total cost of ownership compared to legacy speech bundles.",
      },
      {
        name: "Epic App Orchard",
        mentions: 2,
        context: "Exploring native Epic integration modules vs standalone Sensifai AI microservices.",
        battlecardTip: "Highlight native FHIR interoperability and customizable specialty templates.",
      },
    ],
    objections: [
      {
        objection: "Requires mandatory Business Associate Agreement with customized liability indemnification caps.",
        category: "security",
        resolution: "Enterprise legal team reviewing standard BAA revisions with hospital general counsel.",
        status: "unresolved",
      },
      {
        objection: "Need assurance that raw voice audio is deleted immediately after structured text generation.",
        category: "security",
        resolution: "Demonstrated zero-retention ephemeral processing pipeline.",
        status: "resolved",
      },
    ],
    crmPayload: {
      dealName: "HealthBridge - Clinical Speech Intelligence 2026",
      amount: 210000,
      stage: "Legal & Security Review",
      closeDate: "2026-12-15",
      nextStep: "Submit redlined Business Associate Agreement and schedule compliance auditor briefing.",
      primaryContact: "Dr. Marcus Chen (CMIO)",
      painPoint: "Physician documentation burnout and excessive overtime costs.",
      competitors: ["Nuance DAX", "Epic App Orchard"],
    },
    commitments: [
      {
        id: "task-1",
        owner: "rep",
        promise: "Deliver HIPAA compliance whitepaper and zero-retention architectural diagram.",
        dueDate: "Tuesday 3:00 PM",
        completed: false,
      },
      {
        id: "task-2",
        owner: "prospect",
        promise: "Provide hospital legal redlines on standard Enterprise BAA.",
        dueDate: "Next Friday 5:00 PM",
        completed: false,
      },
    ],
    telemetry: {
      winProbability: 72,
      ghostingRisk: 18,
      salesVelocityDays: 38,
      qualificationGrade: "B",
    },
  },
];
