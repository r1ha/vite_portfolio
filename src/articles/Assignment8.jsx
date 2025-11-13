import React from 'react'
import { BlockMath, InlineMath } from '../components/Math'

export const metadata = {
  id: 8,
  title: "Connecting Bernoulli processes and binomial distributions",
  category: "Statistics",
  author: "Erwan Achat",
  studentId: "2244316",
  date: "2025",
  description: "Exploring the mathematical relationships between Bernoulli trials, binomial distributions, and combinatorial structures"
}

function PascalTriangle() {
  const rows = [
    [1],
    [1, 1],
    [1, 2, 1],
    [1, 3, 3, 1],
    [1, 4, 6, 4, 1],
    [1, 5, 10, 10, 5, 1],
    [1, 6, 15, 20, 15, 6, 1],
    [1, 7, 21, 35, 35, 21, 7, 1]
  ];

  return (
    <div className="not-prose bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-8 my-8">
      <h3 className="text-lg font-semibold mb-6 text-center text-purple-900">Pascal's Triangle</h3>
      <div className="flex flex-col items-center space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex space-x-3">
            {row.map((num, j) => (
              <div
                key={j}
                className="w-12 h-12 flex items-center justify-center bg-white border-2 border-purple-300 rounded-lg font-semibold text-purple-700 shadow-sm"
              >
                {num}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-600 mt-6 text-center">
        Each number is the sum of the two numbers above it: <InlineMath>{`\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}`}</InlineMath>
      </p>
    </div>
  );
}

function FibonacciConnection() {
  const rows = [
    { n: 0, values: [1], fib: 1, color: 'bg-yellow-100 border-yellow-400' },
    { n: 1, values: [1, 1], fib: 1, color: 'bg-yellow-100 border-yellow-400' },
    { n: 2, values: [1, 2, 1], fib: 2, color: 'bg-orange-100 border-orange-400' },
    { n: 3, values: [1, 3, 3, 1], fib: 3, color: 'bg-red-100 border-red-400' },
    { n: 4, values: [1, 4, 6, 4, 1], fib: 5, color: 'bg-pink-100 border-pink-400' },
    { n: 5, values: [1, 5, 10, 10, 5, 1], fib: 8, color: 'bg-purple-100 border-purple-400' }
  ];

  return (
    <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold mb-4 text-center">Fibonacci sequence in Pascal's triangle</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="p-2 text-left">Row n</th>
              <th className="p-2 text-left">Binomial coefficients</th>
              <th className="p-2 text-left">Diagonal sum</th>
              <th className="p-2 text-left">Fibonacci F<sub>n+1</sub></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={`border-b border-gray-200 ${row.color}`}>
                <td className="p-2 font-semibold">{row.n}</td>
                <td className="p-2 font-mono">[{row.values.join(', ')}]</td>
                <td className="p-2 text-center font-semibold text-blue-700">
                  {row.values.reduce((a, b, idx) => {
                    if (row.n - idx >= 0 && idx <= Math.floor(row.n / 2)) {
                      return a + b;
                    }
                    return a;
                  }, 0)}
                </td>
                <td className="p-2 text-center font-bold text-green-700">{row.fib}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        The sum of diagonal entries in Pascal's triangle produces the Fibonacci sequence
      </p>
    </div>
  );
}

export default function Assignment8() {
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
          In Assignment 4, we explored the law of large numbers through card drawing experiments, demonstrating how sample proportions converge to theoretical probabilities. In Assignment 7, we analyzed server security scores using a binomial framework where multiple attackers attempt breaches each week. While these appear as different problems, they share a common mathematical foundation: the Bernoulli process. This assignment examines the deep connections between these concepts and their relationship to fundamental combinatorial structures.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Similarities between assignments 4 and 7</h2>
        
        <p className="mb-6">
          Both assignments fundamentally rely on <strong>independent Bernoulli trials</strong>. In Assignment 4, each card draw is a Bernoulli trial with probability <InlineMath>{`p = 0.25`}</InlineMath> of drawing a heart. In Assignment 7, each attacker's attempt is a Bernoulli trial with probability <InlineMath>{`p`}</InlineMath> of successful breach. The independence of trials is crucial in both cases.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
          <p className="font-semibold mb-2">Bernoulli trial</p>
          <p className="text-sm mb-4">A random experiment with exactly two outcomes: success (probability <InlineMath>{`p`}</InlineMath>) and failure (probability <InlineMath>{`1-p`}</InlineMath>)</p>
          <div className="text-center">
            <BlockMath>{`X \\sim \\text{Bernoulli}(p) \\quad \\Rightarrow \\quad P(X=1) = p, \\; P(X=0) = 1-p`}</BlockMath>
          </div>
        </div>

        <p className="mb-6">
          Both assignments demonstrate the <strong>law of large numbers</strong>. In Assignment 4, we showed that the sample proportion of hearts converges to 0.25 as the number of draws increases. In Assignment 7, the simulated average score (blue line) converges to the theoretical binomial expectation (purple line) as <InlineMath>{`n`}</InlineMath> grows large.
        </p>

        <p className="mb-6">
          The expected values in both cases follow the same principle. If <InlineMath>{`X_i`}</InlineMath> are independent Bernoulli trials, then:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`E\\left[\\frac{1}{n}\\sum_{i=1}^{n} X_i\\right] = \\frac{1}{n} \\sum_{i=1}^{n} E[X_i] = \\frac{1}{n} \\cdot n \\cdot p = p`}</BlockMath>
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Key differences in structure</h2>

        <p className="mb-6">
          While Assignment 4 focuses on a <strong>single Bernoulli process</strong> (one card per draw), Assignment 7 involves a <strong>compound process</strong> where each week contains <InlineMath>{`m`}</InlineMath> independent Bernoulli trials (multiple attackers). The weekly outcome depends on whether <em>at least one</em> attacker succeeds.
        </p>

        <p className="mb-6">
          This transforms the problem into a binomial distribution question. The probability that no attacker succeeds in a given week is:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`P(\\text{no success}) = (1-p)^m`}</BlockMath>
        </div>

        <p className="mb-6">
          Therefore, the probability of at least one success is <InlineMath>{`1-(1-p)^m`}</InlineMath>. This creates a new effective Bernoulli process at the weekly level, with a transformed probability parameter.
        </p>

        <p className="mb-6">
          Another key difference is in the <strong>scoring mechanism</strong>. Assignment 4 simply counts successes. Assignment 7 uses a cumulative score that increases by +1 for no attack and decreases by -1 for a successful attack, creating a random walk structure.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">The binomial distribution</h2>

        <p className="mb-6">
          When we perform <InlineMath>{`n`}</InlineMath> independent Bernoulli trials, each with success probability <InlineMath>{`p`}</InlineMath>, the total number of successes <InlineMath>{`S_n`}</InlineMath> follows a binomial distribution:
        </p>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8">
          <p className="font-semibold mb-4 text-center">Binomial distribution</p>
          <div className="text-center">
            <BlockMath>{`P(S_n = k) = \\binom{n}{k} p^k (1-p)^{n-k}`}</BlockMath>
          </div>
          <p className="text-sm text-center mt-4">where <InlineMath>{`\\binom{n}{k} = \\frac{n!}{k!(n-k)!}`}</InlineMath> is the binomial coefficient</p>
        </div>

        <p className="mb-6">
          The binomial coefficient <InlineMath>{`\\binom{n}{k}`}</InlineMath> counts the number of ways to choose <InlineMath>{`k`}</InlineMath> successes from <InlineMath>{`n`}</InlineMath> trials. This is a fundamental combinatorial quantity that appears throughout mathematics.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Pascal's triangle and binomial coefficients</h2>

        <p className="mb-6">
          Pascal's triangle organizes binomial coefficients in a triangular array where each entry is the sum of the two entries above it. Row <InlineMath>{`n`}</InlineMath> contains the coefficients from the expansion of <InlineMath>{`(a+b)^n`}</InlineMath>.
        </p>

        <PascalTriangle />

        <p className="mb-6">
          The binomial expansion directly connects to our probability distributions:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`(p + (1-p))^n = \\sum_{k=0}^{n} \\binom{n}{k} p^k (1-p)^{n-k} = 1`}</BlockMath>
        </div>

        <p className="mb-6">
          This identity confirms that the binomial probabilities sum to 1, as required for any probability distribution. The coefficients in Pascal's triangle tell us how many ways each outcome can occur.
        </p>

        <p className="mb-6">
          For example, in Assignment 7 with <InlineMath>{`n=4`}</InlineMath> weeks, the number of ways to have exactly <InlineMath>{`k=2`}</InlineMath> successful attacks is <InlineMath>{`\\binom{4}{2} = 6`}</InlineMath>, corresponding to the entry in row 4, position 2 of Pascal's triangle.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Connection to the Fibonacci sequence</h2>

        <p className="mb-6">
          A remarkable property of Pascal's triangle is that summing the entries along shallow diagonals produces the Fibonacci sequence. This connects our probability theory to one of the most famous sequences in mathematics.
        </p>

        <FibonacciConnection />

        <p className="mb-6">
          Mathematically, this relationship is expressed as:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`F_{n+1} = \\sum_{k=0}^{\\lfloor n/2 \\rfloor} \\binom{n-k}{k}`}</BlockMath>
        </div>

        <p className="mb-6">
          where <InlineMath>{`F_n`}</InlineMath> is the <InlineMath>{`n`}</InlineMath>-th Fibonacci number. This shows how combinatorial counting problems (binomial coefficients) relate to recursive sequences (Fibonacci numbers).
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Combinatorial interpretation</h2>

        <p className="mb-6">
          The binomial coefficient <InlineMath>{`\\binom{n}{k}`}</InlineMath> has a direct combinatorial interpretation: it counts the number of <InlineMath>{`k`}</InlineMath>-element subsets of an <InlineMath>{`n`}</InlineMath>-element set. In our assignments:
        </p>

        <ul className="space-y-3 my-6">
          <li><strong>Assignment 4</strong>: <InlineMath>{`\\binom{n}{k}`}</InlineMath> counts ways to draw exactly <InlineMath>{`k`}</InlineMath> hearts in <InlineMath>{`n`}</InlineMath> draws</li>
          <li><strong>Assignment 7</strong>: <InlineMath>{`\\binom{n}{k}`}</InlineMath> counts ways to have exactly <InlineMath>{`k`}</InlineMath> successful attack weeks out of <InlineMath>{`n`}</InlineMath> weeks</li>
        </ul>

        <p className="mb-6">
          These coefficients satisfy several important identities:
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-8 space-y-4">
          <div>
            <p className="text-sm font-semibold mb-2">Symmetry:</p>
            <div className="text-center">
              <BlockMath>{`\\binom{n}{k} = \\binom{n}{n-k}`}</BlockMath>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold mb-2">Pascal's identity:</p>
            <div className="text-center">
              <BlockMath>{`\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}`}</BlockMath>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold mb-2">Sum of row:</p>
            <div className="text-center">
              <BlockMath>{`\\sum_{k=0}^{n} \\binom{n}{k} = 2^n`}</BlockMath>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Mathematical synthesis</h2>

        <p className="mb-6">
          The connection between our two assignments reveals a fundamental pattern in probability theory. Both rely on the same underlying process (Bernoulli trials), but Assignment 7 adds a layer of complexity through:
        </p>

        <ol className="space-y-3 my-6 list-decimal list-inside">
          <li><strong>Multiple trials per time step</strong> (m attackers per week)</li>
          <li><strong>Transformed probability</strong> (from individual <InlineMath>{`p`}</InlineMath> to weekly <InlineMath>{`1-(1-p)^m`}</InlineMath>)</li>
          <li><strong>Signed accumulation</strong> (±1 scoring instead of simple counting)</li>
        </ol>

        <p className="mb-6">
          Despite these differences, the law of large numbers applies equally to both. The expected value in Assignment 7's score is:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`E[\\text{Score}_n] = n \\cdot (2(1-p)^m - 1)`}</BlockMath>
        </div>

        <p className="mb-6">
          This linear growth mirrors the linear growth of expected successes in Assignment 4, demonstrating how the same mathematical principles govern seemingly different scenarios.
        </p>

        <p className="mb-6">
          The binomial coefficients, Pascal's triangle, and even the Fibonacci sequence all emerge from counting problems related to these Bernoulli processes. They provide the combinatorial foundation that allows us to calculate exact probabilities, understand limiting behavior, and connect discrete random processes to deterministic mathematical structures.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 my-8">
          <p className="font-semibold text-center mb-4 text-lg">Unified perspective</p>
          <p className="text-sm text-center">
            Bernoulli processes → Binomial distributions → Combinatorial coefficients → Pascal's triangle → Fibonacci sequence
          </p>
          <p className="text-xs text-gray-600 text-center mt-4">
            A single mathematical framework connecting probability, combinatorics, and number theory
          </p>
        </div>

      </div>
    </article>
  )
}
