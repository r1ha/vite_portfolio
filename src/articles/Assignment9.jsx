import React from 'react'
import { BlockMath, InlineMath } from '../components/Math'

export const metadata = {
  id: 9,
  title: "Foundations of probability theory",
  category: "Statistics",
  author: "Erwan Achat",
  studentId: "2244316",
  date: "2025",
  description: "Examining the axiomatic approach to probability and its connection to measure theory"
}

export default function Assignment9() {
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
          The concept of probability has evolved through multiple interpretations, each attempting to capture the essence of uncertainty and randomness. Before the twentieth century, mathematicians and philosophers debated the meaning of probability without a unified framework. The classical interpretation views probability as the ratio of favorable outcomes to total equally likely outcomes, while the frequentist interpretation defines it as the limiting relative frequency of an event in repeated trials. The Bayesian perspective treats probability as a degree of belief or subjective confidence, and the geometric interpretation relates probability to ratios of lengths, areas, or volumes in continuous spaces. These diverse viewpoints, though useful in their respective domains, sometimes led to conceptual inconsistencies and paradoxes.
        </p>

        <p className="mb-6">
          The axiomatic approach, formalized by Andrey Kolmogorov in 1933, resolved these inconsistencies by establishing probability theory on a rigorous mathematical foundation. Rather than debating what probability "means," Kolmogorov defined what probability "does" through a minimal set of axioms. This approach allows each interpretation to coexist as a valid application of the same underlying mathematical structure. The classical, frequentist, Bayesian, and geometric interpretations all satisfy Kolmogorov's axioms, thereby unifying probability theory under a single coherent framework.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Interpretations of probability</h2>

        <p className="mb-6">
          The classical interpretation, attributed to Laplace, defines probability in terms of equally likely outcomes. If an experiment has <InlineMath>{`n`}</InlineMath> possible outcomes, all equally probable, and <InlineMath>{`k`}</InlineMath> of them correspond to event <InlineMath>{`A`}</InlineMath>, then the probability of <InlineMath>{`A`}</InlineMath> is <InlineMath>{`P(A) = k/n`}</InlineMath>. This interpretation works well for symmetric situations such as fair dice or card games, but it becomes circular when we need to determine what "equally likely" means without already knowing the probabilities. Moreover, it cannot handle infinite sample spaces or situations where symmetry does not exist.
        </p>

        <p className="mb-6">
          The frequentist interpretation addresses some of these limitations by defining probability as the long-run relative frequency of an event. If we repeat an experiment many times under identical conditions, and event <InlineMath>{`A`}</InlineMath> occurs <InlineMath>{`n_A`}</InlineMath> times in <InlineMath>{`n`}</InlineMath> trials, then <InlineMath>{`P(A) = \\lim_{n \\to \\infty} n_A/n`}</InlineMath>. This interpretation aligns with empirical science and the law of large numbers, but it struggles with unique events that cannot be repeated, such as the probability of a specific historical event occurring.
        </p>

        <p className="mb-6">
          Bayesian probability interprets probability as a degree of rational belief, updated through evidence using Bayes' theorem. An agent assigns a prior probability <InlineMath>{`P(H)`}</InlineMath> to a hypothesis <InlineMath>{`H`}</InlineMath>, and upon observing evidence <InlineMath>{`E`}</InlineMath>, updates this to a posterior probability <InlineMath>{`P(H|E) = P(E|H)P(H)/P(E)`}</InlineMath>. This interpretation accommodates unique events and subjective uncertainty, but critics argue that it introduces subjectivity into what should be an objective science.
        </p>

        <p className="mb-6">
          Geometric probability extends the classical interpretation to continuous spaces. When selecting a point uniformly at random from a region <InlineMath>{`\\Omega`}</InlineMath>, the probability that the point lies in a subset <InlineMath>{`A`}</InlineMath> equals the ratio of their measures: <InlineMath>{`P(A) = \\mu(A)/\\mu(\\Omega)`}</InlineMath>, where <InlineMath>{`\\mu`}</InlineMath> represents length, area, or volume as appropriate. This interpretation naturally handles continuous random variables but requires careful definition of the measure to avoid paradoxes like the Bertrand paradox.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">The axiomatic foundation</h2>

        <p className="mb-6">
          Kolmogorov's axiomatization establishes probability theory as a branch of measure theory. A probability space consists of three components: a sample space <InlineMath>{`\\Omega`}</InlineMath> representing all possible outcomes, a sigma-algebra <InlineMath>{`\\mathcal{F}`}</InlineMath> of events, and a probability measure <InlineMath>{`P`}</InlineMath> that assigns probabilities to events. The axioms governing this structure are remarkably simple yet powerful.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 overflow-x-auto">
          <p className="font-semibold mb-4 text-center">Kolmogorov's axioms of probability</p>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold mb-2">Axiom 1 (Non-negativity):</p>
              <div className="text-center">
                <BlockMath>{`P(A) \\geq 0 \\quad \\text{for all } A \\in \\mathcal{F}`}</BlockMath>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-semibold mb-2">Axiom 2 (Normalization):</p>
              <div className="text-center">
                <BlockMath>{`P(\\Omega) = 1`}</BlockMath>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-semibold mb-2">Axiom 3 (Countable additivity):</p>
              <div className="text-center">
                <BlockMath>{`P\\left(\\bigcup_{i=1}^{\\infty} A_i\\right) = \\sum_{i=1}^{\\infty} P(A_i)`}</BlockMath>
              </div>
              <p className="text-xs text-center mt-2">for any countable collection of pairwise disjoint events <InlineMath>{`A_1, A_2, \\ldots`}</InlineMath></p>
            </div>
          </div>
        </div>

        <p className="mb-6">
          These axioms resolve the conceptual tensions among different interpretations by providing a common mathematical language. The classical interpretation satisfies the axioms when we assign equal probabilities to each outcome in a finite sample space. The frequentist interpretation satisfies them asymptotically through the law of large numbers. The Bayesian interpretation satisfies them when beliefs are coherent and updated consistently. The geometric interpretation satisfies them when the measure is properly normalized. Each interpretation becomes a model of the axiomatic system, valid within its domain of application.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Connection to measure theory</h2>

        <p className="mb-6">
          The formal connection between probability theory and measure theory provides the rigorous foundation needed for advanced analysis. A sigma-algebra <InlineMath>{`\\mathcal{F}`}</InlineMath> on a set <InlineMath>{`\\Omega`}</InlineMath> is a collection of subsets closed under complementation and countable unions. Specifically, <InlineMath>{`\\mathcal{F}`}</InlineMath> must contain the empty set <InlineMath>{`\\emptyset`}</InlineMath>, and if <InlineMath>{`A \\in \\mathcal{F}`}</InlineMath>, then <InlineMath>{`A^c \\in \\mathcal{F}`}</InlineMath>. Furthermore, if <InlineMath>{`A_1, A_2, \\ldots \\in \\mathcal{F}`}</InlineMath>, then their countable union <InlineMath>{`\\bigcup_{i=1}^{\\infty} A_i \\in \\mathcal{F}`}</InlineMath>. This structure ensures that we can perform logical operations on events and remain within the collection of measurable sets.
        </p>

        <p className="mb-6">
          A probability measure <InlineMath>{`P: \\mathcal{F} \\to [0,1]`}</InlineMath> is a special case of a measure where the total measure of the space equals one. In general measure theory, we study measures <InlineMath>{`\\mu: \\mathcal{F} \\to [0, \\infty]`}</InlineMath> that satisfy similar properties but may assign infinite measure to some sets. The Lebesgue measure on the real line, which assigns to each interval its length, exemplifies a measure that is not a probability measure. However, we can construct probability measures from general measures through normalization, as seen in the geometric interpretation.
        </p>

        <p className="mb-6">
          Random variables form the bridge between abstract probability spaces and numerical analysis. A random variable is a measurable function <InlineMath>{`X: \\Omega \\to \\mathbb{R}`}</InlineMath>, meaning that for every Borel set <InlineMath>{`B`}</InlineMath> in <InlineMath>{`\\mathbb{R}`}</InlineMath>, the preimage <InlineMath>{`X^{-1}(B) = \\{\\omega \\in \\Omega : X(\\omega) \\in B\\}`}</InlineMath> belongs to <InlineMath>{`\\mathcal{F}`}</InlineMath>. This measurability condition ensures that we can ask probabilistic questions about the random variable, such as <InlineMath>{`P(X \\leq x) = P(\\{\\omega : X(\\omega) \\leq x\\})`}</InlineMath>. The distribution of <InlineMath>{`X`}</InlineMath> is the probability measure induced on <InlineMath>{`\\mathbb{R}`}</InlineMath> by this pushforward construction.
        </p>

        <p className="mb-6">
          The machinery of measure theory, including concepts like almost sure convergence, dominated convergence, and the Radon-Nikodym theorem, transfers directly to probability theory. This connection allows us to rigorously define expectations as Lebesgue integrals, conditional expectations as Radon-Nikodym derivatives, and martingales as special sequences of random variables. Without this foundation, modern probability theory and its applications in stochastic processes, mathematical finance, and statistical mechanics would lack the precision necessary for advanced theoretical work.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Deriving fundamental properties</h2>

        <p className="mb-6">
          From Kolmogorov's axioms, we can derive many important properties of probability measures. One fundamental result is the probability of the empty set. Since <InlineMath>{`\\emptyset`}</InlineMath> and <InlineMath>{`\\Omega`}</InlineMath> are disjoint and <InlineMath>{`\\emptyset \\cup \\Omega = \\Omega`}</InlineMath>, applying Axiom 3 gives <InlineMath>{`P(\\Omega) = P(\\emptyset \\cup \\Omega) = P(\\emptyset) + P(\\Omega)`}</InlineMath>. Using Axiom 2, we have <InlineMath>{`1 = P(\\emptyset) + 1`}</InlineMath>, which implies <InlineMath>{`P(\\emptyset) = 0`}</InlineMath>.
        </p>

        <p className="mb-6">
          Another basic property concerns complements. For any event <InlineMath>{`A`}</InlineMath>, we can write <InlineMath>{`\\Omega = A \\cup A^c`}</InlineMath> where <InlineMath>{`A`}</InlineMath> and <InlineMath>{`A^c`}</InlineMath> are disjoint. By countable additivity, <InlineMath>{`P(\\Omega) = P(A) + P(A^c)`}</InlineMath>, and since <InlineMath>{`P(\\Omega) = 1`}</InlineMath>, we obtain <InlineMath>{`P(A^c) = 1 - P(A)`}</InlineMath>. This immediately implies that <InlineMath>{`P(A) \\leq 1`}</InlineMath> for all events <InlineMath>{`A`}</InlineMath>, as <InlineMath>{`P(A^c) \\geq 0`}</InlineMath> by non-negativity.
        </p>

        <h3 className="text-xl font-semibold mt-10 mb-4">Subadditivity property</h3>

        <p className="mb-6">
          Subadditivity states that the probability of a union of events is at most the sum of their individual probabilities. Formally, for any finite or countable collection of events <InlineMath>{`A_1, A_2, \\ldots`}</InlineMath>, we have:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`P\\left(\\bigcup_{i=1}^{\\infty} A_i\\right) \\leq \\sum_{i=1}^{\\infty} P(A_i)`}</BlockMath>
        </div>

        <p className="mb-6">
          To derive this property, we construct a sequence of disjoint sets whose union equals the union of the original events. Define <InlineMath>{`B_1 = A_1`}</InlineMath> and for <InlineMath>{`n \\geq 2`}</InlineMath>, let <InlineMath>{`B_n = A_n \\setminus (A_1 \\cup A_2 \\cup \\cdots \\cup A_{n-1})`}</InlineMath>. By construction, the sets <InlineMath>{`B_i`}</InlineMath> are pairwise disjoint, and <InlineMath>{`\\bigcup_{i=1}^{\\infty} B_i = \\bigcup_{i=1}^{\\infty} A_i`}</InlineMath>. Moreover, each <InlineMath>{`B_i \\subseteq A_i`}</InlineMath>, so <InlineMath>{`P(B_i) \\leq P(A_i)`}</InlineMath> by monotonicity (which itself follows from the axioms).
        </p>

        <p className="mb-6">
          Applying countable additivity to the disjoint sets <InlineMath>{`B_i`}</InlineMath>, we obtain:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`P\\left(\\bigcup_{i=1}^{\\infty} A_i\\right) = P\\left(\\bigcup_{i=1}^{\\infty} B_i\\right) = \\sum_{i=1}^{\\infty} P(B_i) \\leq \\sum_{i=1}^{\\infty} P(A_i)`}</BlockMath>
        </div>

        <p className="mb-6">
          This inequality proves subadditivity. It becomes an equality precisely when the events <InlineMath>{`A_i`}</InlineMath> are pairwise disjoint, in which case <InlineMath>{`B_i = A_i`}</InlineMath> for all <InlineMath>{`i`}</InlineMath>. Subadditivity provides a useful upper bound for probabilities when exact calculation is difficult, and it underlies many concentration inequalities in probability theory.
        </p>

        <h3 className="text-xl font-semibold mt-10 mb-4">Inclusion-exclusion principle</h3>

        <p className="mb-6">
          The inclusion-exclusion principle refines subadditivity by accounting for overlaps among events. For two events <InlineMath>{`A`}</InlineMath> and <InlineMath>{`B`}</InlineMath>, we can decompose their union as <InlineMath>{`A \\cup B = A \\cup (B \\setminus A)`}</InlineMath>, where <InlineMath>{`A`}</InlineMath> and <InlineMath>{`B \\setminus A`}</InlineMath> are disjoint. Applying countable additivity:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`P(A \\cup B) = P(A) + P(B \\setminus A)`}</BlockMath>
        </div>

        <p className="mb-6">
          Now we express <InlineMath>{`P(B \\setminus A)`}</InlineMath> in terms of <InlineMath>{`P(B)`}</InlineMath> and <InlineMath>{`P(A \\cap B)`}</InlineMath>. Since <InlineMath>{`B = (B \\setminus A) \\cup (A \\cap B)`}</InlineMath> and these sets are disjoint, we have <InlineMath>{`P(B) = P(B \\setminus A) + P(A \\cap B)`}</InlineMath>, which gives <InlineMath>{`P(B \\setminus A) = P(B) - P(A \\cap B)`}</InlineMath>. Substituting this into our earlier equation:
        </p>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 overflow-x-auto">
          <p className="font-semibold mb-4 text-center">Inclusion-exclusion for two events</p>
          <div className="text-center">
            <BlockMath>{`P(A \\cup B) = P(A) + P(B) - P(A \\cap B)`}</BlockMath>
          </div>
        </div>

        <p className="mb-6">
          This formula corrects for the double-counting that occurs in the naive sum <InlineMath>{`P(A) + P(B)`}</InlineMath>, where outcomes in <InlineMath>{`A \\cap B`}</InlineMath> contribute twice. The general inclusion-exclusion principle extends this to <InlineMath>{`n`}</InlineMath> events through a systematic pattern of additions and subtractions:
        </p>

        <div className="overflow-x-auto my-6">
          <div className="text-center" style={{fontSize: '0.9em'}}>
            <BlockMath>{`P\\left(\\bigcup_{i=1}^{n} A_i\\right) = \\sum_{i=1}^{n} P(A_i) - \\sum_{1 \\leq i < j \\leq n} P(A_i \\cap A_j) + \\sum_{1 \\leq i < j < k \\leq n} P(A_i \\cap A_j \\cap A_k) - \\cdots + (-1)^{n+1} P(A_1 \\cap A_2 \\cap \\cdots \\cap A_n)`}</BlockMath>
          </div>
        </div>

        <p className="mb-6">
          The derivation proceeds by induction. We have established the base case for <InlineMath>{`n=2`}</InlineMath>. Assuming the formula holds for <InlineMath>{`n-1`}</InlineMath> events, consider <InlineMath>{`n`}</InlineMath> events. Let <InlineMath>{`C = A_1 \\cup A_2 \\cup \\cdots \\cup A_{n-1}`}</InlineMath>. Then <InlineMath>{`\\bigcup_{i=1}^{n} A_i = C \\cup A_n`}</InlineMath>, so:
        </p>

        <div className="text-center my-6">
          <BlockMath>{`P\\left(\\bigcup_{i=1}^{n} A_i\\right) = P(C) + P(A_n) - P(C \\cap A_n)`}</BlockMath>
        </div>

        <p className="mb-6">
          By the inductive hypothesis, <InlineMath>{`P(C)`}</InlineMath> expands according to the inclusion-exclusion formula for <InlineMath>{`n-1`}</InlineMath> events. The term <InlineMath>{`P(C \\cap A_n) = P((A_1 \\cup \\cdots \\cup A_{n-1}) \\cap A_n)`}</InlineMath> equals <InlineMath>{`P((A_1 \\cap A_n) \\cup \\cdots \\cup (A_{n-1} \\cap A_n))`}</InlineMath>, which again expands by the inductive hypothesis. Collecting terms carefully, we recover the full inclusion-exclusion formula for <InlineMath>{`n`}</InlineMath> events.
        </p>

        <p className="mb-6">
          This principle has numerous applications, from counting problems in combinatorics to the computation of union probabilities in reliability theory. It demonstrates how the simple axioms of probability lead to sophisticated results through logical reasoning and mathematical induction.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Conclusion</h2>

        <p className="mb-6">
          The axiomatic approach to probability represents a triumph of mathematical abstraction. By distilling probability to its essential properties, Kolmogorov created a framework that accommodates diverse interpretations while eliminating conceptual ambiguities. The connection to measure theory provides the technical machinery needed for rigorous analysis, transforming probability from philosophical speculation into precise mathematics. From these axioms, we derive fundamental properties like subadditivity and inclusion-exclusion that govern how probabilities combine and interact.
        </p>

        <p className="mb-6">
          This foundation supports the entire edifice of modern probability theory, from elementary calculations to advanced topics in stochastic analysis. Whether we interpret probability as frequency, belief, or geometric ratio, we work within the same mathematical structure, ensuring consistency and enabling communication across different applications. The axiomatic approach reminds us that mathematics achieves its power not by answering what things are, but by precisely describing how they behave.
        </p>

      </div>
    </article>
  )
}
