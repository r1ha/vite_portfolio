import React, { useState, useEffect, useMemo } from 'react'
import { BlockMath, InlineMath } from '../components/Math'

export const metadata = {
  id: 7,
  title: "An example of binomial distribution",
  category: "Statistics",
  author: "Erwan Achat",
  studentId: "2244316",
  date: "2025",
  description: "Analyzing server security scores through probabilistic attacks"
}

function computeScore(n, m, p) {
  let score = 0;
  
  for (let week = 0; week < n; week++) {
    let attacked = false;
    
    for (let attacker = 0; attacker < m; attacker++) {
      if (Math.random() < p) {
        attacked = true;
        break;
      }
    }
    
    score = attacked ? score - 1 : score + 1;
  }
  
  return score;
}

function computeBinomialScore(n, m, p) {
    const probNoAttack = Math.pow(1 - p, m);
    return n * (probNoAttack * 1 + (1 - probNoAttack) * (-1));
}

function computeRandomScore(n) {
  let score = 0;
  
  for (let week = 0; week < n; week++) {
    score = Math.random() < 0.5 ? score - 1 : score + 1;
  }
  
  return score;
}

function InteractiveScoreGraph() {
  const [m, setM] = useState(3);
  const [p, setP] = useState(0.2);
  const [maxWeeks, setMaxWeeks] = useState(100);
  const [isSimulating, setIsSimulating] = useState(false);
  const [scores, setScores] = useState([]);
  const [randomScores, setRandomScores] = useState([]);
  const [binomialScores, setBinomialScores] = useState([]);
  
  const simulateScores = () => {
    setIsSimulating(true);
    const newScores = [];
    const newRandomScores = [];
    const newBinomialScores = [];
    
    for (let n = 1; n <= maxWeeks; n++) {
      // Run multiple simulations and average for main score
      const simulations = 20;
      let totalScore = 0;
      
      for (let sim = 0; sim < simulations; sim++) {
        totalScore += computeScore(n, m, p);
      }
      
      newScores.push({
        n: n,
        score: totalScore / simulations
      });
      
      // Single random trajectory
      newRandomScores.push({
        n: n,
        score: computeRandomScore(n)
      });
      
      // Theoretical binomial score
      newBinomialScores.push({
        n: n,
        score: computeBinomialScore(n, m, p)
      });
    }
    
    setScores(newScores);
    setRandomScores(newRandomScores);
    setBinomialScores(newBinomialScores);
    setIsSimulating(false);
  };
  
  useEffect(() => {
    simulateScores();
  }, [m, p, maxWeeks]);
  
  // Calculate graph dimensions and scales
  const width = 800;
  const height = 400;
  const padding = { top: 20, right: 40, bottom: 60, left: 60 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;
  
  // Fixed scale based on maximum possible score range for n weeks
  const minScore = -maxWeeks;
  const maxScore = maxWeeks;
  
  const xScale = (n) => padding.left + (n / maxWeeks) * graphWidth;
  const yScale = (score) => padding.top + graphHeight - ((score - minScore) / (maxScore - minScore)) * graphHeight;
  
  // Generate path for the main line
  const linePath = scores.length > 0
    ? scores.map((d, i) => 
        `${i === 0 ? 'M' : 'L'} ${xScale(d.n)} ${yScale(d.score)}`
      ).join(' ')
    : '';
  
  // Generate path for the random trajectory
  const randomPath = randomScores.length > 0
    ? randomScores.map((d, i) => 
        `${i === 0 ? 'M' : 'L'} ${xScale(d.n)} ${yScale(d.score)}`
      ).join(' ')
    : '';
  
  // Generate path for the binomial (theoretical) line
  const binomialPath = binomialScores.length > 0
    ? binomialScores.map((d, i) => 
        `${i === 0 ? 'M' : 'L'} ${xScale(d.n)} ${yScale(d.score)}`
      ).join(' ')
    : '';
  
  // Calculate theoretical expected score
  const probNoAttack = Math.pow(1 - p, m);
  const expectedScorePerWeek = probNoAttack * 1 + (1 - probNoAttack) * (-1);
  
  return (
    <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold mb-6">Interactive Score Simulation</h3>
      
      {/* Controls */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Attackers (m): <span className="text-blue-600 font-semibold">{m}</span>
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={m}
            onChange={(e) => setM(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attack Probability (p): <span className="text-blue-600 font-semibold">{p.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={p}
            onChange={(e) => setP(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0.00</span>
            <span>1.00</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Weeks (n): <span className="text-blue-600 font-semibold">{maxWeeks}</span>
          </label>
          <input
            type="range"
            min="50"
            max="300"
            step="50"
            value={maxWeeks}
            onChange={(e) => setMaxWeeks(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>50</span>
            <span>1000</span>
          </div>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded-md">
          <div className="text-xs text-gray-600">Prob. No Attack</div>
          <div className="text-xl font-semibold text-blue-700">
            {(probNoAttack * 100).toFixed(1)}%
          </div>
        </div>
        <div className="bg-green-50 p-3 rounded-md">
          <div className="text-xs text-gray-600">Expected Score/Week</div>
          <div className="text-xl font-semibold text-green-700">
            {expectedScorePerWeek.toFixed(3)}
          </div>
        </div>
        <div className="bg-purple-50 p-3 rounded-md">
          <div className="text-xs text-gray-600">Final Avg. Score (n={maxWeeks})</div>
          <div className="text-xl font-semibold text-purple-700">
            {scores.length > 0 ? scores[scores.length - 1].score.toFixed(2) : '—'}
          </div>
        </div>
      </div>
      
      {/* Graph */}
      <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
        <svg width={width} height={height} className="mx-auto">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect x={padding.left} y={padding.top} width={graphWidth} height={graphHeight} fill="url(#grid)" />
          
          {/* Axes */}
          <line 
            x1={padding.left} 
            y1={padding.top + graphHeight} 
            x2={padding.left + graphWidth} 
            y2={padding.top + graphHeight} 
            stroke="#374151" 
            strokeWidth="2"
          />
          <line 
            x1={padding.left} 
            y1={padding.top} 
            x2={padding.left} 
            y2={padding.top + graphHeight} 
            stroke="#374151" 
            strokeWidth="2"
          />
          
          {/* Zero line */}
          {minScore < 0 && maxScore > 0 && (
            <line 
              x1={padding.left} 
              y1={yScale(0)} 
              x2={padding.left + graphWidth} 
              y2={yScale(0)} 
              stroke="#9ca3af" 
              strokeWidth="1.5"
              strokeDasharray="5,5"
            />
          )}
          
          {/* Random trajectory (centered, p=0.5) */}
          {randomPath && (
            <path
              d={randomPath}
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="6,4"
              opacity="0.7"
            />
          )}
          
          {/* Theoretical binomial line */}
          {binomialPath && (
            <path
              d={binomialPath}
              fill="none"
              stroke="#9333ea"
              strokeWidth="2.5"
              opacity="0.8"
            />
          )}
          
          {/* Actual simulated line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
            />
          )}
          
          {/* Points on simulated line */}
          {scores.filter((_, i) => i % 5 === 0).map((d, i) => (
            <circle
              key={i}
              cx={xScale(d.n)}
              cy={yScale(d.score)}
              r="4"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="2"
            />
          ))}
          
          {/* X-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map(fraction => {
            const n = Math.round(fraction * maxWeeks);
            return (
              <text
                key={n}
                x={xScale(n)}
                y={padding.top + graphHeight + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#6b7280"
              >
                {n >= 1000 ? `${(n/1000).toFixed(1)}k` : n}
              </text>
            );
          })}
          
          {/* Y-axis labels */}
          {(() => {
            const range = maxScore - minScore;
            const step = range > 100 ? 50 : range > 50 ? 20 : range > 20 ? 10 : 5;
            const labels = [];
            for (let s = Math.floor(minScore / step) * step; s <= maxScore; s += step) {
              labels.push(s);
            }
            return labels.map(score => (
              <text
                key={score}
                x={padding.left - 10}
                y={yScale(score) + 4}
                textAnchor="end"
                fontSize="12"
                fill="#6b7280"
              >
                {score}
              </text>
            ));
          })()}
          
          {/* Axis labels */}
          <text
            x={padding.left + graphWidth / 2}
            y={height - 10}
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="#374151"
          >
            Weeks (n)
          </text>
          
          <text
            x={padding.left - 45}
            y={padding.top + graphHeight / 2}
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="#374151"
            transform={`rotate(-90, ${padding.left - 45}, ${padding.top + graphHeight / 2})`}
          >
            Cumulative Score
          </text>
        </svg>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-blue-500"></div>
          <span className="text-gray-700">Simulated (avg of 20 runs)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-purple-600"></div>
          <span className="text-gray-700">Theoretical (binomial)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-red-500" style={{borderTop: '2px dashed #ef4444'}}></div>
          <span className="text-gray-700">Random trajectory (p=0.5)</span>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-4 text-center">
        Adjust m (attackers), p (probability), and n (weeks) to see how the score evolves over different time periods
      </p>
    </div>
  );
}

export default function Assignment7() {
  return (
    <article className="prose prose-neutral max-w-none">
      <div className="not-prose mb-8">
        <div className="text-xs text-neutral-500 uppercase tracking-wide mb-2">{metadata.category}</div>
        <h1 className="text-3xl font-semibold mb-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
          {metadata.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-neutral-600">
          <span>By {metadata.author}</span>
          <span>•</span>
          <span>{metadata.date}</span>
          <span>•</span>
          <span>Student ID: {metadata.studentId}</span>
        </div>
      </div>

      <div>
        <p className="mb-6">
          We are given a server that receives weekly security updates for n weeks and m attackers who can breach the security with a probability p. If the server is breached, score -= 1 else score += 1. Let's have a look at the cumulative score after n weeks.
        </p>

        <InteractiveScoreGraph />

        <h2 className="text-2xl font-semibold mt-12 mb-6">Analysis</h2>
        
        <p className="mb-6">
          The graph above shows how the cumulative score evolves over time. The blue line represents the average of 20 simulations, while the purple line shows the theoretical expected value based on the binomial distribution formula.
        </p>

        <p className="mb-6">
          The probability that no attack succeeds in a given week is <InlineMath>{`(1-p)^m`}</InlineMath>. Therefore, the expected score change per week is <InlineMath>{`(1-p)^m \\times 1 + (1-(1-p)^m) \\times (-1) = 2(1-p)^m - 1`}</InlineMath>. After n weeks, the theoretical score is <InlineMath>{`n \\times (2(1-p)^m - 1)`}</InlineMath>. You can observe how the simulated average (blue) converges toward the theoretical prediction (purple) as you adjust the parameters.
        </p>

      </div>
    </article>
  )
}
