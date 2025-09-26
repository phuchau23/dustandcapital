import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface EndingEffectsProps {
  endingType: string;
}

export function EndingEffects({ endingType }: EndingEffectsProps) {
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    // Trigger fireworks for good endings
    if (endingType === "Cộng đồng thật sự" || endingType === "Hạt mầm nhỏ") {
      const timer = setTimeout(() => setShowFireworks(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [endingType]);

  const getEffectsByEnding = () => {
    switch (endingType) {
      case "Khép kín":
        return {
          particleColor: "from-gray-400 to-gray-600",
          particleCount: 8,
          animation: "gentle"
        };
      case "Ảo tưởng sụp đổ":
        return {
          particleColor: "from-red-600 to-gray-800",
          particleCount: 12,
          animation: "chaotic"
        };
      case "Hạt mầm nhỏ":
        return {
          particleColor: "from-cyan-300 to-blue-400",
          particleCount: 30,
          animation: "hopeful"
        };
      case "Cộng đồng thật sự":
        return {
          particleColor: "from-blue-300 to-cyan-400",
          particleCount: 50,
          animation: "celebration"
        };
      default:
        return {
          particleColor: "from-white to-gray-300",
          particleCount: 20,
          animation: "default"
        };
    }
  };

  const effects = getEffectsByEnding();

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Main Particle Effects */}
      {[...Array(effects.particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-3 h-3 rounded-full bg-gradient-to-r ${effects.particleColor} opacity-70`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={
            effects.animation === "celebration" ? {
              y: [0, -200, 0],
              x: [0, Math.random() * 200 - 100, Math.random() * 100 - 50],
              scale: [0, 1.5, 0],
              rotate: [0, 360, 720],
              opacity: [0, 1, 0],
            } : effects.animation === "chaotic" ? {
              y: [0, Math.random() * -150, Math.random() * 100],
              x: [0, Math.random() * 300 - 150, Math.random() * 200 - 100],
              scale: [0.5, 1.2, 0],
              rotate: [0, Math.random() * 360, Math.random() * 720],
              opacity: [0.3, 0.9, 0],
            } : effects.animation === "hopeful" ? {
              y: [0, -100, -50],
              x: [0, Math.random() * 50 - 25, Math.random() * 30 - 15],
              scale: [0, 1, 0.5],
              opacity: [0, 0.8, 0],
            } : effects.animation === "gentle" ? {
              y: [0, -80, 20],
              x: [0, Math.random() * 40 - 20, Math.random() * 20 - 10],
              scale: [0, 0.8, 0],
              opacity: [0, 0.6, 0],
            } : {
              y: [0, -120, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.7, 0],
            }
          }
          transition={{
            duration: effects.animation === "celebration" ? 4 : 
                     effects.animation === "chaotic" ? 3 : 
                     effects.animation === "hopeful" ? 3.5 : 
                     effects.animation === "gentle" ? 4.5 : 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Fireworks for good endings */}
      {showFireworks && (endingType === "Cộng đồng thật sự" || endingType === "Hạt mầm nhỏ") && (
        <>
          {[...Array(endingType === "Cộng đồng thật sự" ? 15 : 10)].map((_, i) => (
            <motion.div
              key={`firework-${i}`}
              className="absolute"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 60}%`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 3, 0] }}
              transition={{
                duration: endingType === "Cộng đồng thật sự" ? 1.5 : 2,
                delay: i * (endingType === "Cộng đồng thật sự" ? 0.2 : 0.3),
                ease: "easeOut"
              }}
            >
              {[...Array(endingType === "Cộng đồng thật sự" ? 16 : 12)].map((_, j) => (
                <motion.div
                  key={j}
                  className={`absolute w-3 h-3 rounded-full ${
                    endingType === "Cộng đồng thật sự" 
                      ? "bg-gradient-to-r from-blue-300 to-cyan-400" 
                      : "bg-gradient-to-r from-cyan-300 to-blue-400"
                  }`}
                  initial={{ x: 0, y: 0, scale: 1 }}
                  animate={{
                    x: Math.cos((j * (360 / (endingType === "Cộng đồng thật sự" ? 16 : 12))) * Math.PI / 180) * 120,
                    y: Math.sin((j * (360 / (endingType === "Cộng đồng thật sự" ? 16 : 12))) * Math.PI / 180) * 120,
                    scale: [1, 0.8, 0],
                    opacity: [1, 0.7, 0]
                  }}
                  transition={{
                    duration: endingType === "Cộng đồng thật sự" ? 1.5 : 2,
                    delay: i * (endingType === "Cộng đồng thật sự" ? 0.2 : 0.3),
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          ))}
        </>
      )}

      {/* Sparkle Trail Effect */}
      {endingType === "Cộng đồng thật sự" && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Rain Effect for sad endings */}
      {endingType === "Ảo tưởng sụp đổ" && (
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`rain-${i}`}
              className="absolute w-0.5 h-8 bg-gradient-to-b from-gray-400 to-transparent opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10%",
              }}
              animate={{
                y: ["0vh", "110vh"],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Lights for introspective endings */}
      {endingType === "Khép kín" && (
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`light-${i}`}
              className="absolute w-3 h-3 bg-blue-300 rounded-full opacity-40 blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}