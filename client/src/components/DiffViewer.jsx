import React from "react";
import ReactDiffViewer from "react-diff-viewer-continued";

const DiffViewer = ({ oldCode, newCode }) => {
  if (!oldCode || !newCode) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>🔍 Code Comparison</h2>
      <ReactDiffViewer
        oldValue={oldCode}
        newValue={newCode}
        splitView={true}
      />
    </div>
  );
};

export default DiffViewer;