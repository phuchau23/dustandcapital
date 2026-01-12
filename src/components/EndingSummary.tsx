import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
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

type EndingKey = "GOOD_1" | "GOOD_2" | "NEUTRAL" | "BITTERSWEET" | "BAD_A" | "BAD_B" | "BAD_C" | "BAD_D" | "REDEMPTION";

interface EndingSummaryProps {
  scores: Scores;
  flags: Flags;
  endingKey: EndingKey;
  endingTitle: string; // text bạn hiển thị (VD: "✅ GOOD — Doanh nghiệp sống, con người sống")
}

export function EndingSummary({ scores, flags, endingKey, endingTitle }: EndingSummaryProps) {
  const getEndingMeta = (key: EndingKey) => {
    switch (key) {
      case "GOOD_1":
        return {
          icon: "🌟",
          color: "from-cyan-300 to-blue-300",
          bg: "from-cyan-500/20 to-blue-500/20",
          description:
            "Bạn thắng bằng thực tiễn: đo, thử, tối ưu, giữ chữ tín. Không giàu nhanh, nhưng bền — và ngủ ngon.",
        };
      case "GOOD_2":
        return {
          icon: "🤝",
          color: "from-blue-300 to-teal-300",
          bg: "from-blue-500/20 to-teal-500/20",
          description: "Bạn nhận vốn nhưng không bán linh hồn. KPI thật, kỷ luật thật. Tăng trưởng chậm mà chắc.",
        };
      case "NEUTRAL":
        return {
          icon: "⚖️",
          color: "from-gray-300 to-slate-300",
          bg: "from-gray-500/20 to-slate-500/20",
          description: "Bạn sống được, nhưng không bứt phá. Một kết quả “ổn”, đổi lại là giấc mơ đổi đời nhanh tan đi.",
        };
      case "BITTERSWEET":
        return {
          icon: "🌧️",
          color: "from-rose-300 to-orange-300",
          bg: "from-rose-500/20 to-orange-500/20",
          description: "Bạn ưu tiên gia đình. Bạn mất một giấc mơ, nhưng giữ được người thân và giữ được mình.",
        };
      case "BAD_A":
        return {
          icon: "🥀",
          color: "from-red-300 to-pink-300",
          bg: "from-red-500/20 to-pink-500/20",
          description: "Duy ý chí + làm sai cách → kiệt sức. Thực tiễn không ghét bạn, chỉ lạnh lùng với sai lầm.",
        };
      case "BAD_B":
        return {
          icon: "🕶️",
          color: "from-amber-300 to-red-300",
          bg: "from-amber-500/20 to-red-500/20",
          description: "Số liệu đẹp, tiền vào — nhưng uy tín vỡ. Bạn thắng ngắn hạn và thua phần người.",
        };
      case "BAD_C":
        return {
          icon: "☠️",
          color: "from-red-300 to-gray-300",
          bg: "from-red-500/20 to-gray-500/20",
          description: "Khủng hoảng truyền thông + xử lý tệ → sập tiệm. Khi uy tín rơi về đáy, vốn không cứu được nữa.",
        };
      case "BAD_D":
        return {
          icon: "🕳️",
          color: "from-slate-300 to-zinc-300",
          bg: "from-slate-500/20 to-zinc-500/20",
          description:
            "Tiền nóng kéo dài runway, nhưng kéo bạn vào vòng xoáy nợ. Mọi quyết định bị bóp nghẹt bởi lãi và hạn.",
        };
      case "REDEMPTION":
      default:
        return {
          icon: "🕯️",
          color: "from-teal-300 to-cyan-300",
          bg: "from-teal-500/20 to-cyan-500/20",
          description: "Bạn dừng đúng lúc để bảo toàn. Thua ván này — nhưng bạn còn cơ hội thắng ván sau.",
        };
    }
  };

  const meta = getEndingMeta(endingKey);

  const scoreItems = [
    { k: "VỐN", v: scores.V },
    { k: "UY TÍN", v: scores.U },
    { k: "SỨC", v: scores.S },
    { k: "MẠNG", v: scores.M },
    { k: "THỰC", v: scores.T },
  ];

  const flagBadges = [
    flags.ShadowMoney ? "ShadowMoney" : null,
    flags.TrendChase ? "TrendChase" : null,
    flags.TestFirst ? "TestFirst" : null,
    flags.EthicsBreak ? "EthicsBreak" : null,
    flags.Pivot ? "Pivot" : null,
    flags.CutQuality ? "CutQuality" : null,
    flags.FamilyFirst ? "FamilyFirst" : null,
    flags.KhangDealAccepted ? `KhangDeal(${flags.KhangDealType ?? "?"})` : null,
  ].filter(Boolean) as string[];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${meta.bg} border border-white/20 backdrop-blur-sm`}
          animate={{
            boxShadow: [
              "0 0 18px rgba(255, 255, 255, 0.08)",
              "0 0 28px rgba(255, 255, 255, 0.16)",
              "0 0 18px rgba(255, 255, 255, 0.08)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-2xl">{meta.icon}</span>
          <span className={`text-xl font-bold bg-gradient-to-r ${meta.color} bg-clip-text text-transparent`}>
            {endingTitle}
          </span>
        </motion.div>
      </motion.div>

      {/* Description */}
      <Card className="bg-gradient-to-r from-white/10 to-white/5 border-white/20 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <p className="text-white/90 text-lg leading-relaxed italic">"{meta.description}"</p>
        </CardContent>
      </Card>

      {/* Scores */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-5 gap-3"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {scoreItems.map((it) => (
          <div key={it.k} className="text-center">
            <div className="bg-white/10 rounded-lg p-3 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">{it.v}</div>
              <div className="text-white/70 text-xs">{it.k}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Flags */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.45 }}
      >
        <h3 className="text-white/90 text-base font-medium text-center">🏷️ Dấu vết quyết định</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {flagBadges.length === 0 ? (
            <Badge variant="outline" className="bg-white/10 text-white border-white/20">
              Không có cờ đặc biệt
            </Badge>
          ) : (
            flagBadges.map((f) => (
              <Badge key={f} variant="outline" className="bg-white/10 text-white border-white/20">
                {f}
              </Badge>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
