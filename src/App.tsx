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

type EndingKey =
  | "GOOD_1"
  | "GOOD_2"
  | "NEUTRAL"
  | "BITTERSWEET"
  | "BAD_A"
  | "BAD_B"
  | "BAD_C"
  | "BAD_D"
  | "REDEMPTION";

function computeEnding(state: GameState): EndingKey {
  const { V, U, S, M, T } = state.scores;
  const F = state.flags;

  // BAD C — scandal
  if (F.EthicsBreak && U <= 2) return "BAD_C";

  // BAD D — debt spiral (nếu bạn muốn flag vay nóng thì thêm flag DebtSpiral ở data)
  // tạm suy luận: nếu ShadowMoney + V rất thấp + M thấp => nợ/đuối
  if (V <= 1 && M <= 3 && (F.ShadowMoney || F.KhangDealAccepted))
    return "BAD_D";

  // BAD B — thành công bẩn
  if (F.EthicsBreak && V >= 7 && U <= 4) return "BAD_B";

  // BAD A — duy ý chí / burnout
  if (S <= 2) return "BAD_A";
  if (T <= 4) return "BAD_A";

  // REDEMPTION — dừng cuộc chơi đúng lúc (gợi ý: set flag RedemptionStop ở Q25-C)
  // Ở đây mình dùng heuristic: nếu T>=7 & U>=6 & V>=1 & answeredCount=25 & không EthicsBreak
  if (
    !F.EthicsBreak &&
    T >= 7 &&
    U >= 6 &&
    V >= 1 &&
    state.history.some((h) => h.choiceId === "Q25_C")
  )
    return "REDEMPTION";

  // GOOD 2 — deal sạch milestone
  if (
    F.KhangDealAccepted &&
    F.KhangDealType === "MILESTONE" &&
    T >= 8 &&
    U >= 7 &&
    !F.EthicsBreak
  ) {
    return "GOOD_2";
  }

  // GOOD 1 — doanh nghiệp sống, con người sống
  if (T >= 8 && U >= 7 && V >= 4 && S >= 4 && !F.EthicsBreak && F.Pivot)
    return "GOOD_1";

  // BITTERSWEET — cứu gia đình, mất giấc mơ
  if (F.FamilyFirst && T >= 7 && V <= 3) return "BITTERSWEET";

  // NEUTRAL — tồn tại
  if (T >= 5 && T <= 7 && U >= 5 && U <= 7 && V >= 4 && V <= 6 && S >= 3)
    return "NEUTRAL";

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

  const findNextAvailableIndex = (
    fromIndex: number,
    nextIndex: number,
    s: GameState
  ) => {
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
    const nextIdx = findNextAvailableIndex(
      currentSceneIndex,
      proposed,
      nextState
    );

    if (nextIdx < storyScenes.length) {
      setCurrentSceneIndex(nextIdx);
    } else {
      setShowEnding(true);
    }
  };

  const handleChoice = (
    choiceId: string,
    delta: Partial<Scores>,
    flagPatch?: Partial<Flags>,
    note?: string
  ) => {
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
        className="min-h-screen relative overflow-hidden text-slate-50 flex items-center justify-center px-4 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          background:
            "radial-gradient(900px circle at 15% 18%, rgba(124,58,237,0.35), transparent 55%), radial-gradient(700px circle at 82% 22%, rgba(34,211,238,0.22), transparent 55%), radial-gradient(900px circle at 55% 110%, rgba(16,185,129,0.18), transparent 60%), linear-gradient(180deg, #05060f 0%, #070a16 55%, #04040a 100%)",
        }}
      >
        {/* Ambient glow blobs */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-40 bg-violet-600/40" />
        <div className="pointer-events-none absolute -bottom-48 -right-48 h-[620px] w-[620px] rounded-full blur-3xl opacity-30 bg-cyan-500/35" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[780px] w-[780px] rounded-full blur-3xl opacity-15 bg-emerald-400/30" />

        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" />

        <motion.div
          className="relative z-10 w-full max-w-3xl"
          initial={{ y: 22, scale: 0.97, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, type: "spring", bounce: 0.2 }}
        >
          <Card
            className="rounded-3xl shadow-2xl border"
            style={{
              background: "rgba(2, 6, 23, 0.56)",
              borderColor: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(14px)",
            }}
          >
            <CardHeader className="text-center space-y-5 py-8">
              <div className="mx-auto w-fit rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-lg">
                <div
                  className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,1) 0%, rgba(34,211,238,0.95) 55%, rgba(16,185,129,0.85) 100%)",
                  }}
                >
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>

              <CardTitle className="flex flex-col items-center gap-2 text-4xl tracking-tight leading-tight">
                <span className="text-white text-5xl font-semibold tracking-tight">
                  Quiz Game
                </span>
                <span className="bg-gradient-to-r text-5xl font-bold from-violet-200 via-cyan-200 to-emerald-200 bg-clip-text text-white pt-6">
                  Bụi & Vốn
                </span>
              </CardTitle>

              <p className="text-white/80 text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
                Ra quyết định như một founder: tăng trưởng, đạo đức, và hệ quả.
                Mỗi lựa chọn sẽ “trả giá” vào điểm số và dẫn tới kết cục khác
                nhau.
              </p>

              {/* Feature chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
                {[
                  "25 câu – nhiều nhánh",
                  "Kết thúc theo điểm + cờ",
                  "Hiệu ứng cinematic",
                  "Replay nhanh",
                ].map((t) => (
                  <div
                    key={t}
                    className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/80"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-6 pb-8">
              <div
                className="rounded-2xl p-4 border"
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  borderColor: "rgba(255,255,255,0.12)",
                }}
              >
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-cyan-200">Luật chơi:</strong> Chọn
                  phương án → cập nhật <strong>V</strong> (Vốn),{" "}
                  <strong>U</strong> (Uy tín), <strong>S</strong> (Sức khỏe tinh
                  thần), <strong>M</strong> (Quan hệ), <strong>T</strong> (Mức
                  độ thực tế) và <strong>Flags</strong>. Bạn càng “tham”, độ rủi
                  ro càng cao.
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              >
                <Button
                  onClick={() => setGameStarted(true)}
                  className="w-full h-12 text-base font-semibold rounded-2xl shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,1) 0%, rgba(34,211,238,0.95) 60%, rgba(16,185,129,0.85) 100%)",
                    color: "white",
                  }}
                >
                  Bắt đầu chơi
                </Button>
              </motion.div>
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
            <motion.div className="w-full max-w-4xl mx-auto bg-slate-950/55 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-white/80 text-sm font-medium">
                  Scene {currentSceneIndex + 1}/{storyScenes.length} • Đã chọn:{" "}
                  {state.answeredCount}/25
                </div>

                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-400/15 via-cyan-400/15 to-emerald-400/15 border border-white/10">
                  <span className="text-white/90 text-xs font-medium">
                    → {endingTypeLabel}
                  </span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-5 gap-2 text-xs">
                {(
                  [
                    { key: "V", label: "Vốn" },
                    { key: "U", label: "Uy tín" },
                    { key: "S", label: "Sức khỏe tinh thần" },
                    { key: "M", label: "Quan hệ" },
                    { key: "T", label: "Mức độ thực tế" },
                  ] as const
                ).map((it) => (
                  <div
                    key={it.key}
                    className="rounded-xl border border-white/10 bg-white/5 p-2"
                  >
                    <div className="text-white/70">
                      {it.key} • {it.label}
                    </div>
                    <div className="text-white font-semibold">
                      {state.scores[it.key]}/10
                    </div>
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
              <StoryScene
                scene={endingScenesByKey[endingKey]}
                previousChoices={state.history}
              />
            </div>

            <motion.div
              className="absolute inset-0 z-30 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              style={{
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(10px)",
              }}
            >
              <motion.div
                className="max-w-4xl w-full"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
              >
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
                className="gap-2 shadow-xl px-6 py-3 text-white bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500"
                size="lg"
              >
                <RotateCcw className="w-5 h-5" />
                Chơi lại
              </Button>

              <Button
                onClick={resetStory}
                variant="outline"
                className="gap-2 shadow-xl px-6 py-3 bg-white/10 border-white/20 text-white hover:bg-white/15"
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
              }) =>
                handleChoice(
                  payload.choiceId,
                  payload.delta,
                  payload.flags,
                  payload.note
                )
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
