# 오늘의 퇴근 운세 🔮

이름을 입력하면 AI 점술가(OpenAI GPT)가 **오늘의 퇴근 시간**을 점쳐 주는 vonvon 스타일 원기능 웹 서비스입니다.

- ⏰ 분 단위로 구체적인 예상 퇴근 시간
- 🌩 퇴근을 늦추는(또는 기적적으로 앞당기는) 황당한 사건
- 🪄 무사 퇴근을 위한 행동 지침
- 🍀 오늘의 행운 아이템
- 🤐 오늘 절대 해서는 안 되는 말
- 💬 점술가의 마지막 한마디

## 기술 스택

- Next.js 15 (App Router) + TypeScript
- OpenAI Chat Completions API (서버 API 라우트에서 호출 — 키가 브라우저에 노출되지 않음)
- 별도 DB 없음, Vercel 서버리스로 동작

## 로컬 실행

```bash
npm install
cp .env.example .env.local   # OPENAI_API_KEY 입력
npm run dev
```

`OPENAI_API_KEY`를 설정하지 않으면 **데모 모드**로 동작합니다 (미리 준비된 운세를 랜덤으로 보여줌).

## 환경 변수

| 변수 | 설명 | 기본값 |
| --- | --- | --- |
| `OPENAI_API_KEY` | OpenAI API 키. 없으면 데모 모드 | (없음) |
| `OPENAI_MODEL` | 사용할 모델 이름 | `gpt-5.5` |

## Vercel 배포 (GitHub 연동)

1. 이 저장소를 GitHub에 push 합니다.
2. [vercel.com/new](https://vercel.com/new)에서 **Import Git Repository**로 이 저장소를 선택합니다. (프레임워크는 Next.js로 자동 인식)
3. **Environment Variables**에 `OPENAI_API_KEY`(필수), `OPENAI_MODEL`(선택)을 추가하고 **Deploy**를 누릅니다.

이후 `main` 브랜치에 push할 때마다 Vercel이 자동으로 재배포합니다.

## 프로젝트 구조

```
app/
  page.tsx              # 메인 UI (이름 입력 → 운세 카드)
  layout.tsx
  globals.css
  api/fortune/route.ts  # POST /api/fortune — OpenAI 호출
lib/
  prompt.ts             # 점술가 시스템 프롬프트
  demo.ts               # 키 없을 때 쓰는 데모 운세
  types.ts
```
