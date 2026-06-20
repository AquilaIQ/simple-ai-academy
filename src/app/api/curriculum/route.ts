import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  bottleneck: z.string().min(3),
  interests: z.array(z.string()).min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("curriculum_interests").insert({
      full_name: parsed.data.fullName,
      email: parsed.data.email,
      bottleneck: parsed.data.bottleneck,
      interests: parsed.data.interests,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save submission" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
