import { NextResponse } from "next/server";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompt";
import { generateDemoFortune } from "@/lib/demo";
import type { Fortune, FortuneResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

function isValidFortune(value: unknown): value is Fortune {
  if (typeof value !== "object" || value === null) return false;
  const keys: Array<keyof Fortune> = [
    "name",
    "leaveTime",
    "obstacle",
    "escapeSpell",
    "luckyItem",
    "forbiddenPhrase",
    "fortuneMessage",
  ];
  return keys.every(
    (k) => typeof (value as Record<string, unknown>)[k] === "string",
  );
}

export async function POST(request: Request) {
  let name: string;
  try {
    const body = await request.json();
    name = String(body?.name ?? "").trim();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (!name || name.length > 20) {
    return NextResponse.json(
      { error: "이름은 1~20자로 입력해 주세요." },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;

  // 키가 없으면 데모 운세로 동작 (로컬 미리보기용)
  if (!apiKey) {
    const demo: FortuneResponse = { ...generateDemoFortune(name), source: "demo" };
    return NextResponse.json(demo);
  }

  try {
    const res = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-5.5",
        messages: [
          { role: "system", content: buildSystemPrompt() },
          { role: "user", content: buildUserPrompt(name) },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("OpenAI API error:", res.status, detail);
      return NextResponse.json(
        { error: "점술가가 잠시 자리를 비웠습니다. 잠시 후 다시 시도해 주세요." },
        { status: 502 },
      );
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    const parsed: unknown = JSON.parse(content);

    if (!isValidFortune(parsed)) {
      throw new Error("모델 응답이 운세 형식과 다릅니다.");
    }

    const fortune: FortuneResponse = { ...parsed, name, source: "gpt" };
    return NextResponse.json(fortune);
  } catch (err) {
    console.error("Fortune generation failed:", err);
    return NextResponse.json(
      { error: "수정 구슬에 안개가 꼈습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
