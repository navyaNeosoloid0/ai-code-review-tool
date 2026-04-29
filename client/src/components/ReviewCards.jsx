import React from "react";

const Card = ({ title, items, color }) => {
  if (!items || items.length === 0) return null;

  return (
    <div style={{
      background: "#0f172a",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "12px",
      borderLeft: `4px solid ${color}`
    }}>
      <h3 style={{ color, marginBottom: "8px" }}>{title}</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i} style={{ marginBottom: "6px" }}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const ReviewCards = ({ data }) => {
  if (!data) return <p>⚡ Run a review to see results</p>;

  return (
    <div>
      <Card title="🐞 Bugs" items={data.bugs} color="#ef4444" />
      <Card title="⚡ Performance" items={data.performance} color="#f59e0b" />
      <Card title="🔒 Security" items={data.security} color="#8b5cf6" />
      <Card title="💡 Suggestions" items={data.suggestions} color="#10b981" />
    </div>
  );
};

export default ReviewCards;