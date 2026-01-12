import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, RotateCcw, Home } from "lucide-react";

import { StoryScene } from "./components/StoryScene";
import { EndingSummary } from "./components/EndingSummary";
import { EndingEffects } from "./components/EndingEffects";
import { storyScenes, endingScenesByKey } from "./data/storyScenes";

import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

type Scores = { V: number; U: number; S: number; M: number; T: number };

type Flags = {
  ShadowMoney: boolean; // F1
  TrendChase: boolean; // F2
  TestFirst: boolean; // F3
  EthicsBreak: boolean; // F4
  Pivot: boolean; // F5
  CutQuality: boolean; // F6
  FamilyFirst: boolean; // F7
  KhangDealAccepted: boolean; // F8
  KhangDealType?: "DIRTY" | "MILESTONE"; // để phân biệt Q19-A vs Q19-C
};

export type GameState = {
  scores: Scores;
  flags: Flags;
  answeredCount: number;
  history: Array<{
    sceneId: string;
    choiceId: string;
    delta: Partial<Scores>;
    note?: string;
  }>;
};

const clamp01to10 = (n: number) => Math.max(0, Math.min(10, n));

const applyDelta = (scores: Scores, delta: Partial<Scores>): Scores => ({
  V: clamp01to10(scores.V + (delta.V ?? 0)),
  U: clamp01to10(scores.U + (delta.U ?? 0)),
  S: clamp01to10(scores.S + (delta.S ?? 0)),
  M: clamp01to10(scores.M + (delta.M ?? 0)),
  T: clamp01to10(scores.T + (delta.T ?? 0)),
});

type EndingKey = "GOOD_1" | "GOOD_2" | "NEUTRAL" | "BITTERSWEET" | "BAD_A" | "BAD_B" | "BAD_C" | "BAD_D" | "REDEMPTION";

function computeEnding(state: GameState): EndingKey {
  const { V, U, S, M, T } = state.scores;
  const F = state.flags;

  // BAD C — scandal
  if (F.EthicsBreak && U <= 2) return "BAD_C";

  // BAD D — debt spiral (nếu bạn muốn flag vay nóng thì thêm flag DebtSpiral ở data)
  // tạm suy luận: nếu ShadowMoney + V rất thấp + M thấp => nợ/đuối
  if (V <= 1 && M <= 3 && (F.ShadowMoney || F.KhangDealAccepted)) return "BAD_D";

  // BAD B — thành công bẩn
  if (F.EthicsBreak && V >= 7 && U <= 4) return "BAD_B";

  // BAD A — duy ý chí / burnout
  if (S <= 2) return "BAD_A";
  if (T <= 4) return "BAD_A";

  // REDEMPTION — dừng cuộc chơi đúng lúc (gợi ý: set flag RedemptionStop ở Q25-C)
  // Ở đây mình dùng heuristic: nếu T>=7 & U>=6 & V>=1 & answeredCount=25 & không EthicsBreak
  if (!F.EthicsBreak && T >= 7 && U >= 6 && V >= 1 && state.history.some((h) => h.choiceId === "Q25_C"))
    return "REDEMPTION";

  // GOOD 2 — deal sạch milestone
  if (F.KhangDealAccepted && F.KhangDealType === "MILESTONE" && T >= 8 && U >= 7 && !F.EthicsBreak) {
    return "GOOD_2";
  }

  // GOOD 1 — doanh nghiệp sống, con người sống
  if (T >= 8 && U >= 7 && V >= 4 && S >= 4 && !F.EthicsBreak && F.Pivot) return "GOOD_1";

  // BITTERSWEET — cứu gia đình, mất giấc mơ
  if (F.FamilyFirst && T >= 7 && V <= 3) return "BITTERSWEET";

  // NEUTRAL — tồn tại
  if (T >= 5 && T <= 7 && U >= 5 && U <= 7 && V >= 4 && V <= 6 && S >= 3) return "NEUTRAL";

  // fallback
  return "NEUTRAL";
}

function getEndingTypeName(key: EndingKey) {
  switch (key) {
    case "GOOD_1":
      return "Doanh nghiệp sống, con người sống";
    case "GOOD_2":
      return "Deal sạch – lớn lên trong kỷ luật";
    case "NEUTRAL":
      return "Tồn tại, nhưng không bứt phá";
    case "BITTERSWEET":
      return "Cứu gia đình, mất giấc mơ";
    case "BAD_A":
      return "Duy ý chí: cố gắng sai cách";
    case "BAD_B":
      return "Thành công bẩn (ngắn hạn)";
    case "BAD_C":
      return "Scandal sập tiệm";
    case "BAD_D":
      return "Nợ & vòng xoáy tiền nóng";
    case "REDEMPTION":
      return "Thua ván này, thắng ván sau";
  }
}

export default function App() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [showEnding, setShowEnding] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const [state, setState] = useState<GameState>({
    scores: { V: 5, U: 5, S: 5, M: 5, T: 5 },
    flags: {
      ShadowMoney: false,
      TrendChase: false,
      TestFirst: false,
      EthicsBreak: false,
      Pivot: false,
      CutQuality: false,
      FamilyFirst: false,
      KhangDealAccepted: false,
      KhangDealType: undefined,
    },
    answeredCount: 0,
    history: [],
  });

  const endingKey = useMemo(() => computeEnding(state), [state]);
  const endingTypeLabel = getEndingTypeName(endingKey);

  const findNextAvailableIndex = (fromIndex: number, nextIndex: number, s: GameState) => {
    let i = nextIndex;
    while (i < storyScenes.length) {
      const scene = storyScenes[i];
      if (!scene.isAvailable) return i;
      if (scene.isAvailable(s)) return i;
      i += 1; // skip scene not available
    }
    return storyScenes.length; // end
  };

  const nextScene = (nextState: GameState) => {
    const proposed = currentSceneIndex + 1;
    const nextIdx = findNextAvailableIndex(currentSceneIndex, proposed, nextState);

    if (nextIdx < storyScenes.length) {
      setCurrentSceneIndex(nextIdx);
    } else {
      setShowEnding(true);
    }
  };

  const handleChoice = (choiceId: string, delta: Partial<Scores>, flagPatch?: Partial<Flags>, note?: string) => {
    setState((prev) => {
      const mergedFlags: Flags = { ...prev.flags, ...(flagPatch ?? {}) };
      const newScores = applyDelta(prev.scores, delta);

      const nextState: GameState = {
        ...prev,
        scores: newScores,
        flags: mergedFlags,
        answeredCount: prev.answeredCount + 1,
        history: [
          ...prev.history,
          {
            sceneId: storyScenes[currentSceneIndex].id,
            choiceId,
            delta,
            note,
          },
        ],
      };

      // move after state computed
      queueMicrotask(() => nextScene(nextState));
      return nextState;
    });
  };

  const resetStory = () => {
    setCurrentSceneIndex(0);
    setShowEnding(false);
    setGameStarted(false);
    setState({
      scores: { V: 5, U: 5, S: 5, M: 5, T: 5 },
      flags: {
        ShadowMoney: false,
        TrendChase: false,
        TestFirst: false,
        EthicsBreak: false,
        Pivot: false,
        CutQuality: false,
        FamilyFirst: false,
        KhangDealAccepted: false,
        KhangDealType: undefined,
      },
      answeredCount: 0,
      history: [],
    });
  };

  const startNewGame = () => {
    setCurrentSceneIndex(0);
    setShowEnding(false);
    setGameStarted(true);
    setState({
      scores: { V: 5, U: 5, S: 5, M: 5, T: 5 },
      flags: {
        ShadowMoney: false,
        TrendChase: false,
        TestFirst: false,
        EthicsBreak: false,
        Pivot: false,
        CutQuality: false,
        FamilyFirst: false,
        KhangDealAccepted: false,
        KhangDealType: undefined,
      },
      answeredCount: 0,
      history: [],
    });
  };

  if (!gameStarted) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <motion.div
                className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                <BookOpen className="w-10 h-10 text-white" />
              </motion.div>

              <CardTitle className="text-3xl bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Bụi & Vốn 💸
              </CardTitle>

              <motion.p className="text-gray-600 text-lg">
                Khởi nghiệp – đầu tư – đạo đức – hệ quả: bạn tạo ra giá trị, hay bị chính lựa chọn nuốt chửng?
              </motion.p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong className="text-blue-600">🎮 Cơ chế:</strong> Mỗi lựa chọn ảnh hưởng 5 chỉ số{" "}
                  <strong>V/U/S/M/T</strong> và <strong>Flags</strong>. Kết cục phụ thuộc vào tổ hợp điểm + cờ.
                </p>
              </div>

              <Button
                onClick={() => setGameStarted(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
                size="lg"
              >
                ✨ Bắt đầu câu chuyện ✨
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  const currentScene = storyScenes[currentSceneIndex];

  return (
    <div className="h-screen overflow-hidden">
      <AnimatePresence>
        {!showEnding && (
          <motion.div
            className="absolute top-4 left-4 right-4 z-20"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="bg-white/85 backdrop-blur-md rounded-lg p-4 max-w-3xl border border-blue-200 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-gray-800 text-sm font-medium">
                  Scene {currentSceneIndex + 1}/{storyScenes.length} • Đã chọn: {state.answeredCount}/25
                </div>

                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-300">
                  <span className="text-blue-800 text-xs font-medium">→ {endingTypeLabel}</span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-5 gap-2 text-xs">
                {(["V", "U", "S", "M", "T"] as const).map((k) => (
                  <div key={k} className="rounded-md border border-blue-100 bg-white/70 p-2">
                    <div className="text-gray-500">{k}</div>
                    <div className="text-gray-900 font-semibold">{state.scores[k]}/10</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        {showEnding ? (
          <motion.div
            className="h-screen flex flex-col relative"
            key="ending"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <EndingEffects endingType={endingTypeLabel} />

            <div className="relative z-10 flex-1">
              <StoryScene scene={endingScenesByKey[endingKey]} previousChoices={state.history} />
            </div>

            <motion.div
              className="absolute inset-0 z-30 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)" }}
            >
              <motion.div className="max-w-4xl w-full" initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }}>
                <EndingSummary
                  scores={state.scores}
                  flags={state.flags}
                  endingKey={endingKey}
                  endingTitle={endingScenesByKey[endingKey].title}
                />
              </motion.div>
            </motion.div>

            <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-4">
              <Button
                onClick={startNewGame}
                className="gap-2 shadow-xl px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-cyan-500"
                size="lg"
              >
                <RotateCcw className="w-5 h-5" />
                Chơi lại
              </Button>

              <Button
                onClick={resetStory}
                variant="outline"
                className="gap-2 shadow-xl px-6 py-3 bg-white/20 border-white/40 text-white hover:bg-white/30"
                size="lg"
              >
                <Home className="w-5 h-5" />
                Trang chủ
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key={currentSceneIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <StoryScene
              scene={currentScene}
              previousChoices={state.history}
              onChoice={(payload: {
                choiceId: string;
                delta: Partial<Scores>;
                flags?: Partial<Flags>;
                note?: string;
              }) => handleChoice(payload.choiceId, payload.delta, payload.flags, payload.note)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
