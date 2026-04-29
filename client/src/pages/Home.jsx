import React, { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import ReviewCards from "../components/ReviewCards";
import DiffViewer from "../components/DiffViewer";
import { reviewCode } from "../services/api";

const Home = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 NEW: state for diff viewer
  const [improvedCode, setImprovedCode] = useState("");

  const handleReview = async () => {
    try {
      setLoading(true);

      const res = await reviewCode(code);
      setResult(JSON.parse(res.data.review));

      // 🔥 Demo “improvement” logic (for diff viewer)
      // Not perfect, but enough for demo
      let improved = code
        .replace(/==/g, "===")   // fix loose equality
        .replace(/=/g, "===");   // basic demo fix

      setImprovedCode(improved);

    } catch (err) {
      console.error(err);
      alert("Error reviewing code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        🚀 AI Code Review Tool
      </h1>

      {/* Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Left: Editor */}
        <div
          style={{
            background: "#1e293b",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <CodeEditor code={code} setCode={setCode} />

          <button
            onClick={handleReview}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "12px",
              background: "#3b82f6",
              border: "none",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {loading ? "Reviewing..." : "Review Code"}
          </button>
        </div>

        {/* Right: Results */}
        <div
          style={{
            background: "#1e293b",
            padding: "15px",
            borderRadius: "10px",
            overflowY: "auto",
            maxHeight: "80vh",
          }}
        >
          {loading && <p>⏳ Analyzing code...</p>}
          {!loading && <ReviewCards data={result} />}
        </div>
      </div>

      {/* 🔥 Diff Viewer Section */}
      <div style={{ marginTop: "20px" }}>
        <DiffViewer oldCode={code} newCode={improvedCode} />
      </div>
    </div>
  );
};

export default Home;