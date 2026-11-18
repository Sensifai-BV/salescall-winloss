export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import {
  listApiKeys,
  createNewApiKey,
  revokeApiKey,
} from "@/lib/sensifai/api-keys";
import { getUserIdFromRequest } from "@/lib/sensifai/auth";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, X-API-Key, Content-Type, X-Sensifai-Customer-Id",
    },
  });
}

/**
 * REST API for Application Developer Keys
 * GET    /api/v1/keys - List active/revoked API keys (with masked secrets)
 * POST   /api/v1/keys - Generate a brand-new dedicated application key (Auth Required)
 * DELETE /api/v1/keys - Revoke an existing API key
 *
 * STRICT ZERO LOGTO ID LEAKAGE & MANDATORY AUTHENTICATION:
 * Users must be authenticated to mint API keys tied to their account wallet.
 * Never exposes or returns personal Logto IDs or client secrets.
 */
export async function GET(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        {
          success: true,
          keys: [],
          total: 0,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-store, no-cache, must-revalidate",
          },
        }
      );
    }

    const keys = listApiKeys(userId);
    const sanitized = keys.map((k) => ({
      id: k.id,
      name: k.name,
      maskedKey: k.maskedKey,
      createdAt: k.createdAt,
      lastUsedAt: k.lastUsedAt,
      status: k.status,
    }));

    return NextResponse.json(
      {
        success: true,
        keys: sanitized,
        total: sanitized.length,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Failed to list API keys", message: err.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          code: "UNAUTHORIZED",
          error:
            "Authentication required: You must be signed in with your Sensifai account to generate dedicated application API keys.",
          login_url: "/api/auth/login",
        },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-store, no-cache, must-revalidate",
          },
        }
      );
    }

    const body = await req.json().catch(() => ({}));
    const name = String(body.name || "B2B Production API Key").trim();
    const prefix = String(body.prefix || "sc").trim();

    const newKeyRecord = createNewApiKey(name, prefix, userId);

    return NextResponse.json(
      {
        success: true,
        message:
          "Dedicated API Key created successfully. Store it safely, as full secret is only shown once.",
        apiKey: newKeyRecord.key,
        id: newKeyRecord.id,
        name: newKeyRecord.name,
        createdAt: newKeyRecord.createdAt,
      },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Failed to generate API key", message: err.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          code: "UNAUTHORIZED",
          error: "Authentication required to revoke keys",
        },
        { status: 401, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing required query parameter: id" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const revoked = revokeApiKey(id, userId);
    if (!revoked) {
      return NextResponse.json(
        { success: false, error: "API Key not found or already revoked" },
        { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `API Key ${id} has been permanently revoked.`,
      },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Failed to revoke API key", message: err.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
