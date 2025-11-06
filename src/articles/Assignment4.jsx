import React from 'react'
import { BlockMath, InlineMath } from '../components/Math'

export const metadata = {
  id: 4,
  title: "The Law of Large Numbers",
  category: "Statistics",
  author: "Erwan Achat",
  studentId: "2244316",
  date: "2025",
  description: "A fundamental theorem in probability theory explaining how sample means converge to expected values"
}

export default function Assignment4() {
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
          The law of large numbers is one of the most fundamental theorems in probability theory and statistics. It provides the mathematical foundation for why we can use sample data to make inferences about populations. In essence, this law tells us that as we collect more and more observations, the average of these observations will get closer and closer to the true expected value.
        </p>

        <p className="mb-6">
          Consider drawing cards from a standard deck: if we shuffle the deck after each draw and record whether we drew a heart, we expect to see hearts roughly one quarter of the time, since there are 13 hearts among 52 cards. The law of large numbers formalizes this intuition. While the first few draws might show an imbalance, perhaps drawing hearts twice in the first five attempts, as we continue drawing hundreds or thousands of times, the proportion of hearts will converge toward the true probability of 0.25.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Mathematical formulation</h2>

        <p className="mb-6">
          Let us denote <InlineMath>{`X_1, X_2, X_3, \\ldots, X_n`}</InlineMath> as a sequence of independent and identically distributed random variables, each with expected value <InlineMath>{`\\mu`}</InlineMath> and finite variance. The sample mean of the first <InlineMath>{`n`}</InlineMath> observations is given by:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`\\bar{X}_n = \\frac{1}{n} \\sum_{i=1}^{n} X_i`}</BlockMath>
        </div>

        <p className="mb-6">
          The law of large numbers states that this sample mean converges to the expected value as the number of observations grows without bound:
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
          <p className="font-semibold mb-4 text-center">The law of large numbers</p>
          <div className="text-center">
            <BlockMath>{`\\lim_{n \\to \\infty} \\bar{X}_n = \\mu`}</BlockMath>
          </div>
        </div>

        <p className="mb-6">
          More precisely, the strong law of large numbers guarantees that the sample mean converges almost surely to the expected value. This means that the probability that the sample mean differs from the true mean becomes vanishingly small as we increase the sample size. Mathematically, for any small positive number <InlineMath>{`\\epsilon`}</InlineMath>, we have:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`P\\left(\\left|\\bar{X}_n - \\mu\\right| > \\epsilon\\right) \\to 0 \\text{ as } n \\to \\infty`}</BlockMath>
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-6">A visual demonstration</h2>

        <p className="mb-6">
          To illustrate this convergence, imagine rolling a fair six-sided die repeatedly. The expected value of a single roll is 3.5 (the average of 1, 2, 3, 4, 5, and 6). After just a few rolls, the running average might be far from 3.5. However, as we accumulate hundreds or thousands of rolls, the running average stabilizes and approaches this theoretical value.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 my-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">Convergence behavior</h3>
            <p className="text-sm text-gray-600">Sample mean approaching the true expected value</p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded border border-gray-300">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">n = 10 rolls</span>
                <span className="text-lg font-semibold text-blue-600">≈ 3.2</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '91.4%'}}></div>
              </div>
            </div>

            <div className="bg-white p-4 rounded border border-gray-300">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">n = 100 rolls</span>
                <span className="text-lg font-semibold text-blue-600">≈ 3.45</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '98.6%'}}></div>
              </div>
            </div>

            <div className="bg-white p-4 rounded border border-gray-300">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">n = 1,000 rolls</span>
                <span className="text-lg font-semibold text-blue-600">≈ 3.49</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '99.7%'}}></div>
              </div>
            </div>

            <div className="bg-white p-4 rounded border border-gray-300">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">n = 10,000 rolls</span>
                <span className="text-lg font-semibold text-green-600">≈ 3.501</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Expected value μ = 3.5 (shown as 100% convergence)
          </p>
        </div>

        <p className="mb-6">
          This visualization demonstrates the practical implication of the law of large numbers. The variance in our estimate decreases as we gather more data. This principle underlies much of statistical inference, from polling and surveys to quality control in manufacturing. It assures us that larger samples provide more reliable estimates of population parameters.
        </p>

        <p className="mb-6">
          The law of large numbers is not merely a theoretical curiosity. It is the reason we trust that empirical frequencies approximate theoretical probabilities. It justifies the use of Monte Carlo methods in computational statistics. It explains why casinos can operate profitably despite individual gamblers occasionally winning. The law guarantees that over many trials, the house edge prevails.
        </p>

        <p className="mb-6">
          Understanding this fundamental theorem helps us appreciate both the power and the limitations of statistical reasoning. While the law guarantees convergence in the limit, it does not tell us how quickly this convergence occurs for any particular sample size. That question is addressed by other results in probability theory, such as the central limit theorem and various concentration inequalities.
        </p>

      </div>
    </article>
  )
}
