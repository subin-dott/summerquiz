import { useState, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Nanum+Myeongjo:wght@400;700;800&family=DM+Serif+Display:ital@0;1&display=swap');`;

const QUESTIONS = [
  {
    id: 1, q: "오늘은 주말! 내가 가야 할 곳은?", emoji: "🌤️",
    options: [
      { text: "셰필드 학생들의 첫 수업 🚌🎓", type: "jjurang" },
      { text: "침대에 눕는다 . . 🛌", type: "gamseong" },
    ],
  },
  {
    id: 2, q: "어떤 걸 타고 갈까?", emoji: "🚉",
    options: [
      { text: '"열차가 곧 출발하겠구만 그래~" 서둘러 기차를 탄다! 🚂', type: "jjurang" },
      { text: '"나도 택시탈 자격 있어!" 용감하게 택시를 탄다! 🚕', type: "gamseong" },
    ],
  },
  {
    id: 3, q: "대학로 도착! 이제 어디로 갈까?", emoji: "🗺️",
    options: [
      { text: "카메라 챙겨서 링크아트센터로 달려가기 📸🏃", type: "jjurang" },
      { text: "Imbibe! 포쉬답게 음주하러 텐트가기 🥃😎", type: "gamseong" },
    ],
  },
  {
    id: 4, q: "공연 전까지 뭘 할까?", emoji: "🎭",
    options: [
      { text: "캐보 찍어 트위터에 올리기 🤳✨", type: "jjurang" },
      { text: "최강한화 응원가 듣기 ⚾️🎶", type: "gamseong" },
    ],
  },
  {
    id: 5, q: "밸런스 게임을 해보자!", emoji: "🎤",
    options: [
      { text: "밤티 착장이지만 120분 내내 무대에 존재 🧩", type: "jjurang" },
      { text: "최애 착장인데 분량 30분 💦", type: "gamseong" },
    ],
  },
  {
    id: 6, q: "더 좋아하는 쮸스너의 대사는?", emoji: "🌹",
    options: [
      { text: "선생님도 선생님의 삶을 돌아보세요?", type: "jjurang" },
      { text: "선생님, 저는 행복하진 않지만 불행하지도 않아요.", type: "gamseong" },
    ],
  },
  {
    id: 7, q: "공연이 끝나고 인스타 알림이 왔다! 어떤 알림일까?", emoji: "🔔",
    options: [
      { text: "동그라미의 바보 안경 셀카 🤓", type: "jjurang" },
      { text: "천재 포스너의 마테 영상 🎧", type: "gamseong" },
    ],
  },
  {
    id: 8, q: "마지막 질문! 최애 지우 필모는?", emoji: "⭐",
    options: [
      { text: "지우 조반니 🌌", type: "jjurang" },
      { text: "지우 클로드 🕯️", type: "gamseong" },
      { text: "지우 포스너 📚", type: "jjurang" },
    ],
  },
];

const RESULTS = {
  jjurang: {
    tag: "쮸랑형",
    subtitle: "대학로 최수종",
    emoji: "💖",
    color: "#E8624A",
    colorLight: "#F4957F",
    bg: "#FFF5F3",
    border: "#FFD4CC",
    desc: "지우가 웃으면 세상이 환해지는 # menow = 지우진짜좋아 상태! 언제나 한결같은 마음으로 아낌없이 칭찬해요 🫳🫳🫳 동그라미 최고! 💌",
    traits: [
      { icon: "🏆", text: "지구에서 동그라미 가장 잘 쓰다듬는 사람 1위" },
      { icon: "😭", text: "됐어요 ... 저 쮸랑단 됐어요 !!!" },
      { icon: "😻", text: "지우님 칭찬 무한 제공합니다 ♡" },
    ],
    giftTitle: "쮸랑단을 위한 선물 🎟️",
    giftCode: "HISTORY-JIWOO-2025",
    giftLink: "https://m.yes24.com/MyPage/Ticket",
  },
  gamseong: {
    tag: "쮸랑형",
    subtitle: "대학로 최수종",
    emoji: "🌿",
    color: "#4D8A68",
    colorLight: "#78B897",
    bg: "#F3FAF5",
    border: "#B8E0C8",
    desc: "복복복 열심히 동그라미를 굴려요!! (두쫀쮸 데굴데굴 🧆) 좋아하는 포인트가 확실하고 정확한 타입! 쮸얘 필리버스터 무한 제공합니다 💥",
    traits: [
      { icon: "😽", text: "어떤 작품이라도 한결같이 아껴요 ♡" },
      { icon: "🚶‍♂️", text: "갈테야 갈테야 지우님 공연보러 갈테야" },
      { icon: "🫥", text: "지우 힘내 지우 밥많이먹어 지우 화이팅!!!" },
    ],
    giftTitle: "쮸랑단을 위한 선물 🎟️",
    giftCode: "HISTORY-JIWOO-2025",
    giftLink: "https://m.yes24.com/MyPage/Ticket",
  },
};

function StarProgress({ total, filled, color }) {
  return (
    <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} style={{
          fontSize: "13px",
          color: i < filled ? color : "#EAD9D2",
          transition: "color 0.3s ease",
          lineHeight: 1,
        }}>★</span>
      ))}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [qIdx, setQIdx] = useState(0);
  const [scores, setScores] = useState({ jjurang: 0, gamseong: 0 });
  const [chosen, setChosen] = useState(null);
  const [busy, setBusy] = useState(false);
  const [cardKey, setCardKey] = useState(0);
  const [resultType, setResultType] = useState(null);
  const [codeOpen, setCodeOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const answer = (type) => {
    if (busy) return;
    setChosen(type);
    setBusy(true);
    setTimeout(() => {
      const next = { ...scores, [type]: scores[type] + 1 };
      setScores(next);
      setChosen(null);
      setBusy(false);
      setCardKey(k => k + 1);
      if (qIdx + 1 >= QUESTIONS.length) {
        const winner = next.jjurang >= next.gamseong ? "jjurang" : "gamseong";
        setResultType(winner);
        setScreen("result");
      } else {
        setQIdx(i => i + 1);
      }
    }, 520);
  };

  const reset = () => {
    setScreen("intro"); setQIdx(0);
    setScores({ jjurang: 0, gamseong: 0 });
    setChosen(null); setResultType(null);
    setCodeOpen(false); setCopied(false); setCardKey(0);
  };

  const result = resultType ? RESULTS[resultType] : null;

  const bgStyle = screen === "result" && result
    ? `radial-gradient(ellipse at 60% 0%, ${result.bg} 0%, #FDF9F5 100%)`
    : "radial-gradient(ellipse at 50% -10%, #FFF0E8 0%, #FDF5EE 50%, #FAF0F8 100%)";

  return (
    <div style={{
      minHeight: "100vh",
      background: bgStyle,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "28px 16px 56px",
      transition: "background 0.9s ease",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes bloom {
          0%   { opacity: 0; transform: scale(0.86); }
          65%  { transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes twinkle {
          0%,100% { opacity: 0.15; transform: scale(0.7) rotate(0deg); }
          50%     { opacity: 0.7;  transform: scale(1.1) rotate(180deg); }
        }
        @keyframes stampIn {
          0%   { transform: scale(1.15); opacity: 0.6; }
          100% { transform: scale(1);    opacity: 1; }
        }

        .intro-wrap   { animation: fadeUp 0.65s ease both; }
        .card-wrap    { animation: fadeUp 0.38s ease both; }
        .result-wrap  { animation: bloom 0.55s cubic-bezier(.22,1,.36,1) both; }

        .opt {
          cursor: pointer;
          transition: transform 0.14s ease, box-shadow 0.14s ease, border-color 0.2s, background 0.2s, color 0.2s;
          -webkit-tap-highlight-color: transparent;
          background: none;
          text-align: left;
        }
        .opt:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.08); }
        .opt:active { transform: scale(0.97); }

        .start-btn {
          cursor: pointer;
          transition: transform 0.14s ease, box-shadow 0.14s ease;
        }
        .start-btn:hover { transform: translateY(-2px); }
        .start-btn:active { transform: scale(0.97); }
      `}</style>

      {/* 배경 반짝이 */}
      {[...Array(14)].map((_, i) => (
        <div key={i} style={{
          position: "fixed",
          width: `${3 + (i % 4) * 2}px`,
          height: `${3 + (i % 4) * 2}px`,
          borderRadius: "50%",
          background: ["#FFD4CC","#FFE4B2","#C8E6C2","#FFD1E8","#C8DCFF"][i % 5],
          top: `${(i * 13 + 7) % 92}%`,
          left: `${(i * 19 + 5) % 93}%`,
          animation: `twinkle ${2.2 + i * 0.35}s ease-in-out ${i * 0.25}s infinite`,
          pointerEvents: "none",
        }} />
      ))}

      {/* ──────── INTRO ──────── */}
      {screen === "intro" && (
        <div className="intro-wrap" style={{ textAlign: "center", maxWidth: "400px", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: "italic",
            fontSize: "13px",
            letterSpacing: "3px",
            color: "#C49888",
            marginBottom: "14px",
          }}>
            ✦ &nbsp; ♡ 나는 어떤 쮸랑단일까 ♡ &nbsp; ✦
          </div>

          <div style={{
            background: "white",
            borderRadius: "28px",
            padding: "40px 32px 36px",
            boxShadow: "0 3px 0 #EDD8CE, 0 20px 60px rgba(160,100,80,0.09)",
            border: "1.5px solid #F2E2D8",
            position: "relative",
          }}>
            {["top:14px;left:16px","top:14px;right:16px","bottom:14px;left:16px","bottom:14px;right:16px"].map((s, i) => (
              <span key={i} style={{
                position: "absolute",
                ...Object.fromEntries(s.split(";").map(p => { const [k,v] = p.split(":"); return [k,v]; })),
                fontSize: "9px", color: "#E0C8BE", userSelect: "none", lineHeight: 1,
              }}>✦</span>
            ))}

            <div style={{ fontSize: "54px", marginBottom: "18px", animation: "floatY 3.2s ease-in-out infinite", lineHeight: 1, display: "block" }}>
              🌸
            </div>

            <p style={{
              fontFamily: "'DM Serif Display', serif",
              fontStyle: "italic",
              fontSize: "12px",
              color: "#C49888",
              letterSpacing: "2px",
              marginBottom: "10px",
            }}>
              for. 오늘도 동그라미를 쓰다듬는 횽님께
            </p>

            <h1 style={{
              fontFamily: "'Nanum Myeongjo', serif",
              fontWeight: "800",
              fontSize: "24px",
              color: "#2A1608",
              lineHeight: 1.5,
              marginBottom: "14px",
            }}>
              <span style={{ color: "#E8624A" }}>여름의</span> 하루 ✨
            </h1>

            <p style={{
              fontSize: "13px",
              color: "#9B7F72",
              lineHeight: 2.1,
              marginBottom: "28px",
            }}>
              8개의 질문으로 알아보는<br />나의 유형 💌
            </p>

            <button
              className="start-btn"
              onClick={() => setScreen("quiz")}
              style={{
                background: "linear-gradient(135deg, #E8624A 0%, #F09882 100%)",
                color: "white",
                border: "none",
                borderRadius: "100px",
                padding: "14px 38px",
                fontSize: "14px",
                fontWeight: "700",
                fontFamily: "'Gowun Dodum', serif",
                letterSpacing: "4px",
                boxShadow: "0 4px 0 #C04A36, 0 10px 28px rgba(232,98,74,0.22)",
              }}>
              S T A R T !
            </button>

            <p style={{ marginTop: "18px", fontSize: "11px", color: "#D4B8AE", letterSpacing: "1px" }}>
              ✦ &nbsp; 약 2~3분 소요 &nbsp; ✦
            </p>
          </div>
        </div>
      )}

      {/* ──────── QUIZ ──────── */}
      {screen === "quiz" && (
        <div style={{ width: "100%", maxWidth: "440px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <StarProgress total={QUESTIONS.length} filled={qIdx} color="#E8624A" />
            <p style={{ fontSize: "11px", color: "#C49888", marginTop: "8px", letterSpacing: "2px", fontFamily: "'DM Serif Display', serif" }}>
              {qIdx + 1} / {QUESTIONS.length}
            </p>
          </div>

          <div
            key={cardKey}
            className="card-wrap"
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "34px 26px 30px",
              boxShadow: "0 3px 0 #EDD8CE, 0 16px 48px rgba(160,100,80,0.09)",
              border: "1.5px solid #F2E2D8",
            }}
          >
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "#FFF2EE",
              border: "1px solid #FFCCC4",
              borderRadius: "100px",
              padding: "5px 14px",
              marginBottom: "20px",
            }}>
              <span style={{ fontSize: "14px", lineHeight: 1 }}>{QUESTIONS[qIdx].emoji}</span>
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "11px",
                color: "#E8624A",
                letterSpacing: "2px",
              }}>
                Q {String(qIdx + 1).padStart(2, "0")}
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Nanum Myeongjo', serif",
              fontWeight: "700",
              fontSize: "18px",
              color: "#2A1608",
              lineHeight: 1.65,
              marginBottom: "24px",
            }}>
              {QUESTIONS[qIdx].q}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {QUESTIONS[qIdx].options.map((opt, i) => {
                const isChosen = chosen === opt.type && QUESTIONS[qIdx].options.findIndex((o, j) => o.type === opt.type && j === i) === i;
                const active = busy && chosen === opt.type;
                return (
                  <button
                    key={i}
                    className="opt"
                    onClick={() => answer(opt.type)}
                    style={{
                      background: active ? "#FFF2EE" : "white",
                      border: `1.5px solid ${active ? "#E8624A" : "#EDE0D8"}`,
                      borderRadius: "14px",
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      fontFamily: "'Gowun Dodum', serif",
                      fontSize: "13.5px",
                      color: active ? "#E8624A" : "#3D2010",
                      lineHeight: 1.6,
                      width: "100%",
                      animation: active ? "stampIn 0.2s ease both" : "none",
                    }}
                  >
                    <span style={{
                      flexShrink: 0,
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: active ? "#E8624A" : "#FFF2EE",
                      border: `1.5px solid ${active ? "#E8624A" : "#FFCCC4"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "700",
                      color: active ? "white" : "#C49888",
                      transition: "all 0.2s",
                      fontFamily: "'DM Serif Display', serif",
                      marginTop: "1px",
                    }}>
                      {["①","②","③"][i]}
                    </span>
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ──────── RESULT ──────── */}
      {screen === "result" && result && (
        <div className="result-wrap" style={{ width: "100%", maxWidth: "440px", position: "relative", zIndex: 1 }}>
          <div style={{
            background: "white",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: `0 3px 0 ${result.border}, 0 20px 60px rgba(0,0,0,0.08)`,
            border: `1.5px solid ${result.border}`,
          }}>

            {/* 헤더 */}
            <div style={{
              background: `linear-gradient(160deg, ${result.bg} 0%, #FFFFFF 80%)`,
              borderBottom: `1.5px dashed ${result.border}`,
              padding: "34px 28px 28px",
              textAlign: "center",
            }}>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: "11px", letterSpacing: "4px", color: result.colorLight, marginBottom: "12px" }}>
                ✦ &nbsp; R E S U L T &nbsp; ✦
              </p>
              <div style={{ fontSize: "50px", marginBottom: "14px", animation: "floatY 3s ease-in-out infinite", lineHeight: 1 }}>
                {result.emoji}
              </div>
              <div style={{
                display: "inline-block",
                background: result.color,
                color: "white",
                borderRadius: "100px",
                padding: "4px 16px",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "3px",
                marginBottom: "10px",
                fontFamily: "'DM Serif Display', serif",
              }}>
                {result.tag}
              </div>
              <h2 style={{
                fontFamily: "'Nanum Myeongjo', serif",
                fontWeight: "800",
                fontSize: "21px",
                color: "#2A1608",
                marginBottom: "14px",
              }}>
                {result.subtitle}
              </h2>
              <p style={{ fontSize: "13px", color: "#7A6055", lineHeight: 2, maxWidth: "340px", margin: "0 auto" }}>
                {result.desc}
              </p>
            </div>

            {/* 특징 */}
            <div style={{ padding: "22px 24px 20px" }}>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: "11px", letterSpacing: "3px", color: "#C49888", marginBottom: "14px" }}>
                ✦ &nbsp; {result.tag}인 당신은 ..
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {result.traits.map((t, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "12px 14px",
                    background: result.bg,
                    borderRadius: "12px",
                    fontSize: "13px",
                    color: "#3D2010",
                    lineHeight: 1.65,
                    animation: `slideDown 0.4s ease ${0.1 + i * 0.12}s both`,
                  }}>
                    <span style={{ fontSize: "17px", flexShrink: 0, marginTop: "1px" }}>{t.icon}</span>
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 선물 코드 */}
            <div style={{
              borderTop: `1.5px dashed ${result.border}`,
              padding: "22px 24px 30px",
              textAlign: "center",
            }}>
              <p style={{
                fontFamily: "'DM Serif Display', serif",
                fontStyle: "italic",
                fontSize: "11px",
                letterSpacing: "3px",
                color: "#C49888",
                marginBottom: "18px",
              }}>
                🎁 &nbsp; 선물을 열어볼까요? &nbsp; 🎁
              </p>

              {!codeOpen ? (
                <button
                  className="start-btn"
                  onClick={() => setCodeOpen(true)}
                  style={{
                    background: `linear-gradient(135deg, ${result.color} 0%, ${result.colorLight} 100%)`,
                    color: "white",
                    border: "none",
                    borderRadius: "100px",
                    padding: "13px 34px",
                    fontSize: "15px",
                    fontWeight: "700",
                    fontFamily: "'Gowun Dodum', serif",
                    letterSpacing: "5px",
                    boxShadow: `0 4px 0 ${result.border}, 0 10px 24px rgba(0,0,0,0.08)`,
                  }}>
                  • • •
                </button>
              ) : (
                <div style={{ animation: "bloom 0.45s ease both" }}>
                  <h3 style={{
                    fontFamily: "'Nanum Myeongjo', serif",
                    fontWeight: "700",
                    fontSize: "15px",
                    color: "#2A1608",
                    marginBottom: "16px",
                  }}>
                    {result.giftTitle}
                  </h3>

                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(result.giftCode);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    style={{
                      background: result.bg,
                      border: `2px dashed ${result.color}`,
                      borderRadius: "14px",
                      padding: "16px 20px",
                      marginBottom: "14px",
                      cursor: "pointer",
                      transition: "opacity 0.18s",
                    }}
                  >
                    <p style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "19px",
                      color: result.color,
                      letterSpacing: "2px",
                      marginBottom: "6px",
                    }}>
                      {result.giftCode}
                    </p>
                    <p style={{ fontSize: "11px", color: "#C49888", letterSpacing: "1px" }}>
                      {copied ? "✅ 복사됐어요!" : "탭해서 코드 복사하기"}
                    </p>
                  </div>

                  <a
                    href={result.giftLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      background: "#2A1608",
                      color: "white",
                      borderRadius: "100px",
                      padding: "10px 26px",
                      fontSize: "13px",
                      fontFamily: "'Gowun Dodum', serif",
                      textDecoration: "none",
                      letterSpacing: "1px",
                      marginBottom: "14px",
                      transition: "opacity 0.18s",
                    }}
                  >
                    예사 등록하러 가기 →
                  </a>

                  <p style={{ fontSize: "12px", color: "#B09080", lineHeight: 1.9 }}>
                    두 장이라 나눠서 등록하시면 되어요 !! <br />
                    <span style={{ color: result.color, fontWeight: "700" }}>생일 미리 축하드려요 횽님😍</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={reset}
              style={{
                background: "none",
                border: "1.5px solid #E8D5CC",
                borderRadius: "100px",
                padding: "8px 22px",
                fontSize: "12px",
                color: "#C49888",
                cursor: "pointer",
                fontFamily: "'Gowun Dodum', serif",
                letterSpacing: "1px",
                transition: "all 0.18s",
              }}
            >
              🔄 &nbsp; 다시 해보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}