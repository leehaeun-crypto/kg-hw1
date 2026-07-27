import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오늘의 퇴근 운세 🔮",
  description: "이름을 넣으면 AI 점술가가 오늘의 퇴근 시간을 점쳐 드립니다.",
  openGraph: {
    title: "오늘의 퇴근 운세 🔮",
    description: "당신은 오늘 몇 시에 퇴근할 운명인가?",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
