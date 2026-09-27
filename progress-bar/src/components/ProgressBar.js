import React, { useState } from "react";

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  const updateProgress = (delta) => {
    setProgress((prev) => Math.max(0, Math.min(100, prev + delta)));
  };

  const getBarColor = () => {
    if (progress >= 80) return "green";
    if (progress >= 40) return "orange";
    return "red";
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Progress Bar</h2>
      <div
        style={{
          height: "25px",
          backgroundColor: "#ddd",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: getBarColor(),
            transition: "width 0.3s ease-in-out",
          }}
          id="testBgColor"
        />
        <span
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {progress}%
        </span>
      </div>
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => updateProgress(-10)}>-10%</button>
        <button
          onClick={() => updateProgress(+10)}
          style={{ marginLeft: "10px" }}
        >
          +10%
        </button>
      </div>
    </div>
  );
}

export default ProgressBar;
