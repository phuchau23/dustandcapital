import { useState } from "react";
import { StoryScene } from "./components/StoryScene";
import { ProgressBar } from "./components/ProgressBar";
import { EndingSummary } from "./components/EndingSummary";
import { EndingEffects } from "./components/EndingEffects";
import { storyScenes, endingScenes } from "./data/storyData";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { BookOpen, RotateCcw, Home } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [choicePercentages, setChoicePercentages] = useState<number[]>([]);
  const [showEnding, setShowEnding] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const currentPercentage = choicePercentages.length > 0 
    ? choicePercentages.reduce((sum, val) => sum + val, 0) / choicePercentages.length 
    : 50;

  const handleChoice = (value: number) => {
    setChoicePercentages(prev => [...prev, value]);
    nextScene();
  };

  const nextScene = () => {
    if (currentSceneIndex < storyScenes.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
    } else {
      setShowEnding(true);
    }
  };

  const getEndingScene = () => {
    if (currentPercentage <= 25) return endingScenes[0];
    if (currentPercentage <= 50) return endingScenes[1];
    if (currentPercentage <= 75) return endingScenes[2];
    return endingScenes[3];
  };

  const resetStory = () => {
    setCurrentSceneIndex(0);
    setChoicePercentages([]);
    setShowEnding(false);
    setGameStarted(false);
  };

  const startNewGame = () => {
    setCurrentSceneIndex(0);
    setChoicePercentages([]);
    setShowEnding(false);
    setGameStarted(true);
  };

  const getEndingTypeName = (percentage: number) => {
    if (percentage <= 25) return "Khép kín";
    if (percentage <= 50) return "Ảo tưởng sụp đổ";
    if (percentage <= 75) return "Hạt mầm nhỏ";
    return "Cộng đồng thật sự";
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
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <BookOpen className="w-10 h-10 text-white" />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <CardTitle className="text-3xl bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Nhật ký trực tuyến 📖
                </CardTitle>
              </motion.div>
              <motion.p 
                className="text-gray-600 text-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Một câu chuyện tương tác về hành trình tìm kiếm bản thân của Nam qua việc viết nhật ký và khám phá thế giới trực tuyến.
              </motion.p>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div 
                className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <p className="text-sm text-gray-700">
                  <strong className="text-blue-600">🎮 Hướng dẫn:</strong> Trong câu chuyện này, bạn sẽ đưa ra các lựa chọn để định hình hành trình của nhân vật Nam. 
                  Với <strong>10 quyết định quan trọng</strong> và <strong>16 scene</strong> đầy cảm xúc, mỗi lựa chọn sẽ ảnh hưởng đến kết thúc của câu chuyện!
                </p>
              </motion.div>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={() => setGameStarted(true)} 
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
                  size="lg"
                >
                  ✨ Bắt đầu câu chuyện ✨
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="h-screen overflow-hidden">
      {/* Enhanced Progress Indicator */}
      <AnimatePresence>
        {!showEnding && (
          <motion.div 
            className="absolute top-4 left-4 right-4 z-20"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-md rounded-lg p-4 flex justify-between items-center max-w-lg border border-blue-200 shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-gray-800 text-sm font-medium">
                  Scene {currentSceneIndex + 1}/{storyScenes.length}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                {choicePercentages.length > 0 && (
                  <>
                    <div className="text-gray-700 text-sm">
                      Lựa chọn: {choicePercentages.length}/10
                    </div>
                    <motion.div
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-300"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.4 }}
                    >
                      <span className="text-blue-800 text-xs font-medium">
                        → {getEndingTypeName(currentPercentage)}
                      </span>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
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
            {/* Enhanced Ending Background */}
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: getEndingTypeName(currentPercentage) === "Cộng đồng thật sự" ? [
                    "linear-gradient(45deg, #3b82f6, #06b6d4, #0891b2)",
                    "linear-gradient(135deg, #60a5fa, #67e8f9, #22d3ee)",
                    "linear-gradient(225deg, #1d4ed8, #0e7490, #0369a1)",
                    "linear-gradient(315deg, #3b82f6, #06b6d4, #0891b2)",
                  ] : getEndingTypeName(currentPercentage) === "Hạt mầm nhỏ" ? [
                    "linear-gradient(45deg, #60a5fa, #38bdf8, #0ea5e9)",
                    "linear-gradient(135deg, #93c5fd, #bae6fd, #bfdbfe)",
                    "linear-gradient(225deg, #60a5fa, #38bdf8, #0ea5e9)",
                  ] : getEndingTypeName(currentPercentage) === "Ảo tưởng sụp đổ" ? [
                    "linear-gradient(45deg, #374151, #4b5563, #6b7280)",
                    "linear-gradient(135deg, #dc2626, #b91c1c, #991b1b)",
                    "linear-gradient(225deg, #374151, #4b5563, #6b7280)",
                  ] : [
                    "linear-gradient(45deg, #1f2937, #374151, #4b5563)",
                    "linear-gradient(135deg, #6b7280, #9ca3af, #d1d5db)",
                    "linear-gradient(225deg, #1f2937, #374151, #4b5563)",
                  ]
                }}
                transition={{
                  duration: getEndingTypeName(currentPercentage) === "Cộng đồng thật sự" ? 3 : 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Overlay pattern */}
              <div className="absolute inset-0 opacity-20" 
                style={{
                  backgroundImage: getEndingTypeName(currentPercentage) === "Cộng đồng thật sự" 
                    ? `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.6) 0%, transparent 50%),
                       radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.6) 0%, transparent 50%),
                       radial-gradient(circle at 40% 40%, rgba(8, 145, 178, 0.6) 0%, transparent 50%)`
                    : getEndingTypeName(currentPercentage) === "Hạt mầm nhỏ"
                    ? `radial-gradient(circle at 30% 70%, rgba(96, 165, 250, 0.5) 0%, transparent 50%),
                       radial-gradient(circle at 70% 30%, rgba(56, 189, 248, 0.5) 0%, transparent 50%)`
                    : getEndingTypeName(currentPercentage) === "Ảo tưởng sụp đổ"
                    ? `radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.4) 0%, transparent 50%),
                       radial-gradient(circle at 20% 80%, rgba(75, 85, 99, 0.4) 0%, transparent 50%)`
                    : `radial-gradient(circle at 50% 50%, rgba(107, 114, 128, 0.3) 0%, transparent 50%)`
                }}
              />
            </motion.div>

            {/* Ending Effects */}
            <EndingEffects endingType={getEndingTypeName(currentPercentage)} />

            {/* Main Story Scene */}
            <div className="relative z-10 flex-1">
              <StoryScene 
                scene={getEndingScene()} 
                previousChoices={choicePercentages}
              />
            </div>

            {/* Enhanced Ending Summary Overlay */}
            <motion.div
              className="absolute inset-0 z-30 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
              style={{ 
                background: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(10px)"
              }}
            >
              <motion.div
                className="max-w-4xl w-full"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <EndingSummary
                  choicePercentages={choicePercentages}
                  endingType={getEndingTypeName(currentPercentage)}
                  finalPercentage={currentPercentage}
                />
              </motion.div>
            </motion.div>

            {/* Enhanced Action Buttons */}
            <motion.div 
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex gap-4"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={startNewGame}
                  className={`gap-2 shadow-xl px-6 py-3 text-white ${
                    getEndingTypeName(currentPercentage) === "Cộng đồng thật sự" || getEndingTypeName(currentPercentage) === "Hạt mầm nhỏ"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
                  }`}
                  size="lg"
                >
                  <RotateCcw className="w-5 h-5" />
                  Chơi lại
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={resetStory}
                  variant="outline"
                  className={`gap-2 shadow-xl px-6 py-3 backdrop-blur-sm ${
                    getEndingTypeName(currentPercentage) === "Cộng đồng thật sự" || getEndingTypeName(currentPercentage) === "Hạt mầm nhỏ"
                      ? "bg-white/20 border-white/40 text-white hover:bg-white/30"
                      : "bg-gray-800/30 border-gray-600/40 text-gray-300 hover:bg-gray-800/40"
                  }`}
                  size="lg"
                >
                  <Home className="w-5 h-5" />
                  Trang chủ
                </Button>
              </motion.div>
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
              scene={storyScenes[currentSceneIndex]}
              onChoice={handleChoice}
              onNext={nextScene}
              previousChoices={choicePercentages}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Choice Summary - Hidden for now but can be toggled */}
      {/* {choicePercentages.length > 0 && !showEnding && (
        <motion.div 
          className="absolute bottom-4 left-4 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <div className="text-white/80 text-xs">
              <p>Điểm trung bình: {Math.round(currentPercentage)}%</p>
              <p>Xu hướng: {getEndingTypeName(currentPercentage)}</p>
            </div>
          </div>
        </motion.div>
      )} */}
    </div>
  );
}