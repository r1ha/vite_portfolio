import React, { useState, useEffect } from 'react'
import { BlockMath, InlineMath } from '../components/Math'

export const metadata = {
  id: 11,
  title: "Simulating stochastic differential equations",
  category: "Statistics",
  author: "Erwan Achat",
  studentId: "2244316",
  date: "2025",
  description: "Numerical methods for Brownian motion and general SDEs using the Euler-Maruyama scheme"
}

function SDESimulator() {
  const [processType, setProcessType] = useState('brownian');
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [theta, setTheta] = useState(0.5);
  const [T, setT] = useState(1);
  const [n, setN] = useState(1000);
  const [numPaths, setNumPaths] = useState(5);
  const [paths, setPaths] = useState([]);

  const eulerMaruyama = (drift, diffusion, X0, T, n) => {
    const dt = T / n;
    const sqrtDt = Math.sqrt(dt);
    const path = new Array(n + 1);
    path[0] = { t: 0, x: X0 };
    
    let X = X0;
    for (let i = 1; i <= n; i++) {
      const dW = sqrtDt * randn();
      const t = (i - 1) * dt;
      X = X + drift(X, t) * dt + diffusion(X, t) * dW;
      path[i] = { t: i * dt, x: X };
    }
    
    return path;
  };

  const randn = () => {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  };

  const getProcessParams = () => {
    switch(processType) {
      case 'brownian':
        return {
          drift: (X, t) => 0,
          diffusion: (X, t) => 1,
          X0: 0,
          name: 'Standard Brownian motion',
          equation: 'dX_t = dW_t'
        };
      case 'drift':
        return {
          drift: (X, t) => mu,
          diffusion: (X, t) => sigma,
          X0: 0,
          name: 'Brownian motion with drift',
          equation: `dX_t = ${mu} dt + ${sigma} dW_t`
        };
      case 'gbm':
        return {
          drift: (X, t) => mu * X,
          diffusion: (X, t) => sigma * X,
          X0: 1,
          name: 'Geometric Brownian motion',
          equation: `dX_t = ${mu} X_t dt + ${sigma} X_t dW_t`
        };
      case 'ou':
        return {
          drift: (X, t) => theta * (mu - X),
          diffusion: (X, t) => sigma,
          X0: mu,
          name: 'Ornstein-Uhlenbeck process',
          equation: `dX_t = ${theta}(${mu} - X_t) dt + ${sigma} dW_t`
        };
      default:
        return getProcessParams();
    }
  };

  const runSimulation = () => {
    const { drift, diffusion, X0 } = getProcessParams();
    const newPaths = [];
    
    for (let i = 0; i < numPaths; i++) {
      newPaths.push(eulerMaruyama(drift, diffusion, X0, T, n));
    }
    
    setPaths(newPaths);
  };

  useEffect(() => {
    runSimulation();
  }, [processType, mu, sigma, theta, T, n, numPaths]);

  const width = 800;
  const height = 400;
  const padding = { top: 40, right: 40, bottom: 60, left: 60 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const allValues = paths.flat().map(p => p.x);
  const minX = Math.min(...allValues, -1);
  const maxX = Math.max(...allValues, 1);
  const range = maxX - minX;
  const yMin = minX - 0.1 * range;
  const yMax = maxX + 0.1 * range;

  const xScale = (t) => padding.left + (t / T) * graphWidth;
  const yScale = (x) => padding.top + graphHeight - ((x - yMin) / (yMax - yMin)) * graphHeight;

  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  const { name, equation } = getProcessParams();

  return (
    <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold mb-6">Euler-Maruyama SDE simulator</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Process type: <span className="text-blue-600 font-semibold">{name}</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setProcessType('brownian')}
            className={`px-4 py-2 rounded ${processType === 'brownian' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Standard Brownian
          </button>
          <button
            onClick={() => setProcessType('drift')}
            className={`px-4 py-2 rounded ${processType === 'drift' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            With drift
          </button>
          <button
            onClick={() => setProcessType('gbm')}
            className={`px-4 py-2 rounded ${processType === 'gbm' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Geometric BM
          </button>
          <button
            onClick={() => setProcessType('ou')}
            className={`px-4 py-2 rounded ${processType === 'ou' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Ornstein-Uhlenbeck
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center font-mono">{equation}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {processType !== 'brownian' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Drift parameter μ: <span className="text-blue-600 font-semibold">{mu.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={mu}
              onChange={(e) => setMu(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}
        
        {processType !== 'brownian' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Volatility σ: <span className="text-blue-600 font-semibold">{sigma.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={sigma}
              onChange={(e) => setSigma(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}
        
        {processType === 'ou' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mean reversion θ: <span className="text-blue-600 font-semibold">{theta.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={theta}
              onChange={(e) => setTheta(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time horizon T: <span className="text-blue-600 font-semibold">{T}</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={T}
            onChange={(e) => setT(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time steps n: <span className="text-blue-600 font-semibold">{n}</span>
          </label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of paths: <span className="text-blue-600 font-semibold">{numPaths}</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={numPaths}
            onChange={(e) => setNumPaths(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
        <svg width={width} height={height} className="mx-auto">
          <defs>
            <pattern id="grid-sde" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect x={padding.left} y={padding.top} width={graphWidth} height={graphHeight} fill="url(#grid-sde)" />
          
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
          
          <line 
            x1={padding.left} 
            y1={yScale(0)} 
            x2={padding.left + graphWidth} 
            y2={yScale(0)} 
            stroke="#9ca3af" 
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          
          {paths.map((path, pathIdx) => {
            const pathStr = path.map((p, i) => 
              `${i === 0 ? 'M' : 'L'} ${xScale(p.t)} ${yScale(p.x)}`
            ).join(' ');
            
            return (
              <path
                key={pathIdx}
                d={pathStr}
                fill="none"
                stroke={colors[pathIdx % colors.length]}
                strokeWidth="2"
                opacity="0.7"
              />
            );
          })}
          
          {[0, 0.25, 0.5, 0.75, 1].map(fraction => (
            <text
              key={fraction}
              x={xScale(fraction * T)}
              y={padding.top + graphHeight + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
            >
              {(fraction * T).toFixed(2)}
            </text>
          ))}
          
          {(() => {
            const ticks = 5;
            const step = (yMax - yMin) / (ticks - 1);
            return Array.from({ length: ticks }, (_, i) => {
              const value = yMin + i * step;
              return (
                <text
                  key={i}
                  x={padding.left - 10}
                  y={yScale(value) + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="#6b7280"
                >
                  {value.toFixed(2)}
                </text>
              );
            });
          })()}
          
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
            X(t)
          </text>
        </svg>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-blue-50 p-3 rounded-md">
          <div className="text-xs text-gray-600">Time step Δt</div>
          <div className="text-lg font-semibold text-blue-700">
            {(T / n).toFixed(4)}
          </div>
        </div>
        <div className="bg-green-50 p-3 rounded-md">
          <div className="text-xs text-gray-600">Final values range</div>
          <div className="text-lg font-semibold text-green-700">
            [{paths.length > 0 ? Math.min(...paths.map(p => p[p.length - 1].x)).toFixed(2) : '—'}, 
             {paths.length > 0 ? Math.max(...paths.map(p => p[p.length - 1].x)).toFixed(2) : '—'}]
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Simulation uses the Euler-Maruyama method with time discretization Δt = T/n
      </p>
    </div>
  );
}

export default function Assignment11() {
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
          Stochastic differential equations provide the mathematical framework for modeling systems evolving under the influence of random noise. These equations appear throughout science and finance, describing phenomena from molecular diffusion to stock price dynamics. Unlike ordinary differential equations, which evolve deterministically, stochastic differential equations incorporate a random component through the Wiener process, also known as Brownian motion. This randomness captures the inherent unpredictability in many natural and economic processes.
        </p>

        <p className="mb-6">
          The Wiener process, denoted <InlineMath>{`W_t`}</InlineMath>, serves as the foundation for continuous-time stochastic modeling. It represents the mathematical idealization of a random walk in continuous time, where infinitesimal increments are independent and normally distributed. Robert Brown first observed the erratic motion of pollen particles suspended in water in 1827, and Norbert Wiener formalized its rigorous mathematical construction in 1923. The process satisfies three defining properties: it starts at zero, has independent increments, and exhibits increments <InlineMath>{`W_t - W_s`}</InlineMath> that follow a normal distribution with mean zero and variance <InlineMath>{`t - s`}</InlineMath> for any <InlineMath>{`t > s`}</InlineMath>.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">The Euler-Maruyama method</h2>
        
        <p className="mb-6">
          Analytical solutions to stochastic differential equations exist only in special cases, necessitating numerical methods for practical applications. The Euler-Maruyama method extends the classical Euler method for ordinary differential equations to the stochastic setting. Consider a general stochastic differential equation of the form:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`dX_t = a(X_t, t) \\, dt + b(X_t, t) \\, dW_t`}</BlockMath>
        </div>

        <p className="mb-6">
          Here <InlineMath>{`a(X_t, t)`}</InlineMath> represents the drift coefficient, describing the deterministic trend of the process, while <InlineMath>{`b(X_t, t)`}</InlineMath> denotes the diffusion coefficient, controlling the magnitude of random fluctuations. The term <InlineMath>{`dW_t`}</InlineMath> represents an infinitesimal increment of the Wiener process. In integral form, this equation becomes:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`X_t = X_0 + \\int_0^t a(X_s, s) \\, ds + \\int_0^t b(X_s, s) \\, dW_s`}</BlockMath>
        </div>

        <p className="mb-6">
          The Euler-Maruyama method discretizes this continuous process. We partition the time interval <InlineMath>{`[0, T]`}</InlineMath> into <InlineMath>{`n`}</InlineMath> equal subintervals of length <InlineMath>{`\\Delta t = T/n`}</InlineMath>. At each time step, we approximate the integrals using their simplest quadrature rules. The drift integral becomes a simple Riemann sum, while the stochastic integral requires sampling from the distribution of Wiener increments. Since <InlineMath>{`W_{t+\\Delta t} - W_t`}</InlineMath> follows a normal distribution with variance <InlineMath>{`\\Delta t`}</InlineMath>, we can write <InlineMath>{`\\Delta W = \\sqrt{\\Delta t} \\, Z`}</InlineMath> where <InlineMath>{`Z`}</InlineMath> is a standard normal random variable.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 overflow-x-auto">
          <p className="font-semibold mb-4 text-center">Euler-Maruyama scheme</p>
          <div className="text-center">
            <BlockMath>{`X_{i+1} = X_i + a(X_i, t_i) \\Delta t + b(X_i, t_i) \\sqrt{\\Delta t} \\, Z_i`}</BlockMath>
          </div>
          <p className="text-xs text-center mt-4">where <InlineMath>{`Z_i \\sim N(0,1)`}</InlineMath> are independent standard normal random variables</p>
        </div>

        <p className="mb-6">
          This scheme has strong convergence order 0.5, meaning that the expected value of the squared error decreases like <InlineMath>{`\\Delta t`}</InlineMath> as we refine the time step. While slower than the linear convergence of the deterministic Euler method, this rate is optimal for general stochastic differential equations without additional regularity assumptions. The method's simplicity and ease of implementation make it the standard choice for many applications despite the existence of higher-order schemes.
        </p>

        <SDESimulator />

        <h2 className="text-2xl font-semibold mt-12 mb-6">Standard Brownian motion</h2>

        <p className="mb-6">
          The simplest stochastic differential equation describes standard Brownian motion itself. The equation <InlineMath>{`dX_t = dW_t`}</InlineMath> has zero drift and unit diffusion, meaning <InlineMath>{`a(X_t, t) = 0`}</InlineMath> and <InlineMath>{`b(X_t, t) = 1`}</InlineMath>. The solution is trivially <InlineMath>{`X_t = W_t`}</InlineMath>, so simulating this process directly tests our implementation of the Wiener increment generation. The Euler-Maruyama update reduces to <InlineMath>{`X_{i+1} = X_i + \\sqrt{\\Delta t} \\, Z_i`}</InlineMath>, which is exactly the definition of discrete-time Brownian motion.
        </p>

        <p className="mb-6">
          The sample paths of Brownian motion exhibit characteristic properties visible in the simulation. The process wanders unpredictably, sometimes venturing far from the origin and sometimes returning close to zero. The paths are continuous but nowhere differentiable, appearing jagged at all scales. Over time, the variance grows linearly: <InlineMath>{`\\text{Var}(W_t) = t`}</InlineMath>. This means the typical distance from the origin grows like <InlineMath>{`\\sqrt{t}`}</InlineMath>, a scaling property fundamental to diffusion processes. Multiple sample paths starting from the same point diverge quickly, illustrating the sensitivity to the random driving noise.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Brownian motion with drift</h2>

        <p className="mb-6">
          Adding a constant drift term <InlineMath>{`\\mu`}</InlineMath> gives the equation <InlineMath>{`dX_t = \\mu \\, dt + \\sigma \\, dW_t`}</InlineMath>. The drift parameter <InlineMath>{`\\mu`}</InlineMath> imparts a systematic tendency for the process to increase or decrease, while the volatility <InlineMath>{`\\sigma`}</InlineMath> controls the magnitude of random fluctuations. The solution is <InlineMath>{`X_t = X_0 + \\mu t + \\sigma W_t`}</InlineMath>, combining linear deterministic growth with Brownian noise. The mean follows <InlineMath>{`E[X_t] = X_0 + \\mu t`}</InlineMath> and the variance grows as <InlineMath>{`\\text{Var}(X_t) = \\sigma^2 t`}</InlineMath>.
        </p>

        <p className="mb-6">
          This model captures the essential features of many physical diffusion processes. Positive drift causes the process to trend upward despite random fluctuations, while negative drift pulls it downward. The competition between drift and diffusion determines long-term behavior. When simulating multiple paths, we observe them fanning out over time around the deterministic trajectory <InlineMath>{`\\mu t`}</InlineMath>. The spread increases with the volatility parameter, quantifying how much random noise affects the system relative to the deterministic trend.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Geometric Brownian motion</h2>

        <p className="mb-6">
          Geometric Brownian motion, defined by <InlineMath>{`dX_t = \\mu X_t \\, dt + \\sigma X_t \\, dW_t`}</InlineMath>, introduces state-dependent coefficients where both drift and diffusion scale proportionally to the current value. This equation famously models stock prices in the Black-Scholes framework, where percentage returns rather than absolute changes follow a normal distribution. The process remains positive if it starts positive, a crucial property for modeling quantities like prices that cannot go negative.
        </p>

        <p className="mb-6">
          The analytical solution takes the form <InlineMath>{`X_t = X_0 \\exp\\left((\\mu - \\sigma^2/2)t + \\sigma W_t\\right)`}</InlineMath>, revealing that <InlineMath>{`X_t`}</InlineMath> has a log-normal distribution. The factor <InlineMath>{`\\mu - \\sigma^2/2`}</InlineMath> appears due to Itô's lemma, which accounts for the second-order effects of stochastic calculus. The mean grows exponentially as <InlineMath>{`E[X_t] = X_0 e^{\\mu t}`}</InlineMath>, while the variance grows even faster. Sample paths exhibit exponential growth or decay with superimposed multiplicative noise, creating the characteristic volatility clustering observed in financial markets.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Ornstein-Uhlenbeck process</h2>

        <p className="mb-6">
          The Ornstein-Uhlenbeck process, governed by <InlineMath>{`dX_t = \\theta(\\mu - X_t) \\, dt + \\sigma \\, dW_t`}</InlineMath>, introduces mean reversion through its state-dependent drift. When <InlineMath>{`X_t`}</InlineMath> exceeds the long-run mean <InlineMath>{`\\mu`}</InlineMath>, the drift becomes negative, pulling the process back toward <InlineMath>{`\\mu`}</InlineMath>. Conversely, when <InlineMath>{`X_t`}</InlineMath> falls below <InlineMath>{`\\mu`}</InlineMath>, the positive drift pushes it upward. The parameter <InlineMath>{`\\theta`}</InlineMath> controls the speed of mean reversion: larger values cause faster return to equilibrium.
        </p>

        <p className="mb-6">
          This process models phenomena where random fluctuations perturb a system away from equilibrium, but restoring forces prevent unlimited wandering. Applications range from particle velocities in fluids to interest rates in financial mathematics. The process has a stationary distribution that is normal with mean <InlineMath>{`\\mu`}</InlineMath> and variance <InlineMath>{`\\sigma^2/(2\\theta)`}</InlineMath>. Unlike standard Brownian motion, which has variance growing without bound, the Ornstein-Uhlenbeck process reaches a balance between random perturbations and mean reversion, maintaining finite variance in the long run.
        </p>

        <p className="mb-6">
          The analytical solution can be written explicitly, showing how initial conditions fade exponentially:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`X_t = \\mu + (X_0 - \\mu)e^{-\\theta t} + \\sigma \\int_0^t e^{-\\theta(t-s)} \\, dW_s`}</BlockMath>
        </div>

        <p className="mb-6">
          The exponential decay term <InlineMath>{`e^{-\\theta t}`}</InlineMath> shows that the influence of the initial condition <InlineMath>{`X_0`}</InlineMath> diminishes over time, while the stochastic integral accumulates random shocks weighted by how recently they occurred. This creates the characteristic behavior visible in simulations: paths that start away from <InlineMath>{`\\mu`}</InlineMath> gradually drift back, fluctuating around the mean rather than wandering arbitrarily far.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Convergence and accuracy</h2>

        <p className="mb-6">
          The accuracy of the Euler-Maruyama method depends critically on the time step <InlineMath>{`\\Delta t`}</InlineMath>. As we increase the number of steps <InlineMath>{`n`}</InlineMath>, the approximation converges to the true solution of the stochastic differential equation. The strong convergence property means that individual sample paths converge, not just their distributions. For smooth coefficients <InlineMath>{`a`}</InlineMath> and <InlineMath>{`b`}</InlineMath>, the expected squared error satisfies:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`E[|X_T - X_T^n|^2] \\leq C \\Delta t`}</BlockMath>
        </div>

        <p className="mb-6">
          where <InlineMath>{`X_T^n`}</InlineMath> denotes the numerical approximation using <InlineMath>{`n`}</InlineMath> steps and <InlineMath>{`C`}</InlineMath> is a constant depending on the coefficients and time horizon. This order-0.5 strong convergence reflects the irregular nature of Brownian paths. Weak convergence, which concerns only the distributions rather than individual paths, achieves order 1, meaning <InlineMath>{`|E[f(X_T)] - E[f(X_T^n)]| \\leq C\\Delta t`}</InlineMath> for sufficiently smooth test functions <InlineMath>{`f`}</InlineMath>.
        </p>

        <p className="mb-6">
          Higher-order methods exist for specialized applications where computational cost justifies their complexity. The Milstein method achieves strong order 1 by including correction terms involving derivatives of the diffusion coefficient. The stochastic Runge-Kutta methods extend classical Runge-Kutta schemes to stochastic equations, though they require multiple evaluations of the Wiener increment, complicating their implementation. For most practical purposes, the Euler-Maruyama method offers the best balance of simplicity, reliability, and computational efficiency.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Extensions and applications</h2>

        <p className="mb-6">
          The framework extends naturally to systems of coupled stochastic differential equations, where multiple processes interact. In mathematical finance, multi-asset models use vector-valued processes with correlated Wiener components to capture co-movement in different securities. The correlation structure enters through the covariance matrix of the driving noise terms. The Euler-Maruyama method generalizes straightforwardly: we simulate each component using its own drift and diffusion, but generate the random increments from a multivariate normal distribution with the appropriate correlation structure.
        </p>

        <p className="mb-6">
          Jump-diffusion models combine continuous Brownian motion with discontinuous jumps, described by Poisson processes. These capture sudden regime changes or extreme events not well-modeled by continuous diffusion alone. The generalized equation takes the form <InlineMath>{`dX_t = a(X_t,t)dt + b(X_t,t)dW_t + c(X_t,t)dN_t`}</InlineMath>, where <InlineMath>{`N_t`}</InlineMath> is a Poisson process. Simulation requires combining the Euler-Maruyama scheme with Poisson event generation, checking at each time step whether a jump occurs and updating the state accordingly.
        </p>

        <p className="mb-6">
          Stochastic differential equations with state-dependent boundaries arise in barrier options and other financial derivatives. When the process hits a specified boundary, it may be absorbed, reflected, or reset to a different value. Implementing these conditions in the numerical scheme requires checking at each time step whether the boundary has been crossed and applying the appropriate action. More sophisticated schemes detect boundary crossings between time steps using interpolation, preventing the process from jumping across thin barriers undetected.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 my-8">
          <p className="font-semibold text-center mb-4">Practical insight</p>
          <p className="text-sm text-center">
            The Euler-Maruyama method transforms abstract stochastic differential equations into concrete numerical algorithms. By discretizing time and approximating stochastic integrals with random samples, we can simulate complex random processes on a computer, enabling Monte Carlo methods for option pricing, risk assessment, and scientific modeling where analytical solutions are unavailable.
          </p>
        </div>

        <p className="mb-6">
          Understanding these numerical methods bridges the gap between theoretical probability and computational practice. The simulator demonstrates how different stochastic processes behave under various parameter regimes, building intuition for their properties. In applications, these simulations form the basis of Monte Carlo methods, where thousands of sample paths are generated to estimate expectations, quantiles, and other statistical quantities that characterize the random evolution of complex systems.
        </p>

      </div>
    </article>
  )
}
