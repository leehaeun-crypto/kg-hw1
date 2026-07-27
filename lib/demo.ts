import type { Fortune } from "./types";

// OPENAI_API_KEY가 없을 때 사용하는 데모 운세 생성기
// 배포 전 로컬 확인용 — 실제 서비스에서는 GPT가 생성한다

const scenarios: Array<Omit<Fortune, "name">> = [
  {
    leaveTime: "오후 6시 47분",
    obstacle:
      "퇴근 3분 전, 메신저에 '이것만 잠깐 확인해 주세요'가 도착합니다. '잠깐'의 사전적 의미가 42분으로 재정의되는 날입니다.",
    escapeSpell:
      "오후 5시 반부터 자리에서 바쁜 사람의 아우라를 뿜으세요. 타자 소리를 평소보다 20% 크게 내는 것이 핵심입니다.",
    luckyItem: "이미 어깨에 메어 둔 가방",
    forbiddenPhrase: "네, 지금 바로 볼게요!",
    fortuneMessage: "오늘의 '잠깐'은 잠깐이 아닙니다. 운명은 답장 속도를 시험하고 있습니다.",
  },
  {
    leaveTime: "오후 3시 42분",
    obstacle:
      "사무실 정수기 교체 공사로 부서 전체가 조기 퇴근하게 됩니다. 당신은 오늘 아무것도 하지 않았는데 운명이 알아서 문을 열어줍니다.",
    escapeSpell:
      "공지 메일이 오면 3초 안에 컴퓨터를 끄세요. 망설이는 자에게는 '가시기 전에 하나만…'이 따라붙습니다.",
    luckyItem: "어제 미리 챙겨 둔 텀블러",
    forbiddenPhrase: "저는 남아서 마저 하고 갈게요.",
    fortuneMessage: "일생에 몇 번 없는 조기 퇴근의 기운입니다. 뒤돌아보지 마세요.",
  },
  {
    leaveTime: "오후 11시 58분",
    obstacle:
      "퇴근 직전 컴퓨터가 '업데이트 후 다시 시작(1/37)'을 선언합니다. 진행률 84%에서 3시간을 머무는 기적을 목격하게 됩니다.",
    escapeSpell:
      "오후 4시에 반드시 저장하고 재부팅 여부를 확인하세요. 오늘 운명의 갈림길은 전원 버튼 앞에 있습니다.",
    luckyItem: "보조 배터리 (충전율 100%)",
    forbiddenPhrase: "금방 끝나겠지.",
    fortuneMessage: "오늘 밤, 사무실의 마지막 불빛은 당신의 모니터일 수 있습니다. 미리 움직이세요.",
  },
  {
    leaveTime: "오후 7시 13분",
    obstacle:
      "퇴근길에 나선 순간 하늘이 열리며 비가 쏟아집니다. 우산은 분명히 챙겼다고 믿었지만, 그것은 지난주의 당신이었습니다.",
    escapeSpell:
      "오후 2시에 창밖을 한 번 보고, 3시에 우산의 실존 여부를 눈으로 직접 확인하세요.",
    luckyItem: "책상 서랍 속 접이식 우산",
    forbiddenPhrase: "설마 오겠어?",
    fortuneMessage: "오늘 하늘은 일기예보보다 당신의 방심을 먼저 읽습니다.",
  },
  {
    leaveTime: "오후 6시 09분",
    obstacle:
      "칼퇴에 성공하지만 지하철을 반대 방향으로 타게 됩니다. 세 정거장을 지나서야 창밖 풍경이 낯설다는 사실을 깨닫습니다.",
    escapeSpell:
      "플랫폼에서 탑승 전 행선지를 소리 내지 말고 마음속으로 두 번 읽으세요. 오늘은 확인이 곧 속도입니다.",
    luckyItem: "잔액이 넉넉한 교통카드",
    forbiddenPhrase: "이 길은 눈 감고도 가지.",
    fortuneMessage: "오늘 당신의 몸은 회사를 떠나지만, 정신은 아직 회의실에 있습니다. 데리고 나오세요.",
  },
  {
    leaveTime: "오후 8시 21분",
    obstacle:
      "퇴근 준비를 끝내고 일어서는 순간 팀 단체 대화방에 '다들 저녁 어때요?'가 올라옵니다. 읽음 표시가 이미 찍혀 버렸습니다.",
    escapeSpell:
      "오후 6시 이후에는 단체 대화방을 열지 마세요. 알림 미리보기까지만 보는 것이 오늘의 생존 기술입니다.",
    luckyItem: "무음 모드로 전환된 휴대폰",
    forbiddenPhrase: "오늘 별일 없어요.",
    fortuneMessage: "오늘의 적은 업무가 아니라 읽음 표시입니다. 엄지손가락을 조심하세요.",
  },
];

export function generateDemoFortune(name: string): Fortune {
  const pick = scenarios[Math.floor(Math.random() * scenarios.length)];
  return { name, ...pick };
}
