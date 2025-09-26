import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Character {
  name: string;
  dialogue: string;
  emotion?: string;
}

interface Choice {
  text: string;
  value: number;
  description?: string;
}

interface Scene {
  id: string;
  title: string;
  setting: string;
  characters: Character[];
  choices?: Choice[];
  isEnding?: boolean;
  imageUrl?: string;
  conditionalContent?: {
    [key: string]: {
      characters: Character[];
      imageUrl?: string;
    };
  };
}

interface StorySceneProps {
  scene: Scene;
  onChoice?: (value: number) => void;
  onNext?: () => void;
  previousChoices?: number[];
}

export function StoryScene({ scene, onChoice, onNext, previousChoices = [] }: StorySceneProps) {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [sceneTransition, setSceneTransition] = useState(false);

  // Determine conditional content based on previous choices
  const getConditionalContent = () => {
    if (!scene.conditionalContent) return null;
    
    if (scene.id === "scene6") {
      const choice2 = previousChoices[1]; // Choice from scene 5
      if (choice2 <= 25) return scene.conditionalContent["no_participate"];
      if (choice2 <= 50) return scene.conditionalContent["ai_help"];
      if (choice2 <= 75) return scene.conditionalContent["anonymous"];
      return scene.conditionalContent["real_name"];
    }
    
    if (scene.id === "scene7") {
      const choice2 = previousChoices[1]; // Choice from scene 5
      if (choice2 <= 50) return scene.conditionalContent["ai_help"];
      if (choice2 <= 75) return scene.conditionalContent["anonymous"];
      return scene.conditionalContent["real_name"];
    }
    
    return null;
  };

  const conditionalContent = getConditionalContent();
  const displayCharacters = conditionalContent ? conditionalContent.characters : scene.characters;
  const displayImage = conditionalContent?.imageUrl || scene.imageUrl;

  // Filter out empty dialogues
  const validCharacters = displayCharacters.filter(char => char.dialogue || char.emotion);

  const currentCharacter = validCharacters[currentDialogueIndex];

  // Scene transition effect
  useEffect(() => {
    setSceneTransition(true);
    const timer = setTimeout(() => setSceneTransition(false), 500);
    return () => clearTimeout(timer);
  }, [scene.id]);

  // Typing effect with variable speed
  useEffect(() => {
    if (currentCharacter && currentCharacter.dialogue) {
      setIsTyping(true);
      setDisplayedText("");
      
      const text = currentCharacter.dialogue;
      let index = 0;
      
      const getTypingSpeed = (char: string) => {
        if (char === '.' || char === '!' || char === '?') return 300;
        if (char === ',' || char === ';') return 150;
        if (char === ' ') return 20;
        return 25;
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

  // Handle next dialogue with animation
  const handleNext = () => {
    if (isTyping) {
      // Skip typing animation
      setDisplayedText(currentCharacter?.dialogue || "");
      setIsTyping(false);
      return;
    }

    if (currentDialogueIndex < validCharacters.length - 1) {
      setCurrentDialogueIndex(prev => prev + 1);
    } else {
      // End of dialogues
      if (scene.choices && scene.choices.length > 0) {
        setShowChoices(true);
      } else if (onNext) {
        onNext();
      }
    }
  };

  // Reset when scene changes
  useEffect(() => {
    setCurrentDialogueIndex(0);
    setShowChoices(false);
    setDisplayedText("");
  }, [scene.id]);

  const getCharacterColor = (name: string) => {
    if (name === "Nam") return "text-blue-400";
    if (name === "A") return "text-cyan-400"; // Keep for backwards compatibility
    if (name === "AI") return "text-purple-400";
    if (name.includes("Thầy")) return "text-green-400";
    if (name === "Narrator") return "text-yellow-400";
    return "text-gray-400";
  };

  const getCharacterBgColor = (name: string) => {
    if (name === "Nam") return "from-blue-500/20 to-blue-600/20";
    if (name === "A") return "from-cyan-500/20 to-cyan-600/20"; // Keep for backwards compatibility
    if (name === "AI") return "from-purple-500/20 to-purple-600/20";
    if (name.includes("Thầy")) return "from-green-500/20 to-green-600/20";
    if (name === "Narrator") return "from-yellow-500/20 to-yellow-600/20";
    return "from-gray-500/20 to-gray-600/20";
  };

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* Background Image with parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {displayImage && (
          <ImageWithFallback
            src={displayImage}
            alt={scene.setting}
            className="w-full h-full object-cover"
          />
        )}
        <motion.div 
          className={`absolute inset-0 ${
            scene.isEnding 
              ? "bg-gradient-to-t from-blue-900/80 via-cyan-800/60 to-teal-900/70" 
              : "bg-gradient-to-t from-black/60 via-black/20 to-black/40"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </motion.div>

      {/* Ending Special Effects */}
      {scene.isEnding && (
        <>
          {/* Floating Particles */}
          <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Blue Border Animation */}
          <motion.div
            className="absolute inset-4 z-5 border-4 border-gradient-to-r from-cyan-400 via-blue-500 to-teal-600 rounded-3xl pointer-events-none"
            animate={{
              boxShadow: [
                "0 0 20px rgba(34, 211, 238, 0.5), inset 0 0 20px rgba(34, 211, 238, 0.2)",
                "0 0 40px rgba(59, 130, 246, 0.8), inset 0 0 40px rgba(59, 130, 246, 0.3)",
                "0 0 60px rgba(20, 184, 166, 0.6), inset 0 0 60px rgba(20, 184, 166, 0.2)",
                "0 0 20px rgba(34, 211, 238, 0.5), inset 0 0 20px rgba(34, 211, 238, 0.2)",
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: "linear-gradient(45deg, rgba(34, 211, 238, 0.1), rgba(59, 130, 246, 0.1), rgba(20, 184, 166, 0.1))"
            }}
          />

          {/* Ending Glow Effect */}
          <motion.div
            className="absolute inset-0 z-5 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)",
                "radial-gradient(circle at 70% 30%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)",
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}

      {/* Scene Title Overlay with slide animation - positioned below progress bar */}
      <motion.div 
        className="relative z-10 pt-20 px-4 pb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div 
          className="bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm rounded-lg p-4 inline-block border border-white/10"
          whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.3)" }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-white text-lg font-medium mb-1">{scene.title}</h2>
          <p className="text-white/80 text-sm">{scene.setting}</p>
        </motion.div>
      </motion.div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Dialogue Box - Compact Visual Novel Style */}
      <motion.div 
        className="relative z-10 p-2"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={scene.id}
            className={`backdrop-blur-md rounded-t-2xl p-4 max-w-4xl mx-auto shadow-2xl ${
              scene.isEnding
                ? "bg-gradient-to-t from-blue-900/95 to-cyan-800/90 border-t-4 border-gradient-to-r from-blue-400 via-cyan-500 to-teal-600"
                : "bg-gradient-to-t from-black/90 to-black/80 border-t-4 border-gradient-to-r from-blue-400 to-cyan-400"
            }`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              ...(scene.isEnding && {
                boxShadow: [
                  "0 0 30px rgba(34, 211, 238, 0.3)",
                  "0 0 50px rgba(59, 130, 246, 0.4)",
                  "0 0 30px rgba(34, 211, 238, 0.3)",
                ]
              })
            }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ 
              duration: 0.4,
              ...(scene.isEnding && {
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              })
            }}
          >
            {/* Current Character with enhanced animations */}
            {currentCharacter && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDialogueIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Character Name Section */}
                  <motion.div 
                    className="flex items-center gap-2 mb-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <motion.div 
                      className={`w-3 h-3 rounded-full ${
                        currentCharacter.name === "Nam" ? "bg-blue-400" :
                        currentCharacter.name === "A" ? "bg-cyan-400" :
                        currentCharacter.name === "AI" ? "bg-purple-400" :
                        currentCharacter.name.includes("Thầy") ? "bg-green-400" :
                        currentCharacter.name === "Narrator" ? "bg-yellow-400" :
                        "bg-gray-400"
                      }`}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0.4)",
                          "0 0 0 8px rgba(59, 130, 246, 0)",
                          "0 0 0 0 rgba(59, 130, 246, 0)"
                        ]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                    <motion.div
                      className={`px-3 py-1 rounded-full bg-gradient-to-r ${getCharacterBgColor(currentCharacter.name)} border border-white/10`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className={`font-medium ${getCharacterColor(currentCharacter.name)} text-base`}>
                        {currentCharacter.name}
                      </span>
                    </motion.div>
                    {currentCharacter.emotion && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <Badge variant="outline" className="text-xs bg-white/10 text-white border-white/30 backdrop-blur-sm">
                          {currentCharacter.emotion}
                        </Badge>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Dialogue Text with enhanced typing effect */}
                  <motion.div 
                    className="mb-4 relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-lg p-3 border border-white/10 backdrop-blur-sm">
                      <p className="text-white text-base leading-relaxed min-h-[2rem] relative">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.1 }}
                        >
                          "{displayedText}"
                        </motion.span>
                        {isTyping && (
                          <motion.span 
                            className="inline-block w-0.5 h-4 bg-white ml-1"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                        )}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Navigation with improved animations */}
            {!showChoices && (
              <motion.div 
                className="flex justify-between items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <div className="text-white/60 text-xs flex items-center gap-2">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-white/40"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  {currentDialogueIndex + 1} / {validCharacters.length}
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={handleNext}
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
                  >
                    {currentDialogueIndex < validCharacters.length - 1 ? "Tiếp tục" : "Hoàn thành"}
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Choices with staggered animations */}
            <AnimatePresence>
              {showChoices && scene.choices && scene.choices.length > 0 && (
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.p 
                    className="text-white font-medium text-center mb-4 text-lg"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    🤔 Nam sẽ phản ứng thế nào?
                  </motion.p>
                  <div className="grid gap-3">
                    {scene.choices.map((choice, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 10 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full bg-gradient-to-r from-white/10 to-white/5 border-white/30 text-white hover:from-white/20 hover:to-white/10 p-3 h-auto text-left justify-start backdrop-blur-sm transition-all duration-300"
                          onClick={() => onChoice?.(choice.value)}
                        >
                          <div className="flex items-center gap-2">
                            <motion.div 
                              className="w-1.5 h-1.5 rounded-full bg-white/60"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                            />
                            <div className="text-sm leading-relaxed">{choice.text}</div>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ending with special animation */}
            {scene.isEnding && (
              <motion.div 
                className="text-center py-8 space-y-6"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              >
                {/* Main Ending Badge */}
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 30px rgba(34, 211, 238, 0.6)",
                      "0 0 60px rgba(59, 130, 246, 0.8)",
                      "0 0 30px rgba(34, 211, 238, 0.6)"
                    ],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="inline-block rounded-2xl relative"
                >
                  <Badge className="bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-600 text-white px-8 py-4 text-2xl font-bold relative z-10">
                    ✨ KẾT THÚC ✨
                  </Badge>
                  
                  {/* Pulsing backdrop */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-600 rounded-2xl opacity-30"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Ending Type Display */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="space-y-3"
                >
                  <motion.h1 
                    className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-300 bg-clip-text text-transparent"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(34, 211, 238, 0.5)",
                        "0 0 20px rgba(59, 130, 246, 0.5)",
                        "0 0 10px rgba(34, 211, 238, 0.5)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {scene.title}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    Hành trình tìm kiếm bản thân của Nam đã hoàn thành với một kết thúc đầy ý nghĩa.
                  </motion.p>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  className="flex justify-center items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  {["🌟", "📖", "💭", "🌸", "✨"].map((emoji, index) => (
                    <motion.span
                      key={index}
                      className="text-3xl"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut"
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Final Message */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 1.8 }}
                  className="bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-4 border border-white/20 backdrop-blur-sm"
                >
                  <p className="text-white/80 text-lg italic">
                    "Cảm ơn bạn đã đồng hành cùng Nam trong hành trình khám phá bản thân này. 
                    Mỗi lựa chọn đã định hình nên câu chuyện độc đáo của riêng bạn."
                  </p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Scene transition overlay */}
      <AnimatePresence>
        {sceneTransition && (
          <motion.div
            className="absolute inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}