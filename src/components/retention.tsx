"use client";
import { useState } from "react";
import data from "@/data/retention.json";
const colors = ["#5231B5", "#FF704A", "#261841"];
export function Retention() {
  const [enabled, setEnabled] = useState([true, true, true]);
  return (
    <div className="retention">
      <div className="chart-legend">
        {data.map((s, i) => (
          <button
            key={s.D}
            aria-pressed={enabled[i]}
            onClick={() =>
              setEnabled((v) => v.map((b, j) => (j === i ? !b : b)))
            }
          >
            <span style={{ background: enabled[i] ? colors[i] : "#aaa" }} />
            {s.D}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 1000 400"
        role="img"
        aria-label="Original retention data for Erase, Bullet, and CutRope over levels 1 to 100"
      >
        <title>Retention Graphs</title>
        {[0, 25, 50, 75, 100].map((n) => (
          <g key={n}>
            <line
              x1="55"
              x2="975"
              y1={350 - n * 3}
              y2={350 - n * 3}
              stroke="#e2e8f0"
              strokeOpacity="1"
            />
            <text x="0" y={355 - n * 3} fontSize="15" fill="currentColor">
              {n}%
            </text>
          </g>
        ))}
        {data.map(
          (s, i) =>
            enabled[i] && (
              <polyline
                key={s.D}
                fill="none"
                stroke={colors[i]}
                strokeWidth="3"
                points={s.A.map((v, j) =>
                  v ? `${55 + j * 9.2},${350 - Number(v) * 3}` : "",
                )
                  .filter(Boolean)
                  .join(" ")}
              />
            ),
        )}
        {[1, 25, 50, 75, 100].map((n) => (
          <text
            key={n}
            x={55 + (n - 1) * 9.2}
            y="385"
            fontSize="15"
            fill="currentColor"
          >
            {n}
          </text>
        ))}
      </svg>
      <span className="mono">LEVEL</span>
      <details>
        <summary>View original data</summary>
        <div className="table-scroll">
          <table>
            <caption>Original portfolio retention values (%)</caption>
            <thead>
              <tr>
                <th>Level</th>
                {data.map((s) => (
                  <th key={s.D}>{s.D}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 100 }, (_, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  {data.map((s) => (
                    <td key={s.D}>{s.A[i] || "—"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
