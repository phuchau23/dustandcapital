import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import React from "react";

type Scores = { V: number; U: number; S: number; M: number; T: number };
type Flags = {
  ShadowMoney: boolean;
  TrendChase: boolean;
  TestFirst: boolean;
  EthicsBreak: boolean;
  Pivot: boolean;
  CutQuality: boolean;
  FamilyFirst: boolean;
  KhangDealAccepted: boolean;
  KhangDealType?: "DIRTY" | "MILESTONE";
};

interface Character {
  name: string;
  dialogue: string;
  emotion?: string;
}

interface ChoicePayload {
  choiceId: string;
  delta: Partial<Scores>;
  flags?: Partial<Flags>;
  note?: string;
}

interface Choice {
  id: string;
  label: string;
  delta: Partial<Scores>;
  flags?: Partial<Flags>;
  note?: string;
}

interface Scene {
  id: string;
  title: string;
  text: string;
  bg?: string; // "/bg/xxx.jpg"
  choices?: Choice[];
  isEnding?: boolean;
}

interface StorySceneProps {
  scene: Scene;
  onChoice?: (payload: ChoicePayload) => void;
  previousChoices?: any; // bạn có thể bỏ nếu không dùng
}

function buildCharactersFromScene(scene: Scene): Character[] {
  // Format VN-style visual novel: Narrator nói đoạn scene.text
  // (Nếu muốn thêm Nam/AI sau này thì mở rộng trong data)
  return [
    {
      name: "Narrator",
      dialogue: scene.text,
      emotion: scene.isEnding ? "Kết cục" : "Tường thuật",
    },
  ];
}

export function StoryScene({ scene, onChoice }: StorySceneProps) {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [sceneTransition, setSceneTransition] = useState(false);

  const characters = useMemo(() => buildCharactersFromScene(scene), [scene]);
  const validCharacters = characters.filter((c) => c.dialogue || c.emotion);
  const currentCharacter = validCharacters[currentDialogueIndex];

  // Scene transition effect
  useEffect(() => {
    setSceneTransition(true);
    const timer = setTimeout(() => setSceneTransition(false), 450);
    return () => clearTimeout(timer);
  }, [scene.id]);

  // Reset when scene changes
  useEffect(() => {
    setCurrentDialogueIndex(0);
    setShowChoices(false);
    setDisplayedText("");
  }, [scene.id]);

  // Typing effect
  useEffect(() => {
    if (currentCharacter && currentCharacter.dialogue) {
      setIsTyping(true);
      setDisplayedText("");

      const text = currentCharacter.dialogue;
      let index = 0;

      const getTypingSpeed = (char: string) => {
        if (char === "." || char === "!" || char === "?") return 220;
        if (char === "," || char === ";" || char === "—") return 120;
        if (char === " ") return 15;
        return 18;
      };

      const typeNext = () => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          const currentChar = text[index];
          index++;
          setTimeout(typeNext, getTypingSpeed(currentChar));
        } else {
          setIsTyping(false);
        }
      };

      typeNext();
    }
  }, [currentCharacter]);

  const handleNext = () => {
    if (isTyping) {
      setDisplayedText(currentCharacter?.dialogue || "");
      setIsTyping(false);
      return;
    }

    if (currentDialogueIndex < validCharacters.length - 1) {
      setCurrentDialogueIndex((prev) => prev + 1);
    } else {
      if (scene.choices && scene.choices.length > 0) setShowChoices(true);
      else setShowChoices(false);
    }
  };

  const getCharacterColor = (name: string) => {
    if (name === "Nam") return "text-blue-300";
    if (name === "AI") return "text-purple-300";
    if (name === "Narrator") return "text-yellow-200";
    return "text-white";
  };

  const getDotColor = (name: string) => {
    if (name === "Nam") return "bg-blue-400";
    if (name === "AI") return "bg-purple-400";
    if (name === "Narrator") return "bg-yellow-300";
    return "bg-gray-300";
  };

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {scene.bg && <ImageWithFallback src={scene.bg} alt={scene.title} className="w-full h-full object-cover" />}

        <motion.div
          className={`absolute inset-0 ${
            scene.isEnding
              ? "bg-gradient-to-t from-blue-900/80 via-cyan-900/50 to-teal-900/60"
              : "bg-gradient-to-t from-black/65 via-black/25 to-black/45"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        />
      </motion.div>

      {/* Title */}
      <motion.div
        className="relative z-10 pt-20 px-4 pb-4"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <motion.div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 inline-block border border-white/10">
          <h2 className="text-white text-lg font-medium mb-1">{scene.title}</h2>
          <p className="text-white/75 text-sm">Bụi & Vốn</p>
        </motion.div>
      </motion.div>

      <div className="flex-1" />

      {/* Dialogue box */}
      <motion.div
        className="relative z-10 p-2"
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.35 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            className={`backdrop-blur-md rounded-t-2xl p-4 max-w-4xl mx-auto shadow-2xl ${
              scene.isEnding
                ? "bg-gradient-to-t from-blue-900/95 to-cyan-900/80 border-t-4 border-cyan-400/70"
                : "bg-gradient-to-t from-black/90 to-black/80 border-t-4 border-cyan-400/70"
            }`}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Character */}
            {currentCharacter && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDialogueIndex}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      className={`w-3 h-3 rounded-full ${getDotColor(currentCharacter.name)}`}
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                    <div className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
                      <span className={`font-medium ${getCharacterColor(currentCharacter.name)} text-base`}>
                        {currentCharacter.name}
                      </span>
                    </div>
                    {currentCharacter.emotion && (
                      <Badge variant="outline" className="text-xs bg-white/10 text-white border-white/25">
                        {currentCharacter.emotion}
                      </Badge>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                      <p className="text-white text-base leading-relaxed min-h-[2rem]">
                        “{displayedText}”
                        {isTyping && (
                          <motion.span
                            className="inline-block w-0.5 h-4 bg-white ml-1"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.75, repeat: Infinity }}
                          />
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Next button */}
            {!showChoices && (
              <div className="flex justify-between items-center">
                <div className="text-white/60 text-xs">
                  {currentDialogueIndex + 1} / {validCharacters.length}
                </div>
                <Button
                  onClick={handleNext}
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
                >
                  {currentDialogueIndex < validCharacters.length - 1 ? "Tiếp tục" : "Chọn đáp án"}
                </Button>
              </div>
            )}

            {/* Choices */}
            <AnimatePresence>
              {showChoices && scene.choices && scene.choices.length > 0 && (
                <motion.div
                  className="space-y-3 mt-3"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-white font-medium text-center mb-3 text-lg">🤔 Bạn sẽ chọn gì?</p>

                  <div className="grid gap-3">
                    {scene.choices.map((choice, index) => (
                      <motion.div
                        key={choice.id}
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.35, delay: index * 0.08 }}
                        whileHover={{ scale: 1.02, x: 8 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full bg-white/10 border-white/25 text-white hover:bg-white/15 p-3 h-auto text-left justify-start backdrop-blur-sm"
                          onClick={() =>
                            onChoice?.({
                              choiceId: choice.id,
                              delta: choice.delta,
                              flags: choice.flags,
                              note: choice.note,
                            })
                          }
                        >
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 mt-2 rounded-full bg-white/60" />
                            <div className="text-sm leading-relaxed">{choice.label}</div>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Transition overlay */}
      <AnimatePresence>
        {sceneTransition && (
          <motion.div
            className="absolute inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
