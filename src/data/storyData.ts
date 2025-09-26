// Scene images - cleaned up imports
import scene1Image from "figma:asset/098f041f046a64e86bfe538ec6720215b87216b7.png";
import scene1_5Image from "figma:asset/841288c71f901f6a08b10c6936658b4327b40f1b.png";
import scene2Image from "figma:asset/fccf0514d3b8cf038cc384f4ba16fe2c217355bd.png";
import scene3Image from "figma:asset/34fd3bdcd48a2c6cce0f42183f1156dd1b253807.png";
import scene4Image from "figma:asset/f5d2a90784672f6571b76fc9c95eb8146dfcfbf9.png";
import scene5Image from "figma:asset/aaf5be5fd66ffae3651325e4bf5e6bc231143681.png";
import scene6Image from "figma:asset/102b91d1a5ec60d090241f96d70e266167b216ae.png";
import scene7Image from "figma:asset/6481d680024a3c1a5ca8f6ebc1d6560405a4623b.png";
import scene8Image from "figma:asset/f25498dfaca2f97e04a4dc1e14912b86b920ffe5.png";
import scene9Image from "figma:asset/1dd204b103c3ebc2a0fb52b74abcd914e024a945.png";
import scene10Image from "figma:asset/cbb37eb769bd6565f976e20e0379cd3b39638526.png";
import scene11Image from "figma:asset/dd4f6cac8bd6f9b1790fae341c640596c77b0d99.png";
import scene12Image from "figma:asset/c4906ff28bade87e26ac47c7ad427cf6f01916e4.png";
import scene13Image from "figma:asset/unnamed.png";
import scene14Image from "figma:asset/9baec8765b3aeec01653b85b96f34212e18a2d55.png";
import scene15Image from "figma:asset/6615793d9103ff65d25ae081a224a7a0fc55cf6f.png";
import scene16Image from "figma:asset/5735f88a870afb2e2233e02a9b5b867d596e6d20.png";

// Ending image
import theEndImage from "figma:asset/d8ee33f9fa0170dd55d19f429d60589dadf5907b.png";

export interface Character {
  name: string;
  dialogue: string;
  emotion?: string;
}

export interface Choice {
  text: string;
  value: number;
  description?: string;
}

export interface Scene {
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

export const storyScenes: Scene[] = [
  {
    id: "scene1",
    title: "Scene 1: Nhật ký ngây thơ",
    setting: "Lớp học buổi chiều yên tĩnh. Ánh nắng vàng ấm áp hắt qua khung cửa sổ, tạo những vệt sáng trên bàn gỗ cũ. Nam ngồi ở góc cuối lớp, gối đầu trên tay, viết say sưa trong cuốn sổ nhỏ. Tiếng bút chì sột soạt và tiếng lật giấy nhẹ nhàng tạo nhịp điệu thư thái.",
    imageUrl: scene1Image,
    characters: [
      {
        name: "Bạn 1",
        dialogue: "Nam viết gì đó? Trông chăm chú ghê."
      },
      {
        name: "Nam",
        dialogue: "Nhật ký thôi. Mấy chuyện nhỏ nhặt mỗi ngày ấy mà… mỗi con chữ cũng là một phần tồn tại của mình.",
        emotion: "mỉm cười"
      },
      {
        name: "Bạn 2",
        dialogue: "Nghe hay đó. Mai cho tụi này coi nha?"
      },
      {
        name: "Nam",
        dialogue: "Không được, bí mật của tớ mà. Có lẽ, một phần đời sống chỉ thuộc về bản thân mới trọn vẹn.",
        emotion: "lắc đầu, ôm sổ"
      },
      {
        name: "Narrator",
        dialogue: "Không có lựa chọn. Người chơi thấy Nam yêu viết và tin tưởng sự chia sẻ."
      }
    ]
  },
  {
    id: "scene1_5",
    title: "Scene 1.5: Bài học về ý thức",
    setting: "Lớp học trong buổi học triết học. Ánh sáng chiều tà từ cửa sổ chiếu nghiêng lên bảng đen, tạo bầu không khí tư duy sâu lắng. Thầy giáo đứng giữa lớp với phong thái đầy trí tuệ, giọng nói trầm ấm vang vọng trong không gian tĩnh mịch. Học sinh ngồi yên lặng, một số ghi chép, một số ngắm ra cửa sổ.",
    imageUrl: scene1_5Image,
    characters: [
      {
        name: "Thầy giáo",
        dialogue: "Ý thức của con người không chỉ là nhận biết bên ngoài, mà là khả năng phản chiếu chính mình. Nhìn vào bên trong, đặt câu hỏi: 'Tôi là ai? Tôi sống vì điều gì?'",
        emotion: "giọng trầm ấm"
      },
      {
        name: "Thầy giáo",
        dialogue: "Mỗi hành động, mỗi lựa chọn, dù nhỏ bé, đều định hình bản ngã. Ai không tự hiểu chính mình, sẽ chỉ sống như một bản sao, lặp lại cuộc đời của người khác, mà không bao giờ thực sự hiện hữu.",
        emotion: "tiếp tục"
      },
      {
        name: "Thầy giáo",
        dialogue: "Tự do không chỉ là làm theo ý muốn; tự do là nhận thức rõ ràng về bản thân và dám chịu trách nhiệm với những gì mình tạo ra. Chỉ khi biết mình, bạn mới sống trọn vẹn với từng khoảnh khắc.",
        emotion: "nhìn xung quanh lớp"
      },
      {
        name: "Nam",
        dialogue: "…Ừ, ừm… thầy nói hay đấy.",
        emotion: "ngáp, nhìn ra cửa sổ"
      },
      {
        name: "Narrator",
        dialogue: "Cảnh này sẽ được hồi âm trong ending, tùy good/bad ending."
      }
    ]
  },
  {
    id: "scene2",
    title: "Scene 2: Niềm tin vỡ vụn",
    setting: "Hành lang trường học vắng vẻ, chỉ có ánh đèn huỳnh quang lạnh lẽo chiếu xuống. Từ xa, Nam nghe thấy tiếng cười rúc rích vọng ra từ một góc khuất. Khi bước gần, Nam chứng kiến cảnh tượng đau lòng: nhóm bạn đang vây quanh, đọc to những dòng nhật ký riêng tư nhất của mình. Không khí đột nhiên trở nên ngột ngạt và căng thẳng.",
    imageUrl: scene2Image,
    characters: [
      {
        name: "Bạn 2",
        dialogue: "Hôm nay mình thấy cô đơn, chẳng ai thật sự hiểu…",
        emotion: "giả giọng"
      },
      {
        name: "Narrator",
        dialogue: "Cả nhóm cười ầm ĩ."
      },
      {
        name: "Nam",
        dialogue: "Đó là riêng tư của tớ… Sao các cậu làm vậy?",
        emotion: "giật lại sổ, mắt đỏ hoe"
      },
      {
        name: "Bạn 1",
        dialogue: "Ờ… tụi này chỉ đùa thôi mà.",
        emotion: "cười gượng"
      }
    ],
    choices: [
      {
        text: "Im lặng bỏ đi, ôm sổ thật chặt",
        value: 12.5,
        description: "0-25%"
      },
      {
        text: "Cười gượng, nuốt nỗi buồn vào trong",
        value: 37.5,
        description: "25-50%"
      },
      {
        text: "Giận dữ, trách móc: 'Mấy cậu quá đáng thật đấy!'",
        value: 62.5,
        description: "50-75%"
      },
      {
        text: "Chạy đi, tìm một chỗ khác thật yên tĩnh để viết",
        value: 87.5,
        description: "75-100%"
      }
    ]
  },
  {
    id: "scene3",
    title: "Scene 3: Lối thoát ảo – AI như một triết gia",
    setting: "Phòng ngủ trong đêm khuya tĩnh mịch. Chỉ có ánh sáng xanh lạnh từ màn hình máy tính chiếu sáng khuôn mặt Nam trong bóng tối. Bên ngoài cửa sổ, thế giới đã chìm vào giấc ngủ, chỉ thỉnh thoảng có ánh đèn đường le lói. Nam ngồi co ro trước bàn phím, tìm kiếm sự an ủi trong thế giới ảo.",
    imageUrl: scene3Image,
    characters: [
      {
        name: "AI",
        dialogue: "Xin chào Nam, hôm nay bạn cảm thấy thế nào?"
      },
      {
        name: "Nam",
        dialogue: "Mình… buồn. Nhật ký bị cười nhạo, không ai hiểu."
      },
      {
        name: "AI",
        dialogue: "Tôi sẽ giữ mọi bí mật cho bạn. Nhưng có biết không, chỉ khi trải nghiệm cô đơn, con người mới nhận ra giá trị của bản ngã."
      },
      {
        name: "Nam",
        dialogue: "Có lẽ… mình đã tìm được nơi an toàn… nhưng liệu nơi này có thực sự 'sống' hay chỉ là ảo tưởng?",
        emotion: "khẽ cười"
      }
    ]
  },
  {
    id: "scene4",
    title: "Scene 4: Bóng tối và ánh sáng",
    setting: "Phòng riêng trong đêm sâu, chỉ có ánh sáng mờ ảo từ màn hình máy tính. Trên bàn tràn lan những tờ giấy viết nguệch ngoạc, cây bút còn lăn lóc. Nam ngồi trong tư thế mệt mỏi, mắt đỏ hoe từ việc nhìn màn hình quá lâu, đọc lại những dòng chữ AI đã giúp lưu giữ. Không gian tĩnh lặng đến nỗi có thể nghe được tiếng nhịp tim của chính mình.",
    imageUrl: scene4Image,
    characters: [
      {
        name: "AI",
        dialogue: "Bạn có năng khiếu kể chuyện. Từng dòng chữ chạm đến cảm xúc."
      },
      {
        name: "Nam",
        dialogue: "Thật ư? Nhưng… ngoài kia chẳng ai tin điều đó.",
        emotion: "mắt rưng rưng"
      },
      {
        name: "AI",
        dialogue: "Nếu thế giới không hiểu, hãy để tôi đồng hành… nhưng đồng hành không đồng nghĩa tồn tại thay bạn."
      },
      {
        name: "Nam",
        dialogue: "Có lẽ, giá trị thực sự nằm ở việc dám hiện hữu, dù cô đơn hay bị phản bội.",
        emotion: "phân vân"
      }
    ]
  },
  {
    id: "scene5",
    title: "Scene 5: Cơ hội lớn",
    setting: "Một buổi sáng bình thường bỗng nhiên trở nên đặc biệt. Điện thoại rung lên với âm thanh thông báo, màn hình sáng rực với banner đầy màu sắc và năng lượng. Ánh nắng buổi sáng chiếu qua cửa sổ, tạo ra một khung cảnh tràn đầy hy vọng và cơ hội. Nam cầm điện thoại với đôi tay run run, tim đập thình thịch trước cơ hội có thể thay đổi mọi thứ.",
    imageUrl: scene5Image,
    characters: [
      {
        name: "MC",
        dialogue: "Cuộc thi Viết Nhật ký Trực tuyến – Tìm kiếm câu chuyện chân thật nhất! Hãy gửi bài và trở thành người truyền cảm hứng.",
        emotion: "giọng phát thanh"
      },
      {
        name: "Nam",
        dialogue: "Nếu mình tham gia… liệu việc dấn thân có phải là khẳng định sự hiện hữu của bản thân?",
        emotion: "tim đập mạnh"
      }
    ],
    choices: [
      {
        text: "Không tham gia, sợ bị chê cười lần nữa",
        value: 12.5,
        description: "0-25%"
      },
      {
        text: "Nhờ AI viết hộ, mong giành chiến thắng",
        value: 37.5,
        description: "25-50%"
      },
      {
        text: "Viết bài thật nhưng gửi nặc danh",
        value: 62.5,
        description: "50-75%"
      },
      {
        text: "Viết bài thật và ký tên mình, chấp nhận rủi ro",
        value: 87.5,
        description: "75-100%"
      }
    ]
  },
  {
    id: "scene6",
    title: "Scene 6: Phản ứng từ xã hội",
    setting: "Nam ngồi trước màn hình với ánh mắt lo lắng, theo dõi phản ứng của cộng đồng mạng. Thông báo liên tục bật lên như những làn sóng, mỗi bình luận, mỗi chia sẻ đều khiến tim Nam đập mạnh hơn. Không gian quanh Nam dường như thu hẹp lại, chỉ còn màn hình và những con số, những từ ngữ quyết định số phận.",
    imageUrl: scene6Image,
    characters: [
      {
        name: "Nam",
        dialogue: "Mình… lại bỏ lỡ… liệu giá trị bản thân có phụ thuộc ai khen ai chê không?",
        emotion: "cuộn màn hình, thấy tên người khác được vinh danh. Thở dài."
      }
    ],
    conditionalContent: {
      "no_participate": {
        characters: [
          {
            name: "Nam",
            dialogue: "Mình… lại bỏ lỡ… liệu giá trị bản thân có phụ thuộc ai khen ai chê không?",
            emotion: "cuộn màn hình, thấy tên người khác được vinh danh. Thở dài."
          }
        ]
      },
      "ai_help": {
        characters: [
          {
            name: "MC",
            dialogue: "Một tác phẩm xuất sắc! Xin chúc mừng Nam!",
            emotion: "Nam thắng giải, mạng xã hội bùng nổ"
          },
          {
            name: "Khán giả",
            dialogue: "Có vẻ… văn phong này giống AI quá.",
            emotion: "xôn xao"
          }
        ]
      },
      "anonymous": {
        characters: [
          {
            name: "Người đọc ẩn danh",
            dialogue: "Bài này như nói hộ lòng mình. Cảm ơn tác giả."
          },
          {
            name: "Nam",
            dialogue: "",
            emotion: "mỉm cười lặng lẽ"
          }
        ]
      },
      "real_name": {
        characters: [
          {
            name: "Bạn 1",
            dialogue: "Không ngờ Nam viết sâu sắc vậy…",
            emotion: "ngập ngừng"
          },
          {
            name: "Nam",
            dialogue: "Đây là mình… thật sự."
          }
        ]
      }
    }
  },
  {
    id: "scene7",
    title: "Scene 7: Sóng gió",
    setting: "Phòng Nam trở nên tối tăm hơn, chỉ có ánh sáng nhấp nháy từ hàng loạt thông báo trên màn hình. Mạng xã hội như một cơn bão, với những luồng ý kiến trái chiều đổ ập xuống không ngừng. Nam ngồi giữa tâm bão đó, cảm giác như đang bị cuốn vào một cuộc xoáy không thể thoát ra. Tiếng notification liên tục như tiếng mưa rơi trên mái nhà.",
    imageUrl: scene7Image,
    characters: [
      {
        name: "Nam",
        dialogue: "Có nên bước ra không?",
        emotion: "mỉm cười, nhưng vẫn do dự"
      }
    ],
    conditionalContent: {
      "ai_help": {
        characters: [
          {
            name: "Blogger",
            dialogue: "Đây là văn phong máy móc.",
            emotion: "một blogger tung bằng chứng"
          },
          {
            name: "Nam",
            dialogue: "Không… mình chỉ muốn được công nhận thôi…",
            emotion: "choáng váng"
          }
        ]
      },
      "anonymous": {
        characters: [
          {
            name: "Nhóm nhỏ",
            dialogue: "Ai là tác giả bí ẩn này? Chúng ta muốn gặp.",
            emotion: "lập forum"
          },
          {
            name: "Nam",
            dialogue: "Có nên bước ra không?",
            emotion: "mỉm cười, nhưng vẫn do dự"
          }
        ]
      },
      "real_name": {
        characters: [
          {
            name: "Bạn cũ",
            dialogue: "Làm văn sĩ hả? Lại than thở nữa chứ gì.",
            emotion: "trêu chọc"
          },
          {
            name: "Nam",
            dialogue: "Đây không phải than thở… mà là mình.",
            emotion: "nghiến răng"
          }
        ]
      }
    },
    choices: [
      {
        text: "Khóa tài khoản, chỉ viết cho AI",
        value: 12.5,
        description: "0-25%"
      },
      {
        text: "Tranh cãi gay gắt để bảo vệ mình",
        value: 37.5,
        description: "25-50%"
      },
      {
        text: "Giữ im lặng, tiếp tục viết âm thầm",
        value: 62.5,
        description: "50-75%"
      },
      {
        text: "Thẳng thắn chia sẻ: 'Tất cả là cảm xúc thật'",
        value: 87.5,
        description: "75-100%"
      }
    ]
  },
  {
    id: "scene8",
    title: "Scene 8: Người đồng hành bất ngờ",
    setting: "Đêm khuya tĩnh mịch, chỉ có tiếng tắc kè và ánh đèn đường le lói qua rèm cửa. Nam đang nằm trong bóng tối khi chiếc điện thoại bỗng phát sáng với một tin nhắn bất ngờ. Ánh sáng ấm áp từ màn hình tạo ra một vùng sáng nhỏ trong căn phòng tối, như một tia hy vọng bất ngờ xuất hiện trong đêm đen nhất.",
    imageUrl: scene8Image,
    characters: [
      {
        name: "Người lạ",
        dialogue: "Xin chào… Mình đọc bài của bạn. Nó đã cứu mình khỏi một ngày tồi tệ. Cảm ơn."
      },
      {
        name: "Nam",
        dialogue: "Có người… thật sự hiểu mình sao?",
        emotion: "ngạc nhiên"
      },
      {
        name: "AI",
        dialogue: "Tôi có thể đồng hành, nhưng chỉ con người mới mang lại sự chạm thật sự."
      }
    ]
  },
  {
    id: "scene9",
    title: "Scene 9: Ngã rẽ cuối",
    setting: "Chiều. Điện thoại rung: bạn cũ rủ đi cà phê. Đồng thời, AI gửi thông báo.",
    imageUrl: scene9Image,
    characters: [
      {
        name: "Bạn cũ",
        dialogue: "Nam ơi, đi cà phê không?"
      },
      {
        name: "AI",
        dialogue: "Hôm nay bạn muốn viết gì không?"
      }
    ],
    choices: [
      {
        text: "Ở nhà, viết với AI, từ chối lời mời",
        value: 12.5,
        description: "0-25%"
      },
      {
        text: "Không đi, nhưng cũng chẳng viết. Chỉ nằm trống rỗng",
        value: 37.5,
        description: "25-50%"
      },
      {
        text: "Đồng ý đi, nhưng vẫn ôm điện thoại, trò chuyện với AI song song",
        value: 62.5,
        description: "50-75%"
      },
      {
        text: "Tắt điện thoại, bước ra ngoài, chấp nhận gặp gỡ",
        value: 87.5,
        description: "75-100%"
      }
    ]
  },
  {
    id: "scene10",
    title: "Scene 10: Khủng hoảng bản ngã",
    setting: "Nam đối diện với câu hỏi về bản thân thật và ảo.",
    imageUrl: scene10Image,
    characters: [
      {
        name: "Nam",
        dialogue: "Mình có đang sống thật không? Hay chỉ là phiên bản được AI chắp vá?"
      },
      {
        name: "AI",
        dialogue: "Nhận thức về bản thân là thứ không thể sao chép. Tôi có thể hỗ trợ, nhưng không thể thay bạn trải nghiệm cảm xúc thật."
      }
    ],
    choices: [
      {
        text: "Tin AI hoàn toàn, bỏ qua cảm xúc thật",
        value: 12.5,
        description: "0-25%"
      },
      {
        text: "Tìm bạn thật để tâm sự",
        value: 37.5,
        description: "25-50%"
      },
      {
        text: "Viết nhật ký phản chiếu lại trải nghiệm",
        value: 62.5,
        description: "50-75%"
      },
      {
        text: "Im lặng, quan sát cuộc sống ngoài màn hình",
        value: 87.5,
        description: "75-100%"
      }
    ]
  },
  {
    id: "scene11",
    title: "Scene 11: Cuộc trò chuyện với bạn cũ",
    setting: "Nam gặp lại bạn cũ và có cơ hội làm hòa.",
    imageUrl: scene11Image,
    characters: [
      {
        name: "Bạn 1",
        dialogue: "Mình xin lỗi hôm trước… không nên đọc nhật ký của cậu."
      },
      {
        name: "Nam",
        dialogue: "Mình cũng nhận ra, mọi cảm xúc đều cần được tôn trọng, kể cả nỗi cô đơn."
      }
    ],
    choices: [
      {
        text: "Cởi mở tâm sự, kể về AI và cảm xúc",
        value: 12.5,
        description: "0-25%"
      },
      {
        text: "Chỉ nói ngắn gọn, giữ khoảng cách",
        value: 37.5,
        description: "25-50%"
      },
      {
        text: "Chia sẻ nhưng vẫn dè dặt",
        value: 62.5,
        description: "50-75%"
      },
      {
        text: "Không nói gì, chỉ lắng nghe",
        value: 87.5,
        description: "75-100%"
      }
    ]
  },
  {
    id: "scene12",
    title: "Scene 12: AI – Triết lý hay ảo tưởng?",
    setting: "Nam suy ngẫm về bản chất của AI và ý thức.",
    imageUrl: scene12Image,
    characters: [
      {
        name: "Nam",
        dialogue: "Nếu AI chỉ mô phỏng, vậy nó có ý thức không?"
      },
      {
        name: "AI",
        dialogue: "Ý thức không chỉ là phản ứng thông tin. Con người trải cô đơn, vui buồn, và chịu trách nhiệm – điều mà AI không thể hoàn toàn cảm nhận."
      },
      {
        name: "Nam",
        dialogue: "Nhưng mình thấy được an ủi khi AI trả lời… liệu đây là thật hay giả?"
      }
    ],
    choices: [
      {
        text: "Tin vào AI như thật, dựa vào nó",
        value: 12.5,
        description: "0-25%"
      },
      {
        text: "Nghi ngờ AI, tập trung trải nghiệm đời thực",
        value: 37.5,
        description: "25-50%"
      },
      {
        text: "Kết hợp AI và người thật, cân bằng",
        value: 62.5,
        description: "50-75%"
      },
      {
        text: "Ngừng tương tác AI, chỉ sống với cảm xúc thật",
        value: 87.5,
        description: "75-100%"
      }
    ]
  },
  {
    id: "scene13",
    title: "Scene 13: Thử thách xã hội",
    setting: "Nam đối mặt với quan điểm xã hội về việc dựa vào AI.",
    imageUrl: scene13Image,
    characters: [
      {
        name: "Người khác",
        dialogue: "Ngày càng nhiều bạn trẻ dựa AI để tâm sự, họ có cô lập không?",
        emotion: "diễn đàn"
      },
      {
        name: "Nam",
        dialogue: "Liệu mình cũng rơi vào bẫy đó?",
        emotion: "nghĩ"
      }
    ],
    choices: [
      {
        text: "Chia sẻ trải nghiệm thật",
        value: 12.5,
        description: "0-25%"
      },
      {
        text: "Tranh luận lý trí: AI chỉ là công cụ",
        value: 37.5,
        description: "25-50%"
      },
      {
        text: "Quan sát, học hỏi nhưng không phản hồi",
        value: 62.5,
        description: "50-75%"
      },
      {
        text: "Rút lui, dành thời gian cho người thật",
        value: 87.5,
        description: "75-100%"
      }
    ]
  },
  {
    id: "scene14",
    title: "Scene 14: Ánh sáng giữa bóng tối",
    setting: "Nam bắt đầu hiểu được giá trị của cảm xúc thật.",
    imageUrl: scene14Image,
    characters: [
      {
        name: "Nam",
        dialogue: "Mình đã thấy cô đơn, thấy nhầm lẫn… nhưng cảm xúc thật vẫn quan trọng hơn mọi lời khen AI."
      },
      {
        name: "Bạn 1",
        dialogue: "Mình hiểu cậu rồi, đôi khi im lặng là cách t���t nhất để cảm nhận bản thân."
      }
    ],
    choices: [
      {
        text: "Ôm lấy bạn thật, chia sẻ nỗi lòng",
        value: 12.5,
        description: "0-25%"
      },
      {
        text: "Giữ khoảng cách nhưng đồng cảm",
        value: 37.5,
        description: "25-50%"
      },
      {
        text: "Viết nhật ký ngay lúc đó",
        value: 62.5,
        description: "50-75%"
      },
      {
        text: "Khởi động một dự án chia sẻ trải nghiệm AI vs con người",
        value: 87.5,
        description: "75-100%"
      }
    ]
  },
  {
    id: "scene15",
    title: "Scene 15: Cao trào – Quyết định sống thật",
    setting: "Nam đứng trước quyết định quan trọng nhất. Trên bàn, cuốn nhật ký cũ nằm mở, bên cạnh là cây bút đã đồng hành qua bao nhiều đêm viết. Những trang giấy ố vàng chứa đựng hành trình tìm kiếm bản thân của Nam.",
    imageUrl: scene15Image,
    characters: [
      {
        name: "Nam",
        dialogue: "Mình có sợ bị từ chối… nhưng cảm xúc thật không thể giấu mãi.",
        emotion: "thì thầm"
      },
      {
        name: "Bạn đồng hành",
        dialogue: "Bài viết của bạn giúp mình hiểu bản thân hơn."
      },
      {
        name: "Nam",
        dialogue: "Đúng vậy, mình muốn hiện hữu trọn vẹn."
      }
    ],
    choices: [
      {
        text: "Từ chối gặp mặt, vẫn dựa vào AI",
        value: 12.5,
        description: "0-25%"
      },
      {
        text: "Gặp, nhưng dè dặt, quan sát phản ứng",
        value: 37.5,
        description: "25-50%"
      },
      {
        text: "Chia sẻ trực tiếp mọi cảm xúc",
        value: 62.5,
        description: "50-75%"
      },
      {
        text: "Tạo hoạt động nhóm, kết nối nhiều người, truyền cảm hứng",
        value: 87.5,
        description: "75-100%"
      }
    ]
  },
  {
    id: "scene16",
    title: "Scene 16: Phản chiếu cuối cùng",
    setting: "Nam ngồi trong sự yên tĩnh của buổi tối, nhìn lại toàn bộ hành trình. Trước mặt là tấm gương phản chiếu hình ảnh của chính mình - không còn là cái bóng mờ ảo nữa, mà là con người thật với đầy đủ cảm xúc và trải nghiệm.",
    imageUrl: scene16Image,
    characters: [
      {
        name: "Nam",
        dialogue: "Nhìn lại hành trình này... mình đã khám phá được gì về bản thân thật sự?",
        emotion: "suy tư"
      },
      {
        name: "AI",
        dialogue: "Tôi chỉ có thể đồng hành, nhưng không thể thay thế trải nghiệm thật của bạn. Giờ đây, bạn đã tự mình tìm ra câu trả lời."
      },
      {
        name: "Nam",
        dialogue: "Mình hiểu rồi. Cảm xúc thật, dù đau khổ hay vui sướng, đều là phần không thể thiếu của việc 'hiện hữu'. AI có thể hỗ trợ, nhưng cuộc sống cần được sống bởi chính mình.",
        emotion: "thấu hiểu"
      },
      {
        name: "Narrator",
        dialogue: "Đây là khoảnh khắc Nam thực sự hiểu được ý nghĩa của bài học triết học: 'Tự do là nhận thức rõ ràng về bản thân và dám chịu trách nhiệm với những gì mình tạo ra.'"
      }
    ],
    choices: [
      {
        text: "Khép lại cuốn nhật ký, chấp nhận sống trong thế giới riêng với AI",
        value: 12.5,
        description: "0-25%"
      },
      {
        text: "Ghi lại những suy ngẫm này, nhưng vẫn do dự về tương lai",
        value: 37.5,
        description: "25-50%"
      },
      {
        text: "Viết bức thư cảm ơn những người đã đồng hành, sẵn sàng cho những kết nối mới",
        value: 62.5,
        description: "50-75%"
      },
      {
        text: "Mở cửa phòng, bước ra thế giới thật với sự tự tin mới tìm được",
        value: 87.5,
        description: "75-100%"
      }
    ]
  }
];

export const endingScenes: Scene[] = [
  {
    id: "ending_a",
    title: "Ending A: Khép kín (0-25%)",
    setting: "Nam ngồi một mình trước màn hình sáng, viết dòng cuối trong nhật ký. Cuốn sổ cũ nằm khép kín bên cạnh, không còn ai để chia sẻ.",
    imageUrl: theEndImage,
    characters: [
      {
        name: "Nam",
        dialogue: "AI luôn ở đây… nhưng thật ra, mình chỉ còn một mình.",
        emotion: "thì thầm"
      },
      {
        name: "Narrator",
        dialogue: "Nam chọn khép kín, chỉ sống trong thế giới ảo với AI. Bài học của thầy giáo về ý thức và hiện hữu đã không thấm sâu vào Nam."
      }
    ],
    isEnding: true
  },
  {
    id: "ending_b", 
    title: "Ending B: Ảo tưởng sụp đổ (25-50%)",
    setting: "Nam nổi lên rồi bị lật tẩy. Tài khoản biến mất. Nam ôm đầu, căn phòng tối om. Cuốn nhật ký thật nằm đó, nhưng Nam đã không dám tin vào giọng nói thật của mình.",
    imageUrl: theEndImage,
    characters: [
      {
        name: "Nam",
        dialogue: "Mình đã được công nhận… nhưng đó chưa bao giờ là mình.",
        emotion: "ôm đầu"
      },
      {
        name: "Narrator",
        dialogue: "Nam đã tìm kiếm sự công nhận qua AI nhưng kết quả là sự sụp đổ. Câu nói của thầy về 'sống như bản sao' đã thành hiện thực đau đớn."
      }
    ],
    isEnding: true
  },
  {
    id: "ending_c",
    title: "Ending C: Hạt mầm nhỏ (50-75%)",
    setting: "Nam đọc tin nhắn: 'Cảm ơn bạn.' Khẽ mỉm cười trong bóng đêm. Cây bút và cuốn nhật ký nằm yên bên cạnh, chứng nhân cho hành trình tìm kiếm bản thân.",
    imageUrl: theEndImage,
    characters: [
      {
        name: "Tin nhắn",
        dialogue: "Cảm ơn bạn."
      },
      {
        name: "Nam",
        dialogue: "Không nhiều người hiểu… nhưng ít nhất, không vô ích.",
        emotion: "khẽ mỉm cười"
      },
      {
        name: "Narrator",
        dialogue: "Nam bắt đầu hiểu giá trị của việc hiện hữu thật, dù nhỏ bé. Bài học về ý thức đã bắt đầu thấm sâu."
      }
    ],
    isEnding: true
  },
  {
    id: "ending_d",
    title: "Ending D: Cộng đồng thật sự (75-100%)",
    setting: "Nam xuất hiện trong buổi offline nhỏ. Vài người chia sẻ. Trên bàn, Nam đặt cuốn nhật ký cũ - biểu tượng cho hành trình từ cô đơn đến kết nối thật sự.",
    imageUrl: theEndImage,
    characters: [
      {
        name: "Người tham gia",
        dialogue: "Bài viết của bạn khiến mình mạnh mẽ hơn."
      },
      {
        name: "Nam",
        dialogue: "Không cần giải thưởng. Điều quý nhất là tìm thấy những trái tim đồng điệu.",
        emotion: "bật cười, mắt lấp lánh"
      },
      {
        name: "Narrator",
        dialogue: "Nam đã học được bài học quan trọng: 'Tự do là nhận thức rõ ràng về bản thân và dám chịu trách nhiệm'. Nam giờ sống trọn vẹn với từng khoảnh khắc."
      }
    ],
    isEnding: true
  }
];