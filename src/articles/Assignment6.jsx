import React from 'react'
import { BlockMath, InlineMath } from '../components/Math'

export const metadata = {
  id: 6,
  title: "Online algorithms for mean and variance",
  category: "Statistics",
  author: "Erwan Achat",
  studentId: "2244316", 
  date: "2025",
  description: "Mathematical derivation and implementation of incremental algorithms for computing running statistics"
}

export default function Assignment6() {
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
          When processing large datasets or streaming data, traditional batch algorithms (also called offline algorithms) that require storing all values in memory become impractical. However, online algorithms update statistics incrementally as each new value arrives, using constant memory and avoiding numerical instability issues. All you need is a recurrence relationship to update running statistics with each new observation.
        </p>
        
        <h2 className="text-2xl font-semibold mt-12 mb-6">Online algorithm for the mean</h2>

        <h3 className="text-xl font-semibold mt-8 mb-4">Recurrence relationship</h3>

        <p className="mb-4">
          Let's denote the mean of the first <InlineMath>{`n`}</InlineMath> values as <InlineMath>{`\\bar{x}_n`}</InlineMath>. When we add a new value <InlineMath>{`x_{n+1}`}</InlineMath>, we want to find <InlineMath>{`\\bar{x}_{n+1}`}</InlineMath> without recalculating from scratch.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
          <p className="font-semibold mb-3">Theorem: Online Mean Update</p>
          <div className="text-center">
            <BlockMath>{`\\bar{x}_{n+1} = \\bar{x}_n + \\frac{x_{n+1} - \\bar{x}_n}{n+1}`}</BlockMath>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4">Proof</h3>

        <p className="mb-4">
          Starting from the definition of the mean:
        </p>

        <div className="bg-gray-50 p-6 my-4 rounded-lg">
          <BlockMath>{`\\bar{x}_{n+1} = \\frac{1}{n+1} \\sum_{i=1}^{n+1} x_i`}</BlockMath>
          
          <p className="my-3 text-sm text-gray-700">Separate the last term:</p>
          
          <BlockMath>{`\\bar{x}_{n+1} = \\frac{1}{n+1} \\left( \\sum_{i=1}^{n} x_i + x_{n+1} \\right)`}</BlockMath>
          
          <p className="my-3 text-sm text-gray-700">Recognize that the sum equals <InlineMath>{`n\\bar{x}_n`}</InlineMath>:</p>
          
          <BlockMath>{`\\bar{x}_{n+1} = \\frac{1}{n+1} \\left( n\\bar{x}_n + x_{n+1} \\right)`}</BlockMath>
          
          <p className="my-3 text-sm text-gray-700">Distribute:</p>
          
          <BlockMath>{`\\bar{x}_{n+1} = \\frac{n\\bar{x}_n}{n+1} + \\frac{x_{n+1}}{n+1}`}</BlockMath>
          
          <p className="my-3 text-sm text-gray-700">Add and subtract <InlineMath>{`\\bar{x}_n`}</InlineMath>:</p>
          
          <BlockMath>{`\\bar{x}_{n+1} = \\bar{x}_n + \\frac{n\\bar{x}_n}{n+1} - \\bar{x}_n + \\frac{x_{n+1}}{n+1}`}</BlockMath>
          
          <p className="my-3 text-sm text-gray-700">Simplify:</p>
          
          <BlockMath>{`\\bar{x}_{n+1} = \\bar{x}_n + \\frac{n\\bar{x}_n - (n+1)\\bar{x}_n + x_{n+1}}{n+1}`}</BlockMath>
          
          <BlockMath>{`\\bar{x}_{n+1} = \\bar{x}_n + \\frac{x_{n+1} - \\bar{x}_n}{n+1}`}</BlockMath>
        </div>

        <p className="mb-6">
          This elegant formula shows that the new mean equals the old mean plus a correction term proportional to how far the new value deviates from the current mean.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">Implementation</h3>

        <div className="bg-gray-800 text-gray-100 p-6 rounded-lg my-6 overflow-x-auto">
          <pre className="text-sm">
{`// Online algorithm for computing the mean
double mean = 0.0;
int n = 0;

void updateMean(double newValue) {
    n++;
    mean = mean + (newValue - mean) / n;
}

// Even more intuitive version but less computionally efficient
void updateMean(double newValue) {
    n++;
    mean = (mean * (n - 1)) + newValue) / n;
}
`}
          </pre>
        </div>

        <p className="mb-6">
          This implementation uses only O(1) memory (two variables) and O(1) time per update, regardless of how many values have been processed.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Online algorithm for variance</h2>

        <h3 className="text-xl font-semibold mt-8 mb-4">Welford's method</h3>

        <p className="mb-4">
          The variance formula involves squared differences from the mean. The naive approach of computing <InlineMath>{`\\sum x_i^2 - n\\bar{x}^2`}</InlineMath> suffers from catastrophic cancellation. Welford's algorithm maintains a running sum of squared deviations.
        </p>

        <p className="mb-4">
          We track <InlineMath>{`M_2`}</InlineMath>, the sum of squared differences from the current mean:
        </p>

        <div className="text-center my-4">
          <BlockMath>{`M_{2,n} = \\sum_{i=1}^{n} (x_i - \\bar{x}_n)^2`}</BlockMath>
        </div>

        <p className="mb-4">
          The sample variance is then simply:
        </p>

        <div className="text-center my-4">
          <BlockMath>{`s^2_n = \\frac{M_{2,n}}{n-1}`}</BlockMath>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-6">
          <p className="font-semibold mb-3">Theorem: Welford's Online Variance Update</p>
          <div className="text-center space-y-2">
            <BlockMath>{`\\delta = x_{n+1} - \\bar{x}_n`}</BlockMath>
            <BlockMath>{`\\bar{x}_{n+1} = \\bar{x}_n + \\frac{\\delta}{n+1}`}</BlockMath>
            <BlockMath>{`\\delta_2 = x_{n+1} - \\bar{x}_{n+1}`}</BlockMath>
            <BlockMath>{`M_{2,n+1} = M_{2,n} + \\delta \\cdot \\delta_2`}</BlockMath>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4">Proof</h3>

        <p className="mb-4">
          We need to show that:
        </p>

        <div className="bg-gray-50 p-6 my-4 rounded-lg">
          <p className="mb-3 text-sm text-gray-700">Starting point:</p>
          <BlockMath>{`M_{2,n+1} = \\sum_{i=1}^{n+1} (x_i - \\bar{x}_{n+1})^2`}</BlockMath>
          
          <p className="my-3 text-sm text-gray-700">Separate the last term:</p>
          <BlockMath>{`M_{2,n+1} = \\sum_{i=1}^{n} (x_i - \\bar{x}_{n+1})^2 + (x_{n+1} - \\bar{x}_{n+1})^2`}</BlockMath>
          
          <p className="my-3 text-sm text-gray-700">Add and subtract <InlineMath>{`\\bar{x}_n`}</InlineMath> in the sum:</p>
          <BlockMath>{`M_{2,n+1} = \\sum_{i=1}^{n} [(x_i - \\bar{x}_n) - (\\bar{x}_{n+1} - \\bar{x}_n)]^2 + (x_{n+1} - \\bar{x}_{n+1})^2`}</BlockMath>
          
          <p className="my-3 text-sm text-gray-700">Expand the square:</p>
          <BlockMath>{`M_{2,n+1} = \\sum_{i=1}^{n} (x_i - \\bar{x}_n)^2 - 2(\\bar{x}_{n+1} - \\bar{x}_n)\\sum_{i=1}^{n}(x_i - \\bar{x}_n) + n(\\bar{x}_{n+1} - \\bar{x}_n)^2 + (x_{n+1} - \\bar{x}_{n+1})^2`}</BlockMath>
          
          <p className="my-3 text-sm text-gray-700">The middle sum equals zero (sum of deviations from mean), and the first sum is <InlineMath>{`M_{2,n}`}</InlineMath>:</p>
          <BlockMath>{`M_{2,n+1} = M_{2,n} + n(\\bar{x}_{n+1} - \\bar{x}_n)^2 + (x_{n+1} - \\bar{x}_{n+1})^2`}</BlockMath>
          
          <p className="my-3 text-sm text-gray-700">Using <InlineMath>{`\\bar{x}_{n+1} - \\bar{x}_n = \\frac{x_{n+1} - \\bar{x}_n}{n+1} = \\frac{\\delta}{n+1}`}</InlineMath>:</p>
          <BlockMath>{`M_{2,n+1} = M_{2,n} + \\frac{n\\delta^2}{(n+1)^2} + \\delta_2^2`}</BlockMath>
          
          <p className="my-3 text-sm text-gray-700">Note that <InlineMath>{`\\delta_2 = x_{n+1} - \\bar{x}_{n+1} = \\delta - \\frac{\\delta}{n+1} = \\frac{n\\delta}{n+1}`}</InlineMath>:</p>
          <BlockMath>{`M_{2,n+1} = M_{2,n} + \\frac{n\\delta^2}{(n+1)^2} + \\frac{n^2\\delta^2}{(n+1)^2}`}</BlockMath>
          
          <BlockMath>{`M_{2,n+1} = M_{2,n} + \\frac{n\\delta^2(1 + n)}{(n+1)^2} = M_{2,n} + \\frac{n\\delta^2}{n+1}`}</BlockMath>
          
          <p className="my-3 text-sm text-gray-700">Which can be rewritten as:</p>
          <BlockMath>{`M_{2,n+1} = M_{2,n} + \\delta \\cdot \\delta_2`}</BlockMath>
        </div>

        <p className="mb-6">
          This algorithm is numerically stable because it never subtracts large numbers and doesn't accumulate rounding errors.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">Implementation (Welford's algorithm)</h3>

        <div className="bg-gray-800 text-gray-100 p-6 rounded-lg my-6 overflow-x-auto">
          <pre className="text-sm">
{`// Welford's online algorithm for variance
double mean = 0.0;
double M2 = 0.0;   // Sum of squared differences from mean
int n = 0;

void updateVariance(double newValue) {
    n++;
    double delta = newValue - mean;
    mean = mean + delta / n;
    double delta2 = newValue - mean;
    M2 = M2 + delta * delta2;
}

double getVariance() {
    if (n < 2) return 0.0;
    return M2 / (n - 1);  // Sample variance
}

double getStdDev() {
    return sqrt(getVariance());
}

// Example of usage:
// updateVariance(10.0);  // n=1, mean=10.0, M2=0.0
// updateVariance(20.0);  // n=2, mean=15.0, M2=50.0
// updateVariance(30.0);  // n=3, mean=20.0, M2=200.0
// getVariance();         // Returns 100.0
// getStdDev();           // Returns 10.0`}
          </pre>
        </div>

        <p className="mb-6">
          Welford's algorithm maintains three values (n, mean, M₂) and updates them in O(1) time per observation. The variance can be computed at any time from M₂.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Advantages of online algorithms</h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
          <h4 className="font-semibold mb-3">Comparison: Batch vs Online</h4>
          
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left p-2">Aspect</th>
                  <th className="text-left p-2">Batch Algorithm</th>
                  <th className="text-left p-2">Online Algorithm</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-2 font-semibold">Memory</td>
                  <td className="p-2">O(n) - stores all values</td>
                  <td className="p-2 text-green-700">O(1) - constant memory</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 font-semibold">Update cost</td>
                  <td className="p-2">O(n) - recalculate all</td>
                  <td className="p-2 text-green-700">O(1) - single update</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 font-semibold">Numerical stability</td>
                  <td className="p-2">Poor - cancellation errors</td>
                  <td className="p-2 text-green-700">Excellent - no cancellation</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 font-semibold">Streaming support</td>
                  <td className="p-2">No - needs all data</td>
                  <td className="p-2 text-green-700">Yes - processes on arrival</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Implementation</td>
                  <td className="p-2">Simple</td>
                  <td className="p-2">Requires derivation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="mb-6">
          Online algorithms are essential tools in modern data processing. They provide accurate results with minimal resources and form the foundation for many streaming analytics systems. This shows that proper mathematical analysis can lead to better algorithms.
        </p>

      </div>
    </article>
  )
}