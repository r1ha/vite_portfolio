import React, { useState, useEffect } from 'react'
import { BlockMath, InlineMath } from '../components/Math'

export const metadata = {
  id: 10,
  title: "Simulating the Poisson process",
  category: "Statistics",
  author: "Erwan Achat",
  studentId: "2244316",
  date: "2025",
  description: "Understanding counting processes through discrete approximation and their convergence to continuous models"
}

function PoissonSimulation() {
  const [lambda, setLambda] = useState(5);
  const [n, setN] = useState(5000);
  const [T] = useState(1);
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    const newEvents = [];
    const dt = T / n;
    const p = lambda / n;
    let eventCount = 0;

    for (let i = 0; i < n; i++) {
      if (Math.random() < p) {
        const time = (i + Math.random()) * dt;
        newEvents.push(time);
        eventCount++;
      }
    }

    setEvents(newEvents.sort((a, b) => a - b));
    setCount(eventCount);
    setIsSimulating(false);
  };

  useEffect(() => {
    runSimulation();
  }, [lambda, n]);

  // Create visualization data
  const width = 800;
  const height = 300;
  const padding = { top: 40, right: 40, bottom: 60, left: 60 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const xScale = (t) => padding.left + (t / T) * graphWidth;
  const yScale = (count) => padding.top + graphHeight - (count / (lambda * 1.5)) * graphHeight;

  // Build step function for N(t)
  const stepPath = events.length > 0
    ? events.map((t, i) => {
        const x1 = xScale(i === 0 ? 0 : events[i - 1]);
        const x2 = xScale(t);
        const y = yScale(i);
        return [
          i === 0 ? `M ${xScale(0)} ${yScale(0)}` : '',
          `L ${x2} ${y}`,
          `L ${x2} ${yScale(i + 1)}`
        ].join(' ');
      }).join(' ') + ` L ${xScale(T)} ${yScale(events.length)}`
    : `M ${xScale(0)} ${yScale(0)} L ${xScale(T)} ${yScale(0)}`;

  return (
    <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold mb-6">Interactive Poisson process simulation</h3>
      
      {/* Controls */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rate parameter λ: <span className="text-blue-600 font-semibold">{lambda}</span> events/unit time
          </label>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={lambda}
            onChange={(e) => setLambda(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>20</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of subintervals n: <span className="text-blue-600 font-semibold">{n}</span>
          </label>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>100</span>
            <span>10000</span>
          </div>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded-md">
          <div className="text-xs text-gray-600">Events observed</div>
          <div className="text-xl font-semibold text-blue-700">
            {count}
          </div>
        </div>
        <div className="bg-green-50 p-3 rounded-md">
          <div className="text-xs text-gray-600">Expected E[N(T)]</div>
          <div className="text-xl font-semibold text-green-700">
            {lambda * T}
          </div>
        </div>
        <div className="bg-purple-50 p-3 rounded-md">
          <div className="text-xs text-gray-600">Probability p = λ/n</div>
          <div className="text-xl font-semibold text-purple-700">
            {(lambda / n).toFixed(4)}
          </div>
        </div>
        <div className="bg-orange-50 p-3 rounded-md">
          <div className="text-xs text-gray-600">Inter-arrival mean</div>
          <div className="text-xl font-semibold text-orange-700">
            {count > 1 ? (T / (count - 1)).toFixed(3) : '—'}
          </div>
        </div>
      </div>
      
      {/* Graph */}
      <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
        <svg width={width} height={height} className="mx-auto">
          {/* Grid */}
          <defs>
            <pattern id="grid-poisson" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect x={padding.left} y={padding.top} width={graphWidth} height={graphHeight} fill="url(#grid-poisson)" />
          
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
          
          {/* Expected line E[N(t)] = λt */}
          <line
            x1={xScale(0)}
            y1={yScale(0)}
            x2={xScale(T)}
            y2={yScale(lambda * T)}
            stroke="#9333ea"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.6"
          />
          
          {/* Step function N(t) */}
          <path
            d={stepPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
          />
          
          {/* Event markers */}
          {events.map((t, i) => (
            <circle
              key={i}
              cx={xScale(t)}
              cy={yScale(i + 1)}
              r="3"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="1.5"
            />
          ))}
          
          {/* X-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map(fraction => (
            <text
              key={fraction}
              x={xScale(fraction * T)}
              y={padding.top + graphHeight + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
            >
              {fraction.toFixed(2)}
            </text>
          ))}
          
          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map(fraction => {
            const maxCount = Math.ceil(lambda * 1.5);
            const value = Math.round(fraction * maxCount);
            return (
              <text
                key={fraction}
                x={padding.left - 10}
                y={yScale(value) + 4}
                textAnchor="end"
                fontSize="12"
                fill="#6b7280"
              >
                {value}
              </text>
            );
          })}
          
          {/* Axis labels */}
          <text
            x={padding.left + graphWidth / 2}
            y={height - 10}
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="#374151"
          >
            Time t
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
            Count N(t)
          </text>
          
          {/* Legend text */}
          <text
            x={padding.left + 20}
            y={padding.top + 15}
            fontSize="12"
            fill="#3b82f6"
            fontWeight="600"
          >
            — N(t) (observed)
          </text>
          <text
            x={padding.left + 20}
            y={padding.top + 30}
            fontSize="12"
            fill="#9333ea"
            fontWeight="600"
          >
            - - E[N(t)] = λt
          </text>
        </svg>
      </div>
      
      <p className="text-xs text-gray-500 mt-4 text-center">
        Each simulation run generates a new realization of the counting process over [0, {T}]
      </p>
    </div>
  );
}

export default function Assignment10() {
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
          Counting processes model the accumulation of events over time and appear throughout science and engineering. The number of radioactive decays detected by a Geiger counter, customers arriving at a service queue, or earthquakes in a seismic region all follow counting process dynamics. When these events occur independently at a constant average rate, the resulting mathematical structure is the Poisson process, one of the most important stochastic processes in probability theory.
        </p>

        <p className="mb-6">
          We can understand the Poisson process through a simple discrete approximation. Consider a time interval of length <InlineMath>{`T`}</InlineMath> and divide it into <InlineMath>{`n`}</InlineMath> small subintervals of length <InlineMath>{`\\Delta t = T/n`}</InlineMath>. In each subinterval, we assume an event occurs with probability <InlineMath>{`p = \\lambda \\Delta t = \\lambda T / n`}</InlineMath>, independently of all other subintervals. The parameter <InlineMath>{`\\lambda`}</InlineMath> represents the average rate at which events occur per unit time. As we make <InlineMath>{`n`}</InlineMath> larger and the subintervals finer, this discrete model converges to a continuous Poisson process.
        </p>

        <PoissonSimulation />

        <h2 className="text-2xl font-semibold mt-12 mb-6">The discrete approximation</h2>
        
        <p className="mb-6">
          The simulation above implements this discrete approximation directly. For each of the <InlineMath>{`n`}</InlineMath> subintervals, we generate a uniform random number and compare it to <InlineMath>{`p = \\lambda/n`}</InlineMath>. When the random number falls below this threshold, we record an event at a random time within that subinterval. The blue step function shows the cumulative count <InlineMath>{`N(t)`}</InlineMath>, which increases by one each time an event occurs. The dashed purple line represents the expected count <InlineMath>{`E[N(t)] = \\lambda t`}</InlineMath>, which grows linearly with time.
        </p>

        <p className="mb-6">
          The total number of events <InlineMath>{`N(T)`}</InlineMath> observed in the interval follows approximately a Poisson distribution with parameter <InlineMath>{`\\lambda T`}</InlineMath>. To see why, note that <InlineMath>{`N(T)`}</InlineMath> equals the sum of <InlineMath>{`n`}</InlineMath> independent Bernoulli random variables, each with success probability <InlineMath>{`p = \\lambda T/n`}</InlineMath>. This sum has a binomial distribution with parameters <InlineMath>{`n`}</InlineMath> and <InlineMath>{`p`}</InlineMath>. The mean of this distribution is <InlineMath>{`np = n \\cdot (\\lambda T/n) = \\lambda T`}</InlineMath>, and its variance is <InlineMath>{`np(1-p) = \\lambda T(1 - \\lambda T/n)`}</InlineMath>, which approaches <InlineMath>{`\\lambda T`}</InlineMath> as <InlineMath>{`n \\to \\infty`}</InlineMath>.
        </p>

        <p className="mb-6">
          As <InlineMath>{`n`}</InlineMath> increases while keeping <InlineMath>{`\\lambda T`}</InlineMath> fixed, the binomial distribution converges to a Poisson distribution. This convergence follows from the Poisson limit theorem, which states that when <InlineMath>{`n \\to \\infty`}</InlineMath> and <InlineMath>{`p \\to 0`}</InlineMath> such that <InlineMath>{`np \\to \\lambda T`}</InlineMath>, we have:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`P(N(T) = k) = \\binom{n}{k} p^k (1-p)^{n-k} \\to \\frac{(\\lambda T)^k e^{-\\lambda T}}{k!}`}</BlockMath>
        </div>

        <p className="mb-6">
          This limiting distribution is the Poisson distribution with parameter <InlineMath>{`\\lambda T`}</InlineMath>. The fact that the mean and variance both equal <InlineMath>{`\\lambda T`}</InlineMath> is a characteristic property of the Poisson distribution, distinguishing it from other discrete distributions.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Properties of the Poisson process</h2>

        <p className="mb-6">
          The Poisson process has several important theoretical properties that emerge from its construction. First, it has independent increments, meaning that the number of events in disjoint time intervals are independent random variables. This follows directly from our assumption that events occur independently in different subintervals. If we count events in <InlineMath>{`[0, t_1]`}</InlineMath> and <InlineMath>{`[t_1, t_2]`}</InlineMath> where <InlineMath>{`t_1 < t_2`}</InlineMath>, these counts depend on disjoint sets of Bernoulli trials and are therefore independent.
        </p>

        <p className="mb-6">
          Second, the process has stationary increments, meaning that the distribution of the number of events in an interval depends only on the length of that interval, not on its position in time. For any interval of length <InlineMath>{`s`}</InlineMath>, the number of events follows a Poisson distribution with parameter <InlineMath>{`\\lambda s`}</InlineMath>. This stationarity reflects our assumption that the rate <InlineMath>{`\\lambda`}</InlineMath> remains constant over time. More generally, processes where <InlineMath>{`\\lambda`}</InlineMath> varies with time are called inhomogeneous Poisson processes and model situations where event rates change over time.
        </p>

        <p className="mb-6">
          Third, the inter-arrival times between consecutive events follow an exponential distribution. If we denote by <InlineMath>{`T_1, T_2, T_3, \\ldots`}</InlineMath> the times between successive events, then each <InlineMath>{`T_i`}</InlineMath> is exponentially distributed with rate <InlineMath>{`\\lambda`}</InlineMath>, meaning it has probability density function <InlineMath>{`f(t) = \\lambda e^{-\\lambda t}`}</InlineMath> for <InlineMath>{`t \\geq 0`}</InlineMath>. These inter-arrival times are independent and identically distributed. In the simulation, we can estimate the mean inter-arrival time by dividing the total time <InlineMath>{`T`}</InlineMath> by the number of gaps between events, which should approximate <InlineMath>{`1/\\lambda`}</InlineMath>.
        </p>

        <p className="mb-6">
          The memoryless property of the exponential distribution has a natural interpretation in this context. Given that no event has occurred up to time <InlineMath>{`t`}</InlineMath>, the conditional distribution of the waiting time until the next event is the same as the original unconditional distribution. Mathematically, for any <InlineMath>{`s, t \\geq 0`}</InlineMath>, we have <InlineMath>{`P(T > s + t \\mid T > t) = P(T > s)`}</InlineMath>. This property captures the idea that the process has no memory of how long we have already waited.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Interpreting the rate parameter</h2>

        <p className="mb-6">
          The rate parameter <InlineMath>{`\\lambda`}</InlineMath> has a precise operational meaning: it represents the expected number of events per unit time. Over an interval of length <InlineMath>{`t`}</InlineMath>, we expect to observe <InlineMath>{`\\lambda t`}</InlineMath> events on average. This interpretation follows immediately from the linearity of expectation applied to our discrete model. Since each subinterval contributes an expected <InlineMath>{`p = \\lambda/n`}</InlineMath> events, and we have <InlineMath>{`n`}</InlineMath> subintervals in a unit time interval, the total expected count is <InlineMath>{`n \\cdot (\\lambda/n) = \\lambda`}</InlineMath>.
        </p>

        <p className="mb-6">
          The rate parameter also appears in the distribution of waiting times. The mean time between events is <InlineMath>{`1/\\lambda`}</InlineMath>, which we can verify in the simulation by observing the average inter-arrival time statistic. If events occur at a rate of <InlineMath>{`\\lambda = 5`}</InlineMath> per unit time, we expect on average to wait <InlineMath>{`1/5 = 0.2`}</InlineMath> time units between consecutive events. Higher values of <InlineMath>{`\\lambda`}</InlineMath> correspond to more frequent events and shorter waiting times, while lower values indicate rarer events and longer waits.
        </p>

        <p className="mb-6">
          From a physical perspective, <InlineMath>{`\\lambda`}</InlineMath> characterizes the intensity of the process. In radioactive decay, it relates to the decay constant of the isotope. In queueing theory, it represents the arrival rate of customers. In telecommunications, it measures the rate of packet arrivals at a router. The universality of the Poisson process across these diverse applications stems from the fact that whenever events occur independently at a roughly constant rate, the Poisson model provides an accurate description.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Convergence and approximation quality</h2>

        <p className="mb-6">
          The quality of the discrete approximation improves as we increase <InlineMath>{`n`}</InlineMath>. With larger <InlineMath>{`n`}</InlineMath>, the probability <InlineMath>{`p = \\lambda/n`}</InlineMath> becomes smaller, making the assumption that at most one event occurs per subinterval more accurate. In the true continuous Poisson process, the probability of two or more events occurring in an infinitesimal time interval is negligible compared to the probability of exactly one event. Our discrete model achieves this property in the limit as <InlineMath>{`n \\to \\infty`}</InlineMath>.
        </p>

        <p className="mb-6">
          Formally, the discrete counting process converges to the Poisson process in distribution. This means that for any finite collection of time points <InlineMath>{`t_1, \\ldots, t_k`}</InlineMath>, the joint distribution of the counts at these times converges to the corresponding joint distribution in the Poisson process. This convergence justifies using the discrete simulation to study properties of the continuous process. Even with moderately large <InlineMath>{`n`}</InlineMath> such as 5000, the approximation is quite accurate for most practical purposes.
        </p>

        <p className="mb-6">
          The simulation demonstrates the typical sample path behavior of a Poisson process. The cumulative count function <InlineMath>{`N(t)`}</InlineMath> is a step function that jumps by one at each event time. Between events, the count remains constant. The times between jumps vary randomly, sometimes clustering together and sometimes spreading apart, but over long periods the average rate remains close to <InlineMath>{`\\lambda`}</InlineMath>. This variability is inherent to random processes and distinguishes them from deterministic growth at a constant rate.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Extensions and generalizations</h2>

        <p className="mb-6">
          The Poisson process serves as a foundation for more complex stochastic models. The compound Poisson process attaches random weights to each event, modeling situations where events have variable magnitudes. For example, in insurance mathematics, claims arrive according to a Poisson process, and each claim has a random size. The total claim amount up to time <InlineMath>{`t`}</InlineMath> is then the sum of these random weights over the Poisson-distributed number of arrivals.
        </p>

        <p className="mb-6">
          When we allow the rate parameter to vary with time, setting <InlineMath>{`\\lambda(t)`}</InlineMath> as a function rather than a constant, we obtain an inhomogeneous Poisson process. This model captures time-varying intensities, such as traffic patterns that peak during rush hours or seasonal disease incidence. The expected number of events in an interval <InlineMath>{`[s, t]`}</InlineMath> becomes <InlineMath>{`\\int_s^t \\lambda(u) \\, du`}</InlineMath>, integrating the rate function over the interval.
        </p>

        <p className="mb-6">
          In multiple dimensions, spatial Poisson processes model the random distribution of points in space. The number of points in a region <InlineMath>{`A`}</InlineMath> follows a Poisson distribution with parameter <InlineMath>{`\\lambda |A|`}</InlineMath>, where <InlineMath>{`|A|`}</InlineMath> denotes the area or volume of the region. Such models apply to the locations of trees in a forest, stars in a galaxy, or base stations in a cellular network. The independence and stationarity properties extend naturally to the spatial setting.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 my-8">
          <p className="font-semibold text-center mb-4">Key insight</p>
          <p className="text-sm text-center">
            The Poisson process emerges naturally when events occur independently at a constant rate. Its tractable mathematical properties make it the canonical model for random arrivals, providing both theoretical insights and practical approximations across diverse applications.
          </p>
        </div>

        <p className="mb-6">
          Understanding the Poisson process through discrete approximation provides intuition for its continuous formulation. The simulation reveals how random variability manifests in individual realizations while the expected behavior follows the deterministic line <InlineMath>{`\\lambda t`}</InlineMath>. This interplay between randomness and regularity characterizes much of probability theory, where individual outcomes vary unpredictably but aggregate behavior becomes increasingly predictable as we average over many trials or extend observation periods.
        </p>

      </div>
    </article>
  )
}
