// ./data/storyData.ts
// BỤI & VỐN — Full storyline (25 questions) with Scores V/U/S/M/T + Flags + Conditional scenes
import type { GameState } from "../App";

export type Delta = Partial<{ V: number; U: number; S: number; M: number; T: number }>;
export type FlagPatch = Partial<GameState["flags"]>;

export type Choice = {
  id: string;
  label: string;
  delta: Delta;
  flags?: FlagPatch;
  note?: string;
};

export type Scene = {
  id: string; // Q1..Q25, or Q13_ALT, Q20_DIRTY, Q20_MILESTONE
  title: string;
  text: string;
  bg?: string; // path to image in /public (optional)
  choices: Choice[];
  isAvailable?: (state: GameState) => boolean; // conditional scene
};

export const storyScenes: Scene[] = [
  // ======================
  // EP0 — PROLOGUE (Q1–Q3)
  // ======================
  {
    id: "Q1",
    title: "Q1 — Tin từ quê",
    bg: "/bg/ep0_prologue.jpg",
    text: "Một đêm, bạn nhận tin: bố ở quê bị tai biến nhẹ. Không chết — nhưng từ nay gia đình cần tiền thuốc, và bạn là người gánh chính. Tâm thế của bạn là:",
    choices: [
      { id: "Q1_A", label: "“Mình phải giàu nhanh để cứu nhà”", delta: { S: -1, T: -1 } },
      { id: "Q1_B", label: "“Mình phải làm chắc, lâu nhưng bền”", delta: { T: +1, S: +1 } },
      { id: "Q1_C", label: "“Mọi thứ sẽ ổn, cứ thuận theo”", delta: { T: -1 } },
    ],
  },
  {
    id: "Q2",
    title: "Q2 — Cách “mở game”",
    bg: "/bg/ep0_prologue.jpg",
    text: "Bạn chọn cách bắt đầu (tài chính & rủi ro):",
    choices: [
      { id: "Q2_A", label: "Nghỉ việc, all-in startup", delta: { V: -1, S: -1, M: +1 } },
      { id: "Q2_B", label: "Vừa làm vừa khởi nghiệp", delta: { T: +1, V: +1, S: +1 } },
      {
        id: "Q2_C",
        label: "Nhận “tiền nhanh” từ người quen quyền lực (không rõ điều kiện)",
        delta: { V: +2, M: +2, U: -1, T: -1 },
        flags: { ShadowMoney: true },
      },
    ],
  },
  {
    id: "Q3",
    title: "Q3 — Bạn định nghĩa “thành công”",
    bg: "/bg/ep0_prologue.jpg",
    text: "Với bạn, “thành công” nghĩa là gì?",
    choices: [
      { id: "Q3_A", label: "Có tiền càng nhanh càng tốt", delta: { T: -1 } },
      { id: "Q3_B", label: "Doanh nghiệp sống bền + gia đình ổn", delta: { T: +1, U: +1 } },
      { id: "Q3_C", label: "Danh tiếng / được công nhận", delta: { U: +1, S: -1 } },
    ],
  },

  // ===========================
  // EP1 — FOUNDATION (Q4–Q7)
  // ===========================
  {
    id: "Q4",
    title: "Q4 — Chọn lĩnh vực / mô hình",
    bg: "/bg/ep1_foundation.jpg",
    text: "Bạn chọn lĩnh vực dựa trên:",
    choices: [
      {
        id: "Q4_A",
        label: "Trend đang hot (ai cũng mở)",
        delta: { T: -1, V: +1 },
        flags: { TrendChase: true },
      },
      { id: "Q4_B", label: "Sở thích / cảm hứng cá nhân", delta: { S: +1, T: -1 } },
      {
        id: "Q4_C",
        label: "Test nhỏ 2 tuần (đo nhu cầu, giá, phản hồi)",
        delta: { T: +2, V: -1, U: +1 },
        flags: { TestFirst: true },
      },
    ],
  },
  {
    id: "Q5",
    title: "Q5 — Mặt bằng / setup",
    bg: "/bg/ep1_foundation.jpg",
    text: "Bạn thuê mặt bằng/địa điểm:",
    choices: [
      { id: "Q5_A", label: "Chỗ đẹp nhất, giá cao (tin “đắc địa sẽ thắng”)", delta: { V: -2, T: -1 } },
      { id: "Q5_B", label: "Vừa phải, tối ưu chi phí", delta: { V: +1, T: +1 } },
      { id: "Q5_C", label: "Không thuê, làm bếp nhỏ + bán online trước", delta: { T: +2, V: +1, U: -1 } },
    ],
  },
  {
    id: "Q6",
    title: "Q6 — Đồng đội",
    bg: "/bg/ep1_foundation.jpg",
    text: "Một người bạn thân rủ làm chung (vốn ít nhưng chịu làm). Bạn:",
    choices: [
      { id: "Q6_A", label: "Chia 50/50 vì tình nghĩa", delta: { M: +1, U: -1, T: -1 } },
      { id: "Q6_B", label: "Chia theo đóng góp + hợp đồng rõ", delta: { T: +1, U: +1 } },
      { id: "Q6_C", label: "Từ chối, muốn tự quyết tuyệt đối", delta: { U: -1, M: -1, S: -1 } },
    ],
  },
  {
    id: "Q7",
    title: "Q7 — Tuyển team ban đầu",
    bg: "/bg/ep1_foundation.jpg",
    text: "Bạn tuyển team ban đầu:",
    choices: [
      { id: "Q7_A", label: "Tuyển nhanh cho đủ người (không thử việc)", delta: { U: -1, T: -1 } },
      { id: "Q7_B", label: "Tuyển ít nhưng kỹ, có thử việc", delta: { T: +1, U: +1, V: -1 } },
      { id: "Q7_C", label: "Thuê outsource/part-time để linh hoạt", delta: { V: +1, U: -1, T: +1 } },
    ],
  },

  // ==============================
  // EP2 — MARKET & PRODUCT (Q8–Q11)
  // ==============================
  {
    id: "Q8",
    title: "Q8 — 2 tuần đầu khách ít",
    bg: "/bg/ep2_market.jpg",
    text: "2 tuần đầu khách ít. Bạn làm marketing:",
    choices: [
      { id: "Q8_A", label: "Đốt ads mạnh để “bật doanh số”", delta: { V: -2, T: -1 } },
      { id: "Q8_B", label: "Nội dung thật + khuyến mãi nhỏ, đo chuyển đổi", delta: { T: +2, V: -1, U: +1 } },
      { id: "Q8_C", label: "Nhờ người quen KOL “đẩy một phát”", delta: { M: +1, V: -1, U: -1 } },
    ],
  },
  {
    id: "Q9",
    title: "Q9 — Review đầu tiên chê “giá cao”",
    bg: "/bg/ep2_market.jpg",
    text: "Review đầu tiên chê “giá cao”. Bạn:",
    choices: [
      { id: "Q9_A", label: "Cãi lại trên mạng", delta: { U: -2, S: -1 } },
      { id: "Q9_B", label: "Xin lỗi + hỏi cụ thể + điều chỉnh có lý do", delta: { U: +2, T: +1 } },
      { id: "Q9_C", label: "Xóa/báo cáo review", delta: { U: -2, T: -1 } },
    ],
  },
  {
    id: "Q10",
    title: "Q10 — Bạn nhận ra khách mua vì “tiện”",
    bg: "/bg/ep2_market.jpg",
    text: "Bạn phát hiện khách mua vì “tiện”, không phải vì “đam mê món”. Bạn:",
    choices: [
      { id: "Q10_A", label: "Giữ concept vì đó là bản sắc", delta: { T: -1 } },
      { id: "Q10_B", label: "Giữ bản sắc nhưng tối ưu tiện/lợi", delta: { T: +1, U: +1 } },
      {
        id: "Q10_C",
        label: "Bỏ hết, chạy theo món hot ngay",
        delta: { T: -1, V: +1 },
        flags: { TrendChase: true },
      },
    ],
  },
  {
    id: "Q11",
    title: "Q11 — Sau 2 tháng doanh thu vẫn thấp",
    bg: "/bg/ep2_market.jpg",
    text: "Sau 2 tháng, doanh thu vẫn thấp. Bạn quyết định:",
    choices: [
      { id: "Q11_A", label: "“Cứ đốt tiền rồi sẽ tới”", delta: { V: -2, T: -1 } },
      { id: "Q11_B", label: "“Cày gấp đôi” (tăng ca, tự làm hết)", delta: { S: -2, T: -1, V: -1 } },
      {
        id: "Q11_C",
        label: "Pivot: thu hẹp menu, tối ưu vận hành, đo lại tệp khách",
        delta: { T: +2, U: +1, V: -1 },
        flags: { Pivot: true },
      },
    ],
  },

  // ==============================
  // EP3 — PEOPLE & ETHICS (Q12–Q15)
  // ==============================
  {
    id: "Q12",
    title: "Q12 — Nhân viên xin ứng lương",
    bg: "/bg/ep3_people.jpg",
    text: "Nhân viên Hà (22t) xin ứng lương vì mẹ bệnh. Bạn:",
    choices: [
      { id: "Q12_A", label: "Không ứng, “startup phải kỷ luật”", delta: { V: +1, U: -1, M: -1 } },
      { id: "Q12_B", label: "Ứng một phần + lịch làm rõ ràng", delta: { U: +1, T: +1, V: -1 } },
      { id: "Q12_C", label: "Ứng toàn bộ ngay", delta: { U: +2, V: -2, S: -1 } },
    ],
  },

  // Q13 — conditional based on ShadowMoney flag
  {
    id: "Q13",
    title: "Q13 — “Tối ưu sổ sách” (tiền nhanh)",
    bg: "/bg/ep3_people.jpg",
    text: "Người cho “tiền nhanh” gợi ý bạn “tối ưu sổ sách” để giảm chi phí thuế.",
    isAvailable: (s) => s.flags.ShadowMoney === true,
    choices: [
      { id: "Q13_A", label: "Làm theo", delta: { V: +1, U: -2, T: -1 }, flags: { EthicsBreak: true } },
      { id: "Q13_B", label: "Từ chối thẳng", delta: { U: +1, M: -1, T: +1 } },
      { id: "Q13_C", label: "Trì hoãn, tìm tư vấn kế toán hợp pháp", delta: { T: +2, V: -1, U: +1 } },
    ],
  },
  {
    id: "Q13_ALT",
    title: "Q13 — “Lách” từ người trong ngành",
    bg: "/bg/ep3_people.jpg",
    text: "Bạn nhận đề nghị “lách” từ một người khác trong ngành để giảm chi phí thuế.",
    isAvailable: (s) => s.flags.ShadowMoney === false,
    choices: [
      { id: "Q13_ALT_A", label: "Làm theo", delta: { V: +1, U: -2, T: -1 }, flags: { EthicsBreak: true } },
      { id: "Q13_ALT_B", label: "Từ chối thẳng", delta: { U: +1, M: -1, T: +1 } },
      { id: "Q13_ALT_C", label: "Tìm tư vấn hợp pháp", delta: { T: +2, V: -1, U: +1 } },
    ],
  },

  {
    id: "Q14",
    title: "Q14 — Mua đánh giá 5 sao?",
    bg: "/bg/ep3_people.jpg",
    text: "Một đối tác đề nghị “mua đánh giá 5 sao”. Bạn:",
    choices: [
      { id: "Q14_A", label: "Mua luôn để tăng uy tín nhanh", delta: { U: -2, V: -1, T: -1 } },
      { id: "Q14_B", label: "Từ chối, tập trung chất lượng thật", delta: { U: +1, T: +1 } },
      { id: "Q14_C", label: "Nửa vời: mua ít cho có", delta: { U: -1, T: -1 } },
    ],
  },
  {
    id: "Q15",
    title: "Q15 — Team mâu thuẫn vì áp lực",
    bg: "/bg/ep3_people.jpg",
    text: "Team bắt đầu mâu thuẫn vì áp lực. Bạn xử lý:",
    choices: [
      { id: "Q15_A", label: "Đổ lỗi và sa thải người yếu", delta: { U: -2, M: -1, S: -1 } },
      { id: "Q15_B", label: "Họp thẳng, chia trách nhiệm rõ, ưu tiên việc quan trọng", delta: { T: +1, U: +1, S: +1 } },
      { id: "Q15_C", label: "Né tránh, “rồi tự ổn”", delta: { U: -1, T: -1 } },
    ],
  },

  // ==========================
  // EP4 — SHOCK (Q16–Q18)
  // ==========================
  {
    id: "Q16",
    title: "Q16 — Sốc phí nền tảng + nguyên liệu tăng",
    bg: "/bg/ep4_shock.jpg",
    text: "Phí nền tảng giao đồ ăn tăng + giá nguyên liệu tăng. Bạn:",
    choices: [
      {
        id: "Q16_A",
        label: "Cắt chất lượng để giữ giá",
        delta: { V: +1, U: -2, T: -1 },
        flags: { CutQuality: true },
      },
      { id: "Q16_B", label: "Tăng giá ngay, không giải thích", delta: { V: +1, U: -1 } },
      {
        id: "Q16_C",
        label: "Tối ưu quy trình + đổi menu + pivot bán trực tiếp",
        delta: { T: +2, U: +1, V: -1 },
        flags: { Pivot: true },
      },
    ],
  },
  {
    id: "Q17",
    title: "Q17 — Bố cần thủ tục điều trị gấp",
    bg: "/bg/ep4_shock.jpg",
    text: "Gia đình báo: bố cần thủ tục khám/điều trị gấp trong 10 ngày. Đúng lúc đó bạn có deal quan trọng với đối tác. Bạn:",
    choices: [
      {
        id: "Q17_A",
        label: "Về quê xử lý cùng gia đình",
        delta: { S: +1, M: +1, V: -1 },
        flags: { FamilyFirst: true },
      },
      { id: "Q17_B", label: "Ở lại lo deal, “nhà có người khác”", delta: { V: +1, S: -1, U: -1 } },
      { id: "Q17_C", label: "Sắp xếp: đi/đến theo lịch + ủy quyền tại công ty", delta: { T: +1, U: +1, S: +1, V: -1 } },
    ],
  },
  {
    id: "Q18",
    title: "Q18 — Runway còn ~ 6 tuần",
    bg: "/bg/ep4_shock.jpg",
    text: "Dòng tiền còn runway ~ 6 tuần. Bạn chọn:",
    choices: [
      { id: "Q18_A", label: "Vay nóng để kéo dài", delta: { V: +2, U: -1, S: -1 } },
      { id: "Q18_B", label: "Cắt lỗ, đóng 1 chi nhánh/1 kênh ngay", delta: { T: +2, U: -1, V: +1 } },
      { id: "Q18_C", label: "Kêu gọi góp vốn nhỏ từ bạn bè (minh bạch)", delta: { M: +2, U: +1, V: +1 } },
    ],
  },

  // ============================
  // EP5 — THE SHADOW DEAL (Q19–Q21)
  // ============================
  {
    id: "Q19",
    title: "Q19 — Deal của Khang",
    bg: "/bg/ep5_deal.jpg",
    text: "Nhà đầu tư Khang đề nghị rót 2 tỷ đổi 45% và quyền can thiệp vận hành. Khang “gợi ý” cắt chi phí nhân sự theo cách “linh hoạt”. Bạn:",
    choices: [
      {
        id: "Q19_A",
        label: "Nhận deal và làm theo để sống sót",
        delta: { V: +3, M: +1, U: -2, T: -1 },
        flags: { KhangDealAccepted: true, KhangDealType: "DIRTY", EthicsBreak: true },
      },
      { id: "Q19_B", label: "Từ chối, giữ nguyên tắc", delta: { U: +2, T: +1, V: -2, S: -1 } },
      {
        id: "Q19_C",
        label: "Đàm phán milestone + điều khoản bảo vệ nhân sự",
        delta: { V: +2, U: +1, T: +2 },
        flags: { KhangDealAccepted: true, KhangDealType: "MILESTONE" },
      },
    ],
  },

  // Q20 conditional based on Khang deal type
  {
    id: "Q20_DIRTY",
    title: "Q20 — Khang ép cắt lương / tăng ca",
    bg: "/bg/ep5_deal.jpg",
    text: "Bạn chọn deal bẩn. Khang yêu cầu cắt lương/ép tăng ca. Bạn:",
    isAvailable: (s) => s.flags.KhangDealAccepted === true && s.flags.KhangDealType === "DIRTY",
    choices: [
      {
        id: "Q20_A",
        label: "Làm ngay, “không có thời gian”",
        delta: { V: +1, U: -2, S: -1 },
        flags: { EthicsBreak: true },
      },
      { id: "Q20_B", label: "Làm một phần, chọn người “dễ”", delta: { V: +1, U: -1, T: -1 } },
      { id: "Q20_C", label: "Lái sang tối ưu vận hành thay vì ép người", delta: { T: +2, U: +1, V: -1 } },
    ],
  },
  {
    id: "Q20_MILESTONE",
    title: "Q20 — Khang đòi KPI",
    bg: "/bg/ep5_deal.jpg",
    text: "Bạn chọn deal milestone. Khang muốn bạn chứng minh KPI. Bạn:",
    isAvailable: (s) => s.flags.KhangDealAccepted === true && s.flags.KhangDealType === "MILESTONE",
    choices: [
      { id: "Q20_A", label: "Làm KPI ảo cho đẹp", delta: { V: +1, U: -2, T: -1 } },
      { id: "Q20_B", label: "Làm KPI thật, đo đúng", delta: { T: +2, U: +1 } },
      { id: "Q20_C", label: "Xin kéo dài thời gian + tập trung cải tiến", delta: { T: +1, U: +1, V: -1 } },
    ],
  },

  {
    id: "Q21",
    title: "Q21 — Cú gọi từ quê",
    bg: "/bg/ep5_deal.jpg",
    text: "Một “cú gọi” từ quê: bố cần thêm chi phí phát sinh. Công ty thì đang đúng giai đoạn sống còn. Bạn:",
    choices: [
      {
        id: "Q21_A",
        label: "Trích tiền ngay cho gia đình",
        delta: { S: +1, U: +1, V: -2 },
        flags: { FamilyFirst: true },
      },
      { id: "Q21_B", label: "Giữ tiền cho công ty, hứa gửi sau", delta: { V: +1, S: -1, U: -1 } },
      { id: "Q21_C", label: "Chia theo % + tìm hỗ trợ khác", delta: { T: +2, M: +1, V: -1 } },
    ],
  },

  // ======================
  // EP6 — VERDICT (Q22–Q25)
  // ======================
  {
    id: "Q22",
    title: "Q22 — Chiến lược 60 ngày cuối",
    bg: "/bg/ep6_verdict.jpg",
    text: "Bạn phải chọn chiến lược 60 ngày cuối:",
    choices: [
      { id: "Q22_A", label: "Bơm marketing mạnh, hy vọng “bùng nổ”", delta: { V: -2, T: -1 } },
      { id: "Q22_B", label: "Tối ưu vận hành + tăng trải nghiệm khách", delta: { T: +2, U: +1, V: -1 } },
      { id: "Q22_C", label: "Thu nhỏ mô hình + tập trung một kênh có lời", delta: { T: +2, V: +1, U: -1 } },
    ],
  },
  {
    id: "Q23",
    title: "Q23 — Khủng hoảng truyền thông",
    bg: "/bg/ep6_verdict.jpg",
    text: "Một khủng hoảng truyền thông nổ ra (review/đồn đoán về chất lượng hoặc nhân sự). Bạn:",
    choices: [
      { id: "Q23_A", label: "Phớt lờ, “rồi hết”", delta: { U: -2, T: -1 } },
      {
        id: "Q23_B",
        label: "Minh bạch, nhận trách nhiệm phần đúng, đưa bằng chứng cải thiện",
        delta: { U: +2, T: +2 },
      },
      { id: "Q23_C", label: "Đổ lỗi cho khách/đối thủ", delta: { U: -2, S: -1 } },
    ],
  },
  {
    id: "Q24",
    title: "Q24 — Bạn ra quyết định dựa trên",
    bg: "/bg/ep6_verdict.jpg",
    text: "Bạn ra quyết định dựa trên:",
    choices: [
      { id: "Q24_A", label: "Trực giác & niềm tin cá nhân", delta: { T: -1 } },
      { id: "Q24_B", label: "Người có quyền lực/tiền bảo sao làm vậy", delta: { M: +1, T: -2, U: -1 } },
      { id: "Q24_C", label: "Dữ liệu + phản hồi + thử nghiệm nhỏ", delta: { T: +2, U: +1 } },
    ],
  },
  {
    id: "Q25",
    title: "Q25 — Ngã rẽ cuối",
    bg: "/bg/ep6_verdict.jpg",
    text: "Bạn phát hiện mô hình hiện tại chỉ sống được nếu “đi đường tắt” (bẩn) hoặc bạn phải chấp nhận giảm tốc để làm sạch và bền. Bạn chọn:",
    choices: [
      {
        id: "Q25_A",
        label: "Đi đường tắt để thắng nhanh",
        delta: { V: +2, U: -2, T: -2 },
        flags: { EthicsBreak: true },
      },
      { id: "Q25_B", label: "Giảm tốc, làm sạch, giữ uy tín", delta: { U: +2, T: +2, V: -1 } },
      {
        id: "Q25_C",
        label: "Dừng cuộc chơi, bảo toàn phần còn lại, quay lại làm thuê một thời gian",
        delta: { T: +1, V: +1, S: +1 },
      },
    ],
  },
];

// Ending scenes mapping
export type EndingKey =
  | "GOOD_1"
  | "GOOD_2"
  | "NEUTRAL"
  | "BITTERSWEET"
  | "BAD_A"
  | "BAD_B"
  | "BAD_C"
  | "BAD_D"
  | "REDEMPTION";

export const endingScenesByKey: Record<EndingKey, Scene> = {
  GOOD_1: {
    id: "END_GOOD_1",
    title: "✅ GOOD — Doanh nghiệp sống, con người sống",
    bg: "/bg/end_good.jpg",
    text: "Bạn không giàu nhanh, nhưng công ty có nền thật. Đội ngũ ở lại. Khách quay lại vì tin. Bạn hiểu: thực tiễn không thưởng cho người mơ đẹp — nó thưởng cho người làm đúng.",
    choices: [],
  },
  GOOD_2: {
    id: "END_GOOD_2",
    title: "✅ GOOD — Deal sạch, lớn lên trong kỷ luật",
    bg: "/bg/end_good2.jpg",
    text: "Bạn nhận vốn nhưng không bán linh hồn. KPI thật. Kỷ luật thật. Tăng trưởng chậm mà chắc — và bạn vẫn ngủ ngon.",
    choices: [],
  },
  NEUTRAL: {
    id: "END_NEUTRAL",
    title: "⚖️ NEUTRAL — Tồn tại, nhưng không bứt phá",
    bg: "/bg/end_neutral.jpg",
    text: "Startup thành business nhỏ. Bạn sống được. Nhưng giấc mơ “đổi đời nhanh” biến mất. Bạn trưởng thành: tự do luôn có cái giá, và cái giá thường là… thời gian.",
    choices: [],
  },
  BITTERSWEET: {
    id: "END_BITTERSWEET",
    title: "🌧️ BITTERSWEET — Cứu gia đình, mất giấc mơ",
    bg: "/bg/end_bittersweet.jpg",
    text: "Bạn đóng mô hình, về quê lo nhà. Không phải “xui” — mà vì nguồn lực vật chất có hạn. Bạn mất một giấc mơ, nhưng giữ được người thân và giữ được mình.",
    choices: [],
  },
  BAD_A: {
    id: "END_BAD_A",
    title: "❌ BAD — Duy ý chí: cố gắng sai cách",
    bg: "/bg/end_bad_a.jpg",
    text: "Bạn kiệt sức. Sai lầm lặp lại. Bạn gọi đó là “không may”, nhưng thực ra bạn đã không tôn trọng quy luật khách quan. Thực tiễn không ghét bạn — nó chỉ lạnh lùng.",
    choices: [],
  },
  BAD_B: {
    id: "END_BAD_B",
    title: "❌ BAD — Thành công bẩn (ngắn hạn)",
    bg: "/bg/end_bad_b.jpg",
    text: "Tiền vào. Số liệu đẹp. Nhưng đội ngũ sợ bạn, khách không tin bạn. Bạn thắng một ván — và thua phần người.",
    choices: [],
  },
  BAD_C: {
    id: "END_BAD_C",
    title: "☠️ BAD — Scandal sập tiệm",
    bg: "/bg/end_bad_c.jpg",
    text: "Bài phốt lan nhanh hơn ads. Đối tác rút, nhân sự bỏ, bạn không kịp trở tay. Khi uy tín vỡ, vốn không cứu được bạn nữa.",
    choices: [],
  },
  BAD_D: {
    id: "END_BAD_D",
    title: "🕳️ BAD — Nợ & vòng xoáy tiền nóng",
    bg: "/bg/end_bad_d.jpg",
    text: "Bạn sống bằng hôm nay, trả bằng ngày mai. Mọi quyết định bị bóp nghẹt bởi lãi và thời hạn. Không còn chiến lược — chỉ còn phản xạ.",
    choices: [],
  },
  REDEMPTION: {
    id: "END_REDEMPTION",
    title: "🕯️ REDEMPTION — Thua ván này, thắng ván sau",
    bg: "/bg/end_redemption.jpg",
    text: "Bạn dừng đúng lúc để không phá nát mọi thứ. Vài năm sau, bạn quay lại — lần này đi bằng nền thật. Không còn cần phép màu, vì bạn đã có phương pháp.",
    choices: [],
  },
};
