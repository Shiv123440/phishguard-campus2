import React from 'react';

export default function InteractiveRadarChart({ vectors, score, severity }) {
  if (!vectors) return null;

  const metrics = [
    { key: 'phishingConfidence', label: 'Phishing Confidence', value: vectors.phishingConfidence || 10 },
    { key: 'impersonationLevel', label: 'Impersonation Level', value: vectors.impersonationLevel || 10 },
    { key: 'domainRisk', label: 'Domain Risk', value: vectors.domainRisk || 10 },
    { key: 'payloadRisk', label: 'Payload Risk', value: vectors.payloadRisk || 10 }
  ];

  const size = 250;
  const center = size / 2;
  const maxRadius = 82;
  const numAxes = metrics.length;
  const angleStep = (2 * Math.PI) / numAxes;

  const levels = [0.25, 0.5, 0.75, 1.0];

  const getCoordinates = (value, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const dataPoints = metrics.map((m, i) => getCoordinates(m.value, i));
  const polygonPoints = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  const isCritical = score >= 75;
  const isModerate = score >= 40 && score < 75;
  const strokeColor = isCritical ? '#FF365D' : isModerate ? '#F59E0B' : '#00FF9C';
  const fillColor = isCritical ? 'rgba(255, 54, 93, 0.22)' : isModerate ? 'rgba(245, 158, 11, 0.18)' : 'rgba(0, 255, 156, 0.18)';

  return (
    <div className="flex flex-col items-center justify-center p-2 relative pointer-events-auto">
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <filter id="radar-subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Concentric Grid Polygons */}
        {levels.map((level, lvlIdx) => {
          const levelPoints = metrics
            .map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const r = level * maxRadius;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            })
            .join(' ');

          return (
            <polygon
              key={`grid-${lvlIdx}`}
              points={levelPoints}
              fill="none"
              stroke="#00E5FF"
              strokeOpacity={0.1 + lvlIdx * 0.05}
              strokeWidth="1"
              strokeDasharray={lvlIdx === 3 ? 'none' : '2,2'}
            />
          );
        })}

        {/* Axis Lines */}
        {metrics.map((_, i) => {
          const end = getCoordinates(100, i);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="#00E5FF"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
          );
        })}

        {/* Animated Threat Vector Polygon */}
        <polygon
          points={polygonPoints}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          filter="url(#radar-subtle-glow)"
          className="transition-all duration-500 ease-out"
        />

        {/* Vertex Nodes */}
        {dataPoints.map((p, i) => (
          <g key={`node-${i}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill={strokeColor}
              stroke="#080D16"
              strokeWidth="1.5"
            />
          </g>
        ))}

        {/* Dimension Labels */}
        {metrics.map((m, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelDist = maxRadius + 22;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          let textAnchor = 'middle';
          if (Math.cos(angle) > 0.3) textAnchor = 'start';
          if (Math.cos(angle) < -0.3) textAnchor = 'end';

          return (
            <g key={`lbl-${i}`}>
              <text
                x={lx}
                y={ly}
                textAnchor={textAnchor}
                className="fill-slate-300 font-mono text-[9.5px] font-semibold"
                dy="0.3em"
              >
                {m.label}
              </text>
              <text
                x={lx}
                y={ly + 11}
                textAnchor={textAnchor}
                className="font-mono text-[8.5px] font-bold"
                fill={m.value > 70 ? '#FF365D' : m.value > 30 ? '#F59E0B' : '#00FF9C'}
              >
                {m.value}%
              </text>
            </g>
          );
        })}
      </svg>
      <div className="text-[10px] font-mono text-cyan-400/80 mt-1 uppercase tracking-wider">
        [Multi-Vector Heuristic Geometry]
      </div>
    </div>
  );
}
