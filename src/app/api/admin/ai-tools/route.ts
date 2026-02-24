import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aiTools } from "@/lib/db/schema";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      name,
      description,
      longDescription,
      websiteUrl,
      category,
      pricing,
      startingPrice,
      imageUrl,
      rating,
      features,
    } = body;

    // Validation
    if (!name || !description || !websiteUrl || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const slug = generateSlug(name);

    await db.insert(aiTools).values({
      name,
      slug,
      description,
      longDescription: longDescription || null,
      websiteUrl,
      category,
      pricing: pricing || null,
      startingPrice: startingPrice || null,
      imageUrl: imageUrl || null,
      rating: rating || null,
      features: features || [],
      isActive: true,
    });

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("Failed to add AI tool:", error);
    return NextResponse.json(
      { error: "Failed to add AI tool", details: String(error) },
      { status: 500 }
    );
  }
}
