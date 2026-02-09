import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db/supabase";
import {
  isValidProgram,
  PROGRAMS,
  getAccountTypes,
  getDiscriminator,
} from "@/lib/config";
import { apiErrorResponse } from "@/lib/utils/validation";

/**
 * GET /api/account-counts?program=marginfi
 *
 * Returns the count of accounts for each account type (discriminator) in a program.
 * Used for sidebar filtering to hide account types with 0 indexed accounts.
 *
 * Uses efficient COUNT queries with head:true to avoid fetching actual rows.
 */
export async function GET(req: NextRequest) {
  try {
    const program = req.nextUrl.searchParams.get("program");

    if (!program || !isValidProgram(program)) {
      return NextResponse.json(
        { error: "Invalid program", code: "invalid_program" },
        { status: 400 }
      );
    }

    const programAddress = PROGRAMS[program].programId;
    const accountTypes = getAccountTypes(program);

    // Query count for each account type in parallel
    // Uses head:true for efficient counting without fetching rows
    const countPromises = accountTypes.map(async (type) => {
      const discriminator = getDiscriminator(program, type);
      if (!discriminator) {
        return { type, count: 0 };
      }

      const { count, error } = await supabase
        .from("account_state")
        .select("*", { count: "exact", head: true })
        .eq("program_id", programAddress)
        .eq("discriminator", discriminator.toString("hex"));

      if (error) {
        console.error(`Error counting ${type}:`, error);
        return { type, count: 0 };
      }

      return { type, count: count ?? 0 };
    });

    const results = await Promise.all(countPromises);

    // Build counts object
    const counts: Record<string, number> = {};
    for (const { type, count } of results) {
      counts[type] = count;
    }

    return NextResponse.json({ counts });
  } catch (e: unknown) {
    return apiErrorResponse("Account counts GET error", e);
  }
}
