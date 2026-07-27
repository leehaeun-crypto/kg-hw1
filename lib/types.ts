export interface Fortune {
  name: string;
  leaveTime: string;
  obstacle: string;
  escapeSpell: string;
  luckyItem: string;
  forbiddenPhrase: string;
  fortuneMessage: string;
}

export interface FortuneResponse extends Fortune {
  source: "gpt" | "demo";
}
