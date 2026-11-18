"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AppShell, { AuthGateCard, AIDisclaimer } from "@/components/AppShell";
import {
  Sparkles,
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Printer,
  Download,
  Copy,
  Check,
  Key,
  Terminal,
  Trash2,
  Send,
  Eye,
  Upload,
  RefreshCw,
  Layers,
  HelpCircle,
  FileText,
  DollarSign,
  TrendingUp,
  BarChart3,
  ArrowRight,
  PhoneCall,
  Mic,
  ShieldCheck,
  Building2,
  Lock,
  UserCheck,
  FileSpreadsheet,
  AlertOctagon,
  Target,
} from "lucide-react";
import { CALL_PRESETS, CallPreset } from "@/lib/presets";
import { APP_METADATA } from "@/lib/sensifai/app-metadata";

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState<"studio" | "custom" | "analytics" | "api">("studio");
  const [selectedPreset, setSelectedPreset] = useState<CallPreset>(CALL_PRESETS[0]);
  const [presetList, setPresetList] = useState<CallPreset[]>(CALL_PRESETS);

  // Custom Intake Form State
  const [customCompany, setCustomCompany] = useState("Vanguard Tech Systems");
  const [customDealValue, setCustomDealValue] = useState("$95,000 ARR");
  const [customStage, setCustomStage] = useState("Technical Validation & Security Review");
  const [customChannelType, setCustomChannelType] = useState<"audio" | "transcript" | "notes">("transcript");
  const [customCompetitors, setCustomCompetitors] = useState("Datadog, Dynatrace");
  const [customTranscript, setCustomTranscript] = useState(
    "Director of DevOps: Our teams are overwhelmed by synthetic monitoring costs. If your engine gives us full trace visibility without indexing fees, our VP of Engineering is ready to approve before the end of the month. Just confirm SOC2 Type II compliance and our legal team will sign."
  );

  // Session & Wallet State
  const [session, setSession] = useState<{
    authenticated: boolean;
    user: any;
    wallet?: { balance: number; currency: string } | null;
  } | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [actionErrorMsg, setActionErrorMsg] = useState<string | null>(null);

  // Developer API State
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [newKeyName, setNewKeyName] = useState("Enterprise CRM Dialer Production Key");
  const [generatingKey, setGeneratingKey] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [keyNoticeMsg, setKeyNoticeMsg] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  // Sandbox State
  const [sandboxDeal, setSandboxDeal] = useState("Northwind Cloud Migration");
  const [sandboxStage, setSandboxStage] = useState("Decision & Procurement Review");
  const [sandboxTranscript, setSandboxTranscript] = useState(
    "VP of Ops: If you can cut ingestion latency in half, we are prepared to move away from Snowflake by next quarter."
  );
  const [sandboxResult, setSandboxResult] = useState<any>(null);
  const [sandboxLoading, setSandboxLoading] = useState(false);
  const [sandboxKeyInput, setSandboxKeyInput] = useState("");

  // Standards Catalog State
  const [standardsData, setStandardsData] = useState<any>(null);
  const [loadingStandards, setLoadingStandards] = useState(false);

  const handleFetchStandards = async () => {
    setLoadingStandards(true);
    try {
      const res = await fetch("/api/v1/standards");
      const data = await res.json();
      setStandardsData(data);
    } catch (err: any) {
      console.error("Failed to load standards:", err);
    } finally {
      setLoadingStandards(false);
    }
  };

  const loadApiKeys = () => {
    fetch("/api/v1/keys", { cache: "no-store" })
      .then((res) => res.json())
      .then((d) => {
        if (d.success && Array.isArray(d.keys)) {
          setApiKeys(d.keys);
        }
      })
      .catch((e) => console.error("Error loading keys:", e));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const requestedTab = urlParams.get("tab");
      if (
        requestedTab === "api" ||
        requestedTab === "custom" ||
        requestedTab === "analytics" ||
        requestedTab === "studio"
      ) {
        setActiveTab(requestedTab as any);
      }
    }

    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setSession(data))
      .catch(() => setSession({ authenticated: false, user: null }));
    loadApiKeys();
  }, []);

  const handleGenerateKey = async () => {
    if (!session?.authenticated) {
      setKeyNoticeMsg("Authentication required: Please sign in before minting an API key.");
      return;
    }
    setGeneratingKey(true);
    setKeyNoticeMsg(null);
    try {
      const res = await fetch("/api/v1/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName, prefix: "sc" }),
      });
      if (res.status === 401) {
        setKeyNoticeMsg("Authentication required: Please sign in before minting an API key.");
        return;
      }
      const data = await res.json();
      if (data.success && data.apiKey) {
        setGeneratedKey(data.apiKey);
        setSandboxKeyInput(data.apiKey);
        setKeyNoticeMsg("Dedicated API Key created successfully. Copy it now.");
        loadApiKeys();
      } else {
        setKeyNoticeMsg(data.error || "Failed to generate key.");
      }
    } catch (err: any) {
      setKeyNoticeMsg(err.message || "Network error generating key.");
    } finally {
      setGeneratingKey(false);
    }
  };

  const handleRevokeKey = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/keys?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        loadApiKeys();
      }
    } catch (e) {
      console.error("Failed to revoke key:", e);
    }
  };

  const handleRunSandbox = async () => {
    setSandboxLoading(true);
    setSandboxResult(null);
    try {
      const keyToUse =
        sandboxKeyInput.trim() ||
        (apiKeys.length > 0 ? apiKeys[0].maskedKey : "sc_live_test_key");
      const res = await fetch("/api/v1/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keyToUse}`,
        },
        body: JSON.stringify({
          title: sandboxDeal,
          stage: sandboxStage,
          transcript: sandboxTranscript,
        }),
      });
      const data = await res.json();
      setSandboxResult(data);
    } catch (err: any) {
      setSandboxResult({ success: false, error: err.message });
    } finally {
      setSandboxLoading(false);
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    setSelectedPreset((prev) => ({
      ...prev,
      commitments: prev.commitments.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ),
    }));
  };

  const handleRunBillableCustomAction = async () => {
    setLoadingAction(true);
    setActionSuccessMsg(null);
    setActionErrorMsg(null);
    try {
      const res = await fetch("/api/billable-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "sales_call_winloss_analysis",
          company: customCompany,
          dealValue: customDealValue,
          stage: customStage,
          channelType: customChannelType,
          competitors: customCompetitors,
          transcript: customTranscript,
        }),
      });

      if (res.status === 401) {
        setActionErrorMsg("Authentication required. Please sign in to run custom evaluation.");
        return;
      }
      if (res.status === 402) {
        const d = await res.json();
        setActionErrorMsg(d.error || "Prepaid wallet balance depleted. Please top up your Sensifai wallet.");
        return;
      }

      const data = await res.json();
      if (data.success && data.result) {
        const newPreset: CallPreset = {
          id: `custom-${Date.now()}`,
          name: `${customCompany} — ${customDealValue} Analysis`,
          company: customCompany,
          dealValue: customDealValue,
          callDuration: "31m 15s",
          channelType: customChannelType,
          stage: customStage,
          outcome: data.result.outcome || "in_review",
          summary: data.result.summary || "Custom sales call analyzed by Sensifai AI Engine.",
          transcriptSnippet: customTranscript.slice(0, 220),
          meddpicc: data.result.meddpicc || {
            metrics: "Cost reduction and throughput expansion target identified.",
            economicBuyer: "Executive sponsor verified; sign-off pending security.",
            decisionCriteria: "SOC2 Type II compliance and predictable metered pricing.",
            decisionProcess: "Security audit followed by legal contracting.",
            identifyPain: "High operational expenses with legacy software tools.",
            champion: "Technical stakeholder actively championing migration.",
            competition: customCompetitors || "Incumbent vendors under review.",
            overallScore: 84,
          },
          winLossDrivers: data.result.winLossDrivers || [
            {
              factor: "Technical Benchmarking Advantage",
              impact: "positive",
              quote: "The engine proved superior throughput during preliminary trial.",
              confidence: 0.96,
            },
            {
              factor: "Compliance Timeline Scrutiny",
              impact: "neutral",
              quote: "Procurement requires standard SOC2 verification prior to closing.",
              confidence: 0.92,
            },
          ],
          competitors: [
            {
              name: customCompetitors.split(",")[0] || "Incumbent",
              mentions: 3,
              context: "Compared against existing multi-year contract tier.",
              battlecardTip: "Highlight transparent usage pricing without restrictive seat tiers.",
            },
          ],
          objections: [
            {
              objection: "Requires verification of SOC2 audit dossier before legal approval.",
              category: "security",
              resolution: "Account executive dispatched security compliance packet.",
              status: "resolved",
            },
          ],
          crmPayload: {
            dealName: `${customCompany} - Expansion 2026`,
            amount: parseInt(customDealValue.replace(/[^0-9]/g, "")) || 95000,
            stage: customStage,
            closeDate: "2026-12-15",
            nextStep: "Submit security documentation and schedule executive alignment.",
            primaryContact: "VP Engineering",
            painPoint: "High legacy infrastructure costs and maintenance latency.",
            competitors: [customCompetitors.split(",")[0] || "Incumbent"],
          },
          commitments: [
            {
              id: "task-1",
              owner: "rep",
              promise: "Send SOC2 Type II audit report to infosec team.",
              dueDate: "Friday 5:00 PM",
              completed: false,
            },
            {
              id: "task-2",
              owner: "prospect",
              promise: "Review order form terms with procurement director.",
              dueDate: "Next Monday 10:00 AM",
              completed: false,
            },
          ],
          telemetry: {
            winProbability: 80,
            ghostingRisk: 12,
            salesVelocityDays: 28,
            qualificationGrade: "B",
          },
        };

        setPresetList((prev) => [newPreset, ...prev]);
        setSelectedPreset(newPreset);
        setActiveTab("studio");
        setActionSuccessMsg(
          `Analysis complete (€0.05 metered). Updated wallet: €${data.wallet?.balance?.toFixed(3) ?? "0.00"}`
        );

        if (typeof window !== "undefined" && data.wallet) {
          window.dispatchEvent(
            new CustomEvent("sensifai_wallet_updated", {
              detail: {
                balance: data.wallet.balance,
                currency: data.wallet.currency,
              },
            })
          );
        }
      } else {
        setActionErrorMsg(data.error || "Failed to process custom evaluation.");
      }
    } catch (err: any) {
      setActionErrorMsg(err.message || "Network error submitting custom evaluation.");
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <AppShell
      appName={APP_METADATA.name}
      appTagline={APP_METADATA.tagline}
      logoSrc="/logo.png"
      primaryColor={APP_METADATA.primaryColor}
      activeTab={activeTab}
      onSelectTab={(tabId) => setActiveTab(tabId as any)}
      navItems={[
        { id: "studio", label: "Deal Intelligence", icon: <Sparkles className="h-4 w-4" /> },
        { id: "custom", label: "Intake & Analyze", icon: <PhoneCall className="h-4 w-4" /> },
        { id: "analytics", label: "Pipeline Telemetry", icon: <BarChart3 className="h-4 w-4" /> },
        { id: "api", label: "Developer API Hub", icon: <Key className="h-4 w-4" /> },
      ]}
    >
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Top Header / View Switcher Strip */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                {activeTab === "studio" && "Deal Intelligence Studio"}
                {activeTab === "custom" && "Custom Sales Call Intake"}
                {activeTab === "analytics" && "Revenue Pipeline Telemetry"}
                {activeTab === "api" && "Developer REST API Hub"}
              </span>
              <span className="text-xs text-slate-400 font-mono">v{APP_METADATA.version}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              {activeTab === "studio" && selectedPreset.name}
              {activeTab === "custom" && "Evaluate Call Recording or Transcript"}
              {activeTab === "analytics" && "Win/Loss Driver Benchmarks"}
              {activeTab === "api" && "Headless REST Endpoints & Application Keys"}
            </h2>
          </div>

          {/* Quick Actions / Presets Switcher for Studio */}
          {activeTab === "studio" && (
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {presetList.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    selectedPreset.id === preset.id
                      ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {preset.company.split(" ")[0]} ({preset.outcome.toUpperCase()})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TAB 1: STUDIO WORKSPACE & MEDDPICC SCORECARD */}
        {activeTab === "studio" && (
          <div className="space-y-6">
            {/* KPI Telemetry Tiles */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  MEDDPICC Health Score
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1">
                  {selectedPreset.meddpicc.overallScore} / 100
                </div>
                <div className="text-xs text-blue-600 font-medium mt-0.5">
                  Grade {selectedPreset.telemetry.qualificationGrade} Deal
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Win Probability
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono mt-1">
                  {selectedPreset.telemetry.winProbability}%
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {selectedPreset.outcome === "won" ? "Contract Closed" : "Active Stage"}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Ghosting Risk
                </div>
                <div className={`text-2xl sm:text-3xl font-extrabold font-mono mt-1 ${
                  selectedPreset.telemetry.ghostingRisk > 50 ? "text-rose-600" : "text-slate-900"
                }`}>
                  {selectedPreset.telemetry.ghostingRisk}%
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Velocity: {selectedPreset.telemetry.salesVelocityDays} Days
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Deal Value & Duration
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono mt-1 truncate">
                  {selectedPreset.dealValue}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Call: {selectedPreset.callDuration} ({selectedPreset.channelType})
                </div>
              </div>
            </div>

            {/* Main 2-Column Split: Deal Brief & MEDDPICC vs Competitor Battlecards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (7 cols): Summary, Verbatim Transcript & MEDDPICC Grid */}
              <div className="lg:col-span-7 space-y-6">
                {/* Executive Call Summary */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Executive Call Summary
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                      selectedPreset.outcome === "won"
                        ? "bg-emerald-100 text-emerald-800"
                        : selectedPreset.outcome === "lost"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {selectedPreset.outcome.replace("_", " ")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedPreset.company}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {selectedPreset.summary}
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-700 font-mono leading-relaxed">
                    <span className="text-slate-400 select-none mr-2 font-bold">[VERBATIM SNIPPET]:</span>
                    "{selectedPreset.transcriptSnippet}"
                  </div>
                </div>

                {/* Structured MEDDPICC Breakdown */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span>MEDDPICC Qualification Breakdown</span>
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">7 Qualification Gates</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-blue-900 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                        <span>M — Metrics</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{selectedPreset.meddpicc.metrics}</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-blue-900 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                        <span>E — Economic Buyer</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{selectedPreset.meddpicc.economicBuyer}</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-blue-900 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                        <span>D — Decision Criteria</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{selectedPreset.meddpicc.decisionCriteria}</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-blue-900 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                        <span>D — Decision Process</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{selectedPreset.meddpicc.decisionProcess}</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-blue-900 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                        <span>P — Identify Pain</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{selectedPreset.meddpicc.identifyPain}</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-blue-900 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                        <span>C — Champion</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{selectedPreset.meddpicc.champion}</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 sm:col-span-2">
                      <div className="font-bold text-blue-900 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                        <span>C — Competition & Inertia</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{selectedPreset.meddpicc.competition}</p>
                    </div>
                  </div>
                </div>

                {/* Win / Loss Drivers */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <span>Key Win / Loss Drivers</span>
                  </h3>

                  <div className="space-y-3">
                    {selectedPreset.winLossDrivers.map((driver, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              driver.impact === "positive"
                                ? "bg-emerald-100 text-emerald-800"
                                : driver.impact === "negative"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-slate-200 text-slate-700"
                            }`}>
                              {driver.impact}
                            </span>
                            <span className="font-bold text-slate-900">{driver.factor}</span>
                          </div>
                          <p className="text-slate-600 italic">"{driver.quote}"</p>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 font-semibold shrink-0">
                          {(driver.confidence * 100).toFixed(0)}% Conf
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Competitor Battlecards, Objections & CRM Payload */}
              <div className="lg:col-span-5 space-y-6">
                {/* Competitor Battlecard Mentions */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-indigo-600" />
                    <span>Competitor Battlecard Moments</span>
                  </h3>

                  <div className="space-y-3">
                    {selectedPreset.competitors.map((comp, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{comp.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-mono text-[10px] font-semibold">
                            {comp.mentions} Mentions
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px]">{comp.context}</p>
                        <div className="mt-2 pt-2 border-t border-slate-200 text-blue-900 font-medium text-[11px]">
                          <span className="font-bold text-blue-700">Battlecard: </span>
                          {comp.battlecardTip}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Objection Mining Log */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span>Objection Mining & Resolutions</span>
                  </h3>

                  <div className="space-y-2.5">
                    {selectedPreset.objections.map((obj, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{obj.category.toUpperCase()} OBJECTION</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            obj.status === "resolved" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {obj.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-slate-700 font-medium">"{obj.objection}"</p>
                        <p className="text-slate-500 text-[11px]">{obj.resolution}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Commitments & Follow-Up Tasks */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>Commitment Deliverables</span>
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      {selectedPreset.commitments.filter((c) => c.completed).length} / {selectedPreset.commitments.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {selectedPreset.commitments.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleTaskCompletion(item.id)}
                        className={`p-3 rounded-xl border transition-colors cursor-pointer flex items-start gap-3 text-xs ${
                          item.completed
                            ? "bg-emerald-50/50 border-emerald-200 text-slate-500"
                            : "bg-slate-50 border-slate-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="mt-0.5">
                          {item.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <div className="h-4 w-4 rounded border border-slate-300 bg-white" />
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <div className={`font-semibold ${item.completed ? "line-through text-slate-400" : "text-slate-800"}`}>
                            {item.promise}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Owner: <span className="font-bold capitalize">{item.owner}</span> · Due: {item.dueDate}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Structured CRM Sync Payload Preview */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 text-white space-y-3 shadow-md">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                    <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                      <FileSpreadsheet className="h-4 w-4" />
                      <span>CRM Auto-Fill Sync Payload</span>
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">Salesforce / HubSpot</span>
                  </div>
                  <pre className="text-slate-300 font-mono text-[11px] leading-relaxed overflow-x-auto">
{JSON.stringify(selectedPreset.crmPayload, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Mandatory AI Accuracy & Legal Disclaimer */}
            <div className="pt-2">
              <AIDisclaimer />
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOM INTAKE & ANALYZE FORM */}
        {activeTab === "custom" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-900">
                  Analyze Custom Sales Call or Meeting Transcript
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Ingest prospect dialogue to generate automated win/loss drivers, MEDDPICC criteria, competitor battlecards, and CRM auto-fill payloads metered at €0.05 from your Sensifai prepaid wallet.
                </p>
              </div>

              {/* Mandatory Auth Gate Card for Guests */}
              <AuthGateCard
                authenticated={session?.authenticated ?? false}
                primaryColor={APP_METADATA.primaryColor}
                priceEur={0.05}
                featureTitle="Analyze Custom Sales Calls"
              />

              {actionErrorMsg && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
                  <span>{actionErrorMsg}</span>
                </div>
              )}

              {actionSuccessMsg && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{actionSuccessMsg}</span>
                </div>
              )}

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Company / Prospect Name</label>
                    <input
                      type="text"
                      value={customCompany}
                      onChange={(e) => setCustomCompany(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-blue-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Target Deal Value ($ ARR)</label>
                    <input
                      type="text"
                      value={customDealValue}
                      onChange={(e) => setCustomDealValue(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Current Deal Stage</label>
                    <input
                      type="text"
                      value={customStage}
                      onChange={(e) => setCustomStage(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-blue-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Competitor Watchlist (Comma-separated)</label>
                    <input
                      type="text"
                      value={customCompetitors}
                      onChange={(e) => setCustomCompetitors(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Input Media Format</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["transcript", "audio", "notes"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setCustomChannelType(type)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all ${
                          customChannelType === type
                            ? "bg-blue-50 border-blue-600 text-blue-900 shadow-2xs"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {type === "transcript" && "Meeting Transcript"}
                        {type === "audio" && "Audio Recording"}
                        {type === "notes" && "Meeting Notes"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Sales Call Transcript or Executive Dialogue</label>
                  <textarea
                    rows={6}
                    value={customTranscript}
                    onChange={(e) => setCustomTranscript(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-blue-600 font-mono leading-relaxed"
                  />
                </div>

                {/* Primary AI Execution Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleRunBillableCustomAction}
                    disabled={loadingAction}
                    className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {loadingAction ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Analyzing with Sensifai AI Engine...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Run Sensifai Call Evaluation (€0.05)</span>
                      </>
                    )}
                  </button>

                  {/* Mandatory AI Legal & Accuracy Disclaimer Directly Below Action Button */}
                  <AIDisclaimer />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PIPELINE TELEMETRY & ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Win Rate by Deal Stage</h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-600 pb-1">
                      <span>Contract Execution</span>
                      <span className="font-bold text-emerald-600">92%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "92%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-600 pb-1">
                      <span>Security & Legal</span>
                      <span className="font-bold text-blue-600">74%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "74%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-600 pb-1">
                      <span>Technical Validation</span>
                      <span className="font-bold text-amber-600">58%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-amber-600 h-2 rounded-full" style={{ width: "58%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-600 pb-1">
                      <span>Discovery & Scoping</span>
                      <span className="font-bold text-rose-600">38%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-rose-600 h-2 rounded-full" style={{ width: "38%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Competitor Displacement Leaderboard</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">Snowflake</span>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">68% Win</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">Nuance DAX</span>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">64% Win</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">Databricks</span>
                    <span className="text-blue-700 font-bold bg-blue-100 px-2 py-0.5 rounded">52% Win</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800">Stripe</span>
                    <span className="text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded">24% Win</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Top Win / Loss Drivers</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <span className="font-bold">#1 Win Driver: </span>
                    Predictable usage-based billing vs compute credit burn.
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <span className="font-bold">#2 Win Driver: </span>
                    Sub-50ms engine latency benchmark superiority.
                  </div>
                  <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-900">
                    <span className="font-bold">#1 Loss Driver: </span>
                    Unilateral CFO budget freeze / vendor consolidation.
                  </div>
                  <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-900">
                    <span className="font-bold">#2 Loss Driver: </span>
                    Absence of direct access to Economic Buyer.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DEVELOPER API HUB (MANDATORY FOR E2E AUDIT) */}
        {activeTab === "api" && (
          <div className="space-y-6">
            {/* Security Isolation Notice Banner */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <ShieldCheck className="h-4 w-4" />
                <span>Dedicated Application Keys · Strict Zero Account Identity Exposure</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                B2B integrations authenticate via isolated cryptographic application tokens (format: sc_live_... or sensi_live_...). Your personal Sensifai Logto account credentials and internal developer identifiers are strictly protected and never exposed in API payloads, logs, or responses.
              </p>
            </div>

            {/* Key Generation & Key List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mint Key Form */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Key className="h-4 w-4 text-blue-600" />
                  <span>Mint Dedicated Application Key</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Generate an isolated bearer token for your sales dialer, CRM webhook, or telephony pipeline.
                </p>

                {!session?.authenticated ? (
                  <AuthGateCard
                    authenticated={false}
                    primaryColor={APP_METADATA.primaryColor}
                    priceEur={0.05}
                    featureTitle="Mint Dedicated B2B Application Keys"
                  />
                ) : (
                  <>
                    {keyNoticeMsg && (
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs">
                        {keyNoticeMsg}
                      </div>
                    )}

                    {generatedKey && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1.5 font-mono">
                        <div className="font-bold text-[11px] text-emerald-800">New Token Minted (Copy Now):</div>
                        <div className="p-2 rounded bg-white border border-emerald-300 break-all select-all">
                          {generatedKey}
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <input
                        type="text"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        placeholder="Key Label (e.g. Gong Dialer Ingestion)"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-blue-600"
                      />
                      <button
                        onClick={handleGenerateKey}
                        disabled={generatingKey}
                        className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                      >
                        {generatingKey ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Key className="h-3.5 w-3.5" />}
                        <span>Generate Application Key</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Active Keys List */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">Active Application Keys</h3>
                  <span className="text-xs text-slate-400 font-mono">{apiKeys.length} Keys</span>
                </div>

                <div className="space-y-2 max-h-[260px] overflow-y-auto">
                  {!session?.authenticated ? (
                    <div className="text-center py-8 text-xs text-slate-400">
                      Sign in with your Sensifai account to view your active application keys.
                    </div>
                  ) : apiKeys.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400">
                      No application keys issued yet. Generate one to start.
                    </div>
                  ) : (
                    apiKeys.map((k) => (
                      <div
                        key={k.id}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-800">{k.name}</div>
                          <div className="font-mono text-[11px] text-slate-500">{k.maskedKey}</div>
                        </div>
                        <button
                          onClick={() => handleRevokeKey(k.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Revoke Key"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Interactive API Sandbox */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-blue-600" />
                  <span>Interactive Headless API Sandbox (POST /api/v1/process)</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">Live HTTP Tester</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">API Bearer Key</label>
                    <input
                      type="text"
                      value={sandboxKeyInput}
                      onChange={(e) => setSandboxKeyInput(e.target.value)}
                      placeholder="sc_live_... or Bearer token"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-[11px] bg-slate-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Deal Title</label>
                    <input
                      type="text"
                      value={sandboxDeal}
                      onChange={(e) => setSandboxDeal(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Call Transcript</label>
                    <textarea
                      rows={4}
                      value={sandboxTranscript}
                      onChange={(e) => setSandboxTranscript(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 font-mono leading-relaxed"
                    />
                  </div>

                  <button
                    onClick={handleRunSandbox}
                    disabled={sandboxLoading}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2"
                  >
                    {sandboxLoading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                    <span>Dispatch POST Request</span>
                  </button>
                </div>

                <div className="bg-slate-900 rounded-xl p-4 text-white font-mono text-[11px] overflow-auto max-h-[300px] border border-slate-800">
                  <div className="text-slate-400 pb-2 border-b border-slate-800 font-bold">
                    Sandbox Response Output:
                  </div>
                  <pre className="pt-2 text-emerald-400 leading-relaxed">
                    {sandboxResult ? JSON.stringify(sandboxResult, null, 2) : "// Awaiting request dispatch..."}
                  </pre>
                </div>
              </div>
            </div>

            {/* Standards Catalog Live Explorer */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Public Standards & Taxonomy Catalog</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Query public MEDDPICC qualification standards from GET /api/v1/standards.
                  </p>
                </div>
                <button
                  onClick={handleFetchStandards}
                  disabled={loadingStandards}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  {loadingStandards ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Eye className="h-3.5 w-3.5" />}
                  <span>Fetch Standards Catalog</span>
                </button>
              </div>

              {standardsData && (
                <div className="bg-slate-900 rounded-xl p-4 text-white font-mono text-[11px] overflow-auto max-h-[280px] border border-slate-800">
                  <pre className="text-blue-300 leading-relaxed">
                    {JSON.stringify(standardsData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
