import { useState, useEffect, useRef } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;500;600;700;800&display=swap');
`;

const theme = {
  navy: "#0A1628",
  navyMid: "#132240",
  navyLight: "#1C3357",
  blue: "#1D6FE8",
  blueLight: "#4A90F5",
  teal: "#0DB5A0",
  red: "#DC2626",
  redMid: "#EF4444",
  redGlow: "rgba(220,38,38,0.25)",
  gold: "#D4A853",
  white: "#FFFFFF",
  offWhite: "#F4F6FA",
  gray100: "#EEF1F5",
  gray200: "#DDE3EC",
  gray300: "#C8D0DE",
  gray400: "#8A97B0",
  gray500: "#5A6A84",
  gray700: "#2D3A50",
  success: "#00C896",
  successMid: "#00A87D",
  successSoft: "#E6FAF5",
  warn: "#F59E0B",
  warnSoft: "#FFFBEB",
};

const css = `
  ${FONTS}
  * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
  body { background:#07101E; display:flex; justify-content:center; align-items:center; min-height:100vh; padding:24px; font-family:'Syne',sans-serif; }

  @keyframes fadeUp      { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn      { from{opacity:0;transform:translateX(26px)} to{opacity:1;transform:translateX(0)} }
  @keyframes fadeInLeft  { from{opacity:0;transform:translateX(-26px)} to{opacity:1;transform:translateX(0)} }
  @keyframes popIn       { from{opacity:0;transform:scale(0.55)} to{opacity:1;transform:scale(1)} }
  @keyframes sheetUp     { from{transform:translateY(100%)} to{transform:translateY(0)} }
  @keyframes orb         { 0%,100%{transform:scale(1) translate(0,0)} 40%{transform:scale(1.12) translate(12px,-14px)} 70%{transform:scale(0.93) translate(-8px,10px)} }
  @keyframes numFlash    { 0%{color:#fff;text-shadow:0 0 24px rgba(0,200,150,0)} 40%{color:#00C896;text-shadow:0 0 28px rgba(0,200,150,0.55)} 100%{color:#00C896;text-shadow:none} }
  @keyframes ringPulse   { 0%{box-shadow:0 0 0 0 rgba(0,200,150,0.5)} 70%{box-shadow:0 0 0 14px rgba(0,200,150,0)} 100%{box-shadow:0 0 0 0 rgba(0,200,150,0)} }
  @keyframes toastDrop   { from{opacity:0;transform:translateY(-16px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes toastFade   { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(-10px)} }
  @keyframes savingsPop  { 0%{transform:scale(1)} 30%{transform:scale(1.06)} 60%{transform:scale(0.97)} 100%{transform:scale(1)} }
  @keyframes checkDraw   { from{stroke-dashoffset:40} to{stroke-dashoffset:0} }
  @keyframes confettiA   { 0%{opacity:1;transform:translateY(0) rotate(0deg)} 100%{opacity:0;transform:translateY(60px) rotate(360deg)} }
  @keyframes glow        { 0%,100%{opacity:0.6} 50%{opacity:1} }
  @keyframes badgeSlide  { from{opacity:0;transform:translateX(10px)} to{opacity:1;transform:translateX(0)} }
  @keyframes stepFill    { from{width:0} to{width:100%} }
  @keyframes iconPop     { from{opacity:0;transform:scale(0.7) rotate(-8deg)} to{opacity:1;transform:scale(1) rotate(0deg)} }
  @keyframes lineGrow    { from{height:0} to{height:100%} }
  @keyframes counterUp   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes faqExpand   { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
  @keyframes supportPulse { 0%,100%{box-shadow:0 8px 24px rgba(29,111,232,0.35)} 50%{box-shadow:0 8px 32px rgba(29,111,232,0.55)} }
  @keyframes scanPulse    { 0%{transform:scale(1);opacity:1} 60%{transform:scale(2.6);opacity:0} 100%{transform:scale(1);opacity:0} }
  @keyframes scanDot      { 0%,100%{opacity:0.3} 50%{opacity:1} }
  @keyframes insightSlide { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
  @keyframes shimmerSlide { from{background-position:200% center} to{background-position:-200% center} }
`;

const SUBS = [
  {
    id: "spotify",
    name: "Spotify Premium",
    icon: "♫",
    iconBg: "linear-gradient(135deg,#1DB954,#158a3e)",
    price: 9.99,
    lastUsed: "4 months ago",
    tag: "Music",
  },
  {
    id: "hulu",
    name: "Hulu (No Ads)",
    icon: "▶",
    iconBg: "linear-gradient(135deg,#3DBB6F,#1a7d40)",
    price: 17.99,
    lastUsed: "67 days ago",
    tag: "Streaming",
  },
  {
    id: "nyt",
    name: "NYT Digital",
    icon: "N",
    iconBg: "linear-gradient(135deg,#222,#444)",
    price: 4.99,
    lastUsed: "6 months ago",
    tag: "News",
  },
];

const SEED_HISTORY = [
  {
    id: "seed1",
    subId: "adobe",
    name: "Adobe Creative Cloud",
    icon: "A",
    iconBg: "linear-gradient(135deg,#FF0000,#CC0000)",
    price: 54.99,
    tag: "Design",
    cancelledAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },
  {
    id: "seed2",
    subId: "dropbox",
    name: "Dropbox Plus",
    icon: "⬡",
    iconBg: "linear-gradient(135deg,#0061FF,#0049C0)",
    price: 11.99,
    tag: "Storage",
    cancelledAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000),
  },
  {
    id: "seed3",
    subId: "duolingo",
    name: "Duolingo Super",
    icon: "D",
    iconBg: "linear-gradient(135deg,#58CC02,#3A9900)",
    price: 6.99,
    tag: "Learning",
    cancelledAt: new Date(Date.now() - 34 * 24 * 60 * 60 * 1000),
  },
];

function fmtDate(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffD = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffD === 0) return "Today";
  if (diffD === 1) return "Yesterday";
  if (diffD < 7) return `${diffD} days ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fmtDateFull(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function groupByMonth(items) {
  const groups = {};
  items.forEach((item) => {
    const key = item.cancelledAt.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return Object.entries(groups);
}

function StatusBar({ dark }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 26px 10px",
        color: dark ? theme.white : theme.navy,
        fontSize: 12,
        fontWeight: 600,
        flexShrink: 0,
        zIndex: 10,
      }}
    >
      <span>9:41</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ fontSize: 8 }}>●●●●</span>
        <span>WiFi</span>
        <span>▮</span>
      </div>
    </div>
  );
}

function BottomNav({ active, onTab }) {
  const tabs = [
    { id: "home", icon: "⌂", label: "Home" },
    { id: "history", icon: "◷", label: "History" },
    { id: "profile", icon: "◉", label: "Profile" },
    { id: "help", icon: "?", label: "Help" },
  ];
  return (
    <div
      style={{
        background: theme.white,
        borderTop: `1px solid ${theme.gray200}`,
        display: "flex",
        padding: "10px 0 22px",
        flexShrink: 0,
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onTab(t.id)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px 0",
          }}
        >
          <span
            style={{
              fontSize: 21,
              color: active === t.id ? theme.blue : theme.gray400,
            }}
          >
            {t.icon}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: active === t.id ? theme.blue : theme.gray400,
            }}
          >
            {t.label}
          </span>
          {active === t.id && (
            <div
              style={{
                width: 4,
                height: 4,
                background: theme.blue,
                borderRadius: "50%",
                marginTop: 1,
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

function AnimatedCounter({ target, prefix = "$", suffix = "" }) {
  const [val, setVal] = useState(0);
  const raf = useRef();
  useEffect(() => {
    const dur = 900,
      t0 = performance.now();
    const step = (now) => {
      const t = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(+(target * e).toFixed(2));
      if (t < 1) raf.current = requestAnimationFrame(step);
      else setVal(target);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);
  return (
    <span>
      {prefix}
      {val.toFixed(2)}
      {suffix}
    </span>
  );
}

function ConfirmedBadge() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: theme.successSoft,
        border: `1px solid rgba(0,200,150,0.25)`,
        borderRadius: 20,
        padding: "3px 10px 3px 7px",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: theme.success,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
          <path
            d="M1.5 4.5L3.5 6.5L7.5 2.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: theme.successMid,
          letterSpacing: "0.04em",
        }}
      >
        Confirmed
      </span>
    </div>
  );
}

function HistoryItem({ item, isLast, index }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 0,
        animation: `fadeUp 0.4s ease ${index * 0.07}s both`,
      }}
    >
      <div
        style={{
          width: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: theme.successSoft,
            border: `2px solid ${theme.success}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            zIndex: 1,
            marginTop: 14,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6L5 9L10 3"
              stroke={theme.successMid}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {!isLast && (
          <div
            style={{
              flex: 1,
              width: 2,
              background: `linear-gradient(to bottom, ${theme.success}40, ${theme.gray200})`,
              marginTop: 3,
              borderRadius: 1,
              minHeight: 16,
            }}
          />
        )}
      </div>

      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 12, paddingTop: 8 }}>
        <div
          style={{
            background: theme.white,
            border: `1px solid ${theme.gray200}`,
            borderRadius: 18,
            padding: "14px 16px",
            boxShadow: "0 1px 6px rgba(10,22,40,0.05)",
            marginLeft: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: item.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 17,
                color: "white",
                fontWeight: 800,
                flexShrink: 0,
                boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
              }}
            >
              {item.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: theme.navy,
                  marginBottom: 2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.name}
              </div>
              <div style={{ fontSize: 11, color: theme.gray400 }}>
                {item.tag}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: theme.successMid,
                  lineHeight: 1,
                }}
              >
                +${item.price.toFixed(2)}
              </div>
              <div style={{ fontSize: 10, color: theme.gray400, marginTop: 2 }}>
                saved/mo
              </div>
            </div>
          </div>

          <div
            style={{ height: 1, background: theme.gray100, marginBottom: 12 }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{ fontSize: 11, color: theme.gray400, marginBottom: 1 }}
              >
                Cancelled
              </div>
              <div
                style={{ fontSize: 12, fontWeight: 600, color: theme.gray700 }}
              >
                {fmtDateFull(item.cancelledAt)}
              </div>
            </div>
            <ConfirmedBadge />
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryScreen({ historyItems }) {
  const allItems = [...historyItems].sort(
    (a, b) => b.cancelledAt - a.cancelledAt
  );
  const totalSaved = allItems.reduce((s, i) => s + i.price, 0);
  const annualSaved = totalSaved * 12;
  const groups = groupByMonth(allItems);
  const hasItems = allItems.length > 0;

  let itemIndex = 0;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: theme.offWhite,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: theme.navy,
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <StatusBar dark />
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -40,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(0,200,150,0.18) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -30,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(29,111,232,0.14) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ padding: "4px 22px 26px", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                Your Record
              </div>
              <h1
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 26,
                  color: "white",
                  lineHeight: 1.15,
                }}
              >
                Cancellation
                <br />
                <em style={{ fontStyle: "italic", color: "#6EE7B7" }}>
                  History
                </em>
              </h1>
            </div>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: "rgba(0,200,150,0.14)",
                border: "1.5px solid rgba(0,200,150,0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 20,
                  color: theme.success,
                  lineHeight: 1,
                }}
              >
                {allItems.length}
              </span>
              <span
                style={{
                  fontSize: 9,
                  color: "rgba(255,255,255,0.4)",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                total
              </span>
            </div>
          </div>

          {hasItems && (
            <div
              style={{
                display: "flex",
                gap: 10,
                animation: "fadeUp 0.5s ease 0.1s both",
              }}
            >
              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 16,
                  padding: "14px 16px",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 700,
                    marginBottom: 5,
                  }}
                >
                  Monthly savings
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 26,
                    color: theme.success,
                    letterSpacing: "-0.5px",
                    lineHeight: 1,
                  }}
                >
                  <AnimatedCounter target={totalSaved} />
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.35)",
                    marginTop: 3,
                  }}
                >
                  per month
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 16,
                  padding: "14px 16px",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 700,
                    marginBottom: 5,
                  }}
                >
                  Annual projection
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 26,
                    color: "#93C5FD",
                    letterSpacing: "-0.5px",
                    lineHeight: 1,
                  }}
                >
                  <AnimatedCounter target={annualSaved} />
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.35)",
                    marginTop: 3,
                  }}
                >
                  this year
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          scrollbarWidth: "none",
          padding: "18px 18px 24px",
        }}
      >
        {!hasItems ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              padding: "60px 32px",
              textAlign: "center",
              animation: "fadeUp 0.5s ease both",
              minHeight: 360,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 24,
                background: `linear-gradient(135deg,${theme.gray100},${theme.gray200})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                marginBottom: 20,
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              }}
            >
              ◷
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 22,
                color: theme.navy,
                marginBottom: 8,
              }}
            >
              Nothing here yet.
            </div>
            <div
              style={{
                fontSize: 14,
                color: theme.gray400,
                lineHeight: 1.65,
                maxWidth: 240,
              }}
            >
              Once you cancel a subscription, it'll appear here with your
              savings record.
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 28 }}>
              {[3, 6, 3].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: 3,
                    width: w * 4,
                    borderRadius: 2,
                    background: theme.gray200,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          groups.map(([month, items]) => {
            const monthSaved = items.reduce((s, i) => s + i.price, 0);
            return (
              <div key={month} style={{ marginBottom: 4 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    paddingLeft: 48,
                    animation: `fadeUp 0.35s ease ${itemIndex * 0.07}s both`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: theme.gray400,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {month}
                  </span>
                  <div
                    style={{
                      background: theme.successSoft,
                      border: `1px solid rgba(0,200,150,0.2)`,
                      borderRadius: 20,
                      padding: "3px 10px",
                      fontSize: 11,
                      fontWeight: 700,
                      color: theme.successMid,
                    }}
                  >
                    +${monthSaved.toFixed(2)}/mo
                  </div>
                </div>

                {items.map((item, i) => {
                  const idx = itemIndex++;
                  return (
                    <HistoryItem
                      key={item.id}
                      item={item}
                      isLast={i === items.length - 1}
                      index={idx}
                    />
                  );
                })}

                <div style={{ height: 16 }} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function WelcomeScreen({ onGetStarted, onSignIn }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: theme.navy,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <StatusBar dark />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(29,111,232,0.22) 0%,transparent 70%)",
            top: -90,
            right: -80,
            animation: "orb 9s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(0,200,150,0.14) 0%,transparent 70%)",
            bottom: 120,
            left: -60,
            animation: "orb 11s ease-in-out infinite reverse",
          }}
        />
      </div>
      <div style={{ padding: "0 28px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 30,
              height: 30,
              background: theme.blue,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Playfair Display',serif",
              fontWeight: 700,
              fontSize: 15,
              color: "white",
            }}
          >
            Z
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: 19,
              color: "white",
              letterSpacing: "0.02em",
            }}
          >
            Zerra
          </span>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          padding: "16px 28px 0",
          position: "relative",
          zIndex: 2,
        }}
      >
        {SUBS.map((s, i) => (
          <div
            key={s.id}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: "13px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 10,
              backdropFilter: "blur(16px)",
              animation: `fadeUp 0.5s ease ${0.2 + i * 0.12}s both`,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: s.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                color: "white",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {s.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                {s.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.38)",
                  marginTop: 1,
                }}
              >
                Last used {s.lastUsed}
              </div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#FCA5A5" }}>
              −${s.price}
            </div>
          </div>
        ))}
        <div
          style={{
            background:
              "linear-gradient(135deg,rgba(0,200,150,0.14),rgba(29,111,232,0.1))",
            border: "1px solid rgba(0,200,150,0.28)",
            borderRadius: 13,
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            animation: "fadeUp 0.5s ease 0.62s both",
            opacity: 0,
          }}
        >
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
            Potential monthly savings
          </span>
          <span style={{ fontSize: 17, fontWeight: 800, color: theme.success }}>
            $32.97
          </span>
        </div>
      </div>
      <div
        style={{ padding: "20px 28px 38px", position: "relative", zIndex: 2 }}
      >
        {/* Stat line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
            animation: "fadeUp 0.5s ease 0.18s both",
            opacity: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(0,200,150,0.12)",
              border: "1px solid rgba(0,200,150,0.25)",
              borderRadius: 20,
              padding: "5px 12px",
            }}
          >
            <span style={{ fontSize: 13 }}>💰</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#6EE7B7" }}>
              The average user saves{" "}
              <strong style={{ color: theme.success }}>$327/year.</strong>
            </span>
          </div>
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 27,
            lineHeight: 1.22,
            color: "white",
            marginBottom: 8,
            animation: "fadeUp 0.5s ease 0.28s both",
            opacity: 0,
          }}
        >
          Find and Cancel Unused
          <br />
          <em style={{ color: "#93C5FD", fontStyle: "italic" }}>
            Subscriptions Instantly.
          </em>
        </h1>

        {/* Trust badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 20,
            animation: "fadeUp 0.5s ease 0.38s both",
            opacity: 0,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1L7.5 4.5H11L8.5 6.5L9.5 10L6 8L2.5 10L3.5 6.5L1 4.5H4.5L6 1Z"
              fill="#8A97B0"
            />
          </svg>
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.38)",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            SOC 2 Compliant · Plaid Secured
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            animation: "fadeUp 0.5s ease 0.48s both",
            opacity: 0,
          }}
        >
          <button
            onClick={onGetStarted}
            style={{
              padding: "17px",
              background: theme.blue,
              color: "white",
              border: "none",
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(29,111,232,0.4)",
            }}
          >
            Get Started
          </button>
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.3)",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              Free to start.
            </span>
          </div>
          <button
            onClick={onSignIn}
            style={{
              padding: "15px",
              background: "rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(255,255,255,0.13)",
              borderRadius: 14,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

function StepBar({ step, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ display: "flex", gap: 5, flex: 1 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background: i < step ? theme.blue : "rgba(255,255,255,0.2)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {i === step - 1 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: theme.blue,
                  animation: "stepFill 0.5s cubic-bezier(0.22,1,0.36,1) both",
                }}
              />
            )}
          </div>
        ))}
      </div>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.06em",
          whiteSpace: "nowrap",
        }}
      >
        Step {step} of {total}
      </span>
    </div>
  );
}

function TrustBadges() {
  const badges = [
    { icon: "🔒", label: "256-bit\nEncryption" },
    { icon: "🏦", label: "Bank-Grade\nSecurity" },
    { icon: "🛡️", label: "SOC 2\nCertified" },
  ];
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {badges.map((b, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 14,
            padding: "10px 6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            backdropFilter: "blur(12px)",
            animation: `badgeSlide 0.4s ease ${0.15 + i * 0.1}s both`,
          }}
        >
          <span style={{ fontSize: 18 }}>{b.icon}</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "rgba(255,255,255,0.7)",
              textAlign: "center",
              lineHeight: 1.3,
              whiteSpace: "pre-line",
              letterSpacing: "0.03em",
            }}
          >
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function ReassuranceLine({ text = "We never move your money. Ever." }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
      }}
    >
      <div
        style={{ width: 16, height: 1, background: "rgba(255,255,255,0.2)" }}
      />
      <span
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.45)",
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
      >
        {text}
      </span>
      <div
        style={{ width: 16, height: 1, background: "rgba(255,255,255,0.2)" }}
      />
    </div>
  );
}

function Onboard1({ onNext, onBack }) {
  const steps = [
    {
      icon: "🔗",
      headline: "Connect your accounts",
      sub: "Securely link a bank or card via Plaid in 30 seconds.",
    },
    {
      icon: "🔍",
      headline: "We find the waste",
      sub: "AI scans transactions and surfaces every forgotten charge.",
    },
    {
      icon: "⚡",
      headline: "Cancel in one tap",
      sub: "You choose what goes. We handle the rest.",
    },
  ];
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: theme.navy,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -60,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(29,111,232,0.18) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ padding: "52px 24px 0", position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
          }}
        >
          <button
            onClick={onBack}
            style={{
              width: 34,
              height: 34,
              background: "rgba(255,255,255,0.09)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "50%",
              color: "rgba(255,255,255,0.7)",
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            ‹
          </button>
          <div style={{ flex: 1, padding: "0 14px" }}>
            <StepBar step={1} total={2} />
          </div>
          <button
            onClick={onNext}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.35)",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.04em",
            }}
          >
            SKIP
          </button>
        </div>
      </div>
      <div
        style={{
          padding: "0 24px",
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            background:
              "linear-gradient(135deg,rgba(29,111,232,0.3),rgba(13,181,160,0.2))",
            border: "1.5px solid rgba(29,111,232,0.4)",
            borderRadius: 24,
            margin: "0 auto 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            animation:
              "iconPop 0.5s cubic-bezier(0.17,0.89,0.32,1.49) 0.1s both",
            boxShadow: "0 8px 32px rgba(29,111,232,0.25)",
          }}
        >
          💡
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 28,
            color: "white",
            lineHeight: 1.2,
            animation: "fadeUp 0.4s ease 0.2s both",
            opacity: 0,
          }}
        >
          How Zerra
          <br />
          <em style={{ fontStyle: "italic", color: "#93C5FD" }}>Works</em>
        </h2>
      </div>
      <div
        style={{ padding: "0 22px", flex: 1, position: "relative", zIndex: 2 }}
      >
        {steps.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              animation: `fadeUp 0.4s ease ${0.3 + i * 0.12}s both`,
              opacity: 0,
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "rgba(29,111,232,0.18)",
                  border: "1.5px solid rgba(29,111,232,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                {s.icon}
              </div>
              {i < steps.length - 1 && (
                <div
                  style={{
                    width: 1.5,
                    height: 28,
                    background: "rgba(255,255,255,0.1)",
                    margin: "6px 0",
                  }}
                />
              )}
            </div>
            <div style={{ paddingTop: 10 }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 3,
                }}
              >
                {s.headline}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.5,
                }}
              >
                {s.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ padding: "20px 22px 36px", position: "relative", zIndex: 2 }}
      >
        <TrustBadges />
        <div style={{ height: 16 }} />
        <button
          onClick={onNext}
          style={{
            width: "100%",
            padding: "17px",
            background: `linear-gradient(135deg,${theme.blue},#3B82F6)`,
            color: "white",
            border: "none",
            borderRadius: 16,
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
            letterSpacing: "0.03em",
            boxShadow: "0 8px 24px rgba(29,111,232,0.38)",
            marginBottom: 14,
          }}
        >
          Continue
        </button>
        <ReassuranceLine />
      </div>
    </div>
  );
}

function Onboard2({ onConnect, onBack }) {
  const promises = [
    {
      icon: "👁",
      title: "Read-only access",
      body: "We see your transactions — nothing more.",
    },
    {
      icon: "🚫",
      title: "No money movement",
      body: "Zerra never touches or transfers your funds.",
    },
    {
      icon: "🔐",
      title: "End-to-end encrypted",
      body: "Your data is locked with bank-grade AES-256.",
    },
  ];
  const faqs = [
    ["Can Zerra make purchases?", "No, never."],
    ["Is my data sold?", "Never."],
    ["Can I disconnect anytime?", "Yes, instantly."],
  ];
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: theme.navy,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: -40,
          left: -40,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(0,200,150,0.12) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -40,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(29,111,232,0.15) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ padding: "52px 24px 0", position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
          }}
        >
          <button
            onClick={onBack}
            style={{
              width: 34,
              height: 34,
              background: "rgba(255,255,255,0.09)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "50%",
              color: "rgba(255,255,255,0.7)",
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ‹
          </button>
          <div style={{ flex: 1, padding: "0 14px" }}>
            <StepBar step={2} total={2} />
          </div>
          <div style={{ width: 34 }} />
        </div>
      </div>
      <div
        style={{
          padding: "0 24px",
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            background:
              "linear-gradient(135deg,rgba(0,200,150,0.25),rgba(29,111,232,0.2))",
            border: "1.5px solid rgba(0,200,150,0.4)",
            borderRadius: 24,
            margin: "0 auto 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            animation:
              "iconPop 0.5s cubic-bezier(0.17,0.89,0.32,1.49) 0.1s both",
            boxShadow: "0 8px 32px rgba(0,200,150,0.2)",
          }}
        >
          🛡️
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 28,
            color: "white",
            lineHeight: 1.2,
            animation: "fadeUp 0.4s ease 0.2s both",
            opacity: 0,
          }}
        >
          Your security is
          <br />
          <em style={{ fontStyle: "italic", color: "#6EE7B7" }}>
            our first principle.
          </em>
        </h2>
      </div>
      <div
        style={{
          padding: "0 22px",
          flex: 1,
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {promises.map((p, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "rgba(255,255,255,0.055)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: "14px 16px",
              backdropFilter: "blur(12px)",
              animation: `fadeUp 0.4s ease ${0.28 + i * 0.1}s both`,
              opacity: 0,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                flexShrink: 0,
                background: "rgba(0,200,150,0.14)",
                border: "1px solid rgba(0,200,150,0.28)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              {p.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 2,
                }}
              >
                {p.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.42)",
                  lineHeight: 1.4,
                }}
              >
                {p.body}
              </div>
            </div>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                flexShrink: 0,
                background: theme.success,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path
                  d="M1.5 5.5L4.5 8.5L9.5 2.5"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="18"
                  strokeDashoffset="18"
                  style={{
                    animation: `checkDraw 0.4s ease ${0.4 + i * 0.1}s forwards`,
                  }}
                />
              </svg>
            </div>
          </div>
        ))}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: "14px 16px",
            animation: "fadeUp 0.4s ease 0.6s both",
            opacity: 0,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 10,
            }}
          >
            Quick answers
          </div>
          {faqs.map(([q, a], i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: i < faqs.length - 1 ? 9 : 0,
                marginBottom: i < faqs.length - 1 ? 9 : 0,
                borderBottom:
                  i < faqs.length - 1
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "none",
              }}
            >
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
                {q}
              </span>
              <span
                style={{ fontSize: 12, fontWeight: 700, color: theme.success }}
              >
                {a}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{ padding: "16px 22px 36px", position: "relative", zIndex: 2 }}
      >
        <TrustBadges />
        <div style={{ height: 16 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 14,
            animation: "fadeUp 0.4s ease 0.7s both",
            opacity: 0,
          }}
        >
          <div
            style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.1)" }}
          />
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
              fontWeight: 600,
            }}
          >
            Powered by
          </span>
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              padding: "3px 10px",
              fontSize: 12,
              fontWeight: 800,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.04em",
            }}
          >
            PLAID
          </div>
          <div
            style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.1)" }}
          />
        </div>
        <button
          onClick={onConnect}
          style={{
            width: "100%",
            padding: "17px",
            background: `linear-gradient(135deg,${theme.success},${theme.teal})`,
            color: "white",
            border: "none",
            borderRadius: 16,
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
            letterSpacing: "0.03em",
            boxShadow: "0 8px 24px rgba(0,200,150,0.35)",
            marginBottom: 14,
          }}
        >
          Connect Account Securely
        </button>
        <ReassuranceLine text="We never move your money. Ever." />
      </div>
    </div>
  );
}

function AnimatedAmount({ value, flashing }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  const rafRef = useRef();
  useEffect(() => {
    if (value === prevRef.current) return;
    const start = prevRef.current,
      end = value,
      dur = 900,
      t0 = performance.now();
    const step = (now) => {
      const t = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - t, 4);
      setDisplay(+(start + (end - start) * e).toFixed(2));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
      else {
        prevRef.current = end;
        setDisplay(end);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);
  return (
    <span
      style={{
        fontFamily: "'Playfair Display',serif",
        fontSize: 50,
        letterSpacing: "-2px",
        lineHeight: 1,
        color: flashing ? theme.success : "white",
        animation: flashing ? "numFlash 1.1s ease forwards" : "none",
        display: "inline-block",
        transition: "color 0.4s",
      }}
    >
      ${display.toFixed(2)}
    </span>
  );
}

function SubscriptionCard({ sub, onCancel, delay }) {
  const [pressing, setPressing] = useState(false);
  return (
    <div
      style={{
        background: theme.white,
        borderRadius: 20,
        marginBottom: 12,
        border: `1.5px solid ${theme.gray200}`,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(10,22,40,0.07)",
        animation: `fadeUp 0.4s ease ${delay}s both`,
      }}
    >
      <div
        style={{
          padding: "16px 16px 14px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 14,
            background: sub.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            color: "white",
            fontWeight: 800,
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {sub.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: theme.navy,
              marginBottom: 3,
            }}
          >
            {sub.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: theme.warn,
                background: theme.warnSoft,
                border: `1px solid ${theme.warn}33`,
                borderRadius: 6,
                padding: "2px 7px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Unused {sub.lastUsed}
            </span>
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: theme.navy,
              lineHeight: 1,
            }}
          >
            ${sub.price}
          </div>
          <div style={{ fontSize: 11, color: theme.gray400, marginTop: 2 }}>
            /mo
          </div>
        </div>
      </div>
      <div style={{ height: 1, background: theme.gray100, margin: "0 16px" }} />
      <div style={{ padding: "12px 14px" }}>
        <button
          onMouseDown={() => setPressing(true)}
          onMouseUp={() => setPressing(false)}
          onMouseLeave={() => setPressing(false)}
          onTouchStart={() => setPressing(true)}
          onTouchEnd={() => setPressing(false)}
          onClick={() => onCancel(sub)}
          style={{
            width: "100%",
            padding: "13px 0",
            background: pressing
              ? theme.red
              : `linear-gradient(135deg,${theme.red},${theme.redMid})`,
            color: "white",
            border: "none",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 800,
            cursor: "pointer",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            boxShadow: pressing
              ? `0 2px 8px ${theme.redGlow}`
              : `0 6px 18px ${theme.redGlow},inset 0 1px 0 rgba(255,255,255,0.15)`,
            transform: pressing ? "scale(0.98)" : "scale(1)",
            transition: "transform 0.12s,box-shadow 0.12s,background 0.12s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 15 }}>✕</span>
          Cancel — Save ${sub.price}/mo
        </button>
      </div>
    </div>
  );
}

function SavedToast({ sub, onDone }) {
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 2600);
    const t2 = setTimeout(() => onDone(), 3100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        right: 16,
        zIndex: 400,
        animation: fading
          ? "toastFade 0.45s ease forwards"
          : "toastDrop 0.4s cubic-bezier(0.17,0.89,0.32,1.28) both",
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg,${theme.navy},${theme.navyLight})`,
          borderRadius: 18,
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow:
            "0 12px 36px rgba(0,0,0,0.35),0 0 0 1px rgba(0,200,150,0.2)",
          border: "1px solid rgba(0,200,150,0.25)",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: theme.success,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            animation: "ringPulse 0.8s ease",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M3.5 9L7.5 13L14.5 5.5"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="40"
              strokeDashoffset="40"
              style={{ animation: "checkDraw 0.4s 0.15s ease forwards" }}
            />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "white",
              marginBottom: 2,
            }}
          >
            Subscription cancelled.
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
            You saved{" "}
            <strong style={{ color: theme.success }}>${sub.price}/month</strong>{" "}
            · Confirmation email sent.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── All Caught Up Empty State ────────────────────────────────────

function AllCaughtUp() {
  const [scanStep, setScanStep] = useState(0);
  const scanLabels = [
    "Checking card transactions…",
    "Reviewing bank history…",
    "Scanning for new charges…",
    "All clear · No new activity",
  ];
  useEffect(() => {
    if (scanStep >= scanLabels.length - 1) return;
    const t = setTimeout(() => setScanStep((s) => s + 1), 1800);
    return () => clearTimeout(t);
  }, [scanStep]);

  return (
    <div style={{ padding: "8px 0 4px", animation: "fadeUp 0.5s ease both" }}>
      <div
        style={{
          background: theme.white,
          border: `1.5px solid ${theme.gray200}`,
          borderRadius: 22,
          padding: "28px 22px 24px",
          marginBottom: 12,
          boxShadow: "0 2px 14px rgba(10,22,40,0.06)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,200,150,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 18,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(0,200,150,0.12)",
                animation: "scanPulse 2.6s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(0,200,150,0.08)",
                animation: "scanPulse 2.6s ease-in-out 0.5s infinite",
              }}
            />
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: `linear-gradient(135deg, #00C896, #0DB5A0)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(0,200,150,0.35)",
                zIndex: 1,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M4 11L9 16L18 6"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: theme.navy,
            marginBottom: 7,
            lineHeight: 1.2,
          }}
        >
          You're all caught up.
        </div>
        <div
          style={{
            fontSize: 13,
            color: theme.gray500,
            lineHeight: 1.7,
            maxWidth: 260,
            margin: "0 auto 22px",
          }}
        >
          Zerra is continuously monitoring for new recurring charges.
        </div>
        <div
          style={{
            background: "rgba(29,111,232,0.05)",
            border: "1px solid rgba(29,111,232,0.12)",
            borderRadius: 12,
            padding: "11px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#1D6FE8",
                  animation: `scanDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#1D6FE8",
              flex: 1,
              textAlign: "left",
              animation: "fadeUp 0.3s ease both",
            }}
          >
            {scanLabels[scanStep]}
          </span>
        </div>
        <button
          style={{
            width: "100%",
            padding: "14px",
            background: `linear-gradient(135deg,#0A1628,#1C3357)`,
            color: "white",
            border: "none",
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.03em",
            fontFamily: "'Syne',sans-serif",
            boxShadow: "0 6px 20px rgba(10,22,40,0.18)",
          }}
        >
          View All Subscriptions
        </button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginBottom: 4,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#00C896",
            animation: "glow 2.5s ease-in-out infinite",
          }}
        />
        <span style={{ fontSize: 11, color: theme.gray400, fontWeight: 500 }}>
          Last scanned · just now
        </span>
      </div>
    </div>
  );
}

// ─── Smart Insights ───────────────────────────────────────────────

const INSIGHTS = [
  {
    id: "i1",
    icon: "💡",
    iconBg: "rgba(245,158,11,0.1)",
    iconBorder: "rgba(245,158,11,0.2)",
    text: "You could save",
    highlight: "$23/month",
    tail: "by switching Spotify to the Family Plan.",
    action: "Explore Options",
    actionColor: "#1D6FE8",
    detail: "Potential annual saving: $276",
    micro: "Based on your last 3 billing cycles",
  },
  {
    id: "i2",
    icon: "📈",
    iconBg: "rgba(239,68,68,0.1)",
    iconBorder: "rgba(239,68,68,0.18)",
    text: "Adobe CC price increased",
    highlight: "12%",
    tail: "since last year — now $54.99/mo.",
    action: "Review Plan",
    actionColor: "#EF4444",
    detail: "Up from $47.99 in February 2024",
    micro: "Detected via historical price tracking",
  },
  {
    id: "i3",
    icon: "🗓",
    iconBg: "rgba(29,111,232,0.1)",
    iconBorder: "rgba(29,111,232,0.18)",
    text: "",
    highlight: "3 subscriptions",
    tail: "renewing within the next 5 days.",
    action: "Set Reminder",
    actionColor: "#1D6FE8",
    detail: "Hulu, NYT Digital, Spotify",
    micro: "Upcoming auto-renewal detected",
  },
];

function SmartInsights() {
  const [activeInsight, setActiveInsight] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [bodyHeight, setBodyHeight] = useState("auto");
  const bodyRef = useRef(null);

  const handleCollapse = () => {
    if (!collapsed) {
      // Capture current pixel height, then animate to 0
      if (bodyRef.current) {
        const h = bodyRef.current.scrollHeight;
        setBodyHeight(h + "px");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setBodyHeight("0px"));
        });
      }
    } else {
      // Expand: go to scrollHeight, then snap to auto
      if (bodyRef.current) {
        const h = bodyRef.current.scrollHeight;
        setBodyHeight("0px");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setBodyHeight(h + "px"));
          setTimeout(() => setBodyHeight("auto"), 380);
        });
      }
    }
    setCollapsed((v) => !v);
  };

  return (
    <div
      style={{
        margin: "0 16px 14px",
        background: "linear-gradient(160deg,#EEF5FF 0%,#F4F6FA 100%)",
        border: "1.5px solid rgba(29,111,232,0.14)",
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "0 2px 14px rgba(29,111,232,0.07)",
        animation: "fadeUp 0.45s ease 0.1s both",
      }}
    >
      {/* Header — always visible */}
      <div
        onClick={handleCollapse}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 18px",
          borderBottom: collapsed ? "none" : "1px solid rgba(29,111,232,0.08)",
          cursor: "pointer",
          userSelect: "none",
          transition: "border-color 0.3s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 9,
              background: "linear-gradient(135deg,#1D6FE8,#4A90F5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 3px 10px rgba(29,111,232,0.3)",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1.5L8.5 5.5H12.5L9.5 8L10.5 12L7 9.5L3.5 12L4.5 8L1.5 5.5H5.5L7 1.5Z"
                fill="white"
                opacity="0.9"
              />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: theme.navy,
                letterSpacing: "0.01em",
              }}
            >
              Zerra Insights
            </div>
            <div
              style={{
                fontSize: 10,
                color: theme.gray400,
                fontWeight: 600,
                marginTop: 1,
              }}
            >
              AI-powered · updated daily
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              background: "rgba(29,111,232,0.1)",
              border: "1px solid rgba(29,111,232,0.18)",
              borderRadius: 20,
              padding: "3px 9px",
              fontSize: 10,
              fontWeight: 700,
              color: "#1D6FE8",
            }}
          >
            3 new
          </div>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "rgba(29,111,232,0.08)",
              border: "1px solid rgba(29,111,232,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
          >
            <svg
              width="11"
              height="7"
              viewBox="0 0 11 7"
              fill="none"
              style={{
                transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                transform: collapsed ? "rotate(-180deg)" : "rotate(0deg)",
              }}
            >
              <path
                d="M1 1L5.5 5.5L10 1"
                stroke="#8A97B0"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Collapsible body */}
      <div
        ref={bodyRef}
        style={{
          height: bodyHeight,
          overflow: "hidden",
          transition: "height 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          style={{
            padding: "10px 14px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {INSIGHTS.map((insight, i) => (
            <div
              key={insight.id}
              onClick={() =>
                setActiveInsight(
                  activeInsight === insight.id ? null : insight.id
                )
              }
              style={{
                background:
                  activeInsight === insight.id
                    ? theme.white
                    : "rgba(255,255,255,0.7)",
                border: `1px solid ${
                  activeInsight === insight.id
                    ? "rgba(29,111,232,0.2)"
                    : "rgba(29,111,232,0.08)"
                }`,
                borderRadius: 14,
                padding: "13px 14px",
                cursor: "pointer",
                transition:
                  "background 0.2s, border-color 0.2s, box-shadow 0.2s",
                boxShadow:
                  activeInsight === insight.id
                    ? "0 3px 12px rgba(29,111,232,0.1)"
                    : "none",
                animation: `insightSlide 0.4s ease ${0.15 + i * 0.1}s both`,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 11 }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    flexShrink: 0,
                    background: insight.iconBg,
                    border: `1px solid ${insight.iconBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    marginTop: 1,
                  }}
                >
                  {insight.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: theme.gray700,
                      lineHeight: 1.5,
                    }}
                  >
                    {insight.text && <span>{insight.text} </span>}
                    <strong
                      style={{ color: insight.actionColor, fontWeight: 800 }}
                    >
                      {insight.highlight}
                    </strong>{" "}
                    <span style={{ color: theme.gray500 }}>{insight.tail}</span>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: theme.gray300,
                      marginTop: 4,
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {insight.micro}
                  </div>
                </div>
                <svg
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                  style={{
                    flexShrink: 0,
                    marginTop: 3,
                    transform:
                      activeInsight === insight.id
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  <path
                    d="M1 1L6 6L1 11"
                    stroke={theme.gray300}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {activeInsight === insight.id && (
                <div
                  style={{
                    marginTop: 12,
                    paddingTop: 10,
                    borderTop: "1px solid rgba(29,111,232,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    animation: "fadeUp 0.2s ease both",
                  }}
                >
                  <span style={{ fontSize: 11, color: theme.gray400 }}>
                    {insight.detail}
                  </span>
                  <button
                    style={{
                      background: "linear-gradient(135deg,#1D6FE8,#4A90F5)",
                      color: "white",
                      border: "none",
                      borderRadius: 20,
                      padding: "7px 14px",
                      fontSize: 11,
                      fontWeight: 800,
                      cursor: "pointer",
                      letterSpacing: "0.04em",
                      fontFamily: "'Syne',sans-serif",
                      boxShadow: "0 4px 12px rgba(29,111,232,0.28)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {insight.action} →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "10px 18px 14px",
            borderTop: "1px solid rgba(29,111,232,0.07)",
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#1D6FE8",
              opacity: 0.5,
            }}
          />
          <span style={{ fontSize: 11, color: theme.gray400, fontWeight: 500 }}>
            Insights refresh as Zerra monitors your accounts
          </span>
        </div>
      </div>
    </div>
  );
}

function HomeScreen({
  onCancel,
  totalSpend,
  cancelledIds,
  toast,
  onToastDone,
}) {
  const activeSubs = SUBS.filter((s) => !cancelledIds.includes(s.id));
  const cancelledSubs = SUBS.filter((s) => cancelledIds.includes(s.id));
  const totalSaved = cancelledIds.reduce(
    (a, id) => a + (SUBS.find((s) => s.id === id)?.price || 0),
    0
  );
  const flashing = cancelledIds.length > 0;
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: theme.offWhite,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          background: theme.navy,
          padding: "50px 22px 24px",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -70,
            right: -50,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(29,111,232,0.22) 0%,transparent 70%)",
            animation: "orb 10s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(0,200,150,0.12) 0%,transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            position: "relative",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.45)",
                marginBottom: 2,
              }}
            >
              Good morning,
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "white" }}>
              Daniel Gellar
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {cancelledIds.length > 0 && (
              <div
                style={{
                  background: "rgba(0,200,150,0.18)",
                  border: "1px solid rgba(0,200,150,0.35)",
                  borderRadius: 20,
                  padding: "5px 11px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: theme.success,
                  animation: "fadeUp 0.4s ease both",
                }}
              >
                ↓ ${totalSaved.toFixed(2)} saved
              </div>
            )}
            <div
              style={{
                width: 38,
                height: 38,
                background: theme.blue,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 12,
                color: "white",
              }}
            >
              DG
            </div>
          </div>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.085)",
            border: flashing
              ? "1px solid rgba(0,200,150,0.35)"
              : "1px solid rgba(255,255,255,0.11)",
            borderRadius: 22,
            padding: "20px 22px 18px",
            backdropFilter: "blur(20px)",
            transition: "border-color 0.6s",
            animation: flashing ? "savingsPop 0.6s ease" : "none",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 6,
            }}
          >
            Monthly Subscription Spend
          </div>
          <AnimatedAmount value={totalSpend} flashing={flashing} />
          <div style={{ marginTop: 12, marginBottom: 4 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                vs. $80 goal
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: flashing ? theme.success : "rgba(255,255,255,0.55)",
                }}
              >
                {totalSpend <= 80
                  ? "✓ On target"
                  : `$${(totalSpend - 80).toFixed(2)} over`}
              </span>
            </div>
            <div
              style={{
                height: 5,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.min((totalSpend / 160) * 100, 100)}%`,
                  borderRadius: 3,
                  background:
                    totalSpend <= 80
                      ? theme.success
                      : `linear-gradient(90deg,${theme.success},${theme.warn})`,
                  transition:
                    "width 0.9s cubic-bezier(0.22,1,0.36,1),background 0.5s",
                }}
              />
            </div>
          </div>
          {flashing && (
            <div
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: theme.success,
                color: "white",
                fontSize: 11,
                fontWeight: 800,
                padding: "4px 10px",
                borderRadius: 20,
                animation: "popIn 0.35s cubic-bezier(0.17,0.89,0.32,1.49) both",
                boxShadow: "0 4px 12px rgba(0,200,150,0.4)",
              }}
            >
              SAVING ↓
            </div>
          )}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
        {activeSubs.length > 0 && (
          <div
            style={{
              margin: "16px 16px 0",
              background: `linear-gradient(135deg,${theme.navy},${theme.navyLight})`,
              borderRadius: 18,
              padding: "16px 18px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(45deg,rgba(255,255,255,0.02) 0px,rgba(255,255,255,0.02) 1px,transparent 1px,transparent 8px)",
                borderRadius: 18,
              }}
            />
            <div style={{ position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 5,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: theme.warn,
                        animation: "glow 2s ease-in-out infinite",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: theme.warn,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Hidden &amp; Forgotten
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 22,
                      color: "white",
                      lineHeight: 1.2,
                    }}
                  >
                    {activeSubs.length} subscription
                    {activeSubs.length > 1 ? "s" : ""} draining
                    <br />
                    <em style={{ color: "#FCA5A5", fontStyle: "italic" }}>
                      ${activeSubs.reduce((a, s) => a + s.price, 0).toFixed(2)}
                      /mo
                    </em>{" "}
                    unused
                  </div>
                </div>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "rgba(245,158,11,0.15)",
                    border: "1.5px solid rgba(245,158,11,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  ⚠️
                </div>
              </div>
            </div>
          </div>
        )}
        <SmartInsights />
        <div style={{ padding: "0 16px 0" }}>
          {activeSubs.length === 0 ? (
            <AllCaughtUp />
          ) : (
            activeSubs.map((sub, i) => (
              <SubscriptionCard
                key={sub.id}
                sub={sub}
                onCancel={onCancel}
                delay={i * 0.07}
              />
            ))
          )}
        </div>
        {cancelledSubs.length > 0 && (
          <div style={{ padding: "0 16px 20px" }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: theme.gray400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 10,
                paddingTop: 4,
              }}
            >
              Cancelled
            </div>
            {cancelledSubs.map((sub) => (
              <div
                key={sub.id}
                style={{
                  background: theme.successSoft,
                  border: "1px solid rgba(0,200,150,0.18)",
                  borderRadius: 16,
                  padding: "13px 14px",
                  marginBottom: 9,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  opacity: 0.72,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: theme.gray200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    filter: "grayscale(1)",
                    flexShrink: 0,
                  }}
                >
                  {sub.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: theme.gray500,
                      textDecoration: "line-through",
                    }}
                  >
                    {sub.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: theme.successMid,
                      marginTop: 2,
                      fontWeight: 600,
                    }}
                  >
                    ✓ Cancelled · saving ${sub.price}/mo
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ height: 16 }} />
      </div>
      {toast && <SavedToast sub={toast} onDone={onToastDone} />}
    </div>
  );
}

function CancelModal({ sub, onConfirm, onDismiss }) {
  const [confirming, setConfirming] = useState(false);
  if (!sub) return null;
  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => onConfirm(), 400);
  };
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(10,22,40,0.78)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "flex-end",
        zIndex: 300,
      }}
      onClick={(e) => e.target === e.currentTarget && onDismiss()}
    >
      <div
        style={{
          background: theme.white,
          borderRadius: "28px 28px 0 0",
          padding: "26px 22px 42px",
          width: "100%",
          animation: "sheetUp 0.38s cubic-bezier(0.32,0.72,0,1) both",
        }}
      >
        <div
          style={{
            width: 36,
            height: 4,
            background: theme.gray200,
            borderRadius: 2,
            margin: "0 auto 24px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "0 0 20px",
            borderBottom: `1px solid ${theme.gray100}`,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 15,
              background: sub.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              color: "white",
              fontWeight: 800,
            }}
          >
            {sub.icon}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: theme.navy }}>
              {sub.name}
            </div>
            <div style={{ fontSize: 12, color: theme.gray400, marginTop: 2 }}>
              Unused for {sub.lastUsed}
            </div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: theme.navy }}>
              ${sub.price}
            </div>
            <div style={{ fontSize: 11, color: theme.gray400 }}>/month</div>
          </div>
        </div>
        <h3
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: theme.navy,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Cancel this subscription?
        </h3>
        <p
          style={{
            fontSize: 13,
            color: theme.gray500,
            textAlign: "center",
            lineHeight: 1.65,
            marginBottom: 20,
          }}
        >
          You won't be charged after your current billing cycle.
        </p>
        <div
          style={{
            background: "linear-gradient(135deg,#ECFDF5,#D1FAE5)",
            border: "1px solid rgba(0,200,150,0.3)",
            borderRadius: 14,
            padding: "14px 18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: "#047857",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                fontWeight: 700,
                marginBottom: 2,
              }}
            >
              You'll save
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 26,
                color: theme.successMid,
              }}
            >
              ${sub.price}/mo
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 11,
                color: "#047857",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                fontWeight: 700,
                marginBottom: 2,
              }}
            >
              Per year
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 26,
                color: theme.successMid,
              }}
            >
              ${(sub.price * 12).toFixed(2)}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={handleConfirm}
            disabled={confirming}
            style={{
              padding: "17px",
              background: confirming
                ? theme.success
                : `linear-gradient(135deg,${theme.red},${theme.redMid})`,
              color: "white",
              border: "none",
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 800,
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            {confirming ? "✓ Cancelling…" : "Yes, Cancel Subscription"}
          </button>
          <button
            onClick={onDismiss}
            style={{
              padding: "16px",
              background: theme.gray100,
              color: theme.gray700,
              border: "none",
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Keep Subscription
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmScreen({ cancelledSub, totalSpend, onReview, onHome }) {
  const saved = cancelledSub?.price || 0;
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: theme.white,
      }}
    >
      <div
        style={{
          background: theme.navy,
          padding: "52px 28px 50px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 80% at 50% 60%,rgba(0,200,150,0.18) 0%,transparent 70%)",
          }}
        />
        {["#00C896", "#1D6FE8", "#D4A853", "#F472B6"].map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: c,
              top: "30%",
              left: `${20 + i * 18}%`,
              animation: `confettiA 1.2s ease ${i * 0.15}s both`,
            }}
          />
        ))}
        <div
          style={{
            width: 82,
            height: 82,
            background: theme.success,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            margin: "0 auto 18px",
            position: "relative",
            zIndex: 2,
            animation: "popIn 0.55s cubic-bezier(0.17,0.89,0.32,1.49) both",
          }}
        >
          ✓
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 28,
            color: "white",
            marginBottom: 6,
            position: "relative",
            zIndex: 2,
          }}
        >
          You're Back in Control.
        </h2>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            position: "relative",
            zIndex: 2,
          }}
        >
          {cancelledSub?.name} successfully cancelled
        </p>
        <div
          style={{
            position: "absolute",
            bottom: -28,
            left: -20,
            right: -20,
            height: 56,
            background: theme.white,
            borderRadius: "50%",
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "46px 20px 16px",
          scrollbarWidth: "none",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg,#ECFDF5,#D1FAE5)",
            border: "1px solid rgba(0,200,150,0.3)",
            borderRadius: 22,
            padding: "24px",
            textAlign: "center",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#047857",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 6,
            }}
          >
            Monthly Savings
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 52,
              color: theme.successMid,
              letterSpacing: "-1.5px",
              lineHeight: 1,
              marginBottom: 5,
            }}
          >
            ${saved.toFixed(2)}
          </div>
          <div style={{ fontSize: 13, color: "#047857" }}>
            That's <strong>${(saved * 12).toFixed(2)}</strong> back in your
            pocket this year
          </div>
        </div>
        <div
          style={{
            background: theme.offWhite,
            border: `1px solid ${theme.gray200}`,
            borderRadius: 16,
            padding: "16px 18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 13,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: theme.gray400,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 3,
              }}
            >
              New monthly total
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 28,
                color: theme.navy,
              }}
            >
              ${totalSpend.toFixed(2)}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{ fontSize: 11, color: theme.gray400, marginBottom: 3 }}
            >
              Was
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 22,
                color: theme.gray300,
                textDecoration: "line-through",
              }}
            >
              $127.94
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#EFF6FF",
            border: "1px solid #BFDBFE",
            borderRadius: 12,
            padding: "11px 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 16 }}>📧</span>
          <span style={{ fontSize: 12, color: "#1D4ED8" }}>
            Confirmation email sent to alex@email.com
          </span>
        </div>
      </div>
      <div
        style={{
          padding: "4px 20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <button
          onClick={onReview}
          style={{
            padding: "17px",
            background: theme.navy,
            color: "white",
            border: "none",
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Review Other Subscriptions
        </button>
        <button
          onClick={onHome}
          style={{
            padding: "16px",
            background: "transparent",
            color: theme.navy,
            border: `1.5px solid ${theme.gray200}`,
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Return Home
        </button>
      </div>
    </div>
  );
}

const FAQS = [
  {
    q: "Is my bank data safe with Zerra?",
    a: "Yes. We use read-only access via Plaid — we can see transactions, but we can never move money, make purchases, or change anything in your account. All data is encrypted with AES-256.",
    icon: "🔐",
  },
  {
    q: "How does Zerra cancel subscriptions?",
    a: "Once you tap Cancel, we contact the service directly on your behalf — by email, phone, or their cancellation portal. You'll receive a confirmation once it's done.",
    icon: "⚡",
  },
  {
    q: "Will I get a refund after cancelling?",
    a: "Zerra cancels your subscription going forward. Refunds depend on each service's policy. We'll always tell you what to expect before you confirm a cancellation.",
    icon: "💳",
  },
  {
    q: "Can I reconnect a cancelled subscription?",
    a: "Yes, anytime. Zerra only cancels what you approve. If you change your mind, just sign up again directly with the service — we don't block anything.",
    icon: "↩",
  },
  {
    q: "How do I disconnect my bank account?",
    a: "Go to Profile → Connected Accounts → Remove. Your data is deleted from our servers within 24 hours. You can also contact support and we'll handle it immediately.",
    icon: "🏦",
  },
];

function FaqItem({ faq, index, isOpen, onToggle }) {
  return (
    <div
      style={{
        background: theme.white,
        border: `1.5px solid ${isOpen ? theme.blue + "40" : theme.gray200}`,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 10,
        boxShadow: isOpen
          ? "0 4px 16px rgba(29,111,232,0.08)"
          : "0 1px 4px rgba(10,22,40,0.04)",
        transition: "border-color 0.25s, box-shadow 0.25s",
        animation: `fadeUp 0.35s ease ${index * 0.06}s both`,
        cursor: "pointer",
      }}
      onClick={onToggle}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "16px 18px",
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            flexShrink: 0,
            background: isOpen
              ? `linear-gradient(135deg,${theme.blue}22,${theme.blue}11)`
              : theme.gray100,
            border: isOpen
              ? `1px solid ${theme.blue}30`
              : `1px solid ${theme.gray200}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            transition: "background 0.25s, border-color 0.25s",
          }}
        >
          {faq.icon}
        </div>
        <span
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: 700,
            color: isOpen ? theme.navy : theme.gray700,
            lineHeight: 1.35,
            transition: "color 0.2s",
          }}
        >
          {faq.q}
        </span>
        <div
          style={{
            width: 28,
            height: 28,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: isOpen ? theme.blue : theme.gray100,
            transition: "background 0.25s, transform 0.25s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
            <path
              d="M1 1L5.5 5.5L10 1"
              stroke={isOpen ? "white" : theme.gray400}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div
          style={{
            padding: "0 18px 18px",
            animation: "faqExpand 0.22s ease both",
          }}
        >
          <div
            style={{ height: 1, background: theme.gray100, marginBottom: 14 }}
          />
          <p
            style={{
              fontSize: 13,
              color: theme.gray500,
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            {faq.a}
          </p>
        </div>
      )}
    </div>
  );
}

function HelpScreen({ onGoHome }) {
  const [openIdx, setOpenIdx] = useState(null);
  const [contactPressed, setContactPressed] = useState(false);
  const [contactState, setContactState] = useState("idle"); // idle | sending | sent
  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i));

  const handleContact = () => {
    if (contactState !== "idle") return;
    setContactState("sending");
    setTimeout(() => setContactState("sent"), 1200);
  };

  const isSent = contactState === "sent";
  const isSending = contactState === "sending";

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: theme.offWhite,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: theme.navy,
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <StatusBar dark />
        <div
          style={{
            position: "absolute",
            top: -50,
            right: -30,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(29,111,232,0.2) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -30,
            left: -20,
            width: 140,
            height: 140,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(13,181,160,0.14) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ padding: "4px 22px 28px", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                Support
              </div>
              <h1
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 26,
                  color: "white",
                  lineHeight: 1.15,
                }}
              >
                Help
                <br />
                <em style={{ fontStyle: "italic", color: "#93C5FD" }}>
                  Center
                </em>
              </h1>
            </div>
            <button
              onClick={onGoHome}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "rgba(255,255,255,0.09)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 20,
                padding: "8px 14px",
                color: "rgba(255,255,255,0.72)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.03em",
                cursor: "pointer",
                marginTop: 4,
                fontFamily: "'Syne',sans-serif",
              }}
            >
              <span style={{ fontSize: 14 }}>⌂</span>Home
            </button>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              backdropFilter: "blur(12px)",
            }}
          >
            <span style={{ fontSize: 16, opacity: 0.5 }}>🔍</span>
            <span
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.35)",
                fontWeight: 500,
              }}
            >
              Common questions answered below
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          scrollbarWidth: "none",
          padding: "20px 18px 24px",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: theme.gray400,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 14,
            animation: "fadeUp 0.3s ease both",
          }}
        >
          Frequently Asked Questions
        </div>
        {FAQS.map((faq, i) => (
          <FaqItem
            key={i}
            faq={faq}
            index={i}
            isOpen={openIdx === i}
            onToggle={() => toggle(i)}
          />
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            margin: "24px 0 20px",
          }}
        >
          <div style={{ flex: 1, height: 1, background: theme.gray200 }} />
          <span
            style={{
              fontSize: 11,
              color: theme.gray400,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Still need help?
          </span>
          <div style={{ flex: 1, height: 1, background: theme.gray200 }} />
        </div>

        {/* Support card — flips between default and sent state */}
        <div
          style={{
            background: isSent ? theme.successSoft : theme.white,
            border: `1.5px solid ${
              isSent ? "rgba(0,200,150,0.3)" : theme.gray200
            }`,
            borderRadius: 20,
            padding: "20px 20px 22px",
            marginBottom: 14,
            boxShadow: isSent
              ? "0 4px 20px rgba(0,200,150,0.12)"
              : "0 2px 12px rgba(10,22,40,0.05)",
            animation: "fadeUp 0.4s ease 0.35s both",
            transition: "background 0.5s, border-color 0.5s, box-shadow 0.5s",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Sent confirmation overlay */}
          {isSent && (
            <div
              style={{
                animation: "fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both",
              }}
            >
              {/* Check circle */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.success}, ${theme.teal})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 20px rgba(0,200,150,0.35)",
                    animation:
                      "popIn 0.5s cubic-bezier(0.17,0.89,0.32,1.49) both",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12L10 18L20 6"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="40"
                      strokeDashoffset="40"
                      style={{
                        animation: "checkDraw 0.45s ease 0.2s forwards",
                      }}
                    />
                  </svg>
                </div>
              </div>

              {/* Message */}
              <div style={{ textAlign: "center", marginBottom: 18 }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 18,
                    color: theme.navy,
                    marginBottom: 6,
                    lineHeight: 1.25,
                  }}
                >
                  Message sent.
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: theme.gray500,
                    lineHeight: 1.65,
                  }}
                >
                  Our team will respond within{" "}
                  <strong style={{ color: theme.successMid }}>4 hours</strong>.
                </div>
              </div>

              {/* Ticket meta strip */}
              <div
                style={{
                  background: "rgba(0,200,150,0.08)",
                  border: "1px solid rgba(0,200,150,0.2)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: theme.successMid,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 2,
                    }}
                  >
                    Ticket opened
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: theme.gray700,
                    }}
                  >
                    #{Math.floor(100000 + Math.random() * 900000)}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: theme.successMid,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 2,
                    }}
                  >
                    Sent to
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: theme.gray700,
                    }}
                  >
                    Dan@email.com
                  </div>
                </div>
              </div>

              {/* Subtle send-another link */}
              <button
                onClick={() => setContactState("idle")}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "transparent",
                  border: `1px solid rgba(0,200,150,0.25)`,
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  color: theme.successMid,
                  cursor: "pointer",
                  letterSpacing: "0.03em",
                  fontFamily: "'Syne',sans-serif",
                }}
              >
                Send another message
              </button>
            </div>
          )}

          {/* Default (idle / sending) state */}
          {!isSent && (
            <>
              <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
                {[
                  { icon: "✉️", label: "Email", detail: "Reply in 4 hrs" },
                  { icon: "💬", label: "Chat", detail: "Usually instant" },
                ].map((ch, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      background: theme.offWhite,
                      border: `1px solid ${theme.gray200}`,
                      borderRadius: 14,
                      padding: "13px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{ch.icon}</span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: theme.navy,
                      }}
                    >
                      {ch.label}
                    </span>
                    <span style={{ fontSize: 11, color: theme.gray400 }}>
                      {ch.detail}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onMouseDown={() => setContactPressed(true)}
                onMouseUp={() => setContactPressed(false)}
                onMouseLeave={() => setContactPressed(false)}
                onTouchStart={() => setContactPressed(true)}
                onTouchEnd={() => setContactPressed(false)}
                onClick={handleContact}
                disabled={isSending}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: isSending
                    ? `linear-gradient(135deg,${theme.navyLight},${theme.blue})`
                    : contactPressed
                    ? theme.navyMid
                    : `linear-gradient(135deg,${theme.navy},${theme.navyLight})`,
                  color: "white",
                  border: "none",
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: isSending ? "default" : "pointer",
                  letterSpacing: "0.03em",
                  boxShadow: contactPressed
                    ? "0 2px 8px rgba(10,22,40,0.2)"
                    : "0 8px 24px rgba(10,22,40,0.25)",
                  transform: contactPressed ? "scale(0.98)" : "scale(1)",
                  transition:
                    "transform 0.12s, box-shadow 0.12s, background 0.3s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 9,
                  fontFamily: "'Syne',sans-serif",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Shimmer sweep while sending */}
                {isSending && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.18) 50%,transparent 100%)",
                      animation: "stepFill 0.9s ease infinite",
                      backgroundSize: "200% 100%",
                    }}
                  />
                )}
                <span style={{ fontSize: 17, position: "relative", zIndex: 1 }}>
                  {isSending ? "⏳" : "💬"}
                </span>
                <span style={{ position: "relative", zIndex: 1 }}>
                  {isSending ? "Sending…" : "Contact Support"}
                </span>
              </button>
            </>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            animation: "fadeUp 0.4s ease 0.45s both",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: isSent ? theme.success : theme.success,
              animation: isSent
                ? "none"
                : "ringPulse 2.5s ease-in-out infinite",
            }}
          />
          <span style={{ fontSize: 12, color: theme.gray400, fontWeight: 500 }}>
            {isSent
              ? "Ticket submitted successfully"
              : "Support team online · Mon–Fri, 9am–6pm ET"}
          </span>
        </div>
        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}

function Toggle({ on, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        width: 46,
        height: 27,
        borderRadius: 14,
        flexShrink: 0,
        cursor: "pointer",
        background: on
          ? `linear-gradient(135deg,${theme.blue},${theme.blueLight})`
          : theme.gray200,
        position: "relative",
        transition: "background 0.22s",
        boxShadow: on ? "0 2px 10px rgba(29,111,232,0.35)" : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3.5,
          left: on ? 22 : 3.5,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: theme.white,
          boxShadow: "0 1px 5px rgba(0,0,0,0.2)",
          transition: "left 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      />
    </div>
  );
}

function SectionCard({ title, delay, children }) {
  return (
    <div
      style={{ marginBottom: 20, animation: `fadeUp 0.4s ease ${delay}s both` }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 800,
          color: theme.gray400,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginBottom: 9,
          paddingLeft: 4,
        }}
      >
        {title}
      </div>
      <div
        style={{
          background: theme.white,
          border: `1px solid ${theme.gray200}`,
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 1px 8px rgba(10,22,40,0.05)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Row({ icon, iconTint, label, sub, rightEl, last }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 18px",
        borderBottom: last ? "none" : `1px solid ${theme.gray100}`,
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 11,
          flexShrink: 0,
          background: iconTint || theme.gray100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 17,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: theme.navy,
            lineHeight: 1.2,
            marginBottom: sub ? 2 : 0,
          }}
        >
          {label}
        </div>
        {sub && (
          <div
            style={{
              fontSize: 12,
              color: theme.gray400,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {sub}
          </div>
        )}
      </div>
      {rightEl}
    </div>
  );
}

function ActiveBadge() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: theme.successSoft,
        border: `1px solid rgba(0,200,150,0.22)`,
        borderRadius: 20,
        padding: "3px 10px 3px 7px",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: theme.success,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path
            d="M1.5 4L3 5.5L6.5 2"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: theme.successMid }}>
        Active
      </span>
    </div>
  );
}

function EnabledBadge() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: theme.successSoft,
        border: `1px solid rgba(0,200,150,0.22)`,
        borderRadius: 20,
        padding: "3px 10px 3px 7px",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: theme.success,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path
            d="M1.5 4L3 5.5L6.5 2"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: theme.successMid }}>
        Enabled
      </span>
    </div>
  );
}

function Chevron() {
  return (
    <svg
      width="8"
      height="13"
      viewBox="0 0 8 13"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M1.5 1.5L6.5 6.5L1.5 11.5"
        stroke={theme.gray300}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfileScreen({ onSignOut }) {
  const [subAlerts, setSubAlerts] = useState(true);
  const [weeklySummary, setWeekly] = useState(false);
  const [soPressed, setSO] = useState(false);
  const [discPressed, setDisc] = useState(false);
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: theme.offWhite,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: theme.navy,
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <StatusBar dark />
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -40,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(29,111,232,0.18) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -20,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(0,200,150,0.1) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            padding: "6px 24px 30px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: `linear-gradient(145deg,#2B5FCC,${theme.blueLight})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Playfair Display',serif",
                fontSize: 26,
                fontWeight: 700,
                color: "white",
                boxShadow: `0 0 0 3px rgba(255,255,255,0.1), 0 0 0 6px rgba(29,111,232,0.15), 0 10px 28px rgba(29,111,232,0.45)`,
                animation:
                  "popIn 0.5s cubic-bezier(0.17,0.89,0.32,1.49) 0.1s both",
                letterSpacing: "-0.5px",
              }}
            >
              VC
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 3,
                right: 3,
                width: 15,
                height: 15,
                borderRadius: "50%",
                background: theme.success,
                border: `2.5px solid ${theme.navy}`,
                animation: "ringPulse 2.5s ease-in-out infinite",
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              animation: "fadeUp 0.4s ease 0.18s both",
              opacity: 0,
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 23,
                color: "white",
                lineHeight: 1.15,
                marginBottom: 4,
              }}
            >
              Daniel Gellar
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.48)",
                marginBottom: 12,
              }}
            >
              Dan@BusinesswithAi.com
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: "4px 12px",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: theme.success,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.58)",
                  letterSpacing: "0.03em",
                }}
              >
                Member since Jan 2025
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          scrollbarWidth: "none",
          padding: "20px 18px 20px",
        }}
      >
        <SectionCard title="Connected Accounts" delay={0.04}>
          <Row
            icon="🏦"
            iconTint="#EFF6FF"
            label="Chase Bank"
            sub="Checking ••••4821"
            last={false}
            rightEl={<ActiveBadge />}
          />
          <div style={{ padding: "12px 16px 14px" }}>
            <button
              onMouseDown={() => setDisc(true)}
              onMouseUp={() => setDisc(false)}
              onMouseLeave={() => setDisc(false)}
              onTouchStart={() => setDisc(true)}
              onTouchEnd={() => setDisc(false)}
              style={{
                width: "100%",
                padding: "11px 0",
                background: discPressed ? "#FEE2E2" : "#FFF5F5",
                border: `1.5px solid ${discPressed ? "#FCA5A5" : "#FECACA"}`,
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 700,
                color: theme.red,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background 0.14s, transform 0.1s",
                transform: discPressed ? "scale(0.98)" : "scale(1)",
                fontFamily: "'Syne',sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M9 2H12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9M5 10L2 7l3-3M2 7h8"
                  stroke={theme.red}
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Disconnect Account
            </button>
          </div>
        </SectionCard>
        <SectionCard title="Notifications" delay={0.12}>
          <Row
            icon="🔔"
            iconTint="#EFF6FF"
            label="Subscription Alerts"
            sub="New charges detected in your accounts"
            last={false}
            rightEl={
              <Toggle on={subAlerts} onToggle={() => setSubAlerts((v) => !v)} />
            }
          />
          <Row
            icon="📊"
            iconTint="#F0FDF4"
            label="Weekly Summary"
            sub="Spending digest every Monday morning"
            last={true}
            rightEl={
              <Toggle
                on={weeklySummary}
                onToggle={() => setWeekly((v) => !v)}
              />
            }
          />
        </SectionCard>
        <SectionCard title="Security" delay={0.2}>
          <Row
            icon="🔑"
            iconTint="#FFFBEB"
            label="Change Password"
            sub="Last updated 3 months ago"
            last={false}
            rightEl={<Chevron />}
          />
          <Row
            icon="🛡️"
            iconTint="#F0FDF4"
            label="Two-Factor Authentication"
            sub="Authenticator app"
            last={true}
            rightEl={<EnabledBadge />}
          />
        </SectionCard>
        <div style={{ animation: "fadeUp 0.4s ease 0.28s both" }}>
          <button
            onMouseDown={() => setSO(true)}
            onMouseUp={() => setSO(false)}
            onMouseLeave={() => setSO(false)}
            onTouchStart={() => setSO(true)}
            onTouchEnd={() => setSO(false)}
            onClick={onSignOut}
            style={{
              width: "100%",
              padding: "16px",
              background: soPressed
                ? theme.navyMid
                : `linear-gradient(135deg,${theme.navy},${theme.navyLight})`,
              color: "white",
              border: "none",
              borderRadius: 16,
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              boxShadow: "0 4px 18px rgba(10,22,40,0.22)",
              transition: "background 0.15s, transform 0.1s",
              transform: soPressed ? "scale(0.98)" : "scale(1)",
              fontFamily: "'Syne',sans-serif",
              letterSpacing: "0.03em",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3M10 11l3-3-3-3M13 8H6"
                stroke="white"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Sign Out
          </button>
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: 18,
            marginBottom: 4,
            fontSize: 11,
            color: theme.gray300,
            animation: "fadeUp 0.4s ease 0.34s both",
            letterSpacing: "0.03em",
          }}
        >
          Zerra v1.0.0
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [activeTab, setActiveTab] = useState("home");
  const [modalSub, setModalSub] = useState(null);
  const [cancelledIds, setCancelledIds] = useState([]);
  const [historyItems, setHistoryItems] = useState(SEED_HISTORY);
  const [lastCancelled, setLastCancelled] = useState(null);
  const [totalSpend, setTotalSpend] = useState(127.94);
  const [toast, setToast] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const [dir, setDir] = useState("forward");

  const mainScreens = ["home", "history", "profile", "help"];
  const showNav = mainScreens.includes(screen) || screen === "confirm";

  const navigate = (next, d = "forward") => {
    setDir(d);
    setAnimKey((k) => k + 1);
    setScreen(next);
  };

  const handleConfirmCancel = () => {
    if (!modalSub) return;
    const sub = modalSub;
    setTotalSpend((t) => Math.round((t - sub.price) * 100) / 100);
    setCancelledIds((ids) => [...ids, sub.id]);
    const histItem = {
      ...sub,
      id: `hist_${sub.id}_${Date.now()}`,
      subId: sub.id,
      cancelledAt: new Date(),
    };
    setHistoryItems((h) => [histItem, ...h]);
    setLastCancelled(sub);
    setModalSub(null);
    setToast(sub);
    setTimeout(() => navigate("confirm"), 1400);
  };

  const renderScreen = () => {
    switch (screen) {
      case "welcome":
        return (
          <WelcomeScreen
            onGetStarted={() => navigate("onboard1")}
            onSignIn={() => {
              navigate("home");
              setActiveTab("home");
            }}
          />
        );
      case "onboard1":
        return (
          <Onboard1
            onNext={() => navigate("onboard2")}
            onBack={() => navigate("welcome", "back")}
          />
        );
      case "onboard2":
        return (
          <Onboard2
            onConnect={() => {
              navigate("home");
              setActiveTab("home");
            }}
            onBack={() => navigate("onboard1", "back")}
          />
        );
      case "home":
        return (
          <HomeScreen
            onCancel={setModalSub}
            totalSpend={totalSpend}
            cancelledIds={cancelledIds}
            toast={toast}
            onToastDone={() => setToast(null)}
          />
        );
      case "history":
        return <HistoryScreen historyItems={historyItems} />;
      case "confirm":
        return (
          <ConfirmScreen
            cancelledSub={lastCancelled}
            totalSpend={totalSpend}
            onReview={() => {
              navigate("home");
              setActiveTab("home");
            }}
            onHome={() => {
              navigate("home");
              setActiveTab("home");
            }}
          />
        );
      case "help":
        return (
          <HelpScreen
            onGoHome={() => {
              navigate("home");
              setActiveTab("home");
            }}
          />
        );
      case "profile":
        return (
          <ProfileScreen
            onSignOut={() => {
              navigate("welcome");
              setActiveTab("home");
              setCancelledIds([]);
              setHistoryItems(SEED_HISTORY);
              setTotalSpend(127.94);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{css}</style>
      <div
        style={{
          width: 390,
          height: 844,
          background: theme.white,
          borderRadius: 50,
          boxShadow:
            "0 0 0 10px #111827,0 0 0 13px #1e2939,0 48px 90px rgba(0,0,0,0.65)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div
          key={animKey}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
            animation: `${
              dir === "forward" ? "fadeIn" : "fadeInLeft"
            } 0.35s ease both`,
          }}
        >
          {renderScreen()}
          {modalSub && (
            <CancelModal
              sub={modalSub}
              onConfirm={handleConfirmCancel}
              onDismiss={() => setModalSub(null)}
            />
          )}
        </div>
        {showNav && (
          <BottomNav
            active={activeTab}
            onTab={(id) => {
              setActiveTab(id);
              navigate(id);
            }}
          />
        )}
      </div>
    </>
  );
}
