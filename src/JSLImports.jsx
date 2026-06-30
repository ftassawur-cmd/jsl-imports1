import React, { useState, useEffect, useMemo, useRef, useCallback, createContext, useContext } from "react";
import {
  Car, LayoutDashboard, Calculator, GitCompare, Clock, Star, FileText, TrendingUp,
  Building2, Settings, Bell, ChevronDown, Check, ShieldCheck, Sparkles, Ship, Anchor,
  Fuel, Gauge, Cog, ArrowRight, ArrowLeft, Plus, Search, Sun, Moon, Download, Printer,
  Trash2, X, Eye, RefreshCw, Wifi, WifiOff, CircleDollarSign, CheckCircle2, Info,
  LockKeyhole, MapPin, Receipt, Percent, Wallet, BadgeCheck, Layers, ListChecks,
  ChevronRight, Heart, Zap, Globe, FileSpreadsheet, ScrollText, PiggyBank, Edit3, Save
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, AreaChart, Area, RadialBarChart, RadialBar
} from "recharts";

/* ============================================================================
   GLOBAL KEYFRAMES & ATMOSPHERE
   ========================================================================== */
const GlobalStyles = () => (
  <style>{`
    @keyframes jslFadeUp { from { opacity:0; transform: translateY(18px);} to {opacity:1; transform:translateY(0);} }
    @keyframes jslFadeIn { from { opacity:0;} to {opacity:1;} }
    @keyframes jslFloat { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-14px) } }
    @keyframes jslFloatSlow { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-26px) } }
    @keyframes jslSpin { from{ transform: rotate(0) } to{ transform: rotate(360deg) } }
    @keyframes jslSpinRev { from{ transform: rotate(360deg) } to{ transform: rotate(0) } }
    @keyframes jslPulse { 0%,100%{ opacity:.5; transform: scale(1) } 50%{ opacity:1; transform: scale(1.05) } }
    @keyframes jslShimmer { 0%{ background-position: -460px 0 } 100%{ background-position: 460px 0 } }
    @keyframes jslGradient { 0%{ background-position:0% 50% } 50%{ background-position:100% 50% } 100%{ background-position:0% 50% } }
    @keyframes jslRise { from{ transform: translateY(110vh) scale(.6); opacity:0 } 12%{opacity:.8} 88%{opacity:.8} to{ transform: translateY(-10vh) scale(1); opacity:0 } }
    @keyframes jslGlow { 0%,100%{ box-shadow:0 0 28px rgba(99,102,241,.45) } 50%{ box-shadow:0 0 54px rgba(139,92,246,.75) } }
    .jsl-up { animation: jslFadeUp .6s cubic-bezier(.16,1,.3,1) both; }
    .jsl-in { animation: jslFadeIn .5s ease both; }
    .jsl-scroll::-webkit-scrollbar { width:9px; height:9px; }
    .jsl-scroll::-webkit-scrollbar-thumb { background: rgba(148,163,184,.28); border-radius:9px; }
    .jsl-scroll::-webkit-scrollbar-track { background: transparent; }
    .jsl-tap { transition: transform .15s ease, box-shadow .25s ease, background .25s ease, border-color .25s ease; }
    .jsl-tap:hover { transform: translateY(-3px); }
    .jsl-tap:active { transform: translateY(0) scale(.99); }
    .jsl-link { transition: color .2s ease, background .2s ease, transform .2s ease; }
    * { -webkit-tap-highlight-color: transparent; }
    @media (prefers-reduced-motion: reduce){
      .jsl-up,.jsl-in{ animation:none !important; }
      *{ scroll-behavior:auto !important; }
    }
    .jsl-shimmer-text {
      background: linear-gradient(90deg,#c7d2fe,#a78bfa,#818cf8,#c7d2fe);
      background-size: 280% 100%;
      -webkit-background-clip:text; background-clip:text; color:transparent;
      animation: jslGradient 6s ease infinite;
    }
  `}</style>
);

/* ============================================================================
   THEME TOKENS
   ========================================================================== */
const THEMES = {
  dark: {
    name: "dark",
    appBg: "radial-gradient(1200px 700px at 78% -10%, rgba(99,102,241,.18), transparent 60%), radial-gradient(900px 600px at 10% 110%, rgba(139,92,246,.12), transparent 55%), linear-gradient(180deg,#070b16 0%,#080d1a 60%,#060912 100%)",
    sidebar: "linear-gradient(180deg, rgba(13,18,33,.92), rgba(9,13,24,.96))",
    panel: "rgba(255,255,255,0.035)",
    panelSolid: "rgba(17,23,40,0.72)",
    glass: "rgba(255,255,255,0.05)",
    glassStrong: "rgba(255,255,255,0.08)",
    border: "rgba(255,255,255,0.09)",
    borderStrong: "rgba(255,255,255,0.16)",
    text: "#eef2fb",
    textSoft: "#c2cadb",
    textMuted: "#8a96ad",
    accent: "#6366f1",
    accent2: "#8b5cf6",
    accentSoft: "rgba(99,102,241,.16)",
    good: "#34d399",
    goodSoft: "rgba(52,211,153,.16)",
    warn: "#fbbf24",
    danger: "#f87171",
    chip: "rgba(255,255,255,0.06)",
    inputBg: "rgba(255,255,255,0.04)",
    shadow: "0 24px 60px -22px rgba(0,0,0,.7)",
    heroSky: ["#1b1030", "#3b2152", "#6d3b56", "#b9663f", "#e2964a"],
  },
  light: {
    name: "light",
    appBg: "radial-gradient(1100px 640px at 80% -10%, rgba(99,102,241,.16), transparent 60%), radial-gradient(820px 520px at 6% 108%, rgba(139,92,246,.12), transparent 55%), linear-gradient(180deg,#f4f6fc 0%,#eef1f9 100%)",
    sidebar: "linear-gradient(180deg, rgba(255,255,255,.92), rgba(247,249,253,.96))",
    panel: "rgba(255,255,255,0.78)",
    panelSolid: "rgba(255,255,255,0.92)",
    glass: "rgba(255,255,255,0.7)",
    glassStrong: "rgba(255,255,255,0.85)",
    border: "rgba(15,23,42,0.09)",
    borderStrong: "rgba(15,23,42,0.16)",
    text: "#0f1729",
    textSoft: "#32405c",
    textMuted: "#64748b",
    accent: "#4f46e5",
    accent2: "#7c3aed",
    accentSoft: "rgba(79,70,229,.10)",
    good: "#059669",
    goodSoft: "rgba(5,150,105,.12)",
    warn: "#d97706",
    danger: "#dc2626",
    chip: "rgba(15,23,42,0.05)",
    inputBg: "rgba(255,255,255,0.9)",
    shadow: "0 24px 60px -28px rgba(31,41,80,.35)",
    heroSky: ["#cdd7f0", "#e7d5e8", "#f3cdb6", "#f6b98e", "#fbd6a0"],
  },
};

/* ============================================================================
   CONFIGURATION (JSON-driven, editable in Admin) -- nothing hardcoded in logic
   ========================================================================== */
const DEFAULT_CONFIG = {
  currency: { base: "JPY", target: "LKR", defaultRate: 1.85, lastRate: 1.85 },

  // Tax + levy rules. NOTE: illustrative defaults — editable in Admin to match
  // the current published Sri Lanka schedule. Not official tax advice.
  tax: {
    valuationFactor: 1.0,     // CIF -> Customs value
    dutyRate: 0.10,           // Customs Import Duty
    palRate: 0.05,            // Ports & Airports Development Levy
    cessRate: 0.0,            // CESS
    vatRate: 0.12,            // VAT on (CV + Duty + Excise + PAL + CESS)
    luxuryThresholdLKR: 12000000,
    luxuryRate: 0.0,
    // Excise depends on fuel + engine capacity bracket (% of CV + Duty)
    excise: {
      Hybrid: [
        { maxCc: 1000, rate: 0.12 }, { maxCc: 1500, rate: 0.16 },
        { maxCc: 2000, rate: 0.20 }, { maxCc: 3000, rate: 0.30 }, { maxCc: 99999, rate: 0.45 },
      ],
      Petrol: [
        { maxCc: 1000, rate: 0.20 }, { maxCc: 1300, rate: 0.28 },
        { maxCc: 1600, rate: 0.36 }, { maxCc: 2000, rate: 0.48 }, { maxCc: 99999, rate: 0.62 },
      ],
      Diesel: [
        { maxCc: 1500, rate: 0.24 }, { maxCc: 2000, rate: 0.34 },
        { maxCc: 2500, rate: 0.44 }, { maxCc: 99999, rate: 0.58 },
      ],
      PHEV: [
        { maxCc: 1500, rate: 0.10 }, { maxCc: 2000, rate: 0.14 }, { maxCc: 99999, rate: 0.22 },
      ],
      EV: [{ maxCc: 99999, rate: 0.06 }],
    },
  },

  fees: {
    auctionFeesJPY: 95000,
    exporterFeesJPY: 120000,
    insuranceJPY: 45000,
    documentationLKR: 60000,
    inlandTransportLKR: 85000,
    inspectionLKR: 38000,
    brokerLKR: 55000,
    miscLKR: 40000,
    registrationLKR: 445000,
  },

  ports: [
    { id: "yokohama", name: "Yokohama", popular: true },
    { id: "osaka", name: "Osaka" },
    { id: "nagoya", name: "Nagoya" },
    { id: "kobe", name: "Kobe" },
    { id: "kawasaki", name: "Kawasaki" },
    { id: "moji", name: "Moji (Kitakyushu)" },
    { id: "hakata", name: "Hakata (Fukuoka)" },
  ],

  shipping: [
    { id: "roro", name: "RoRo Shipping", freightJPY: 145000, note: "Roll-on/Roll-off — most economical" },
    { id: "container-shared", name: "Container (Shared)", freightJPY: 195000, note: "Shared 40ft — balanced cost & safety" },
    { id: "container-sole", name: "Container (Sole)", freightJPY: 340000, note: "Exclusive container — best protection" },
  ],

  profit: { targetMarginPct: 18, commissionPct: 2, reconditioningLKR: 180000, marketingLKR: 45000 },
  vehicleFob: {},
};

/* ============================================================================
   VEHICLE DATABASE (config) — specs, typical FOB, brand color, body type
   ========================================================================== */
const BRAND_COLOR = {
  Toyota: "#d7dde6", Honda: "#c9d2dc", Nissan: "#cfd6df",
  Suzuki: "#d2dae3", Mazda: "#b9242f", Mitsubishi: "#c9d1da",
};

const VEHICLES = {
  Toyota: {
    Prius: {
      body: "Hatchback",
      variants: {
        "ZVW51": { cc: 1797, fuel: "Hybrid", drive: "2WD", grade: "4 - 4.5", fobJPY: 1320000, years: [2018, 2019, 2020, 2021, 2022, 2023] },
        "ZVW30": { cc: 1797, fuel: "Hybrid", drive: "2WD", grade: "3.5 - 4", fobJPY: 880000, years: [2012, 2013, 2014, 2015] },
        "ZVW50": { cc: 1797, fuel: "Hybrid", drive: "2WD", grade: "4 - 4.5", fobJPY: 1180000, years: [2016, 2017, 2018] },
      },
    },
    Aqua: { body: "Hatchback", variants: { "NHP10": { cc: 1496, fuel: "Hybrid", drive: "2WD", grade: "4 - 4.5", fobJPY: 980000, years: [2017, 2018, 2019, 2020, 2021, 2022] } } },
    Vitz: { body: "Hatchback", variants: { "KSP130": { cc: 996, fuel: "Petrol", drive: "2WD", grade: "4", fobJPY: 720000, years: [2016, 2017, 2018, 2019, 2020] } } },
    Allion: { body: "Sedan", variants: { "NZT260": { cc: 1496, fuel: "Petrol", drive: "2WD", grade: "4 - 4.5", fobJPY: 1090000, years: [2016, 2017, 2018, 2019, 2020] } } },
    "C-HR": { body: "SUV", variants: { "ZYX10": { cc: 1797, fuel: "Hybrid", drive: "2WD", grade: "4 - 4.5", fobJPY: 1450000, years: [2018, 2019, 2020, 2021, 2022] } } },
    "Land Cruiser Prado": { body: "SUV", variants: { "GDJ150": { cc: 2755, fuel: "Diesel", drive: "4WD", grade: "4.5 - 5", fobJPY: 4250000, years: [2018, 2019, 2020, 2021, 2022, 2023] } } },
  },
  Honda: {
    Vezel: { body: "SUV", variants: { "RU3": { cc: 1496, fuel: "Hybrid", drive: "2WD", grade: "4 - 4.5", fobJPY: 1280000, years: [2017, 2018, 2019, 2020, 2021] } } },
    Fit: { body: "Hatchback", variants: { "GP5": { cc: 1317, fuel: "Hybrid", drive: "2WD", grade: "4", fobJPY: 860000, years: [2016, 2017, 2018, 2019, 2020] } } },
    Civic: { body: "Sedan", variants: { "FC1": { cc: 1498, fuel: "Petrol", drive: "2WD", grade: "4.5", fobJPY: 1650000, years: [2018, 2019, 2020, 2021] } } },
  },
  Nissan: {
    "X-Trail": { body: "SUV", variants: { "T32": { cc: 1997, fuel: "Hybrid", drive: "4WD", grade: "4 - 4.5", fobJPY: 1520000, years: [2017, 2018, 2019, 2020, 2021] } } },
    Leaf: { body: "Hatchback", variants: { "ZE1": { cc: 0, fuel: "EV", drive: "2WD", grade: "4 - 4.5", fobJPY: 1380000, years: [2018, 2019, 2020, 2021, 2022] } } },
    Note: { body: "Hatchback", variants: { "E12": { cc: 1198, fuel: "Hybrid", drive: "2WD", grade: "4", fobJPY: 790000, years: [2016, 2017, 2018, 2019, 2020] } } },
  },
  Suzuki: {
    "Wagon R": { body: "Hatchback", variants: { "MH55S": { cc: 657, fuel: "Petrol", drive: "2WD", grade: "4 - 4.5", fobJPY: 620000, years: [2018, 2019, 2020, 2021, 2022] } } },
    Swift: { body: "Hatchback", variants: { "ZC83S": { cc: 1242, fuel: "Petrol", drive: "2WD", grade: "4", fobJPY: 880000, years: [2017, 2018, 2019, 2020, 2021] } } },
  },
  Mazda: {
    "CX-5": { body: "SUV", variants: { "KF2P": { cc: 2188, fuel: "Diesel", drive: "4WD", grade: "4.5 - 5", fobJPY: 1980000, years: [2018, 2019, 2020, 2021, 2022] } } },
    Demio: { body: "Hatchback", variants: { "DJ3FS": { cc: 1496, fuel: "Petrol", drive: "2WD", grade: "4", fobJPY: 840000, years: [2016, 2017, 2018, 2019, 2020] } } },
  },
  Mitsubishi: {
    Outlander: { body: "SUV", variants: { "GG2W": { cc: 2360, fuel: "PHEV", drive: "4WD", grade: "4 - 4.5", fobJPY: 1720000, years: [2018, 2019, 2020, 2021, 2022] } } },
  },
};

/* ============================================================================
   HELPERS
   ========================================================================== */
const fmtLKR = (n) => "LKR " + Math.round(n || 0).toLocaleString("en-LK");
const fmtJPY = (n) => "¥" + Math.round(n || 0).toLocaleString("en-US");
const fmtNum = (n, d = 0) => (n || 0).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const uid = () => Math.random().toString(36).slice(2, 9);

function exciseRateFor(config, fuel, cc) {
  const table = config.tax.excise[fuel] || config.tax.excise.Petrol;
  const row = table.find((b) => cc <= b.maxCc) || table[table.length - 1];
  return row.rate;
}

/* Core landed-cost engine — returns every intermediate value + formula text */
function computeLanded(inputs, config, rate) {
  const auctionPriceJPY = +inputs.auctionPriceJPY || 0;
  const auctionFeesJPY = +inputs.auctionFeesJPY || 0;
  const exporterFeesJPY = +inputs.exporterFeesJPY || 0;
  const insuranceJPY = +inputs.insuranceJPY || 0;
  const freightJPY = +inputs.freightJPY || 0;

  const fobJPY = auctionPriceJPY + auctionFeesJPY + exporterFeesJPY;
  const cifJPY = fobJPY + insuranceJPY + freightJPY;

  const fobLKR = fobJPY * rate;
  const shippingLKR = (insuranceJPY + freightJPY) * rate;
  const cifLKR = cifJPY * rate;

  const customsValue = cifLKR * (config.tax.valuationFactor || 1);
  const duty = customsValue * config.tax.dutyRate;
  const exRate = exciseRateFor(config, inputs.fuel || "Petrol", +inputs.cc || 0);
  const excise = (customsValue + duty) * exRate;
  const pal = customsValue * config.tax.palRate;
  const cess = customsValue * config.tax.cessRate;
  const vatBase = customsValue + duty + excise + pal + cess;
  const vat = vatBase * config.tax.vatRate;
  const luxury = customsValue > config.tax.luxuryThresholdLKR ? customsValue * config.tax.luxuryRate : 0;

  const govTaxes = duty + excise + pal + cess + vat + luxury;

  const localFees =
    (+inputs.documentationLKR || 0) + (+inputs.inlandTransportLKR || 0) +
    (+inputs.inspectionLKR || 0) + (+inputs.brokerLKR || 0) + (+inputs.miscLKR || 0);
  const registration = +inputs.registrationLKR || 0;

  const totalLanded = cifLKR + govTaxes + registration + localFees;

  return {
    rate, fobJPY, cifJPY, fobLKR, shippingLKR, cifLKR, customsValue,
    duty, excise, exRate, pal, cess, vat, vatBase, luxury, govTaxes,
    localFees, registration, totalLanded,
    lines: [
      { key: "fob", label: "FOB Value (Free On Board)", lkr: fobLKR, formula: `(${fmtJPY(auctionPriceJPY)} auction + ${fmtJPY(auctionFeesJPY)} auction fees + ${fmtJPY(exporterFeesJPY)} exporter) × ${rate} = ${fmtLKR(fobLKR)}`, group: "Vehicle" },
      { key: "shipping", label: "Insurance + Freight", lkr: shippingLKR, formula: `(${fmtJPY(insuranceJPY)} insurance + ${fmtJPY(freightJPY)} freight) × ${rate} = ${fmtLKR(shippingLKR)}`, group: "Shipping" },
      { key: "duty", label: "Customs Import Duty", lkr: duty, formula: `${fmtLKR(customsValue)} CV × ${(config.tax.dutyRate * 100).toFixed(1)}% = ${fmtLKR(duty)}`, group: "Government" },
      { key: "excise", label: "Excise Duty", lkr: excise, formula: `(CV + Duty) × ${(exRate * 100).toFixed(1)}% [${inputs.fuel} ${inputs.cc}cc] = ${fmtLKR(excise)}`, group: "Government" },
      { key: "pal", label: "Ports & Airports Levy (PAL)", lkr: pal, formula: `${fmtLKR(customsValue)} CV × ${(config.tax.palRate * 100).toFixed(1)}% = ${fmtLKR(pal)}`, group: "Government" },
      ...(cess > 0 ? [{ key: "cess", label: "CESS", lkr: cess, formula: `${fmtLKR(customsValue)} CV × ${(config.tax.cessRate * 100).toFixed(1)}% = ${fmtLKR(cess)}`, group: "Government" }] : []),
      { key: "vat", label: "VAT", lkr: vat, formula: `${fmtLKR(vatBase)} (CV+Duty+Excise+PAL) × ${(config.tax.vatRate * 100).toFixed(1)}% = ${fmtLKR(vat)}`, group: "Government" },
      ...(luxury > 0 ? [{ key: "luxury", label: "Luxury Tax", lkr: luxury, formula: `${fmtLKR(customsValue)} × ${(config.tax.luxuryRate * 100).toFixed(1)}% = ${fmtLKR(luxury)}`, group: "Government" }] : []),
      { key: "reg", label: "Registration (RMV)", lkr: registration, formula: `Fixed registration & plates = ${fmtLKR(registration)}`, group: "Local" },
      { key: "local", label: "Documentation, Inland, Broker & Misc.", lkr: localFees, formula: `Documentation + inland transport + inspection + broker + misc = ${fmtLKR(localFees)}`, group: "Local" },
    ],
  };
}

function computeProfit(landed, p) {
  const selling = +p.sellingPriceLKR || 0;
  const commission = selling * ((+p.commissionPct || 0) / 100);
  const sellingCosts = commission + (+p.reconditioningLKR || 0) + (+p.marketingLKR || 0);
  const gross = selling - landed;
  const net = gross - sellingCosts;
  const roi = landed > 0 ? (net / landed) * 100 : 0;
  const margin = selling > 0 ? (net / selling) * 100 : 0;
  return { selling, commission, sellingCosts, gross, net, roi, margin };
}

/* ============================================================================
   HOOKS
   ========================================================================== */
function useCountUp(target, duration = 1100) {
  const [val, setVal] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const from = prev.current; const to = target; const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick); else prev.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function useExchangeRate(defaultRate) {
  const [rate, setRate] = useState(defaultRate);
  const [status, setStatus] = useState("default"); // checking | live | cached | default
  const [overridden, setOverridden] = useState(false);
  const refresh = useCallback(async () => {
    if (overridden) return;
    setStatus("checking");
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 4500);
      const res = await fetch("https://open.er-api.com/v6/latest/JPY", { signal: ctrl.signal, cache: "no-store" });
      clearTimeout(t);
      const data = await res.json();
      if (data && data.rates && typeof data.rates.LKR === "number") {
        setRate(+data.rates.LKR.toFixed(3)); setStatus("live"); return;
      }
      throw new Error("no rate");
    } catch {
      // graceful fallback: cached (in-memory) -> default
      setStatus("default");
    }
  }, [overridden]);
  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, []);
  const setManual = (v) => { setRate(v); setOverridden(true); setStatus("manual"); };
  const clearManual = () => { setOverridden(false); refresh(); };
  return { rate, setRate, status, refresh, overridden, setManual, clearManual };
}

/* ============================================================================
   CONTEXT + PRIMITIVES
   ========================================================================== */
const Ctx = createContext(null);
const useT = () => useContext(Ctx).t;

function GlassCard({ children, style, className = "", pad = 22, hover = false, ...rest }) {
  const t = useT();
  return (
    <div
      className={`${hover ? "jsl-tap" : ""} ${className}`}
      style={{
        background: t.panel,
        border: `1px solid ${t.border}`,
        borderRadius: 20,
        padding: pad,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: t.shadow,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

function Pill({ children, tone = "default", style }) {
  const t = useT();
  const map = {
    default: { bg: t.chip, c: t.textSoft, b: t.border },
    accent: { bg: t.accentSoft, c: t.accent2, b: "transparent" },
    good: { bg: t.goodSoft, c: t.good, b: "transparent" },
  };
  const s = map[tone] || map.default;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, padding: "5px 11px", borderRadius: 999, background: s.bg, color: s.c, border: `1px solid ${s.b}`, ...style }}>
      {children}
    </span>
  );
}

function FieldRow({ label, children }) {
  const t = useT();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 0", borderBottom: `1px solid ${t.border}` }}>
      <div style={{ width: 92, color: t.textMuted, fontSize: 13.5, fontWeight: 600, flexShrink: 0 }}>{label}</div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

function Select({ value, onChange, options, placeholder }) {
  const t = useT();
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%", appearance: "none", WebkitAppearance: "none",
          background: t.inputBg, color: value ? t.text : t.textMuted,
          border: `1px solid ${t.border}`, borderRadius: 12, padding: "11px 38px 11px 14px",
          fontSize: 14.5, fontWeight: 600, cursor: "pointer", outline: "none",
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o} style={{ color: "#111", background: "#fff" }}>
            {o.label ?? o}
          </option>
        ))}
      </select>
      <ChevronDown size={17} style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", color: t.textMuted, pointerEvents: "none" }} />
    </div>
  );
}

function NumberInput({ value, onChange, prefix, suffix, step = 1, min = 0, invalid, placeholder }) {
  const t = useT();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, background: t.inputBg, border: `1px solid ${invalid ? t.danger : t.border}`, borderRadius: 12, padding: "10px 12px" }}>
      {prefix && <span style={{ color: t.textMuted, fontSize: 13, fontWeight: 700 }}>{prefix}</span>}
      <input
        type="number" inputMode="decimal" min={min} step={step} placeholder={placeholder}
        value={value} onChange={(e) => onChange(e.target.value)}
        style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: t.text, fontSize: 14.5, fontWeight: 600, width: "100%" }}
      />
      {suffix && <span style={{ color: t.textMuted, fontSize: 13, fontWeight: 600 }}>{suffix}</span>}
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", icon: Icon, size = "md", style, disabled }) {
  const t = useT();
  const sizes = { sm: { p: "9px 14px", f: 13.5 }, md: { p: "13px 20px", f: 15 }, lg: { p: "16px 26px", f: 16 } };
  const sz = sizes[size];
  const variants = {
    primary: { background: `linear-gradient(120deg, ${t.accent}, ${t.accent2})`, color: "#fff", border: "none", boxShadow: "0 14px 34px -12px rgba(99,102,241,.7)" },
    ghost: { background: t.glass, color: t.text, border: `1px solid ${t.border}` },
    soft: { background: t.accentSoft, color: t.accent2, border: "none" },
    danger: { background: "rgba(248,113,113,.14)", color: t.danger, border: "none" },
  };
  return (
    <button
      onClick={onClick} disabled={disabled}
      className="jsl-tap"
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
        padding: sz.p, fontSize: sz.f, fontWeight: 700, borderRadius: 13, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1, ...variants[variant], ...style,
      }}
    >
      {Icon && <Icon size={sz.f + 2} />}
      {children}
    </button>
  );
}

function AnimatedNumber({ value, prefix = "", style }) {
  const v = useCountUp(value);
  return <span style={style}>{prefix}{Math.round(v).toLocaleString("en-LK")}</span>;
}

function Toggle({ on, onChange }) {
  const t = useT();
  return (
    <button onClick={() => onChange(!on)} style={{ width: 46, height: 26, borderRadius: 999, border: `1px solid ${t.border}`, background: on ? `linear-gradient(120deg,${t.accent},${t.accent2})` : t.chip, position: "relative", cursor: "pointer", transition: "background .25s" }}>
      <span style={{ position: "absolute", top: 2, left: on ? 22 : 2, width: 20, height: 20, borderRadius: 999, background: "#fff", transition: "left .25s cubic-bezier(.16,1,.3,1)", boxShadow: "0 2px 6px rgba(0,0,0,.3)" }} />
    </button>
  );
}

/* ============================================================================
   PARTICLES + HERO SCENE (branded illustration — no external images required)
   ========================================================================== */
function Particles({ count = 16 }) {
  const dots = useMemo(() => Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100, size: 2 + Math.random() * 4, dur: 9 + Math.random() * 12,
    delay: -Math.random() * 18, op: 0.25 + Math.random() * 0.45,
  })), [count]);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {dots.map((d, i) => (
        <span key={i} style={{
          position: "absolute", bottom: -20, left: `${d.left}%`, width: d.size, height: d.size, borderRadius: 999,
          background: "radial-gradient(circle, rgba(165,180,252,.95), rgba(139,92,246,.2))",
          opacity: d.op, animation: `jslRise ${d.dur}s linear ${d.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

/* Parametric car side-profile — body shape adapts to type, color to brand */
function CarIllustration({ color = "#d7dde6", body = "Hatchback", w = 520, glow = true, float = true }) {
  const roofY = body === "SUV" ? 30 : body === "Sedan" ? 40 : 36;
  const roofStart = body === "Sedan" ? 150 : 135;
  const roofEnd = body === "Sedan" ? 330 : body === "SUV" ? 360 : 345;
  const id = useMemo(() => uid(), []);
  return (
    <div style={{ position: "relative", width: w, maxWidth: "100%", animation: float ? "jslFloatSlow 7s ease-in-out infinite" : "none" }}>
      <svg viewBox="0 0 520 230" width="100%" style={{ display: "block", filter: "drop-shadow(0 30px 30px rgba(0,0,0,.45))" }}>
        <defs>
          <linearGradient id={`body-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="0.45" stopColor={color} />
            <stop offset="1" stopColor="#6b7280" />
          </linearGradient>
          <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1f2937" />
            <stop offset="1" stopColor="#4b5563" />
          </linearGradient>
          <radialGradient id={`ring-${id}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0.6" stopColor="rgba(99,102,241,0)" />
            <stop offset="0.85" stopColor="rgba(99,102,241,.55)" />
            <stop offset="1" stopColor="rgba(139,92,246,0)" />
          </radialGradient>
        </defs>

        {glow && <ellipse cx="260" cy="196" rx="220" ry="26" fill={`url(#ring-${id})`} />}

        {/* lower body */}
        <path d={`M40,150 Q44,118 95,112 L${roofStart},112 Q${(roofStart+185)/2 - 10},${roofY+10} 250,${roofY+8} Q330,${roofY+6} ${roofEnd},112 L455,118 Q486,124 486,150 L486,166 Q486,176 474,176 L52,176 Q40,176 40,166 Z`} fill={`url(#body-${id})`} stroke="rgba(255,255,255,.25)" strokeWidth="1.2" />
        {/* greenhouse / glass */}
        <path d={`M${roofStart+8},112 Q${(roofStart+250)/2},${roofY+16} 248,${roofY+14} Q322,${roofY+13} ${roofEnd-6},112 Z`} fill={`url(#glass-${id})`} opacity="0.92" />
        {/* pillar split */}
        <line x1="250" y1={roofY + 12} x2="250" y2="112" stroke="rgba(255,255,255,.18)" strokeWidth="2.4" />
        {/* lower trim accent */}
        <path d="M52,168 L474,168" stroke="rgba(0,0,0,.25)" strokeWidth="2.5" />
        {/* door handle */}
        <rect x="300" y="134" width="26" height="5" rx="2.5" fill="rgba(0,0,0,.3)" />
        {/* headlight */}
        <path d="M468,128 q14,4 16,18 l-18,2 Z" fill="#cfe3ff" opacity="0.9" />
        {/* wheels */}
        {[140, 372].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="176" r="34" fill="#0b0f1a" />
            <circle cx={cx} cy="176" r="33" fill="none" stroke="#1f2937" strokeWidth="2" />
            <circle cx={cx} cy="176" r="17" fill="#aab2c0" />
            <circle cx={cx} cy="176" r="16" fill="none" stroke="#7c8595" strokeWidth="1.5" />
            <circle cx={cx} cy="176" r="4.5" fill="#5b6472" />
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <line key={a} x1={cx} y1="176" x2={cx + 15 * Math.cos((a * Math.PI) / 180)} y2={176 + 15 * Math.sin((a * Math.PI) / 180)} stroke="#7c8595" strokeWidth="2.4" />
            ))}
          </g>
        ))}
      </svg>
      {glow && (
        <>
          <div style={{ position: "absolute", left: "50%", bottom: 6, transform: "translateX(-50%)", width: w * 0.78, height: w * 0.78, border: "2px solid rgba(99,102,241,.35)", borderRadius: "50%", filter: "blur(.4px)", animation: "jslSpin 14s linear infinite", maskImage: "linear-gradient(#000,transparent 70%)", WebkitMaskImage: "linear-gradient(#000,transparent 70%)" }} />
          <div style={{ position: "absolute", left: "50%", bottom: 22, transform: "translateX(-50%)", width: w * 0.55, height: w * 0.55, border: "2px solid rgba(139,92,246,.45)", borderRadius: "50%", animation: "jslSpinRev 10s linear infinite", maskImage: "linear-gradient(#000,transparent 70%)", WebkitMaskImage: "linear-gradient(#000,transparent 70%)" }} />
        </>
      )}
    </div>
  );
}

/* Cinematic hero backdrop: sunset sky, water, Lotus Tower + Sigiriya silhouettes */
function HeroScene() {
  const t = useT();
  const sky = t.heroSky;
  return (
    <svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="hsky" x1="0" y1="0" x2="0" y2="1">
          {sky.map((c, i) => <stop key={i} offset={i / (sky.length - 1)} stopColor={c} />)}
        </linearGradient>
        <radialGradient id="hsun" cx="0.62" cy="0.42" r="0.3">
          <stop offset="0" stopColor="rgba(255,224,170,.9)" />
          <stop offset="1" stopColor="rgba(255,224,170,0)" />
        </radialGradient>
        <linearGradient id="hwater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[sky.length - 1]} stopOpacity="0.55" />
          <stop offset="1" stopColor="#0a1020" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="1200" height="520" fill="url(#hsky)" />
      <circle cx="744" cy="218" r="120" fill="url(#hsun)" />
      {/* distant skyline */}
      <g fill="rgba(20,18,34,.55)">
        {Array.from({ length: 22 }).map((_, i) => {
          const x = 250 + i * 26; const h = 30 + ((i * 53) % 70);
          return <rect key={i} x={x} y={330 - h} width="18" height={h} rx="2" />;
        })}
      </g>
      {/* Lotus Tower silhouette */}
      <g fill="rgba(15,14,28,.7)">
        <rect x="430" y="150" width="10" height="180" />
        <ellipse cx="435" cy="150" rx="22" ry="34" />
        <ellipse cx="435" cy="128" rx="13" ry="22" />
        <rect x="432" y="96" width="6" height="34" />
      </g>
      {/* Sigiriya rock (right) */}
      <path d="M980,330 Q985,210 1045,196 Q1110,210 1118,330 Z" fill="rgba(28,24,40,.7)" />
      <path d="M992,330 Q1000,250 1048,238 Q1098,250 1106,330 Z" fill="rgba(40,34,54,.55)" />
      {/* water */}
      <rect x="0" y="330" width="1200" height="190" fill="url(#hwater)" />
      <g opacity="0.3" stroke="rgba(255,220,180,.5)">
        {Array.from({ length: 8 }).map((_, i) => <line key={i} x1="640" y1={350 + i * 18} x2={760 + i * 6} y2={350 + i * 18} strokeWidth="2" />)}
      </g>
      {/* palm frond corner */}
      <g stroke="rgba(8,12,20,.85)" strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M40,0 Q70,60 60,140" />
        {[20, 50, 80, 110].map((y, i) => (<React.Fragment key={i}><path d={`M${62 - i * 2},${y} Q${20 - i * 6},${y - 18} ${-4},${y - 6}`} /><path d={`M${62 - i * 2},${y} Q${120 + i * 6},${y - 14} ${150},${y + 4}`} /></React.Fragment>))}
      </g>
    </svg>
  );
}

/* ============================================================================
   SIDEBAR + TOPBAR
   ========================================================================== */
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "new", label: "New Calculation", icon: Calculator },
  { id: "comparisons", label: "Comparisons", icon: GitCompare },
  { id: "history", label: "History", icon: Clock },
  { id: "favorites", label: "Favorites", icon: Star },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "profit", label: "Profit Calculator", icon: TrendingUp },
  { id: "dealership", label: "Dealership", icon: Building2 },
  { id: "admin", label: "Admin Panel", icon: Settings },
];

function Sidebar({ view, setView, collapsed }) {
  const t = useT();
  return (
    <aside style={{ width: collapsed ? 0 : 252, flexShrink: 0, background: t.sidebar, borderRight: `1px solid ${t.border}`, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", overflow: "hidden", transition: "width .3s", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "22px 22px 14px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 42, height: 42, borderRadius: 13, position: "relative", display: "grid", placeItems: "center", background: "conic-gradient(from 200deg, #6366f1, #8b5cf6, #f59e0b, #6366f1)", boxShadow: "0 8px 22px -8px rgba(99,102,241,.8)" }}>
          <div style={{ position: "absolute", inset: 3, borderRadius: 10, background: t.name === "dark" ? "#0b1020" : "#fff", display: "grid", placeItems: "center" }}>
            <Ship size={20} style={{ color: t.accent }} />
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: 0.3, color: t.text }}>JSL</div>
          <div style={{ fontSize: 10.5, letterSpacing: 3, fontWeight: 700, color: t.textMuted }}>IMPORTS</div>
        </div>
      </div>

      <nav className="jsl-scroll" style={{ flex: 1, overflowY: "auto", padding: "8px 14px" }}>
        {NAV.map((n) => {
          const active = view === n.id;
          return (
            <button key={n.id} onClick={() => setView(n.id)} className="jsl-link"
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 13, padding: "11px 14px", marginBottom: 4,
                borderRadius: 13, border: active ? `1px solid ${t.border}` : "1px solid transparent",
                background: active ? `linear-gradient(100deg, ${t.accentSoft}, transparent)` : "transparent",
                color: active ? t.text : t.textMuted, fontWeight: active ? 700 : 600, fontSize: 14.5, cursor: "pointer", textAlign: "left", position: "relative",
              }}>
              {active && <span style={{ position: "absolute", left: 0, top: 9, bottom: 9, width: 3, borderRadius: 3, background: `linear-gradient(${t.accent},${t.accent2})` }} />}
              <n.icon size={19} style={{ color: active ? t.accent : t.textMuted }} />
              {n.label}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: 16 }}>
        <div style={{ borderRadius: 16, padding: 16, background: `linear-gradient(135deg, ${t.accentSoft}, transparent)`, border: `1px solid ${t.border}` }}>
          <Sparkles size={18} style={{ color: t.accent2 }} />
          <div style={{ fontWeight: 700, fontSize: 13.5, color: t.text, marginTop: 8 }}>Premium Engine</div>
          <div style={{ fontSize: 12, color: t.textMuted, marginTop: 4, lineHeight: 1.5 }}>Config-driven duty, excise & VAT — fully editable.</div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ theme, setTheme, rateCtl, onMenu }) {
  const t = useT();
  const [openProfile, setOpenProfile] = useState(false);
  const statusMap = {
    live: { c: t.good, label: "Live", icon: Wifi }, checking: { c: t.warn, label: "Syncing", icon: RefreshCw },
    cached: { c: t.warn, label: "Cached", icon: WifiOff }, default: { c: t.textMuted, label: "Default", icon: WifiOff },
    manual: { c: t.accent2, label: "Manual", icon: Edit3 },
  };
  const st = statusMap[rateCtl.status] || statusMap.default;
  return (
    <header style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 26px", position: "sticky", top: 0, zIndex: 30, background: t.name === "dark" ? "rgba(8,12,22,.55)" : "rgba(244,246,252,.65)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${t.border}` }}>
      <button onClick={onMenu} className="jsl-tap" style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 11, background: t.glass, border: `1px solid ${t.border}`, color: t.textSoft, cursor: "pointer" }}>
        <Layers size={18} />
      </button>

      <div style={{ flex: 1 }} />

      {/* Exchange rate pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 16px", borderRadius: 14, background: t.glass, border: `1px solid ${t.border}` }}>
        <CircleDollarSign size={20} style={{ color: t.accent }} />
        <div>
          <div style={{ fontSize: 10.5, color: t.textMuted, fontWeight: 600 }}>Exchange Rate</div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: t.text }}>¥1 = LKR {rateCtl.rate.toFixed(2)}</div>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 700, color: st.c, background: t.chip, padding: "4px 9px", borderRadius: 999 }}>
          <st.icon size={12} className={rateCtl.status === "checking" ? "" : ""} /> {st.label}
        </span>
      </div>

      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="jsl-tap" style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 13, background: t.glass, border: `1px solid ${t.border}`, color: t.textSoft, cursor: "pointer" }}>
        {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
      </button>

      <button className="jsl-tap" style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 13, background: t.glass, border: `1px solid ${t.border}`, color: t.textSoft, cursor: "pointer", position: "relative" }}>
        <Bell size={19} />
        <span style={{ position: "absolute", top: 8, right: 8, width: 17, height: 17, borderRadius: 999, background: t.accent2, color: "#fff", fontSize: 10, fontWeight: 800, display: "grid", placeItems: "center" }}>3</span>
      </button>

      <div style={{ position: "relative" }}>
        <button onClick={() => setOpenProfile((v) => !v)} className="jsl-tap" style={{ display: "flex", alignItems: "center", gap: 11, padding: "8px 14px 8px 9px", borderRadius: 14, background: t.glass, border: `1px solid ${t.border}`, cursor: "pointer" }}>
          <div style={{ width: 36, height: 36, borderRadius: 11, background: `linear-gradient(135deg,${t.accent},${t.accent2})`, display: "grid", placeItems: "center", color: "#fff", fontWeight: 800 }}>PI</div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: t.text }}>Pasindu Imports</div>
            <div style={{ fontSize: 11, color: t.textMuted }}>Administrator</div>
          </div>
          <ChevronDown size={15} style={{ color: t.textMuted }} />
        </button>
        {openProfile && (
          <div className="jsl-up" style={{ position: "absolute", right: 0, top: 56, width: 220, padding: 8, borderRadius: 16, background: t.panelSolid, border: `1px solid ${t.border}`, boxShadow: t.shadow, backdropFilter: "blur(20px)", zIndex: 50 }}>
            {["Account settings", "Billing", "Team members", "Sign out"].map((x) => (
              <div key={x} className="jsl-link" style={{ padding: "10px 12px", borderRadius: 10, color: t.textSoft, fontSize: 14, cursor: "pointer", fontWeight: 600 }} onMouseDown={(e) => e.preventDefault()}>{x}</div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

/* ============================================================================
   VEHICLE DEFAULTS + WIZARD SCAFFOLD
   ========================================================================== */
function variantData(make, model, variant) {
  return VEHICLES?.[make]?.[model]?.variants?.[variant] || null;
}
function applyVehicleDefaults(form, config) {
  const m = VEHICLES?.[form.make]?.[form.model];
  const v = variantData(form.make, form.model, form.variant);
  if (!m || !v) return form;
  const key = `${form.make}|${form.model}|${form.variant}`;
  const fob = config.vehicleFob?.[key] ?? v.fobJPY;
  return {
    ...form,
    body: m.body, cc: v.cc, fuel: v.fuel, drive: v.drive, grade: v.grade,
    auctionPriceJPY: fob,
    auctionFeesJPY: config.fees.auctionFeesJPY, exporterFeesJPY: config.fees.exporterFeesJPY,
    insuranceJPY: config.fees.insuranceJPY,
    freightJPY: config.shipping.find((s) => s.id === form.shippingMethod)?.freightJPY ?? config.shipping[0].freightJPY,
    documentationLKR: config.fees.documentationLKR, inlandTransportLKR: config.fees.inlandTransportLKR,
    inspectionLKR: config.fees.inspectionLKR, brokerLKR: config.fees.brokerLKR,
    miscLKR: config.fees.miscLKR, registrationLKR: config.fees.registrationLKR,
  };
}
function makeInitialForm(config) {
  const base = {
    make: "Toyota", model: "Prius", variant: "ZVW51", year: 2022,
    transmission: "Automatic", mileage: 36000,
    port: "yokohama", shippingMethod: "roro",
    profit: { sellingPriceLKR: 0, commissionPct: config.profit.commissionPct, reconditioningLKR: config.profit.reconditioningLKR, marketingLKR: config.profit.marketingLKR },
  };
  return applyVehicleDefaults(base, config);
}

const STEPS = [
  { id: 1, label: "Select Vehicle", sub: "Choose your vehicle" },
  { id: 2, label: "Purchase Info", sub: "Auction & costs" },
  { id: 3, label: "Shipping Info", sub: "Shipping details" },
  { id: 4, label: "Review", sub: "Review all inputs" },
  { id: 5, label: "Final Cost", sub: "View landed cost" },
];

function StepBar({ step, setStep, maxReached }) {
  const t = useT();
  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: 0, marginBottom: 22, flexWrap: "wrap" }}>
      {STEPS.map((s, i) => {
        const done = s.id < step; const active = s.id === step;
        const reachable = s.id <= maxReached;
        return (
          <React.Fragment key={s.id}>
            <button disabled={!reachable} onClick={() => reachable && setStep(s.id)}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 8px", background: "transparent", border: "none", cursor: reachable ? "pointer" : "default", flex: "1 1 160px", minWidth: 150 }}>
              <div style={{ width: 38, height: 38, borderRadius: 999, flexShrink: 0, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 15,
                background: active ? `linear-gradient(135deg,${t.accent},${t.accent2})` : done ? t.goodSoft : t.chip,
                color: active ? "#fff" : done ? t.good : t.textMuted,
                border: active ? "none" : `1px solid ${t.border}`,
                boxShadow: active ? "0 10px 24px -10px rgba(99,102,241,.8)" : "none" }}>
                {done ? <Check size={18} /> : s.id}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: active ? t.text : done ? t.textSoft : t.textMuted }}>{s.label}</div>
                <div style={{ fontSize: 11.5, color: t.textMuted }}>{s.sub}</div>
              </div>
            </button>
            {i < STEPS.length - 1 && <div style={{ alignSelf: "center", color: t.textMuted, opacity: 0.5 }}><ChevronRight size={18} /></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Hero({ form, onChange }) {
  const t = useT();
  const v = variantData(form.make, form.model, form.variant);
  const color = BRAND_COLOR[form.make] || "#d7dde6";
  const thumbs = ["front", "side", "interior", "rear", "360"];
  const [activeThumb, setActiveThumb] = useState(0);
  return (
    <div style={{ position: "relative", borderRadius: 26, overflow: "hidden", border: `1px solid ${t.border}`, marginBottom: 24, boxShadow: t.shadow }}>
      <HeroScene />
      <div style={{ position: "absolute", inset: 0, background: t.name === "dark" ? "linear-gradient(100deg, rgba(7,11,22,.92) 0%, rgba(7,11,22,.55) 42%, rgba(7,11,22,.15) 70%, rgba(7,11,22,.4) 100%)" : "linear-gradient(100deg, rgba(244,246,252,.95) 0%, rgba(244,246,252,.55) 45%, rgba(244,246,252,.1) 72%, rgba(244,246,252,.35) 100%)" }} />
      <Particles count={14} />

      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "minmax(280px, 1fr) minmax(320px, 1.15fr)", gap: 20, padding: "40px 40px 30px", alignItems: "center" }}>
        {/* Left: copy */}
        <div className="jsl-up">
          <Pill tone="good" style={{ marginBottom: 18 }}><BadgeCheck size={14} /> Sri Lanka&apos;s #1 Vehicle Import Platform</Pill>
          <h1 style={{ fontSize: "clamp(34px, 4.4vw, 58px)", lineHeight: 1.02, fontWeight: 850, letterSpacing: -1.5, color: t.text, margin: "0 0 14px" }}>
            Import Smarter.<br /><span className="jsl-shimmer-text">Profit Better.</span>
          </h1>
          <p style={{ fontSize: 16.5, lineHeight: 1.55, color: t.textSoft, maxWidth: 440, margin: "0 0 22px" }}>
            The most advanced Japan&nbsp;→&nbsp;Sri&nbsp;Lanka vehicle import calculation platform. Transparent landed cost, down to the last rupee.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[["100% Accurate", BadgeCheck], ["Config-Driven", Cog], ["Transparent", Eye], ["Built for Importers", ShieldCheck]].map(([label, Icon]) => (
              <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600, color: t.textSoft, background: t.glass, border: `1px solid ${t.border}`, padding: "8px 13px", borderRadius: 999, backdropFilter: "blur(8px)" }}>
                <Icon size={15} style={{ color: t.accent }} /> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Right: car + spec card */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
            <CarIllustration color={color} body={form.body} w={500} />
          </div>

          {/* spec card */}
          <div className="jsl-up" style={{ position: "absolute", right: 0, bottom: 74, width: 246, padding: 18, borderRadius: 18, background: t.name === "dark" ? "rgba(10,15,28,.66)" : "rgba(255,255,255,.78)", border: `1px solid ${t.borderStrong}`, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", boxShadow: t.shadow }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>{form.year} {form.make} {form.model}</div>
            <div style={{ fontSize: 12.5, color: t.textMuted, marginTop: 2 }}>{form.variant} &nbsp;|&nbsp; {v ? `${(v.cc / 1000).toFixed(1)}L ${v.fuel}` : "—"}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              <Pill><Star size={12} /> Grade {v?.grade}</Pill>
              <Pill><Gauge size={12} /> {fmtNum(form.mileage)} km</Pill>
            </div>
            <button onClick={() => onChange((f) => ({ ...f }))} className="jsl-tap" style={{ marginTop: 14, width: "100%", padding: "10px", borderRadius: 11, background: t.glassStrong, border: `1px solid ${t.border}`, color: t.text, fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>
              Change Vehicle
            </button>
          </div>

          {/* thumbnails */}
          <div style={{ display: "flex", gap: 9, marginTop: 4 }}>
            {thumbs.map((tb, i) => (
              <button key={tb} onClick={() => setActiveThumb(i)} className="jsl-tap" style={{ width: 56, height: 42, borderRadius: 11, background: t.name === "dark" ? "rgba(10,15,28,.6)" : "rgba(255,255,255,.7)", border: `1.5px solid ${activeThumb === i ? t.accent : t.border}`, display: "grid", placeItems: "center", cursor: "pointer", overflow: "hidden" }}>
                {tb === "360" ? <span style={{ fontSize: 11, fontWeight: 800, color: t.accent2 }}>360°</span> : <Car size={20} style={{ color: t.textSoft, opacity: i === 2 ? 0.5 : 1 }} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* convenience context hooks */
const useCfg = () => useContext(Ctx).config;
const useRate = () => useContext(Ctx).rate;

/* ============================================================================
   LIVE PREVIEW (Estimated Landed Cost card, used across steps 1–3)
   ========================================================================== */
function LivePreview({ form, onContinue, ctaLabel = "Continue to Purchase Info" }) {
  const t = useT(); const config = useCfg(); const rate = useRate();
  const r = useMemo(() => computeLanded(form, config, rate), [form, config, rate]);
  const rows = [
    ["FOB Price", r.fobLKR],
    ["CIF Value", r.cifLKR],
    ["Customs Value", r.customsValue],
    ["Total Duties & Taxes", r.govTaxes],
    ["Registration & Other", r.registration + r.localFees],
  ];
  return (
    <GlassCard pad={24} style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 16.5, fontWeight: 800, color: t.text }}>Estimated Landed Cost</div>
        <Pill tone="accent"><Zap size={12} /> Preview</Pill>
      </div>
      <div style={{ fontSize: 38, fontWeight: 850, letterSpacing: -1, color: t.text, lineHeight: 1 }}>
        <AnimatedNumber value={r.totalLanded} prefix="LKR " />
      </div>
      <div style={{ fontSize: 12.5, color: t.textMuted, marginTop: 4, marginBottom: 18 }}>Total cost estimate (live)</div>

      <div style={{ flex: 1 }}>
        {rows.map(([label, val]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${t.border}` }}>
            <span style={{ fontSize: 13.5, color: t.textMuted, fontWeight: 600 }}>{label}</span>
            <span style={{ fontSize: 13.5, color: t.textSoft, fontWeight: 700 }}>{fmtLKR(val)}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, marginBottom: 16, padding: "13px 16px", borderRadius: 14, background: t.accentSoft, border: `1px solid ${t.border}` }}>
        <span style={{ fontSize: 14.5, fontWeight: 800, color: t.text }}>Final Landed Cost</span>
        <span style={{ fontSize: 17, fontWeight: 850, color: t.accent2 }}>{fmtLKR(r.totalLanded)}</span>
      </div>

      <Btn onClick={onContinue} icon={ArrowRight} size="md" style={{ width: "100%" }}>{ctaLabel}</Btn>
    </GlassCard>
  );
}

function SuggestionTile({ title, value, sub, icon: Icon }) {
  const t = useT();
  return (
    <div className="jsl-tap" style={{ padding: 16, borderRadius: 16, background: t.glass, border: `1px solid ${t.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 12.5, color: t.textMuted, fontWeight: 600 }}>{title}</span>
        {Icon && <Icon size={16} style={{ color: t.accent }} />}
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color: t.text }}>{value}</div>
      <div style={{ fontSize: 12, color: t.textMuted, marginTop: 3 }}>{sub}</div>
    </div>
  );
}

/* ===================== STEP 1 — VEHICLE SELECTION ===================== */
function StepVehicle({ form, setVehicle, onContinue }) {
  const t = useT(); const config = useCfg(); const rate = useRate();
  const v = variantData(form.make, form.model, form.variant);
  const makes = Object.keys(VEHICLES);
  const models = Object.keys(VEHICLES[form.make] || {});
  const variants = Object.keys(VEHICLES[form.make]?.[form.model]?.variants || {});
  const years = (v?.years || []).slice().reverse();
  const insLKR = (form.insuranceJPY || 0) * rate;
  const shipLKR = (form.freightJPY || 0) * rate;
  const expLKR = (form.exporterFeesJPY || 0) * rate;
  const portName = config.ports.find((p) => p.id === form.port)?.name || "Yokohama";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(280px,0.95fr) minmax(320px,1.25fr) minmax(300px,0.95fr)", gap: 18 }}>
      {/* Vehicle selection */}
      <GlassCard pad={24} className="jsl-up">
        <div style={{ fontSize: 16.5, fontWeight: 800, color: t.text, marginBottom: 14 }}>Vehicle Selection</div>
        <FieldRow label="Make"><Select value={form.make} onChange={(x) => setVehicle({ make: x })} options={makes} /></FieldRow>
        <FieldRow label="Model"><Select value={form.model} onChange={(x) => setVehicle({ model: x })} options={models} /></FieldRow>
        <FieldRow label="Year"><Select value={String(form.year)} onChange={(x) => setVehicle({ year: +x })} options={years.map(String)} /></FieldRow>
        <FieldRow label="Variant"><Select value={form.variant} onChange={(x) => setVehicle({ variant: x })} options={variants} /></FieldRow>
        <FieldRow label="Engine"><Select value={form.fuel} onChange={(x) => setVehicle({ fuel: x })} options={["Petrol", "Hybrid", "Diesel", "PHEV", "EV"]} /></FieldRow>
        <FieldRow label="Drive"><Select value={form.drive} onChange={(x) => setVehicle({ drive: x })} options={["2WD", "4WD", "AWD"]} /></FieldRow>
      </GlassCard>

      {/* Smart suggestions */}
      <GlassCard pad={24} className="jsl-up" style={{ animationDelay: ".05s" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 16.5, fontWeight: 800, color: t.text }}>Smart Suggestions</div>
            <div style={{ fontSize: 12.5, color: t.textMuted, marginTop: 2 }}>Recommendations based on market data</div>
          </div>
          <Btn variant="ghost" size="sm" icon={Sparkles}>Customize</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
          <SuggestionTile title="Auction Grade" value={v?.grade || "4"} sub="Recommended" icon={Star} />
          <SuggestionTile title="Engine Capacity" value={`${fmtNum(form.cc)} cc`} sub={form.fuel} icon={Cog} />
          <SuggestionTile title="Insurance (Est.)" value={fmtLKR(insLKR)} sub="Estimated" icon={ShieldCheck} />
          <SuggestionTile title="Shipping (Est.)" value={fmtLKR(shipLKR)} sub={config.shipping.find((s) => s.id === form.shippingMethod)?.name} icon={Ship} />
          <SuggestionTile title="Exporter Fee" value={fmtLKR(expLKR)} sub="Typical range" icon={Receipt} />
          <SuggestionTile title="Export Port" value={portName} sub="Most popular" icon={Anchor} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, padding: "11px 14px", borderRadius: 12, background: t.chip, color: t.textMuted, fontSize: 12.5 }}>
          <Info size={15} style={{ color: t.accent }} /> These are smart suggestions. You can modify all values in the next steps.
        </div>
      </GlassCard>

      {/* Live preview */}
      <LivePreview form={form} onContinue={onContinue} />
    </div>
  );
}

const useRateCtl = () => useContext(Ctx).rateCtl;

/* ===================== STEP 2 — PURCHASE INFO ===================== */
function StepPurchase({ form, set, onContinue }) {
  const t = useT(); const rate = useRate(); const rateCtl = useRateCtl();
  const fobJPY = (+form.auctionPriceJPY || 0) + (+form.auctionFeesJPY || 0) + (+form.exporterFeesJPY || 0);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(320px,1.3fr) minmax(300px,0.9fr)", gap: 18 }}>
      <GlassCard pad={26} className="jsl-up">
        <div style={{ fontSize: 17, fontWeight: 800, color: t.text, marginBottom: 4 }}>Purchase Details</div>
        <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 18 }}>All Japan-side costs. Values pre-filled from market data — override anything.</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Labeled label="Auction Price" hint="Hammer price at Japanese auction">
            <NumberInput prefix="¥" value={form.auctionPriceJPY} onChange={(x) => set({ auctionPriceJPY: x })} step={10000} invalid={+form.auctionPriceJPY <= 0} />
          </Labeled>
          <Labeled label="Auction Grade" hint="Inspection grade (1–6, S)">
            <input value={form.grade} onChange={(e) => set({ grade: e.target.value })} style={inputStyle(t)} />
          </Labeled>
          <Labeled label="Auction Fees" hint="Bidding & auction house fees">
            <NumberInput prefix="¥" value={form.auctionFeesJPY} onChange={(x) => set({ auctionFeesJPY: x })} step={5000} />
          </Labeled>
          <Labeled label="Exporter Fees" hint="Exporter commission & handling">
            <NumberInput prefix="¥" value={form.exporterFeesJPY} onChange={(x) => set({ exporterFeesJPY: x })} step={5000} />
          </Labeled>
          <Labeled label="Mileage" hint="Odometer reading">
            <NumberInput suffix="km" value={form.mileage} onChange={(x) => set({ mileage: x })} step={1000} invalid={+form.mileage < 0} />
          </Labeled>
          <Labeled label="Transmission">
            <Select value={form.transmission} onChange={(x) => set({ transmission: x })} options={["Automatic", "Manual", "CVT"]} />
          </Labeled>
        </div>

        <div style={{ marginTop: 20, padding: 18, borderRadius: 16, background: t.accentSoft, border: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12.5, color: t.textMuted, fontWeight: 600 }}>FOB Value (Free On Board)</div>
            <div style={{ fontSize: 24, fontWeight: 850, color: t.text }}>{fmtJPY(fobJPY)}</div>
            <div style={{ fontSize: 12.5, color: t.textMuted }}>≈ {fmtLKR(fobJPY * rate)} @ {rate.toFixed(2)}</div>
          </div>
          <div style={{ minWidth: 200 }}>
            <Labeled label="Exchange Rate Override" hint="JPY → LKR (leave for live/default)">
              <div style={{ display: "flex", gap: 8 }}>
                <NumberInput prefix="LKR" value={rate} onChange={(x) => rateCtl.setManual(+x)} step={0.01} />
                {rateCtl.overridden && <Btn variant="ghost" size="sm" icon={RefreshCw} onClick={rateCtl.clearManual} style={{ padding: "0 12px" }}>{""}</Btn>}
              </div>
            </Labeled>
          </div>
        </div>
      </GlassCard>

      <LivePreview form={form} onContinue={onContinue} ctaLabel="Continue to Shipping Info" />
    </div>
  );
}

/* ===================== STEP 3 — SHIPPING INFO ===================== */
function StepShipping({ form, set, onContinue }) {
  const t = useT(); const config = useCfg(); const rate = useRate();
  const cifJPY = (+form.auctionPriceJPY || 0) + (+form.auctionFeesJPY || 0) + (+form.exporterFeesJPY || 0) + (+form.insuranceJPY || 0) + (+form.freightJPY || 0);
  const pickMethod = (id) => set({ shippingMethod: id, freightJPY: config.shipping.find((s) => s.id === id)?.freightJPY });
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(320px,1.3fr) minmax(300px,0.9fr)", gap: 18 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <GlassCard pad={26} className="jsl-up">
          <div style={{ fontSize: 17, fontWeight: 800, color: t.text, marginBottom: 14 }}>Shipping Method</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {config.shipping.map((s) => {
              const on = form.shippingMethod === s.id;
              return (
                <button key={s.id} onClick={() => pickMethod(s.id)} className="jsl-tap" style={{ textAlign: "left", padding: 16, borderRadius: 16, cursor: "pointer", background: on ? t.accentSoft : t.glass, border: `1.5px solid ${on ? t.accent : t.border}` }}>
                  <Ship size={20} style={{ color: on ? t.accent : t.textMuted }} />
                  <div style={{ fontSize: 14.5, fontWeight: 800, color: t.text, marginTop: 10 }}>{s.name}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: t.accent2, marginTop: 4 }}>{fmtJPY(s.freightJPY)}</div>
                  <div style={{ fontSize: 11.5, color: t.textMuted, marginTop: 6, lineHeight: 1.4 }}>{s.note}</div>
                </button>
              );
            })}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 18 }}>
            <Labeled label="Export Port" hint="Japanese departure port">
              <Select value={form.port} onChange={(x) => set({ port: x })} options={config.ports.map((p) => ({ value: p.id, label: p.name + (p.popular ? "  ★" : "") }))} />
            </Labeled>
            <Labeled label="Insurance" hint="Marine insurance">
              <NumberInput prefix="¥" value={form.insuranceJPY} onChange={(x) => set({ insuranceJPY: x })} step={5000} />
            </Labeled>
            <Labeled label="Freight" hint="Ocean freight (auto from method)">
              <NumberInput prefix="¥" value={form.freightJPY} onChange={(x) => set({ freightJPY: x })} step={5000} />
            </Labeled>
            <Labeled label="Drive Type">
              <Select value={form.drive} onChange={(x) => set({ drive: x })} options={["2WD", "4WD", "AWD"]} />
            </Labeled>
          </div>
        </GlassCard>

        <GlassCard pad={26} className="jsl-up" style={{ animationDelay: ".05s" }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: t.text, marginBottom: 4 }}>Local &amp; Government Charges</div>
          <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 16 }}>Sri Lanka-side fees applied after clearance (LKR).</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <Labeled label="Documentation"><NumberInput prefix="LKR" value={form.documentationLKR} onChange={(x) => set({ documentationLKR: x })} step={5000} /></Labeled>
            <Labeled label="Inland Transport"><NumberInput prefix="LKR" value={form.inlandTransportLKR} onChange={(x) => set({ inlandTransportLKR: x })} step={5000} /></Labeled>
            <Labeled label="Inspection"><NumberInput prefix="LKR" value={form.inspectionLKR} onChange={(x) => set({ inspectionLKR: x })} step={5000} /></Labeled>
            <Labeled label="Broker / Clearing"><NumberInput prefix="LKR" value={form.brokerLKR} onChange={(x) => set({ brokerLKR: x })} step={5000} /></Labeled>
            <Labeled label="Miscellaneous"><NumberInput prefix="LKR" value={form.miscLKR} onChange={(x) => set({ miscLKR: x })} step={5000} /></Labeled>
            <Labeled label="Registration (RMV)"><NumberInput prefix="LKR" value={form.registrationLKR} onChange={(x) => set({ registrationLKR: x })} step={5000} /></Labeled>
          </div>
        </GlassCard>
      </div>

      <div>
        <div style={{ marginBottom: 18 }}>
          <GlassCard pad={20}>
            <div style={{ fontSize: 12.5, color: t.textMuted, fontWeight: 600 }}>CIF Value (Cost + Insurance + Freight)</div>
            <div style={{ fontSize: 22, fontWeight: 850, color: t.text, marginTop: 4 }}>{fmtJPY(cifJPY)}</div>
            <div style={{ fontSize: 12.5, color: t.textMuted }}>≈ {fmtLKR(cifJPY * rate)}</div>
          </GlassCard>
        </div>
        <LivePreview form={form} onContinue={onContinue} ctaLabel="Review All Inputs" />
      </div>
    </div>
  );
}

/* small labeled wrapper + shared input style */
function inputStyle(t) {
  return { width: "100%", background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 12, padding: "11px 14px", fontSize: 14.5, fontWeight: 600, color: t.text, outline: "none" };
}
function Labeled({ label, hint, children }) {
  const t = useT();
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: t.textSoft, marginBottom: 7 }}>{label}</div>
      {children}
      {hint && <div style={{ fontSize: 11.5, color: t.textMuted, marginTop: 6 }}>{hint}</div>}
    </div>
  );
}

/* ===================== STEP 4 — REVIEW ===================== */
function ReviewGroup({ title, icon: Icon, items }) {
  const t = useT();
  return (
    <GlassCard pad={22} className="jsl-up">
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: t.accentSoft, display: "grid", placeItems: "center" }}><Icon size={17} style={{ color: t.accent }} /></div>
        <div style={{ fontSize: 15.5, fontWeight: 800, color: t.text }}>{title}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 18px" }}>
        {items.map(([k, val]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 10, paddingBottom: 8, borderBottom: `1px solid ${t.border}` }}>
            <span style={{ fontSize: 12.5, color: t.textMuted, fontWeight: 600 }}>{k}</span>
            <span style={{ fontSize: 13, color: t.text, fontWeight: 700, textAlign: "right" }}>{val}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function StepReview({ form, onContinue }) {
  const t = useT(); const config = useCfg(); const rate = useRate();
  const r = useMemo(() => computeLanded(form, config, rate), [form, config, rate]);
  const portName = config.ports.find((p) => p.id === form.port)?.name;
  const shipName = config.shipping.find((s) => s.id === form.shippingMethod)?.name;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(340px,1.4fr) minmax(300px,0.85fr)", gap: 18 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <ReviewGroup title="Vehicle" icon={Car} items={[
          ["Make & Model", `${form.make} ${form.model}`], ["Year", form.year],
          ["Variant", form.variant], ["Engine", `${fmtNum(form.cc)} cc · ${form.fuel}`],
          ["Transmission", form.transmission], ["Drive", form.drive],
          ["Mileage", `${fmtNum(form.mileage)} km`], ["Auction Grade", form.grade],
        ]} />
        <ReviewGroup title="Purchase (Japan)" icon={Wallet} items={[
          ["Auction Price", fmtJPY(form.auctionPriceJPY)], ["Auction Fees", fmtJPY(form.auctionFeesJPY)],
          ["Exporter Fees", fmtJPY(form.exporterFeesJPY)], ["FOB Value", fmtJPY(r.fobJPY)],
        ]} />
        <ReviewGroup title="Shipping" icon={Ship} items={[
          ["Method", shipName], ["Export Port", portName],
          ["Insurance", fmtJPY(form.insuranceJPY)], ["Freight", fmtJPY(form.freightJPY)],
          ["CIF Value", fmtJPY(r.cifJPY)], ["CIF (LKR)", fmtLKR(r.cifLKR)],
        ]} />
        <ReviewGroup title="Local & Government (LKR)" icon={Receipt} items={[
          ["Documentation", fmtLKR(form.documentationLKR)], ["Inland Transport", fmtLKR(form.inlandTransportLKR)],
          ["Inspection", fmtLKR(form.inspectionLKR)], ["Broker", fmtLKR(form.brokerLKR)],
          ["Miscellaneous", fmtLKR(form.miscLKR)], ["Registration", fmtLKR(form.registrationLKR)],
        ]} />
      </div>

      <div style={{ alignSelf: "start", position: "sticky", top: 90 }}>
        <GlassCard pad={26}>
          <Pill tone="accent" style={{ marginBottom: 14 }}><ListChecks size={13} /> Ready to calculate</Pill>
          <div style={{ fontSize: 13.5, color: t.textMuted, marginBottom: 6 }}>Projected Landed Cost</div>
          <div style={{ fontSize: 36, fontWeight: 850, letterSpacing: -1, color: t.text }}><AnimatedNumber value={r.totalLanded} prefix="LKR " /></div>
          <div style={{ marginTop: 18, marginBottom: 18, display: "flex", flexDirection: "column", gap: 10 }}>
            {[["CIF Value", r.cifLKR], ["Duties & Taxes", r.govTaxes], ["Registration & Local", r.registration + r.localFees]].map(([l, val]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: t.textMuted, fontWeight: 600 }}>{l}</span>
                <span style={{ fontSize: 13, color: t.textSoft, fontWeight: 700 }}>{fmtLKR(val)}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 14px", borderRadius: 12, background: t.chip, marginBottom: 16 }}>
            <span style={{ fontSize: 12.5, color: t.textMuted, fontWeight: 600 }}>Rate applied</span>
            <span style={{ fontSize: 13.5, fontWeight: 800, color: t.text }}>¥1 = LKR {rate.toFixed(2)}</span>
          </div>
          <Btn onClick={onContinue} icon={Sparkles} size="lg" style={{ width: "100%" }}>Calculate Final Cost</Btn>
        </GlassCard>
      </div>
    </div>
  );
}

/* ===================== STEP 5 — RESULTS (highlight) ===================== */
const PIE_COLORS = ["#6366f1", "#8b5cf6", "#22d3ee", "#f59e0b", "#34d399", "#fb7185", "#a78bfa", "#38bdf8"];

function ResultLine({ line, color }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${t.border}` }}>
      <button onClick={() => setOpen((o) => !o)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 4px", background: "transparent", border: "none", cursor: "pointer" }}>
        <span style={{ width: 11, height: 11, borderRadius: 3, background: color, flexShrink: 0 }} />
        <span style={{ flex: 1, textAlign: "left", fontSize: 14, fontWeight: 600, color: t.textSoft }}>{line.label}</span>
        <span style={{ fontSize: 14.5, fontWeight: 800, color: t.text }}>{fmtLKR(line.lkr)}</span>
        <ChevronDown size={16} style={{ color: t.textMuted, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
      </button>
      {open && <div className="jsl-in" style={{ padding: "0 4px 13px 27px", fontSize: 12.5, color: t.textMuted, lineHeight: 1.6, fontFamily: "ui-monospace, monospace" }}>{line.formula}</div>}
    </div>
  );
}

function StatChip({ label, value, tone, icon: Icon }) {
  const t = useT();
  const c = tone === "good" ? t.good : tone === "danger" ? t.danger : t.accent;
  return (
    <GlassCard pad={18}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12.5, color: t.textMuted, fontWeight: 600 }}>{label}</span>
        {Icon && <Icon size={16} style={{ color: c }} />}
      </div>
      <div style={{ fontSize: 22, fontWeight: 850, color: t.text, marginTop: 8 }}>{value}</div>
    </GlassCard>
  );
}

function StepResults({ form, set, onSave, onFavorite, onCompare, onExportCSV, savedFlag }) {
  const t = useT(); const config = useCfg(); const rate = useRate();
  const r = useMemo(() => computeLanded(form, config, rate), [form, config, rate]);

  const p = form.profit;
  useEffect(() => {
    if (!p.sellingPriceLKR) set({ profit: { ...p, sellingPriceLKR: Math.round(r.totalLanded * (1 + config.profit.targetMarginPct / 100) / 10000) * 10000 } });
    // eslint-disable-next-line
  }, []);
  const profit = useMemo(() => computeProfit(r.totalLanded, p), [r.totalLanded, p]);

  const pieData = r.lines.filter((l) => l.lkr > 0).map((l) => ({ name: l.label, value: Math.round(l.lkr) }));
  const barData = [
    { name: "FOB", v: r.fobLKR }, { name: "Ship", v: r.shippingLKR }, { name: "Duty", v: r.duty },
    { name: "Excise", v: r.excise }, { name: "VAT", v: r.vat }, { name: "PAL", v: r.pal + r.cess },
    { name: "Reg+", v: r.registration + r.localFees },
  ].map((d) => ({ ...d, v: Math.round(d.v) }));
  let acc = 0;
  const timeline = [
    { stage: "FOB", v: r.fobLKR }, { stage: "+Freight", v: r.shippingLKR }, { stage: "+Duty", v: r.duty },
    { stage: "+Excise", v: r.excise }, { stage: "+VAT", v: r.vat }, { stage: "+Levies", v: r.pal + r.cess + r.luxury },
    { stage: "+Reg/Local", v: r.registration + r.localFees },
  ].map((d) => { acc += d.v; return { stage: d.stage, total: Math.round(acc) }; });

  const setP = (patch) => set({ profit: { ...p, ...patch } });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Hero result */}
      <div className="jsl-up" style={{ position: "relative", borderRadius: 26, overflow: "hidden", padding: "40px 36px", border: `1px solid ${t.border}`, background: `linear-gradient(120deg, ${t.accentSoft}, transparent 60%), ${t.panel}`, boxShadow: t.shadow }}>
        <Particles count={10} />
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <Pill tone="good" style={{ marginBottom: 14 }}><CheckCircle2 size={14} /> Calculation complete</Pill>
            <div style={{ fontSize: 14.5, color: t.textMuted, fontWeight: 600 }}>Total Landed Cost · {form.year} {form.make} {form.model}</div>
            <div style={{ fontSize: "clamp(44px, 6vw, 76px)", fontWeight: 850, letterSpacing: -2.5, color: t.text, lineHeight: 1 }}>
              <AnimatedNumber value={r.totalLanded} prefix="LKR " />
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13.5, color: t.textSoft }}>CIF <b style={{ color: t.text }}>{fmtLKR(r.cifLKR)}</b></span>
              <span style={{ fontSize: 13.5, color: t.textSoft }}>Taxes <b style={{ color: t.text }}>{fmtLKR(r.govTaxes)}</b></span>
              <span style={{ fontSize: 13.5, color: t.textSoft }}>Rate <b style={{ color: t.text }}>¥1=LKR {rate.toFixed(2)}</b></span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 180 }}>
            <Btn onClick={onSave} icon={savedFlag ? CheckCircle2 : Save} variant={savedFlag ? "soft" : "primary"}>{savedFlag ? "Saved" : "Save Calculation"}</Btn>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={onFavorite} icon={Heart} variant="ghost" size="sm" style={{ flex: 1 }}>Favorite</Btn>
              <Btn onClick={onCompare} icon={GitCompare} variant="ghost" size="sm" style={{ flex: 1 }}>Compare</Btn>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={onExportCSV} icon={FileSpreadsheet} variant="ghost" size="sm" style={{ flex: 1 }}>CSV</Btn>
              <Btn onClick={() => window.print()} icon={Printer} variant="ghost" size="sm" style={{ flex: 1 }}>Print</Btn>
            </div>
          </div>
        </div>
      </div>

      {/* breakdown + pie */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(320px,1.2fr) minmax(300px,1fr)", gap: 20 }}>
        <GlassCard pad={24}>
          <div style={{ fontSize: 16.5, fontWeight: 800, color: t.text, marginBottom: 8 }}>Full Cost Breakdown</div>
          <div style={{ fontSize: 12.5, color: t.textMuted, marginBottom: 6 }}>Tap any line to expand the formula.</div>
          {r.lines.map((l, i) => <ResultLine key={l.key} line={l} color={PIE_COLORS[i % PIE_COLORS.length]} />)}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 4px 4px" }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: t.text }}>Total Landed Cost</span>
            <span style={{ fontSize: 18, fontWeight: 850, color: t.accent2 }}>{fmtLKR(r.totalLanded)}</span>
          </div>
        </GlassCard>

        <GlassCard pad={24}>
          <div style={{ fontSize: 16.5, fontWeight: 800, color: t.text, marginBottom: 12 }}>Cost Composition</div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={104} paddingAngle={2} stroke="none">
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => fmtLKR(v)} contentStyle={{ background: t.panelSolid, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 14px", marginTop: 8 }}>
            {pieData.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11.5, color: t.textMuted }}>
                <span style={{ width: 9, height: 9, borderRadius: 2, background: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <GlassCard pad={24}>
          <div style={{ fontSize: 16.5, fontWeight: 800, color: t.text, marginBottom: 16 }}>Component Comparison</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke={t.border} vertical={false} />
                <XAxis dataKey="name" tick={{ fill: t.textMuted, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: t.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => (v / 1e6).toFixed(1) + "M"} />
                <Tooltip formatter={(v) => fmtLKR(v)} contentStyle={{ background: t.panelSolid, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text }} cursor={{ fill: t.chip }} />
                <Bar dataKey="v" radius={[7, 7, 0, 0]}>{barData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard pad={24}>
          <div style={{ fontSize: 16.5, fontWeight: 800, color: t.text, marginBottom: 16 }}>Cost Build-up Timeline</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeline}>
                <defs>
                  <linearGradient id="tlg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={t.accent2} stopOpacity={0.55} />
                    <stop offset="1" stopColor={t.accent2} stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={t.border} vertical={false} />
                <XAxis dataKey="stage" tick={{ fill: t.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} interval={0} angle={-12} dy={8} />
                <YAxis tick={{ fill: t.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => (v / 1e6).toFixed(1) + "M"} />
                <Tooltip formatter={(v) => fmtLKR(v)} contentStyle={{ background: t.panelSolid, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text }} />
                <Area type="monotone" dataKey="total" stroke={t.accent2} strokeWidth={2.5} fill="url(#tlg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* PROFIT CALCULATOR */}
      <ProfitPanel landed={r.totalLanded} p={p} setP={setP} profit={profit} />
    </div>
  );
}

/* ===================== PROFIT PANEL (inside results + standalone) ===================== */
function ProfitPanel({ landed, p, setP, profit }) {
  const t = useT();
  const roiClamped = clamp(profit.roi, -40, 60);
  const roiData = [{ name: "roi", value: roiClamped, fill: profit.net >= 0 ? t.good : t.danger }];
  const positive = profit.net >= 0;
  return (
    <GlassCard pad={26} className="jsl-up">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: t.accentSoft, display: "grid", placeItems: "center" }}><PiggyBank size={19} style={{ color: t.accent }} /></div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 850, color: t.text }}>Profit & ROI Calculator</div>
          <div style={{ fontSize: 12.5, color: t.textMuted }}>Project your resale margin in the Sri Lankan market</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(280px,1fr) minmax(240px,360px)", gap: 24, marginTop: 18, alignItems: "center" }}>
        {/* inputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Labeled label="Expected Selling Price (LKR)" hint="Your target resale price in the local market">
            <NumberInput value={p.sellingPriceLKR} onChange={(v) => setP({ sellingPriceLKR: v })} prefix="LKR" step={50000} />
          </Labeled>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Labeled label="Sales Commission %">
              <NumberInput value={p.commissionPct} onChange={(v) => setP({ commissionPct: v })} suffix="%" step={0.5} />
            </Labeled>
            <Labeled label="Reconditioning (LKR)">
              <NumberInput value={p.reconditioningLKR} onChange={(v) => setP({ reconditioningLKR: v })} prefix="LKR" step={10000} />
            </Labeled>
          </div>
          <Labeled label="Marketing & Listing (LKR)">
            <NumberInput value={p.marketingLKR} onChange={(v) => setP({ marketingLKR: v })} prefix="LKR" step={5000} />
          </Labeled>

          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 4, padding: "14px 16px", borderRadius: 14, background: t.chip }}>
            {[
              ["Landed cost", fmtLKR(landed)],
              ["Selling price", fmtLKR(profit.selling)],
              ["Selling costs", "− " + fmtLKR(profit.sellingCosts)],
            ].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: t.textMuted, fontWeight: 600 }}>{l}</span>
                <span style={{ fontSize: 13.5, color: t.textSoft, fontWeight: 700 }}>{v}</span>
              </div>
            ))}
            <div style={{ height: 1, background: t.border, margin: "3px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, color: t.text, fontWeight: 800 }}>Net profit</span>
              <span style={{ fontSize: 18, fontWeight: 850, color: positive ? t.good : t.danger }}>{fmtLKR(profit.net)}</span>
            </div>
          </div>
        </div>

        {/* ROI dial */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ position: "relative", width: 220, height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="74%" outerRadius="100%" data={roiData} startAngle={220} endAngle={-40}>
                <RadialBar background={{ fill: t.chip }} dataKey="value" cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center", pointerEvents: "none" }}>
              <div>
                <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 700 }}>RETURN ON INVEST.</div>
                <div style={{ fontSize: 40, fontWeight: 850, letterSpacing: -1.5, color: positive ? t.good : t.danger, lineHeight: 1.05 }}>{profit.roi.toFixed(1)}%</div>
                <div style={{ fontSize: 12.5, color: t.textSoft, fontWeight: 600 }}>{profit.margin.toFixed(1)}% margin</div>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" }}>
            <div style={{ textAlign: "center", padding: "10px", borderRadius: 12, background: t.chip }}>
              <div style={{ fontSize: 11.5, color: t.textMuted, fontWeight: 700 }}>GROSS</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{fmtLKR(profit.gross)}</div>
            </div>
            <div style={{ textAlign: "center", padding: "10px", borderRadius: 12, background: positive ? t.goodSoft : "rgba(248,113,113,.14)" }}>
              <div style={{ fontSize: 11.5, color: t.textMuted, fontWeight: 700 }}>NET</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: positive ? t.good : t.danger }}>{fmtLKR(profit.net)}</div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

/* ============================================================================
   NEW CALCULATION — wizard container (owns form + step state)
   ========================================================================== */
function buildCSV(form, r, rate) {
  const rows = [
    ["JSL Imports — Landed Cost Report", ""],
    ["Generated", new Date().toLocaleString()],
    ["", ""],
    ["Vehicle", `${form.year} ${form.make} ${form.model} (${form.variant})`],
    ["Engine", `${form.cc} cc ${form.fuel}`],
    ["Transmission / Drive", `${form.transmission} / ${form.drive}`],
    ["Mileage (km)", form.mileage],
    ["Auction Grade", form.grade],
    ["Exchange Rate (JPY->LKR)", rate],
    ["", ""],
    ["FOB (JPY)", Math.round(r.fobJPY)],
    ["Insurance (JPY)", Math.round(form.insuranceJPY)],
    ["Freight (JPY)", Math.round(form.freightJPY)],
    ["CIF (JPY)", Math.round(r.cifJPY)],
    ["CIF (LKR)", Math.round(r.cifLKR)],
    ["Customs Value (LKR)", Math.round(r.customsValue)],
    ["", ""],
    ...r.lines.map((l) => [l.label, Math.round(l.lkr)]),
    ["", ""],
    ["TOTAL LANDED COST (LKR)", Math.round(r.totalLanded)],
  ];
  return rows.map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

function NewCalculation({ onSave, onFavorite, onCompare, seed }) {
  const t = useT(); const config = useCfg(); const rate = useRate();
  const [form, setForm] = useState(() => seed || makeInitialForm(config));
  const [step, setStep] = useState(1);
  const [maxReached, setMaxReached] = useState(1);
  const [savedFlag, setSavedFlag] = useState(false);

  const set = useCallback((patch) => { setForm((prev) => ({ ...prev, ...patch })); setSavedFlag(false); }, []);

  const setVehicle = useCallback((patch) => {
    setSavedFlag(false);
    setForm((prev) => {
      let next = { ...prev, ...patch };
      if ("make" in patch) {
        const models = Object.keys(VEHICLES[next.make] || {});
        if (!models.includes(next.model)) next.model = models[0];
      }
      if ("make" in patch || "model" in patch) {
        const variants = Object.keys(VEHICLES[next.make]?.[next.model]?.variants || {});
        if (!variants.includes(next.variant)) next.variant = variants[0];
      }
      const vd = variantData(next.make, next.model, next.variant);
      if (vd?.years && !vd.years.includes(+next.year)) next.year = vd.years[vd.years.length - 1];
      const structural = "make" in patch || "model" in patch || "variant" in patch;
      if (structural) next = applyVehicleDefaults(next, config);
      return next;
    });
  }, [config]);

  const go = (n) => { setStep(n); setMaxReached((m) => Math.max(m, n)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const next = () => go(Math.min(5, step + 1));
  const back = () => go(Math.max(1, step - 1));

  const result = useMemo(() => computeLanded(form, config, rate), [form, config, rate]);

  const snapshot = () => ({ id: uid(), at: Date.now(), form: JSON.parse(JSON.stringify(form)), total: result.totalLanded, rate });
  const handleSave = () => { onSave(snapshot()); setSavedFlag(true); };
  const handleFavorite = () => onFavorite(snapshot());
  const handleCompare = () => onCompare(snapshot());
  const handleCSV = () => {
    try {
      const csv = buildCSV(form, result, rate);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `JSL-${form.make}-${form.model}-${form.year}.csv`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    } catch (e) { alert("Export is unavailable in this environment. In your own app it downloads a CSV."); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {step === 1 && <Hero form={form} onChange={setVehicle} />}
      <GlassCard pad={26}>
        <StepBar step={step} setStep={go} maxReached={maxReached} />
        <div key={step} className="jsl-in">
          {step === 1 && <StepVehicle form={form} setVehicle={setVehicle} onContinue={next} />}
          {step === 2 && <StepPurchase form={form} set={set} onContinue={next} />}
          {step === 3 && <StepShipping form={form} set={set} onContinue={next} />}
          {step === 4 && <StepReview form={form} onContinue={next} />}
          {step === 5 && <StepResults form={form} set={set} onSave={handleSave} onFavorite={handleFavorite} onCompare={handleCompare} onExportCSV={handleCSV} savedFlag={savedFlag} />}
        </div>
        {/* nav */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, paddingTop: 20, borderTop: `1px solid ${t.border}` }}>
          <Btn variant="ghost" icon={ArrowLeft} onClick={back} disabled={step === 1}>Back</Btn>
          {step < 5
            ? <Btn variant="primary" icon={ArrowRight} onClick={next}>{step === 4 ? "Calculate Final Cost" : "Continue"}</Btn>
            : <Btn variant="soft" icon={Plus} onClick={() => { setForm(makeInitialForm(config)); go(1); }}>New Calculation</Btn>}
        </div>
      </GlassCard>
      <HeroFeatureStrip />
    </div>
  );
}

/* ============================================================================
   SHARED VIEW HELPERS
   ========================================================================== */
function HeroFeatureStrip() {
  const t = useT();
  const items = [
    { icon: ShieldCheck, title: "Transparent", sub: "No hidden charges", c: t.accent },
    { icon: BadgeCheck, title: "Accurate", sub: "Full calculation accuracy", c: t.good },
    { icon: ListChecks, title: "Configurable", sub: "Easy to update rules", c: t.accent2 },
    { icon: LockKeyhole, title: "Secure", sub: "Enterprise-grade design", c: "#22d3ee" },
    { icon: MapPin, title: "Local Support", sub: "Sri Lankan expertise", c: t.warn },
  ];
  return (
    <GlassCard pad={20}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 8 }}>
        {items.map((it) => (
          <div key={it.title} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px" }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, display: "grid", placeItems: "center", background: t.chip }}>
              <it.icon size={20} style={{ color: it.c }} />
            </div>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: t.text }}>{it.title}</div>
              <div style={{ fontSize: 12, color: t.textMuted }}>{it.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function SectionHeader({ icon: Icon, title, sub, right }) {
  const t = useT();
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 22, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {Icon && <div style={{ width: 48, height: 48, borderRadius: 14, display: "grid", placeItems: "center", background: `linear-gradient(135deg,${t.accent},${t.accent2})`, boxShadow: "0 14px 30px -12px rgba(99,102,241,.7)" }}><Icon size={24} color="#fff" /></div>}
        <div>
          <div style={{ fontSize: 26, fontWeight: 850, letterSpacing: -0.6, color: t.text }}>{title}</div>
          {sub && <div style={{ fontSize: 13.5, color: t.textMuted, marginTop: 2 }}>{sub}</div>}
        </div>
      </div>
      {right}
    </div>
  );
}

function EmptyState({ icon: Icon, title, sub, action }) {
  const t = useT();
  return (
    <GlassCard pad={48}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 8 }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, display: "grid", placeItems: "center", background: t.chip, marginBottom: 6 }}><Icon size={32} style={{ color: t.textMuted }} /></div>
        <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>{title}</div>
        <div style={{ fontSize: 13.5, color: t.textMuted, maxWidth: 360 }}>{sub}</div>
        {action && <div style={{ marginTop: 14 }}>{action}</div>}
      </div>
    </GlassCard>
  );
}

function SavedCard({ calc, onOpen, onDelete, onFavorite, isFav, accentIndex = 0 }) {
  const t = useT();
  const f = calc.form;
  const c = PIE_COLORS[accentIndex % PIE_COLORS.length];
  return (
    <GlassCard pad={0} hover style={{ overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
        <div style={{ width: 92, flexShrink: 0, background: `linear-gradient(135deg, ${c}22, transparent)`, display: "grid", placeItems: "center", borderRight: `1px solid ${t.border}` }}>
          <CarIllustration body={f.body} color={c} w={88} glow={false} float={false} />
        </div>
        <div style={{ flex: 1, padding: "16px 18px", minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 15.5, fontWeight: 800, color: t.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.year} {f.make} {f.model}</div>
              <div style={{ fontSize: 12, color: t.textMuted }}>{f.variant} · {fmtNum(f.cc)}cc {f.fuel} · {new Date(calc.at).toLocaleDateString()}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>Landed</div>
              <div style={{ fontSize: 17, fontWeight: 850, color: t.text }}>{fmtLKR(calc.total)}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {onOpen && <Btn size="sm" variant="soft" icon={Eye} onClick={() => onOpen(calc)}>Open</Btn>}
            {onFavorite && <Btn size="sm" variant="ghost" icon={Heart} onClick={() => onFavorite(calc)} style={isFav ? { color: t.danger } : undefined}>{isFav ? "Saved" : "Favorite"}</Btn>}
            {onDelete && <Btn size="sm" variant="ghost" icon={Trash2} onClick={() => onDelete(calc)}>Remove</Btn>}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

/* ===================== DASHBOARD ===================== */
function Dashboard({ data, setView, openCalc }) {
  const t = useT();
  const { saved, favorites, comparisons } = data;
  const avg = saved.length ? saved.reduce((s, c) => s + c.total, 0) / saved.length : 0;
  const recent = saved.slice(0, 4);
  const chartData = saved.slice(0, 8).reverse().map((c, i) => ({ name: `${c.form.make} ${c.form.model}`.slice(0, 12), v: Math.round(c.total) }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {/* welcome banner */}
      <div className="jsl-up" style={{ position: "relative", borderRadius: 24, overflow: "hidden", border: `1px solid ${t.border}`, background: `linear-gradient(120deg, ${t.accentSoft}, transparent 55%), ${t.panel}`, padding: "30px 32px", boxShadow: t.shadow }}>
        <Particles count={10} />
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 18 }}>
          <div>
            <Pill tone="accent" style={{ marginBottom: 12 }}><Sparkles size={13} /> Welcome back</Pill>
            <div style={{ fontSize: 30, fontWeight: 850, letterSpacing: -0.8, color: t.text, lineHeight: 1.1 }}>Your import command center</div>
            <div style={{ fontSize: 14, color: t.textMuted, marginTop: 6, maxWidth: 460 }}>Calculate landed cost, project profit, and manage your Japan→Sri Lanka vehicle pipeline.</div>
          </div>
          <Btn size="lg" icon={Plus} onClick={() => setView("new")}>New Calculation</Btn>
        </div>
      </div>

      {/* stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
        <StatChip label="Total Calculations" value={saved.length} icon={Calculator} />
        <StatChip label="Saved Favorites" value={favorites.length} tone="danger" icon={Heart} />
        <StatChip label="In Comparison" value={comparisons.length} icon={GitCompare} />
        <StatChip label="Avg Landed Cost" value={saved.length ? fmtLKR(avg) : "—"} tone="good" icon={TrendingUp} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(320px,1.3fr) minmax(280px,1fr)", gap: 20 }}>
        {/* recent */}
        <GlassCard pad={24}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 16.5, fontWeight: 800, color: t.text }}>Recent Calculations</div>
            {saved.length > 0 && <Btn size="sm" variant="ghost" icon={Clock} onClick={() => setView("history")}>View all</Btn>}
          </div>
          {recent.length === 0
            ? <div style={{ padding: "28px 0", textAlign: "center", color: t.textMuted, fontSize: 13.5 }}>No calculations yet. Start your first one →</div>
            : <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{recent.map((c, i) => <SavedCard key={c.id} calc={c} onOpen={openCalc} accentIndex={i} />)}</div>}
        </GlassCard>

        {/* chart */}
        <GlassCard pad={24}>
          <div style={{ fontSize: 16.5, fontWeight: 800, color: t.text, marginBottom: 16 }}>Landed Cost Trend</div>
          {chartData.length === 0
            ? <div style={{ height: 240, display: "grid", placeItems: "center", color: t.textMuted, fontSize: 13 }}>Data appears after you save calculations</div>
            : <div style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs><linearGradient id="dashg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={t.accent} stopOpacity={0.5} /><stop offset="1" stopColor={t.accent} stopOpacity={0.03} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={t.border} vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: t.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} interval={0} angle={-15} dy={8} height={50} />
                    <YAxis tick={{ fill: t.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => (v / 1e6).toFixed(1) + "M"} />
                    <Tooltip formatter={(v) => fmtLKR(v)} contentStyle={{ background: t.panelSolid, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text }} />
                    <Area type="monotone" dataKey="v" stroke={t.accent} strokeWidth={2.5} fill="url(#dashg)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>}
        </GlassCard>
      </div>

      <HeroFeatureStrip />
    </div>
  );
}

/* ===================== HISTORY ===================== */
function History({ data, openCalc, removeSaved, toggleFav }) {
  const t = useT();
  const { saved, favorites } = data;
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("recent");
  const [makeF, setMakeF] = useState("All");
  const makes = ["All", ...Array.from(new Set(saved.map((c) => c.form.make)))];

  const list = useMemo(() => {
    let l = saved.filter((c) => {
      const hay = `${c.form.year} ${c.form.make} ${c.form.model} ${c.form.variant}`.toLowerCase();
      return hay.includes(q.toLowerCase()) && (makeF === "All" || c.form.make === makeF);
    });
    if (sort === "recent") l = l.slice().sort((a, b) => b.at - a.at);
    if (sort === "oldest") l = l.slice().sort((a, b) => a.at - b.at);
    if (sort === "high") l = l.slice().sort((a, b) => b.total - a.total);
    if (sort === "low") l = l.slice().sort((a, b) => a.total - b.total);
    return l;
  }, [saved, q, sort, makeF]);

  return (
    <div>
      <SectionHeader icon={Clock} title="Calculation History" sub={`${saved.length} saved calculation${saved.length === 1 ? "" : "s"}`} />
      <GlassCard pad={16} style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: "1 1 220px", display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: t.inputBg, border: `1px solid ${t.border}` }}>
            <Search size={17} style={{ color: t.textMuted }} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search make, model, year…" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: t.text, fontSize: 14, fontWeight: 600 }} />
            {q && <X size={16} style={{ color: t.textMuted, cursor: "pointer" }} onClick={() => setQ("")} />}
          </div>
          <div style={{ width: 170 }}><Select value={makeF} onChange={setMakeF} options={makes} /></div>
          <div style={{ width: 190 }}>
            <Select value={sort} onChange={setSort} options={[{ value: "recent", label: "Newest first" }, { value: "oldest", label: "Oldest first" }, { value: "high", label: "Highest cost" }, { value: "low", label: "Lowest cost" }]} />
          </div>
        </div>
      </GlassCard>

      {list.length === 0
        ? <EmptyState icon={Clock} title="Nothing here yet" sub={saved.length ? "No calculations match your filters. Try clearing the search." : "Saved calculations from the wizard will appear here."} />
        : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(380px,1fr))", gap: 16 }}>
            {list.map((c, i) => <SavedCard key={c.id} calc={c} accentIndex={i} onOpen={openCalc} onDelete={removeSaved} onFavorite={toggleFav} isFav={favorites.some((f) => f.id === c.id)} />)}
          </div>}
    </div>
  );
}

/* ===================== FAVORITES ===================== */
function Favorites({ data, openCalc, toggleFav, setView }) {
  const { favorites } = data;
  return (
    <div>
      <SectionHeader icon={Heart} title="Favorites" sub={`${favorites.length} starred vehicle${favorites.length === 1 ? "" : "s"}`} />
      {favorites.length === 0
        ? <EmptyState icon={Heart} title="No favorites yet" sub="Mark calculations as favorites to pin the imports you're seriously considering." action={<Btn icon={Plus} onClick={() => setView("new")}>Start a calculation</Btn>} />
        : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(380px,1fr))", gap: 16 }}>
            {favorites.map((c, i) => <SavedCard key={c.id} calc={c} accentIndex={i} onOpen={openCalc} onFavorite={toggleFav} isFav onDelete={toggleFav} />)}
          </div>}
    </div>
  );
}

/* ===================== COMPARISONS ===================== */
function Comparisons({ data, removeCompare, setView, openCalc }) {
  const t = useT(); const config = useCfg();
  const { comparisons } = data;
  const cols = comparisons.map((c) => ({ calc: c, r: computeLanded(c.form, config, c.rate) }));
  const metrics = [
    ["Year", (c) => c.calc.form.year],
    ["Engine", (c) => `${fmtNum(c.calc.form.cc)}cc ${c.calc.form.fuel}`],
    ["Grade", (c) => c.calc.form.grade],
    ["CIF (LKR)", (c) => fmtLKR(c.r.cifLKR)],
    ["Duty", (c) => fmtLKR(c.r.duty)],
    ["Excise", (c) => fmtLKR(c.r.excise)],
    ["VAT", (c) => fmtLKR(c.r.vat)],
    ["PAL + CESS", (c) => fmtLKR(c.r.pal + c.r.cess)],
    ["Taxes total", (c) => fmtLKR(c.r.govTaxes)],
    ["Registration", (c) => fmtLKR(c.r.registration)],
  ];
  const cheapest = cols.length ? Math.min(...cols.map((c) => c.r.totalLanded)) : 0;
  const barData = cols.map((c) => ({ name: `${c.calc.form.make} ${c.calc.form.model}`.slice(0, 14), v: Math.round(c.r.totalLanded) }));

  if (comparisons.length === 0)
    return (<div><SectionHeader icon={GitCompare} title="Compare Vehicles" sub="Side-by-side landed cost analysis" /><EmptyState icon={GitCompare} title="No vehicles to compare" sub="Add vehicles to comparison from the results screen to see them side by side here." action={<Btn icon={Plus} onClick={() => setView("new")}>Start a calculation</Btn>} /></div>);

  return (
    <div>
      <SectionHeader icon={GitCompare} title="Compare Vehicles" sub={`${comparisons.length} vehicle${comparisons.length === 1 ? "" : "s"} in comparison`} />
      <GlassCard pad={0} style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 120 + cols.length * 220 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "18px 20px", position: "sticky", left: 0, background: t.panelSolid, zIndex: 2, borderBottom: `1px solid ${t.border}` }}>
                <span style={{ fontSize: 12.5, color: t.textMuted, fontWeight: 700 }}>METRIC</span>
              </th>
              {cols.map((c, i) => (
                <th key={c.calc.id} style={{ padding: "16px 18px", borderBottom: `1px solid ${t.border}`, borderLeft: `1px solid ${t.border}`, minWidth: 200 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <CarIllustration body={c.calc.form.body} color={PIE_COLORS[i % PIE_COLORS.length]} w={92} glow={false} float={false} />
                    <div style={{ fontSize: 14, fontWeight: 800, color: t.text, textAlign: "center" }}>{c.calc.form.year} {c.calc.form.make} {c.calc.form.model}</div>
                    <Btn size="sm" variant="ghost" icon={Trash2} onClick={() => removeCompare(c.calc)}>Remove</Btn>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map(([label, fn], ri) => (
              <tr key={label} style={{ background: ri % 2 ? t.chip : "transparent" }}>
                <td style={{ padding: "13px 20px", fontSize: 13, color: t.textMuted, fontWeight: 700, position: "sticky", left: 0, background: ri % 2 ? t.panelSolid : t.panelSolid, zIndex: 1 }}>{label}</td>
                {cols.map((c) => <td key={c.calc.id} style={{ padding: "13px 18px", fontSize: 13.5, color: t.text, fontWeight: 600, textAlign: "center", borderLeft: `1px solid ${t.border}` }}>{fn(c)}</td>)}
              </tr>
            ))}
            <tr>
              <td style={{ padding: "16px 20px", fontSize: 14, color: t.text, fontWeight: 850, position: "sticky", left: 0, background: t.panelSolid, zIndex: 1, borderTop: `2px solid ${t.border}` }}>Total Landed</td>
              {cols.map((c) => {
                const best = c.r.totalLanded === cheapest;
                return <td key={c.calc.id} style={{ padding: "16px 18px", textAlign: "center", borderLeft: `1px solid ${t.border}`, borderTop: `2px solid ${t.border}` }}>
                  <div style={{ fontSize: 17, fontWeight: 850, color: best ? t.good : t.text }}>{fmtLKR(c.r.totalLanded)}</div>
                  {best && <div style={{ fontSize: 11, fontWeight: 800, color: t.good, marginTop: 2 }}>★ Lowest</div>}
                </td>;
              })}
            </tr>
          </tbody>
        </table>
      </GlassCard>

      <GlassCard pad={24}>
        <div style={{ fontSize: 16.5, fontWeight: 800, color: t.text, marginBottom: 16 }}>Landed Cost Comparison</div>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.border} horizontal={false} />
              <XAxis type="number" tick={{ fill: t.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => (v / 1e6).toFixed(1) + "M"} />
              <YAxis type="category" dataKey="name" tick={{ fill: t.textSoft, fontSize: 12 }} axisLine={false} tickLine={false} width={120} />
              <Tooltip formatter={(v) => fmtLKR(v)} contentStyle={{ background: t.panelSolid, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text }} cursor={{ fill: t.chip }} />
              <Bar dataKey="v" radius={[0, 8, 8, 0]}>{barData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}

/* ===================== REPORTS ===================== */
function Reports({ data }) {
  const t = useT(); const config = useCfg();
  const { saved } = data;
  const totalValue = saved.reduce((s, c) => s + c.total, 0);
  const avg = saved.length ? totalValue / saved.length : 0;
  const byMakeMap = {};
  saved.forEach((c) => { byMakeMap[c.form.make] = (byMakeMap[c.form.make] || 0) + 1; });
  const byMake = Object.entries(byMakeMap).map(([name, value]) => ({ name, value }));
  const byFuelMap = {};
  saved.forEach((c) => { byFuelMap[c.form.fuel] = (byFuelMap[c.form.fuel] || 0) + c.total; });
  const byFuel = Object.entries(byFuelMap).map(([name, value]) => ({ name, value: Math.round(value) }));

  return (
    <div>
      <SectionHeader icon={FileText} title="Reports & Analytics" sub="Portfolio overview across all saved calculations"
        right={<Btn variant="ghost" icon={Printer} onClick={() => window.print()}>Print report</Btn>} />
      {saved.length === 0
        ? <EmptyState icon={FileText} title="No data to report" sub="Save calculations to unlock portfolio analytics, charts and exportable reports." />
        : <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
              <StatChip label="Calculations" value={saved.length} icon={ListChecks} />
              <StatChip label="Portfolio Value" value={fmtLKR(totalValue)} tone="good" icon={Wallet} />
              <StatChip label="Average Landed" value={fmtLKR(avg)} icon={TrendingUp} />
              <StatChip label="Unique Makes" value={byMake.length} tone="danger" icon={Car} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(280px,1fr) minmax(280px,1fr)", gap: 20 }}>
              <GlassCard pad={24}>
                <div style={{ fontSize: 16.5, fontWeight: 800, color: t.text, marginBottom: 16 }}>Calculations by Make</div>
                <div style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={byMake} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={3}>
                        {byMake.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: t.panelSolid, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 8 }}>
                  {byMake.map((m, i) => <span key={m.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: t.textSoft }}><span style={{ width: 10, height: 10, borderRadius: 3, background: PIE_COLORS[i % PIE_COLORS.length] }} />{m.name} ({m.value})</span>)}
                </div>
              </GlassCard>
              <GlassCard pad={24}>
                <div style={{ fontSize: 16.5, fontWeight: 800, color: t.text, marginBottom: 16 }}>Value by Fuel Type</div>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={byFuel}>
                      <CartesianGrid strokeDasharray="3 3" stroke={t.border} vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: t.textMuted, fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: t.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => (v / 1e6).toFixed(0) + "M"} />
                      <Tooltip formatter={(v) => fmtLKR(v)} contentStyle={{ background: t.panelSolid, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text }} cursor={{ fill: t.chip }} />
                      <Bar dataKey="value" radius={[7, 7, 0, 0]}>{byFuel.map((_, i) => <Cell key={i} fill={PIE_COLORS[(i + 2) % PIE_COLORS.length]} />)}</Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </div>
          </div>}
    </div>
  );
}

/* ===================== DEALERSHIP (inventory & profit pipeline) ===================== */
function Dealership({ data, setView, openCalc }) {
  const t = useT(); const config = useCfg();
  const { saved } = data;
  const tm = config.profit.targetMarginPct / 100;
  const rows = saved.map((c) => {
    const sell = Math.round((c.total * (1 + tm)) / 10000) * 10000;
    const p = { sellingPriceLKR: sell, commissionPct: config.profit.commissionPct, reconditioningLKR: config.profit.reconditioningLKR, marketingLKR: config.profit.marketingLKR };
    return { calc: c, sell, profit: computeProfit(c.total, p) };
  });
  const totalCost = rows.reduce((s, r) => s + r.calc.total, 0);
  const totalSell = rows.reduce((s, r) => s + r.sell, 0);
  const totalNet = rows.reduce((s, r) => s + r.profit.net, 0);

  return (
    <div>
      <SectionHeader icon={Building2} title="Dealership Pipeline" sub="Inventory valuation & projected resale margins"
        right={<Btn icon={Plus} onClick={() => setView("new")}>Add vehicle</Btn>} />
      {saved.length === 0
        ? <EmptyState icon={Building2} title="Your pipeline is empty" sub="Saved calculations become inventory here, with automatic resale and profit projections at your target margin." action={<Btn icon={Plus} onClick={() => setView("new")}>Start a calculation</Btn>} />
        : <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
              <StatChip label="Units in Pipeline" value={rows.length} icon={Car} />
              <StatChip label="Total Cost Basis" value={fmtLKR(totalCost)} icon={Wallet} />
              <StatChip label="Projected Revenue" value={fmtLKR(totalSell)} tone="good" icon={CircleDollarSign} />
              <StatChip label="Projected Net Profit" value={fmtLKR(totalNet)} tone={totalNet >= 0 ? "good" : "danger"} icon={TrendingUp} />
            </div>
            <GlassCard pad={0} style={{ overflow: "hidden" }}>
              <div style={{ padding: "16px 22px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 16.5, fontWeight: 800, color: t.text }}>Inventory</div>
                <Pill tone="accent"><Percent size={12} /> Target margin {config.profit.targetMarginPct}%</Pill>
              </div>
              <div>
                {rows.map((r, i) => (
                  <div key={r.calc.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 22px", borderBottom: i < rows.length - 1 ? `1px solid ${t.border}` : "none", flexWrap: "wrap" }}>
                    <div style={{ width: 70, flexShrink: 0 }}><CarIllustration body={r.calc.form.body} color={PIE_COLORS[i % PIE_COLORS.length]} w={70} glow={false} float={false} /></div>
                    <div style={{ flex: "1 1 160px", minWidth: 0 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 800, color: t.text }}>{r.calc.form.year} {r.calc.form.make} {r.calc.form.model}</div>
                      <div style={{ fontSize: 12, color: t.textMuted }}>{r.calc.form.variant} · {fmtNum(r.calc.form.cc)}cc {r.calc.form.fuel}</div>
                    </div>
                    <div style={{ textAlign: "right", minWidth: 110 }}><div style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>Cost</div><div style={{ fontSize: 14, fontWeight: 800, color: t.text }}>{fmtLKR(r.calc.total)}</div></div>
                    <div style={{ textAlign: "right", minWidth: 120 }}><div style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>Proj. sale</div><div style={{ fontSize: 14, fontWeight: 800, color: t.text }}>{fmtLKR(r.sell)}</div></div>
                    <div style={{ textAlign: "right", minWidth: 120 }}><div style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>Net profit</div><div style={{ fontSize: 15, fontWeight: 850, color: r.profit.net >= 0 ? t.good : t.danger }}>{fmtLKR(r.profit.net)}</div></div>
                    <Btn size="sm" variant="soft" icon={Eye} onClick={() => openCalc(r.calc)}>Open</Btn>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>}
    </div>
  );
}

/* ===================== STANDALONE PROFIT CALCULATOR ===================== */
function ProfitCalculator({ data }) {
  const t = useT(); const config = useCfg();
  const { saved } = data;
  const [landed, setLanded] = useState(() => (saved[0]?.total ? Math.round(saved[0].total) : 5245000));
  const [pickId, setPickId] = useState(saved[0]?.id || "");
  const [p, setPState] = useState({
    sellingPriceLKR: Math.round((landed * (1 + config.profit.targetMarginPct / 100)) / 10000) * 10000,
    commissionPct: config.profit.commissionPct, reconditioningLKR: config.profit.reconditioningLKR, marketingLKR: config.profit.marketingLKR,
  });
  const setP = (patch) => setPState((prev) => ({ ...prev, ...patch }));
  const profit = useMemo(() => computeProfit(+landed, p), [landed, p]);

  const pickSaved = (id) => {
    setPickId(id);
    const c = saved.find((s) => s.id === id);
    if (c) { setLanded(Math.round(c.total)); setP({ sellingPriceLKR: Math.round((c.total * (1 + config.profit.targetMarginPct / 100)) / 10000) * 10000 }); }
  };

  return (
    <div>
      <SectionHeader icon={TrendingUp} title="Profit Calculator" sub="Model resale margins & ROI for any landed cost" />
      <div style={{ display: "grid", gridTemplateColumns: "minmax(260px,0.8fr) minmax(320px,1.6fr)", gap: 20 }}>
        <GlassCard pad={24}>
          <Labeled label="Landed Cost (LKR)" hint="Type any value, or load a saved calculation below">
            <NumberInput value={landed} onChange={setLanded} prefix="LKR" step={50000} />
          </Labeled>
          {saved.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <Labeled label="Load saved calculation">
                <Select value={pickId} onChange={pickSaved} placeholder="Select a vehicle…"
                  options={saved.map((c) => ({ value: c.id, label: `${c.form.year} ${c.form.make} ${c.form.model} — ${fmtLKR(c.total)}` }))} />
              </Labeled>
            </div>
          )}
          <div style={{ marginTop: 18, padding: "14px 16px", borderRadius: 14, background: t.chip, display: "flex", alignItems: "center", gap: 10 }}>
            <Info size={16} style={{ color: t.accent, flexShrink: 0 }} />
            <span style={{ fontSize: 12.5, color: t.textMuted, lineHeight: 1.5 }}>Adjust the selling price and selling costs on the right to see live ROI and margin.</span>
          </div>
        </GlassCard>
        <ProfitPanel landed={+landed} p={p} setP={setP} profit={profit} />
      </div>
    </div>
  );
}

/* ============================================================================
   ADMIN PANEL — full configuration editor (everything flows into the engine)
   ========================================================================== */
const useSetConfig = () => useContext(Ctx).setConfig;
const pct = (x) => +((x || 0) * 100).toFixed(2);

function AdminTabBtn({ active, onClick, icon: Icon, children }) {
  const t = useT();
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 9, padding: "10px 16px", borderRadius: 12, cursor: "pointer",
      border: `1px solid ${active ? "transparent" : t.border}`, whiteSpace: "nowrap",
      background: active ? `linear-gradient(135deg,${t.accent},${t.accent2})` : t.chip,
      color: active ? "#fff" : t.textSoft, fontWeight: 700, fontSize: 13.5,
    }}><Icon size={16} />{children}</button>
  );
}
function AdminCard({ title, children, desc }) {
  const t = useT();
  return (
    <GlassCard pad={24} className="jsl-up">
      <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>{title}</div>
      {desc && <div style={{ fontSize: 12.5, color: t.textMuted, marginTop: 3, marginBottom: 6 }}>{desc}</div>}
      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 14 }}>{children}</div>
    </GlassCard>
  );
}

function AdminPanel({ rateCtl }) {
  const t = useT(); const config = useCfg(); const setConfig = useSetConfig();
  const [tab, setTab] = useState("tax");
  const [manualVal, setManualVal] = useState(rateCtl.rate);

  const patchTax = (k, v) => setConfig((c) => ({ ...c, tax: { ...c.tax, [k]: v } }));
  const patchFees = (k, v) => setConfig((c) => ({ ...c, fees: { ...c.fees, [k]: v } }));
  const patchProfit = (k, v) => setConfig((c) => ({ ...c, profit: { ...c.profit, [k]: v } }));
  const patchExcise = (fuel, idx, key, v) => setConfig((c) => {
    const ex = { ...c.tax.excise }; ex[fuel] = ex[fuel].map((b, i) => (i === idx ? { ...b, [key]: v } : b));
    return { ...c, tax: { ...c.tax, excise: ex } };
  });
  const patchShip = (idx, key, v) => setConfig((c) => ({ ...c, shipping: c.shipping.map((s, i) => (i === idx ? { ...s, [key]: v } : s)) }));
  const patchPort = (id, key, v) => setConfig((c) => ({ ...c, ports: c.ports.map((p) => (p.id === id ? { ...p, [key]: v } : p)) }));
  const addPort = () => setConfig((c) => ({ ...c, ports: [...c.ports, { id: uid(), name: "New Port" }] }));
  const removePort = (id) => setConfig((c) => ({ ...c, ports: c.ports.filter((p) => p.id !== id) }));
  const patchFob = (key, v) => setConfig((c) => ({ ...c, vehicleFob: { ...c.vehicleFob, [key]: v } }));
  const patchCurrency = (k, v) => setConfig((c) => ({ ...c, currency: { ...c.currency, [k]: v } }));

  const tabs = [
    { id: "tax", label: "Tax & Levies", icon: Percent },
    { id: "excise", label: "Excise", icon: Layers },
    { id: "shipping", label: "Shipping & Ports", icon: Ship },
    { id: "fees", label: "Fees", icon: Receipt },
    { id: "exchange", label: "Exchange", icon: CircleDollarSign },
    { id: "vehicles", label: "Vehicles", icon: Car },
    { id: "profit", label: "Profit", icon: PiggyBank },
  ];

  return (
    <div>
      <SectionHeader icon={Settings} title="Admin · Configuration" sub="Every rule, rate and fee that powers the engine — fully editable"
        right={<Btn variant="ghost" icon={RefreshCw} onClick={() => setConfig(DEFAULT_CONFIG)}>Reset to defaults</Btn>} />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, padding: "10px 8px", borderRadius: 14, background: "rgba(251,191,36,.10)", color: t.warn, fontSize: 12.5, fontWeight: 600 }}>
        <Info size={15} /> Rates are illustrative configurable defaults — set them to the current published Sri Lanka schedule. Not official tax advice.
      </div>
      <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, marginBottom: 18 }}>
        {tabs.map((tb) => <AdminTabBtn key={tb.id} active={tab === tb.id} onClick={() => setTab(tb.id)} icon={tb.icon}>{tb.label}</AdminTabBtn>)}
      </div>

      {tab === "tax" && (
        <AdminCard title="Tax & Levy Rates" desc="Core rates applied to the customs value. Enter percentages.">
          <Labeled label="Valuation Factor (CIF→CV)"><NumberInput value={config.tax.valuationFactor} onChange={(v) => patchTax("valuationFactor", +v || 0)} step={0.01} /></Labeled>
          <Labeled label="Import Duty %"><NumberInput value={pct(config.tax.dutyRate)} onChange={(v) => patchTax("dutyRate", (+v || 0) / 100)} suffix="%" step={0.5} /></Labeled>
          <Labeled label="PAL %"><NumberInput value={pct(config.tax.palRate)} onChange={(v) => patchTax("palRate", (+v || 0) / 100)} suffix="%" step={0.25} /></Labeled>
          <Labeled label="CESS %"><NumberInput value={pct(config.tax.cessRate)} onChange={(v) => patchTax("cessRate", (+v || 0) / 100)} suffix="%" step={0.5} /></Labeled>
          <Labeled label="VAT %"><NumberInput value={pct(config.tax.vatRate)} onChange={(v) => patchTax("vatRate", (+v || 0) / 100)} suffix="%" step={0.5} /></Labeled>
          <Labeled label="Luxury Threshold (LKR)"><NumberInput value={config.tax.luxuryThresholdLKR} onChange={(v) => patchTax("luxuryThresholdLKR", +v || 0)} prefix="LKR" step={500000} /></Labeled>
          <Labeled label="Luxury Rate %"><NumberInput value={pct(config.tax.luxuryRate)} onChange={(v) => patchTax("luxuryRate", (+v || 0) / 100)} suffix="%" step={1} /></Labeled>
        </AdminCard>
      )}

      {tab === "excise" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {Object.entries(config.tax.excise).map(([fuel, brackets]) => (
            <GlassCard key={fuel} pad={22} className="jsl-up">
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
                <Fuel size={17} style={{ color: t.accent }} /><div style={{ fontSize: 15.5, fontWeight: 800, color: t.text }}>{fuel}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
                {brackets.map((b, i) => (
                  <div key={i} style={{ padding: "12px 14px", borderRadius: 12, background: t.chip }}>
                    <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 700, marginBottom: 8 }}>
                      {i === 0 ? "Up to" : `${fmtNum(brackets[i - 1].maxCc)}–`}{b.maxCc >= 99999 ? " and above" : `${fmtNum(b.maxCc)} cc`}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <div style={{ flex: 1 }}><NumberInput value={b.maxCc >= 99999 ? "" : b.maxCc} placeholder="∞" onChange={(v) => patchExcise(fuel, i, "maxCc", v === "" ? 99999 : (+v || 0))} suffix="cc" step={100} /></div>
                      <div style={{ width: 110 }}><NumberInput value={pct(b.rate)} onChange={(v) => patchExcise(fuel, i, "rate", (+v || 0) / 100)} suffix="%" step={1} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {tab === "shipping" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <GlassCard pad={22} className="jsl-up">
            <div style={{ fontSize: 15.5, fontWeight: 800, color: t.text, marginBottom: 12 }}>Shipping Methods</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {config.shipping.map((s, i) => (
                <div key={s.id} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 2fr", gap: 12, alignItems: "center" }}>
                  <input value={s.name} onChange={(e) => patchShip(i, "name", e.target.value)} style={inputStyle(t)} />
                  <NumberInput value={s.freightJPY} onChange={(v) => patchShip(i, "freightJPY", +v || 0)} prefix="¥" step={5000} />
                  <input value={s.note} onChange={(e) => patchShip(i, "note", e.target.value)} style={inputStyle(t)} />
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard pad={22} className="jsl-up">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 15.5, fontWeight: 800, color: t.text }}>Export Ports</div>
              <Btn size="sm" variant="soft" icon={Plus} onClick={addPort}>Add port</Btn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
              {config.ports.map((p) => (
                <div key={p.id} style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 10px", borderRadius: 12, background: t.chip }}>
                  <Anchor size={15} style={{ color: t.textMuted, flexShrink: 0 }} />
                  <input value={p.name} onChange={(e) => patchPort(p.id, "name", e.target.value)} style={{ ...inputStyle(t), padding: "8px 10px" }} />
                  <button onClick={() => patchPort(p.id, "popular", !p.popular)} title="Popular" style={{ border: "none", background: "transparent", cursor: "pointer", color: p.popular ? t.warn : t.textMuted }}><Star size={16} fill={p.popular ? t.warn : "none"} /></button>
                  <button onClick={() => removePort(p.id)} style={{ border: "none", background: "transparent", cursor: "pointer", color: t.textMuted }}><Trash2 size={15} /></button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {tab === "fees" && (
        <AdminCard title="Default Fees" desc="Pre-filled into new calculations. JPY for Japan-side, LKR for local charges.">
          <Labeled label="Auction Fees (JPY)"><NumberInput value={config.fees.auctionFeesJPY} onChange={(v) => patchFees("auctionFeesJPY", +v || 0)} prefix="¥" step={5000} /></Labeled>
          <Labeled label="Exporter Fees (JPY)"><NumberInput value={config.fees.exporterFeesJPY} onChange={(v) => patchFees("exporterFeesJPY", +v || 0)} prefix="¥" step={5000} /></Labeled>
          <Labeled label="Insurance (JPY)"><NumberInput value={config.fees.insuranceJPY} onChange={(v) => patchFees("insuranceJPY", +v || 0)} prefix="¥" step={5000} /></Labeled>
          <Labeled label="Documentation (LKR)"><NumberInput value={config.fees.documentationLKR} onChange={(v) => patchFees("documentationLKR", +v || 0)} prefix="LKR" step={5000} /></Labeled>
          <Labeled label="Inland Transport (LKR)"><NumberInput value={config.fees.inlandTransportLKR} onChange={(v) => patchFees("inlandTransportLKR", +v || 0)} prefix="LKR" step={5000} /></Labeled>
          <Labeled label="Inspection (LKR)"><NumberInput value={config.fees.inspectionLKR} onChange={(v) => patchFees("inspectionLKR", +v || 0)} prefix="LKR" step={2000} /></Labeled>
          <Labeled label="Broker (LKR)"><NumberInput value={config.fees.brokerLKR} onChange={(v) => patchFees("brokerLKR", +v || 0)} prefix="LKR" step={5000} /></Labeled>
          <Labeled label="Miscellaneous (LKR)"><NumberInput value={config.fees.miscLKR} onChange={(v) => patchFees("miscLKR", +v || 0)} prefix="LKR" step={5000} /></Labeled>
          <Labeled label="Registration (LKR)"><NumberInput value={config.fees.registrationLKR} onChange={(v) => patchFees("registrationLKR", +v || 0)} prefix="LKR" step={5000} /></Labeled>
        </AdminCard>
      )}

      {tab === "exchange" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
          <GlassCard pad={24} className="jsl-up">
            <div style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 4 }}>Live Rate Status</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
              {rateCtl.status === "live" ? <Wifi size={20} style={{ color: t.good }} /> : rateCtl.status === "checking" ? <RefreshCw size={20} style={{ color: t.accent }} className="jsl-shimmer" /> : <WifiOff size={20} style={{ color: t.textMuted }} />}
              <div>
                <div style={{ fontSize: 26, fontWeight: 850, color: t.text }}>¥1 = LKR {rateCtl.rate.toFixed(3)}</div>
                <div style={{ fontSize: 12, color: t.textMuted, textTransform: "capitalize" }}>Source: {rateCtl.status}{rateCtl.overridden ? " (manual)" : ""}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <Btn size="sm" variant="soft" icon={RefreshCw} onClick={rateCtl.refresh}>Refresh live</Btn>
              {rateCtl.overridden && <Btn size="sm" variant="ghost" onClick={rateCtl.clearManual}>Clear override</Btn>}
            </div>
          </GlassCard>
          <GlassCard pad={24} className="jsl-up">
            <div style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 12 }}>Manual Override</div>
            <Labeled label="Set rate (JPY→LKR)" hint="Overrides live/cached rate until cleared">
              <div style={{ display: "flex", gap: 10 }}>
                <NumberInput value={manualVal} onChange={setManualVal} step={0.01} prefix="LKR" />
                <Btn size="sm" onClick={() => rateCtl.setManual(+manualVal || rateCtl.rate)}>Apply</Btn>
              </div>
            </Labeled>
          </GlassCard>
          <GlassCard pad={24} className="jsl-up">
            <div style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 12 }}>Default / Fallback</div>
            <Labeled label="Default rate" hint="Used when offline and no cached rate exists">
              <NumberInput value={config.currency.defaultRate} onChange={(v) => patchCurrency("defaultRate", +v || 0)} step={0.01} prefix="LKR" />
            </Labeled>
          </GlassCard>
        </div>
      )}

      {tab === "vehicles" && (
        <GlassCard pad={24} className="jsl-up">
          <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>Vehicle Catalog · FOB Overrides</div>
          <div style={{ fontSize: 12.5, color: t.textMuted, marginTop: 3, marginBottom: 14 }}>Override the default auction/FOB value (JPY) per variant. Leave blank to use the catalog default. New overrides apply to your next calculation.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 12 }}>
            {Object.entries(VEHICLES).flatMap(([make, models]) =>
              Object.entries(models).flatMap(([model, m]) =>
                Object.entries(m.variants).map(([variant, v]) => {
                  const key = `${make}|${model}|${variant}`;
                  return (
                    <div key={key} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, background: t.chip }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: t.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{make} {model}</div>
                        <div style={{ fontSize: 11.5, color: t.textMuted }}>{variant} · {fmtNum(v.cc)}cc {v.fuel}</div>
                      </div>
                      <div style={{ width: 150 }}>
                        <NumberInput value={config.vehicleFob[key] ?? ""} placeholder={fmtNum(v.fobJPY)} onChange={(val) => patchFob(key, val === "" ? undefined : (+val || 0))} prefix="¥" step={10000} />
                      </div>
                    </div>
                  );
                })
              )
            )}
          </div>
        </GlassCard>
      )}

      {tab === "profit" && (
        <AdminCard title="Profit Defaults" desc="Seed values for the profit calculator and dealership projections.">
          <Labeled label="Target Margin %"><NumberInput value={config.profit.targetMarginPct} onChange={(v) => patchProfit("targetMarginPct", +v || 0)} suffix="%" step={1} /></Labeled>
          <Labeled label="Sales Commission %"><NumberInput value={config.profit.commissionPct} onChange={(v) => patchProfit("commissionPct", +v || 0)} suffix="%" step={0.5} /></Labeled>
          <Labeled label="Reconditioning (LKR)"><NumberInput value={config.profit.reconditioningLKR} onChange={(v) => patchProfit("reconditioningLKR", +v || 0)} prefix="LKR" step={10000} /></Labeled>
          <Labeled label="Marketing (LKR)"><NumberInput value={config.profit.marketingLKR} onChange={(v) => patchProfit("marketingLKR", +v || 0)} prefix="LKR" step={5000} /></Labeled>
        </AdminCard>
      )}
    </div>
  );
}

/* ============================================================================
   APP ROOT — state, providers, layout, routing
   ========================================================================== */
export default function App() {
  const [themeName, setThemeName] = useState("dark");
  const t = THEMES[themeName];
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const rateCtl = useExchangeRate(config.currency.defaultRate);

  const [view, setViewRaw] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const [saved, setSaved] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [comparisons, setComparisons] = useState([]);

  const [seed, setSeed] = useState(null);
  const [nonce, setNonce] = useState(0);

  // responsive: auto-collapse the sidebar on narrow viewports
  useEffect(() => {
    const onResize = () => setCollapsed(window.innerWidth < 980);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const setView = (id) => {
    if (id === "new") { setSeed(null); setNonce((n) => n + 1); }
    setViewRaw(id);
    if (window.innerWidth < 980) setCollapsed(true);
  };

  const openCalc = (calc) => {
    setSeed(JSON.parse(JSON.stringify(calc.form)));
    setNonce((n) => n + 1);
    setViewRaw("new");
    window.scrollTo({ top: 0 });
  };

  const onSave = (snap) => setSaved((s) => [snap, ...s.filter((x) => x.id !== snap.id)]);
  const removeSaved = (calc) => {
    setSaved((s) => s.filter((x) => x.id !== calc.id));
    setFavorites((f) => f.filter((x) => x.id !== calc.id));
    setComparisons((c) => c.filter((x) => x.id !== calc.id));
  };
  const toggleFav = (snap) => setFavorites((f) => (f.some((x) => x.id === snap.id) ? f.filter((x) => x.id !== snap.id) : [snap, ...f]));
  const onCompare = (snap) => setComparisons((c) => {
    if (c.some((x) => x.id === snap.id)) return c;
    if (c.length >= 4) return [...c.slice(1), snap];
    return [...c, snap];
  });
  const removeCompare = (calc) => setComparisons((c) => c.filter((x) => x.id !== calc.id));

  const data = { saved, favorites, comparisons };
  const ctxValue = useMemo(() => ({ t, config, setConfig, rate: rateCtl.rate, rateCtl }), [t, config, rateCtl]);

  return (
    <Ctx.Provider value={ctxValue}>
      <GlobalStyles />
      <div style={{ minHeight: "100vh", display: "flex", background: t.appBg, color: t.text, fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif", position: "relative" }}>
        {/* overlay when sidebar open on mobile */}
        {!collapsed && (
          <div onClick={() => setCollapsed(true)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", zIndex: 39, display: "none" }} className="jsl-overlay" />
        )}
        <div style={{ position: collapsed ? "relative" : "sticky", top: 0, height: "100vh", zIndex: 40 }} className="jsl-sidebar-wrap">
          <Sidebar view={view} setView={setView} collapsed={collapsed} />
        </div>

        <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <TopBar theme={themeName} setTheme={setThemeName} rateCtl={rateCtl} onMenu={() => setCollapsed((c) => !c)} />
          <div style={{ padding: "26px clamp(16px, 3vw, 34px) 60px", maxWidth: 1480, width: "100%", margin: "0 auto" }}>
            {view === "dashboard" && <Dashboard data={data} setView={setView} openCalc={openCalc} />}
            {view === "new" && <NewCalculation key={nonce} seed={seed} onSave={onSave} onFavorite={toggleFav} onCompare={onCompare} />}
            {view === "comparisons" && <Comparisons data={data} removeCompare={removeCompare} setView={setView} openCalc={openCalc} />}
            {view === "history" && <History data={data} openCalc={openCalc} removeSaved={removeSaved} toggleFav={toggleFav} />}
            {view === "favorites" && <Favorites data={data} openCalc={openCalc} toggleFav={toggleFav} setView={setView} />}
            {view === "reports" && <Reports data={data} />}
            {view === "profit" && <ProfitCalculator data={data} />}
            {view === "dealership" && <Dealership data={data} setView={setView} openCalc={openCalc} />}
            {view === "admin" && <AdminPanel rateCtl={rateCtl} />}
          </div>
        </main>
      </div>
    </Ctx.Provider>
  );
}
