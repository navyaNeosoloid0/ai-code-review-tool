import React, { useMemo, useState } from "react";

const nav = [
  ["Overview", "⌂"],
  ["Investigations", "◎"],
  ["Datasets", "▦"],
  ["Reports", "▤"],
];

const datasets = [
  { name: "Sales Performance", rows: "2.4M rows", updated: "Updated 12m ago", tone: "cyan" },
  { name: "Customer Health", rows: "840K rows", updated: "Updated 1h ago", tone: "violet" },
  { name: "Product Analytics", rows: "1.2M rows", updated: "Updated yesterday", tone: "amber" },
];

const prompts = [
  "Why did revenue decline in Q3?",
  "Which customers are at risk of churning?",
  "Find underperforming products this month",
];

const bars = [45, 62, 54, 70, 66, 82, 76, 58, 73, 87, 71, 64, 79, 92];

function Icon({ children }) { return <span className="icon" aria-hidden="true">{children}</span>; }

function Home() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [dataset, setDataset] = useState(datasets[0]);
  const [prompt, setPrompt] = useState(prompts[0]);
  const [running, setRunning] = useState(false);
  const [tab, setTab] = useState("Evidence");
  const [uploaded, setUploaded] = useState(false);
  const [toast, setToast] = useState("");

  const status = useMemo(() => running ? "Investigation running" : "System ready", [running]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const startInvestigation = () => {
    setRunning(true);
    notify("Investigation started in demo mode");
    window.setTimeout(() => setRunning(false), 4200);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">IF</div><div><strong>INSIGHTFLOW</strong><small>AI INTELLIGENCE</small></div></div>
        <div className="workspace-label">WORKSPACE <span>⌄</span></div>
        <div className="workspace"><div className="workspace-avatar">AC</div><div><strong>Acme Corporation</strong><small>Enterprise plan</small></div><span className="chevron">›</span></div>
        <nav className="primary-nav" aria-label="Primary navigation">
          {nav.map(([label, icon]) => <button className={activeNav === label ? "nav-item active" : "nav-item"} onClick={() => setActiveNav(label)} key={label}><Icon>{icon}</Icon>{label}{label === "Investigations" && <span className="nav-count">3</span>}</button>)}
        </nav>
        <div className="sidebar-section"><div className="workspace-label">RECENT INVESTIGATIONS</div><button className="recent active-recent"><span className="dot cyan-dot"/>Revenue decline analysis<small>Today, 10:42 AM</small></button><button className="recent"><span className="dot amber-dot"/>Customer churn signals<small>Yesterday, 4:18 PM</small></button><button className="recent"><span className="dot violet-dot"/>Q2 product performance<small>Jun 18, 9:05 AM</small></button></div>
        <div className="sidebar-footer"><button className="nav-item"><Icon>?</Icon>Help & documentation</button><div className="user"><div className="user-avatar">JD</div><div><strong>Jordan Davis</strong><small>Administrator</small></div><span className="chevron">›</span></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumbs"><span>Overview</span><b>/</b><strong>{activeNav === "Overview" ? "Command center" : activeNav}</strong></div><div className="top-actions"><div className="status"><span className={running ? "status-dot running" : "status-dot"}/>{status}</div><button className="icon-button" aria-label="Notifications">♧<span className="notification"/></button><button className="avatar-button">JD</button></div></header>
        <div className="content-wrap">
          <section className="hero-row"><div><div className="eyebrow">MONDAY, SEPTEMBER 09, 2026 <span className="live-pill">LIVE</span></div><h1>Good morning, Jordan.</h1><p className="subtitle">Your intelligence workspace is ready. What would you like to investigate?</p></div><div className="hero-actions"><button className="secondary-button" onClick={() => notify("Report export queued")}>Export report <span>↗</span></button><button className="primary-button" onClick={startInvestigation}><span>＋</span> New investigation</button></div></section>

          <section className="metric-grid"><Metric label="REVENUE (Q3)" value="$1.84M" change="−12.4%" detail="vs. previous quarter" negative/><Metric label="ACTIVE CUSTOMERS" value="8,429" change="+4.8%" detail="vs. previous quarter"/><Metric label="AVG. ORDER VALUE" value="$218.40" change="−3.2%" detail="vs. previous quarter" negative/><Metric label="DATA QUALITY" value="98.7%" change="+0.9%" detail="confidence score"/></section>

          <section className="workspace-grid">
            <div className="panel investigation-panel"><div className="panel-header"><div><div className="eyebrow">AUTONOMOUS INVESTIGATION</div><h2>{running ? "Analyzing your question..." : "What would you like to know?"}</h2></div><span className={running ? "agent-badge active-agent" : "agent-badge"}><span className="pulse"/> {running ? "Agents working" : "6 agents ready"}</span></div><div className="prompt-box"><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} aria-label="Investigation prompt"/><button className="prompt-submit" onClick={startInvestigation} aria-label="Run investigation">{running ? "…" : "→"}</button></div><div className="prompt-suggestions"><span>Try asking</span>{prompts.map((item) => <button key={item} onClick={() => setPrompt(item)}>{item}</button>)}</div><div className="investigation-footer"><span><Icon>◈</Icon> Cross-dataset reasoning enabled</span><span><Icon>◌</Icon> Results typically in 30–60 sec</span></div></div>
            <div className="panel agent-panel"><div className="panel-header compact"><div><div className="eyebrow">AGENT ACTIVITY</div><h2>Investigation pipeline</h2></div><button className="more-button">•••</button></div><div className="timeline"><TimelineItem num="01" title="Query decomposition" text="Breaking question into 4 hypotheses" time="Complete" done/><TimelineItem num="02" title="Data retrieval" text="Querying 3 connected datasets" time="Complete" done/><TimelineItem num="03" title="Pattern detection" text="Comparing regional performance" time={running ? "Running" : "Ready"} active={running}/><TimelineItem num="04" title="Causal analysis" text="Testing contributing factors" time="Queued"/><TimelineItem num="05" title="Synthesis" text="Preparing explainable findings" time="Queued"/></div><div className="agent-footer"><span className="mini-agent-icon">✦</span><span>Powered by InsightFlow orchestration</span><span className="confidence">99.2% uptime</span></div></div>
          </section>

          <section className="lower-grid"><div className="panel chart-panel"><div className="panel-header compact"><div><div className="eyebrow">REVENUE TREND</div><h2>$1.84M <span className="trend negative">−12.4%</span></h2></div><select aria-label="Revenue range"><option>Last 12 months</option><option>Last 30 days</option></select></div><div className="chart-meta"><span><i className="legend-line"/> Actual revenue</span><span><i className="legend-dash"/> Forecast</span><strong>Peak: $242K <small>May 2026</small></strong></div><div className="bar-chart" aria-label="Revenue trend chart">{bars.map((height, index) => <div className="bar-column" key={index}><div className={index > 9 ? "bar declining" : "bar"} style={{height: `${height}%`}}/><span>{["O","N","D","J","F","M","A","M","J","J","A","S","O","N"][index]}</span></div>)}<div className="chart-baseline"/></div></div>
            <div className="panel anomalies-panel"><div className="panel-header compact"><div><div className="eyebrow">SIGNALS DETECTED</div><h2>Notable anomalies <span className="signal-count">4</span></h2></div><button className="text-button" onClick={() => notify("Opening anomaly explorer")}>View all →</button></div><div className="signal-list"><Signal title="West region revenue drop" detail="−28.4% below expected" tone="critical"/><Signal title="Enterprise churn spike" detail="+18 accounts at risk" tone="warning"/><Signal title="Product margin variance" detail="SKU-4821 · −9.2 pts" tone="warning"/><Signal title="Data freshness delayed" detail="Customer Health · 42m" tone="info"/></div></div>
          </section>

          <section className="evidence-section"><div className="section-heading"><div><div className="eyebrow">LATEST INVESTIGATION</div><h2>Revenue decline analysis</h2><p>Completed today at 10:42 AM · 42 seconds · 3 datasets analyzed</p></div><div className="confidence-score"><span>CONFIDENCE</span><strong>94.8%</strong></div></div><div className="tab-row">{["Evidence", "Timeline", "Recommendations"].map((item) => <button className={tab === item ? "tab active-tab" : "tab"} onClick={() => setTab(item)} key={item}>{item}</button>)}<button className="share-button" onClick={() => notify("Share link copied")}>Share report ↗</button></div>{tab === "Evidence" && <div className="evidence-grid"><EvidenceCard tag="PRIMARY FINDING" title="West region underperformed by 28.4%" text="Revenue in the West region declined significantly compared to the expected baseline, accounting for 61% of the total quarterly decline." source="Sales Performance · Regional breakdown" confidence="97.2%" tone="cyan"/><EvidenceCard tag="CONTRIBUTING FACTOR" title="Enterprise segment churn increased" text="18 enterprise accounts moved into a high-risk churn state during Q3. This represents a 22% increase from the prior quarter." source="Customer Health · Segment analysis" confidence="91.6%" tone="amber"/><EvidenceCard tag="ROOT CAUSE SIGNAL" title="Two products lost momentum" text="Product adoption for SKU-4821 and SKU-1940 dropped across all regions, with the largest impact in West enterprise accounts." source="Product Analytics · Adoption cohorts" confidence="89.4%" tone="violet"/></div>}{tab === "Timeline" && <div className="empty-tab">The investigation ran 5 agents across 3 datasets. Select the pipeline above to inspect each reasoning step.</div>}{tab === "Recommendations" && <div className="recommendations"><Recommendation title="Launch West enterprise retention play" text="Prioritize the 18 high-risk accounts with an executive outreach sequence."/><Recommendation title="Review SKU-4821 positioning" text="Compare adoption blockers with West account feedback before the next release."/></div>}</section>

          <section className="dataset-section"><div className="section-heading"><div><div className="eyebrow">CONNECTED DATA</div><h2>Dataset workspace</h2><p>Manage the sources InsightFlow can reason across.</p></div><button className="secondary-button" onClick={() => { setUploaded(true); notify("Dataset upload staged") }}>＋ Add dataset</button></div><div className="dataset-grid">{datasets.map((item) => <button className={dataset.name === item.name ? `dataset-card selected ${item.tone}` : `dataset-card ${item.tone}`} key={item.name} onClick={() => setDataset(item)}><div className="dataset-icon">{item.name[0]}</div><div className="dataset-info"><strong>{item.name}</strong><span>{item.rows} · {item.updated}</span></div><span className="dataset-status">●</span></button>)}{uploaded && <div className="dataset-card upload-card"><div className="dataset-icon">＋</div><div className="dataset-info"><strong>New dataset staged</strong><span>Ready for schema mapping</span></div><span className="dataset-status amber-text">!</span></div>}</div></section>
        </div>
        {toast && <div className="toast" role="status">{toast}</div>}
      </main>
    </div>
  );
}

function Metric({ label, value, change, detail, negative }) { return <div className="metric"><div className="eyebrow">{label}</div><div className="metric-value">{value}</div><div className={negative ? "metric-change negative" : "metric-change"}>{change} <small>{detail}</small></div></div>; }
function TimelineItem({ num, title, text, time, done, active }) { return <div className={active ? "timeline-item active-timeline" : "timeline-item"}><div className={done ? "timeline-num done" : "timeline-num"}>{done ? "✓" : num}</div><div className="timeline-copy"><strong>{title}</strong><span>{text}</span></div><em>{time}</em></div>; }
function Signal({ title, detail, tone }) { return <div className="signal"><span className={`signal-icon ${tone}`}>{tone === "critical" ? "!" : tone === "warning" ? "△" : "i"}</span><div><strong>{title}</strong><span>{detail}</span></div><span className="signal-arrow">→</span></div>; }
function EvidenceCard({ tag, title, text, source, confidence, tone }) { return <article className={`evidence-card ${tone}`}><div className="card-tag">{tag}<span>{confidence}</span></div><h3>{title}</h3><p>{text}</p><div className="evidence-source"><span>◈</span>{source}</div></article>; }
function Recommendation({ title, text }) { return <div className="recommendation"><span className="recommendation-icon">✦</span><div><strong>{title}</strong><p>{text}</p></div><button>Review →</button></div>; }

export default Home;
