export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, X-API-Key, Content-Type",
    },
  });
}

/**
 * Public REST API: Domain Standards, Qualification Taxonomy & MEDDPICC Evaluation Thresholds
 * GET /api/v1/standards
 *
 * Provides standardized sales qualification criteria, win/loss driver taxonomy, and risk thresholds
 * for headless B2B CRM integrations, sales dialers, and automated RevOps pipelines.
 * 
 * STRICT ZERO LOGTO ID LEAKAGE:
 * Strictly zero personal credentials, Logto user IDs, or auth secrets.
 */
export async function GET() {
  try {
    const apiSpecification = {
      version: "v1",
      service: "SalesCall WinLoss B2B Headless Deal Intelligence API",
      authMethod: "Bearer <token> or X-API-Key: <token>",
      endpoints: {
        processAction: "POST /api/v1/process",
        standardsCatalog: "GET /api/v1/standards",
        developerKeys: "GET /api/v1/keys",
      },
    };

    const standardsTaxonomy = {
      tierA: {
        code: "STRONG_WIN_TRACK",
        label: "Qualified & Champion Engaged",
        thresholdScore: "85 - 100",
        action: "Direct straight-through contract progression and mutual action plan confirmation.",
      },
      tierB: {
        code: "VALIDATION_IN_PROGRESS",
        label: "Advancing with Gaps",
        thresholdScore: "60 - 84",
        action: "Schedule technical POC validation and secure direct access to Economic Buyer.",
      },
      tierC: {
        code: "PIPELINE_RISK",
        label: "Severe Objections & Timeline Delay",
        thresholdScore: "35 - 59",
        action: "Dispatch executive sponsor briefing and counter-objection battlecard collateral.",
      },
      quarantine: {
        code: "DISPLACEMENT_LOSS_HAZARD",
        label: "Competitor Lock-In / Critical Hazard",
        thresholdScore: "0 - 34",
        action: "Flag opportunity in CRM as high attrition hazard, log loss drivers, and freeze forecast.",
      },
    };

    const meddpiccCriteria = {
      M: { name: "Metrics", description: "Quantifiable business impact, ROI, or cost reduction agreed with prospect." },
      E: { name: "Economic Buyer", description: "Veto-power decision maker with budget allocation authority identified." },
      D1: { name: "Decision Criteria", description: "Explicit technical, commercial, and legal requirements documented." },
      D2: { name: "Decision Process", description: "Clear steps, milestones, and timeline from evaluation to contract sign-off." },
      P: { name: "Identify Pain", description: "Compelling operational bottleneck or financial leakage driving urgent need." },
      C1: { name: "Champion", description: "Internal stakeholder with influence, credibility, and personal interest in win." },
      C2: { name: "Competition", description: "Incumbent vendors, alternative contenders, and do-nothing inertia mapped." },
    };

    return NextResponse.json(
      {
        success: true,
        apiSpecification,
        standardsTaxonomy,
        meddpiccCriteria,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve standards catalog",
        message: err.message,
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
