import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface EndingSummaryProps {
  choicePercentages: number[];
  endingType: string;
  finalPercentage: number;
}

export function EndingSummary({ choicePercentages, endingType, finalPercentage }: EndingSummaryProps) {
  const getEndingDescription = (type: string) => {
    switch (type) {
      case "Khép kín":
        return {
          description: "Nam đã chọn sự an toàn của thế giới ảo, nhưng có thể đã bỏ lỡ những trải nghiệm thật sự quý giá.",
          color: "from-red-400 to-pink-500",
          bgColor: "from-red-500/20 to-pink-500/20",
          icon: "🌙"
        };
      case "Ảo tưởng sụp đổ":
        return {
          description: "Hành trình của Nam đầy thử thách, nhưng những thất bại cũng là bài học quý giá về tính chân thật.",
          color: "from-orange-400 to-red-500",
          bgColor: "from-orange-500/20 to-red-500/20",
          icon: "⚡"
        };
      case "Hạt mầm nhỏ":
        return {
          description: "Nam đã bắt đầu hiểu được giá trị của sự kết nối thật sự, dù còn nhiều điều cần khám phá.",
          color: "from-cyan-400 to-blue-500",
          bgColor: "from-cyan-500/20 to-blue-500/20",
          icon: "🌱"
        };
      case "Cộng đồng thật sự":
        return {
          description: "Nam đã tìm thấy sự cân bằng hoàn hảo giữa thế giới số và hiện thực, xây dựng những mối quan hệ ý nghĩa.",
          color: "from-blue-400 to-cyan-500",
          bgColor: "from-blue-500/20 to-cyan-500/20",
          icon: "🌟"
        };
      default:
        return {
          description: "Một hành trình đặc biệt của riêng bạn.",
          color: "from-gray-400 to-gray-500",
          bgColor: "from-gray-500/20 to-gray-500/20",
          icon: "✨"
        };
    }
  };

  const endingInfo = getEndingDescription(endingType);
  const totalChoices = choicePercentages.length;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* Ending Summary Header */}
      <motion.div
        className="text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.div
          className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${endingInfo.bgColor} border border-white/20 backdrop-blur-sm`}
          animate={{
            boxShadow: [
              "0 0 20px rgba(255, 255, 255, 0.1)",
              "0 0 30px rgba(255, 255, 255, 0.2)",
              "0 0 20px rgba(255, 255, 255, 0.1)",
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-2xl">{endingInfo.icon}</span>
          <span className={`text-xl font-bold bg-gradient-to-r ${endingInfo.color} bg-clip-text text-transparent`}>
            {endingType}
          </span>
          <Badge variant="outline" className="bg-white/10 text-white border-white/30">
            {Math.round(finalPercentage)}%
          </Badge>
        </motion.div>
      </motion.div>

      {/* Ending Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <Card className="bg-gradient-to-r from-white/10 to-white/5 border-white/20 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <p className="text-white/90 text-lg leading-relaxed italic">
              "{endingInfo.description}"
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Journey Statistics */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">{totalChoices}</div>
            <div className="text-white/70 text-sm">Lựa chọn</div>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-lg p-4 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">16</div>
            <div className="text-white/70 text-sm">Cảnh</div>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-lg p-4 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">
              {choicePercentages.filter(choice => choice >= 75).length}
            </div>
            <div className="text-white/70 text-sm">Lựa chọn dũng cảm</div>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-lg p-4 border border-white/10 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">
              {Math.round((choicePercentages.reduce((sum, choice) => sum + choice, 0) / choicePercentages.length) || 0)}%
            </div>
            <div className="text-white/70 text-sm">Điểm trung bình</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Choice Journey Visualization */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <h3 className="text-white/90 text-lg font-medium text-center mb-4">
          🛤️ Hành trình lựa chọn của bạn
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {choicePercentages.map((choice, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 2 + (index * 0.1) }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                choice <= 25 ? "bg-red-400/80 text-red-900" :
                choice <= 50 ? "bg-orange-400/80 text-orange-900" :
                choice <= 75 ? "bg-pink-400/80 text-pink-900" :
                "bg-rose-400/80 text-rose-900"
              }`}
              whileHover={{ scale: 1.2 }}
              title={`Lựa chọn ${index + 1}: ${Math.round(choice)}%`}
            >
              {index + 1}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}