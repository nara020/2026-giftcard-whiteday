"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type VariantName = "sweet" | "elegant";

type VariantContent = {
  name: VariantName;
  eyebrow: string;
  heroTitle: string[];
  heroAccent: string;
  heroBody: string[];
  letterTo: string;
  letterLines: string[];
  giftCaption: string;
  giftBody: string[];
  promiseTitle: string;
  promiseBody: string[];
  statusNote: string;
  footer: string;
  selectorTitle: string;
  selectorBody: string;
  selectorTag: string;
};

const introSparkles = [
  { left: "32%", top: "33%", delay: 0.2, size: 10 },
  { left: "64%", top: "28%", delay: 0.7, size: 8 },
  { left: "69%", top: "58%", delay: 1.1, size: 12 },
  { left: "26%", top: "63%", delay: 0.9, size: 7 },
];

const statusSteps = [
  { label: "주문 완료", state: "done" },
  { label: "제작 중", state: "current" },
  { label: "완성 대기", state: "upcoming" },
  { label: "직접 전달", state: "upcoming" },
] as const;

const variants: Record<VariantName, VariantContent> = {
  sweet: {
    name: "sweet",
    eyebrow: "For Jiheun",
    heroTitle: ["특별한 지흔", "대표님을"],
    heroAccent: "생각하며\n준비한 선물",
    heroBody: ["좋아하는 마음을", "이번에는 말보다 더 분명하게 전하고 싶었어요"],
    letterTo: "To. 지흔",
    letterLines: [
      "지흔님에게는\n아무거나 드리고 싶지 않았어요.",
      "조급하게 구매하는 것보다\n고심해서 제 진심의 마음을\n보여드리고 싶었어요.",
    ],
    giftCaption: "For the one I truly adore",
    giftBody: ["지흔님을 무겁게 생각하고", "제가 사랑하는 마음을 담았어요"],
    promiseTitle: "언제나 지흔님\n편으로 있을게요",
    promiseBody: ["저는 언제나\n지흔님 편으로 있을게요", "좋은 날에도 힘든 날에도\n지흔님이 믿을 수 있게 할게요"],
    statusNote: "예쁜 모습으로 만나기까지 약 2주 정도의 시간이 걸려요",
    footer: "made with love, just for Jiheun",
    selectorTitle: "달달한 버전",
    selectorBody: "마음 표현을 조금 더 가까이, 따뜻하게 담은 톤",
    selectorTag: "Soft & Sweet",
  },
  elegant: {
    name: "elegant",
    eyebrow: "For Jiheun",
    heroTitle: ["지흔님에게 가장 잘 어울리는 마음으로"],
    heroAccent: "쉽게 고른 선물이 아니라 오래 고민한 마음이에요",
    heroBody: ["말보다 행동이 더 분명할 때가 있으니까", "이번에는 그렇게 보여드리고 싶었어요"],
    letterTo: "To. 지흔",
    letterLines: [
      "지흔님에게 어울리는 걸 드리고 싶어서 오래 고민했어요",
      "서두르지 않고, 지흔님이 믿을 수 있게 보여드리고 싶었습니다",
    ],
    giftCaption: "For your shining life",
    giftBody: ["한순간 예쁘고 끝나는 선물이 아니라", "지흔님 곁에 오래 남을 마음으로 준비한 선물"],
    promiseTitle: "언제나 지흔님 편으로 있을게요",
    promiseBody: ["가장 빛나는 순간에도", "조금 지치는 순간에도 변함없이 진심으로 곁에 있겠습니다"],
    statusNote: "정성스럽게 완성되는 시간이라 약 2주 정도가 걸려요",
    footer: "made with love, just for you",
    selectorTitle: "고급스러운 버전",
    selectorBody: "우아하고 정제된 럭셔리 무드에 더 가까운 톤",
    selectorTag: "Elegant Luxe",
  },
};

const themeVars: Record<VariantName, CSSProperties> = {
  sweet: {
    ["--accent" as string]: "#dfa3b3",
    ["--accent-strong" as string]: "#d4839d",
    ["--accent-soft" as string]: "#f4d8e1",
    ["--champagne" as string]: "#f1d6bf",
    ["--champagne-soft" as string]: "#faece3",
  },
  elegant: {
    ["--accent" as string]: "#d4a0a5",
    ["--accent-strong" as string]: "#c98d93",
    ["--accent-soft" as string]: "#ecd2d5",
    ["--champagne" as string]: "#e8d2ab",
    ["--champagne-soft" as string]: "#f4e7cf",
  },
};

function RevealLines({
  lines,
  className = "",
  lineClassName = "",
  message = false,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  message?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.45 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.22,
            delayChildren: 0.05,
          },
        },
      }}
    >
      {lines.map((line, index) => (
        <motion.div
          key={`${line}-${index}`}
          className={message ? "message-line-wrap" : ""}
          variants={{
            hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <span className={`${message ? "message-line" : "block"} ${lineClassName}`}>
            {line.split("\n").map((part) => (
              <span key={part} className="block">
                {part}
              </span>
            ))}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Sparkle({ className = "", delay = 0, size = 12 }: { className?: string; delay?: number; size?: number }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: [0, 0.95, 0], scale: [0.2, 1.1, 0.2], rotate: [0, 18, 0] }}
      transition={{ duration: 2.8, delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="rgba(255, 245, 231, 0.92)" />
      </svg>
    </motion.div>
  );
}

function Divider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <span />
    </div>
  );
}

function Intro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase(1), 220),
      window.setTimeout(() => setPhase(2), 1550),
      window.setTimeout(() => setPhase(3), 2400),
      window.setTimeout(() => setPhase(4), 2850),
      window.setTimeout(() => setPhase(5), 3450),
      window.setTimeout(() => setPhase(6), 4250),
      window.setTimeout(onComplete, 5050),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#08080a" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)" }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 2 }}
      />

      <motion.div
        className="relative"
        animate={{ opacity: phase >= 3 ? 0 : 1, filter: phase >= 3 ? "blur(6px)" : "blur(0px)" }}
        transition={{ duration: 0.8 }}
      >
        <svg width="200" height="90" viewBox="0 0 200 90" fill="none" className="overflow-visible">
          {["M40,10 Q60,2 80,6 Q100,10 115,18 Q125,24 130,35", "M160,10 Q140,2 120,6 Q100,10 85,18 Q75,24 70,35"].map((path, index) => (
            <motion.path
              key={index}
              d={path}
              stroke="rgba(200,185,160,0.6)"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          ))}
          <motion.path
            d="M70,35 L85,55 L100,75 L115,55 L130,35"
            stroke="rgba(200,185,160,0.7)"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.95, delay: 0.3, ease: "easeInOut" }}
          />
          {["M85,55 L100,75 L70,35", "M115,55 L100,75 L130,35", "M70,35 L130,35 L115,55 L85,55", "M85,55 L100,45 L115,55"].map((path, index) => (
            <motion.path
              key={`facet-${index}`}
              d={path}
              stroke="rgba(200,185,160,0.3)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.55, delay: 0.58 + index * 0.08, ease: "easeInOut" }}
            />
          ))}
          <motion.circle
            cx="100"
            cy="52"
            r="16"
            stroke="rgba(200,185,160,0.25)"
            strokeWidth="0.4"
            fill="none"
            strokeDasharray="2 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 0.5 : 0 }}
            transition={{ duration: 0.55, delay: 0.8 }}
          />
          {phase >= 2 ? (
            <>
              <motion.path d="M70,35 L85,55 L100,75 L115,55 L130,35" fill="url(#glow)" stroke="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.65 }} />
              <motion.circle cx="100" cy="52" r="6" fill="url(#ctr)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: 0.08 }} />
            </>
          ) : null}
          <defs>
            <radialGradient id="glow" cx="100" cy="55" r="25" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="ctr" cx="100" cy="52" r="6" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
              <stop offset="60%" stopColor="rgba(220,230,255,0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>

        {phase >= 2 && phase < 3
          ? [[-18, -8, 0], [22, -4, 0.2], [-12, 14, 0.4], [18, 16, 0.3]].map(([x, y, delay], index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{ left: `calc(50% + ${x}px)`, top: `calc(55% + ${y}px)` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0.3, 1.2, 0.3] }}
                transition={{ duration: 0.9, delay, repeat: Number.POSITIVE_INFINITY }}
              >
                <svg viewBox="0 0 20 20" width="4" height="4">
                  <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z" fill="rgba(255,255,255,0.7)" />
                </svg>
              </motion.div>
            ))
          : null}
      </motion.div>

      <motion.p
        className="mt-5 text-[8px] uppercase tracking-[4px]"
        style={{ color: "rgba(200,185,160,0.25)", fontFamily: "var(--font-eb-garamond)", fontStyle: "italic" }}
        animate={{ opacity: phase >= 1 && phase < 3 ? 1 : 0 }}
        transition={{ duration: 0.45, delay: phase === 1 ? 0.85 : 0 }}
      >
        crafting your necklace
      </motion.p>

      {phase >= 4 ? (
        <motion.div
          className="absolute"
          style={{ perspective: 800 }}
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="relative">
            <motion.div
              className="absolute left-1/2"
              style={{
                width: 110,
                height: 50,
                marginLeft: -55,
                top: -26,
                transformStyle: "preserve-3d",
                transformOrigin: "top center",
                background: "linear-gradient(180deg, #1a1a20, #111118)",
                borderRadius: "3px 3px 0 0",
              }}
              animate={{ rotateX: phase >= 5 ? -110 : 0 }}
              transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="absolute inset-[2px] rounded-sm" style={{ background: "#14111a" }} />
              <div className="absolute inset-0 rounded-t" style={{ border: "1px solid rgba(180,160,120,0.1)" }} />
            </motion.div>
            <div
              className="relative"
              style={{
                width: 110,
                height: 36,
                background: "linear-gradient(0deg, #0d0d12, #15151c)",
                borderRadius: "0 0 3px 3px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
              }}
            >
              <div className="absolute inset-[2px] rounded-b-sm" style={{ background: "#110e16" }} />
              <div className="absolute inset-0 rounded-b" style={{ border: "1px solid rgba(180,160,120,0.08)" }} />
              <div className="absolute left-1/2 top-0 h-1.5 w-3 -translate-x-1/2 -translate-y-1/2 rounded" style={{ background: "rgba(180,160,120,0.2)" }} />
              {phase >= 5 ? (
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div
                    className="h-7 w-7 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(220,235,255,0.25) 50%, transparent 70%)", filter: "blur(1.5px)" }}
                  />
                </motion.div>
              ) : null}
            </div>
          </div>
        </motion.div>
      ) : null}

      {phase >= 5 ? (
        <>
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.45) 0%, transparent 45%)" }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: [0, 1, 0.4], scale: [0.3, 1.6] }}
            transition={{ duration: 0.8 }}
          />
          {[[-60, -45], [70, -30], [-50, 50], [75, 45], [0, -60], [-75, 5], [50, -55], [-25, 65]].map(([x, y], index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.2, 1.3, 0.2] }}
              transition={{ duration: 1, delay: index * 0.04, repeat: Number.POSITIVE_INFINITY }}
            >
              <svg viewBox="0 0 20 20" width={5 + (index % 3)} height={5 + (index % 3)}>
                <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z" fill="rgba(255,255,255,0.85)" />
              </svg>
            </motion.div>
          ))}
          {[15, -35, 60, -8].map((angle, index) => (
            <motion.div
              key={`line-${index}`}
              className="pointer-events-none absolute"
              style={{
                left: "50%",
                top: "50%",
                width: 150 - index * 15,
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                transformOrigin: "center",
                transform: `rotate(${angle}deg) translateX(-50%)`,
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0, 0.6, 0.2], scaleX: [0, 1, 0.6] }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
            />
          ))}
        </>
      ) : null}

      <motion.p
        className="absolute bottom-[22%] text-[10px] uppercase tracking-[6px]"
        style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-eb-garamond)" }}
        animate={{ opacity: phase >= 6 ? 1 : 0, y: phase >= 6 ? 0 : 8 }}
        transition={{ duration: 0.45, delay: 0.05 }}
      >
        A Gift For You
      </motion.p>
    </motion.div>
  );
}

function MusicGate({
  onChoose,
}: {
  onChoose: (mode: "music" | "silent") => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(255,253,253,0.86)] px-6 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <motion.div
        className="music-gate"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <p className="eyebrow">One More Touch</p>
        <h2 className="music-gate-title">이 페이지를 더 예쁘게 보는 방법</h2>
        <p className="music-gate-copy">음악과 함께 천천히 볼 수도 있고, 조용히 바로 볼 수도 있어요.</p>
        <div className="music-gate-actions">
          <button type="button" className="music-gate-primary" onClick={() => onChoose("music")}>
            음악과 함께 보기
          </button>
          <button type="button" className="music-gate-secondary" onClick={() => onChoose("silent")}>
            조용히 보기
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MusicPlayer({
  shouldAutoplay = false,
}: {
  shouldAutoplay?: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(shouldAutoplay);

  useEffect(() => {
    if (!shouldAutoplay) {
      return;
    }

    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) {
      return;
    }

    const timer = window.setTimeout(() => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "playVideo" }),
        "*",
      );
    }, 180);

    return () => window.clearTimeout(timer);
  }, [shouldAutoplay]);

  const togglePlayback = () => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;

    iframe.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: isPlaying ? "pauseVideo" : "playVideo" }),
      "*",
    );

    setIsPlaying((current) => !current);
  };

  return (
    <>
      <iframe ref={iframeRef} className="hidden" src="https://www.youtube.com/embed/KuFpVjJoogw?enablejsapi=1&playsinline=1&rel=0" title="Acid Dreams by MAX" allow="autoplay; encrypted-media" />
      <motion.div className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full border border-white/55 bg-white/78 px-3 py-2 shadow-[0_12px_30px_rgba(164,122,128,0.18)] backdrop-blur-xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
        <button type="button" onClick={togglePlayback} aria-label={isPlaying ? "음악 일시정지" : "음악 재생"} className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-strong)] text-white shadow-[0_8px_18px_rgba(212,160,165,0.35)] transition-transform duration-300 hover:scale-105">
          {isPlaying ? (
            <div className="flex items-end gap-[3px]">
              {[14, 10, 17, 12].map((height, index) => (
                <motion.span key={height} className="w-[3px] rounded-full bg-white" animate={{ height: [height * 0.45, height, height * 0.55] }} transition={{ duration: 0.9, delay: index * 0.12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} />
              ))}
            </div>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 5.5V18.5L18 12L8 5.5Z" fill="white" />
            </svg>
          )}
        </button>
        <div className="pr-1">
          <p className="font-[var(--font-eb-garamond)] text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">Acid Dreams</p>
          <p className="text-[11px] text-[var(--text-soft)]">MAX</p>
        </div>
      </motion.div>
    </>
  );
}

export function GiftPage({
  variant,
  showImageSection = false,
  showHomeLink = false,
}: {
  variant: VariantName;
  showImageSection?: boolean;
  showHomeLink?: boolean;
}) {
  const [showIntro, setShowIntro] = useState(true);
  const [entryMode, setEntryMode] = useState<"pending" | "music" | "silent">("pending");
  const [showStatus, setShowStatus] = useState(false);
  const content = variants[variant];
  const showContent = !showIntro && entryMode !== "pending";

  return (
    <div style={themeVars[variant]}>
      <AnimatePresence>{showIntro ? <Intro onComplete={() => setShowIntro(false)} /> : null}</AnimatePresence>
      <AnimatePresence>
        {!showIntro && entryMode === "pending" ? <MusicGate onChoose={(mode) => setEntryMode(mode)} /> : null}
      </AnimatePresence>
      {!showIntro && entryMode === "music" ? <MusicPlayer shouldAutoplay /> : null}
      {!showIntro && entryMode === "silent" ? <MusicPlayer /> : null}
      <main className={`mx-auto min-h-screen w-full max-w-[520px] transition-opacity duration-500 ${showContent ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <section className="romance-section min-h-[100svh] justify-center pt-24">
          {showHomeLink || variant !== "sweet" ? (
            <Link href="/" className="selector-back">
              home
            </Link>
          ) : null}
          <div className="ornament-dot mb-8" />
          <p className="eyebrow">{content.eyebrow}</p>
          <div className="hero-copy-wrap space-y-5 text-center">
            <motion.h1 className="hero-title" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.9 }}>
              {content.heroTitle.map((line) => (
                <span key={line} className="block text-[var(--text)]">
                  {line}
                </span>
              ))}
              {content.heroAccent.split("\n").map((line) => (
                <em key={line} className="hero-accent-line">
                  {line}
                </em>
              ))}
            </motion.h1>
            <RevealLines lines={content.heroBody} className="hero-subtitle" lineClassName="" />
          </div>
        </section>

        <Divider />

        <section className="romance-section">
          <motion.div className="section-inner text-center" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.9 }}>
            <div className="letter-card">
              <div className="letter-card-glow" />
              <p className="eyebrow">{content.letterTo}</p>
              <motion.div
                className="letter-block letter-block-card"
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              >
                {content.letterLines.map((line) => (
                  <p key={line}>
                    {line.split("\n").map((part) => (
                      <span key={part} className="block">
                        {part}
                      </span>
                    ))}
                  </p>
                ))}
              </motion.div>
              <p className="signature">from. 진혁</p>
            </div>
          </motion.div>
        </section>

        <Divider />

        <section className="romance-section">
          <motion.div className="section-inner text-center" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.9 }}>
            <div className="ornament-dot mb-7" />
            <h2 className="section-title">Diamond Necklace</h2>
            <p className="section-caption">{content.giftCaption}</p>
            <RevealLines lines={content.giftBody} className="section-copy" />
          </motion.div>
        </section>

        <Divider />

        <section className="romance-section">
          <motion.div className="section-inner text-center" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.9 }}>
            <p className="eyebrow">My Promise</p>
            <h2 className="promise-title">
              {content.promiseTitle.split("\n").map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <RevealLines lines={content.promiseBody} className="section-copy" />
          </motion.div>
        </section>

        <Divider />

        {showImageSection ? (
          <>
            <section className="romance-section">
              <motion.div className="section-inner text-center" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.9 }}>
                <p className="eyebrow">For You</p>
                <h2 className="section-title">
                  <span className="block">지흔님을 위해</span>
                  <span className="block">준비한 선물이에요</span>
                </h2>
                <p className="section-copy photo-copy">실물은 직접 보여드리고 싶지만, 이 마음은 여기에도 조용히 담아둘게요.</p>
                <div className="gift-video-shell photo-reveal">
                  <div className="gift-video-aura" />
                  <div className="gift-video-frame">
                    <video
                      className="gift-video-embed"
                      src="/diamond-preview.mp4"
                      poster="/necklace5.jpg"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                    <div className="gift-video-sheen" />
                  </div>
                  <Sparkle className="left-[10%] top-[12%]" delay={0.3} size={10} />
                  <Sparkle className="right-[11%] top-[10%]" delay={1} size={8} />
                  <Sparkle className="right-[9%] bottom-[14%]" delay={1.7} size={9} />
                </div>
              </motion.div>
            </section>

            <Divider />
          </>
        ) : null}

        <section className="romance-section pb-24">
          <motion.div className="section-inner text-center" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.9 }}>
            <p className="eyebrow">On Its Way</p>
            <button
              type="button"
              className="status-toggle"
              onClick={() => setShowStatus((current) => !current)}
              aria-expanded={showStatus}
            >
              <span className="status-toggle-text">조금만 기다려 주세요.</span>
              <motion.span
                className="status-toggle-icon"
                animate={{ rotate: showStatus ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {showStatus ? (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="status-list">
                    {statusSteps.map((step) => (
                      <div key={step.label} className="status-row">
                        <div className={`status-bullet ${step.state === "done" ? "is-done" : step.state === "current" ? "is-current" : "is-upcoming"}`}>
                          {step.state === "done" ? (
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                              <path d="M3 8L6.2 11.2L13 4.5" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : null}
                        </div>
                        <p className={`status-label ${step.state === "current" ? "is-current" : ""}`}>
                          {step.label}
                          {step.state === "current" ? <motion.span animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY }}> ●</motion.span> : null}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="status-note">{content.statusNote}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </section>

        <footer className="pb-14 pt-2 text-center">
          <div className="ornament-dot mb-4" />
          <p className="footer-copy">{content.footer}</p>
        </footer>
      </main>
    </div>
  );
}

export function VariantSelector() {
  return (
    <main className="selector-shell">
      <section className="selector-panel">
        <div className="ornament-dot mb-6" />
        <p className="eyebrow">Choose A Mood</p>
        <h1 className="selector-heading">지흔님 페이지 버전 선택</h1>
        <p className="selector-copy">둘 다 실제 모바일에서 바로 비교할 수 있게 나눠뒀어요. 마음이 더 잘 보이는 쪽을 고르면 됩니다.</p>
        <div className="selector-grid">
          {(["sweet", "elegant"] as const).map((key) => {
            const item = variants[key];
            return (
              <Link key={key} href={`/${key}`} className="selector-card" style={themeVars[key]}>
                <p className="selector-tag">{item.selectorTag}</p>
                <h2>{item.selectorTitle}</h2>
                <p>{item.selectorBody}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
