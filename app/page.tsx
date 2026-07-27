"use client";

import { useEffect, useRef, useState } from "react";
import type { FortuneResponse } from "@/lib/types";

const LOADING_MESSAGES = [
  "수정 구슬을 닦는 중...",
  "사주에서 야근의 기운을 감지하는 중...",
  "엘리베이터의 운행 운세를 확인하는 중...",
  "회의실 예약 현황을 천기누설하는 중...",
  "퇴근 요정과 협상하는 중...",
];

export default function Home() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [fortune, setFortune] = useState<FortuneResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (loading) {
      let i = 0;
      timerRef.current = setInterval(() => {
        i = (i + 1) % LOADING_MESSAGES.length;
        setLoadingMsg(LOADING_MESSAGES[i]);
      }, 1600);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loading]);

  async function tellFortune(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError(null);
    setFortune(null);
    setCopied(false);

    try {
      const res = await fetch("/api/fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "알 수 없는 오류가 발생했습니다.");
        return;
      }
      setFortune(data as FortuneResponse);
    } catch {
      setError("점술가와의 연결이 끊어졌습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    if (!fortune) return;
    const text = [
      `🔮 ${fortune.name} 님의 오늘의 퇴근 운세`,
      ``,
      `⏰ 예상 퇴근 시간: ${fortune.leaveTime}`,
      `🌩 오늘의 사건: ${fortune.obstacle}`,
      `🪄 무사 퇴근 비법: ${fortune.escapeSpell}`,
      `🍀 행운 아이템: ${fortune.luckyItem}`,
      `🤐 금지된 말: "${fortune.forbiddenPhrase}"`,
      `💬 점술가의 한마디: ${fortune.fortuneMessage}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 권한이 없으면 조용히 무시
    }
  }

  return (
    <main className="container">
      <div className="crystal">🔮</div>
      <div>
        <h1>오늘의 퇴근 운세</h1>
        <p className="subtitle">
          이름을 넣으면 AI 점술가가 오늘의 퇴근 시간을 점쳐 드립니다
        </p>
      </div>

      <form className="form" onSubmit={tellFortune}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요 (본인 또는 동료)"
          maxLength={20}
          aria-label="이름"
        />
        <button type="submit" disabled={loading || !name.trim()}>
          {loading ? "점치는 중..." : "운세 보기"}
        </button>
      </form>

      {loading && <p className="loading">{loadingMsg}</p>}
      {error && <p className="error">{error}</p>}

      {fortune && (
        <>
          <div className="card">
            <div className="card-header">
              <span className="who">{fortune.name} 님의 예상 퇴근 시간</span>
              <span className="time">{fortune.leaveTime}</span>
            </div>

            <hr className="divider" />

            <div className="section">
              <div className="label">🌩 오늘의 사건</div>
              <div className="value">{fortune.obstacle}</div>
            </div>

            <div className="section">
              <div className="label">🪄 무사히 퇴근하기 위한 행동</div>
              <div className="value">{fortune.escapeSpell}</div>
            </div>

            <div className="section">
              <div className="label">🍀 오늘의 행운 아이템</div>
              <div className="value">{fortune.luckyItem}</div>
            </div>

            <div className="section">
              <div className="label">🤐 오늘 절대 해서는 안 되는 말</div>
              <div className="quote">&ldquo;{fortune.forbiddenPhrase}&rdquo;</div>
            </div>

            <hr className="divider" />

            <p className="final">{fortune.fortuneMessage}</p>
          </div>

          {fortune.source === "demo" && (
            <p className="demo-badge">
              ※ 데모 모드 (OPENAI_API_KEY를 설정하면 GPT가 매번 새 운세를
              써 드립니다)
            </p>
          )}

          <div className="actions">
            <button onClick={copyResult}>
              {copied ? "복사 완료! ✅" : "결과 복사하기 📋"}
            </button>
            <button onClick={() => tellFortune()}>다시 점치기 🔄</button>
          </div>
        </>
      )}

      <p className="footer">
        본 운세는 재미로 보는 콘텐츠이며, 실제 퇴근 시간과 무관합니다. 아마도요.
      </p>
    </main>
  );
}
