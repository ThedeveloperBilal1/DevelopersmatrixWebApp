import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

export const openai = apiKey 
  ? new OpenAI({ apiKey })
  : null;

export async function summarizeWithAI(title: string, content: string): Promise<{ excerpt: string; summary?: string }> {
  if (!openai) {
    // Fallback: use first 200 chars as excerpt
    return { excerpt: content.substring(0, 200).trim() + "..." };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a tech news summarizer. Create a concise 2-3 sentence excerpt and a brief summary. Return JSON with 'excerpt' and 'summary' fields.",
        },
        {
          role: "user",
          content: `Title: ${title}\n\nContent: ${content.substring(0, 3000)}`,
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 300,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      excerpt: result.excerpt || content.substring(0, 200).trim() + "...",
      summary: result.summary,
    };
  } catch (error) {
    console.error("AI summarization failed:", error);
    return { excerpt: content.substring(0, 200).trim() + "..." };
  }
}
