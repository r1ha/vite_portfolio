import React, { useState, useEffect, useMemo } from 'react'
import { BlockMath, InlineMath } from '../components/Math'

export const metadata = {
  id: 5,
  title: "Research task: understanding location and dispersion measures",
  category: "Statistics", 
  author: "Erwan Achat",
  studentId: "2244316",
  date: "2025",
  description: "Here, we learn about the concepts of location and dispersion measures, and when to use them in statistical analysis."
}

export default function Assignment5() {
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
          In statistics, we need ways to describe data sets effectively. Two fundamental concepts help us do this: location measures tell us where the center of our data is, while dispersion measures tell us how spread out the data is. Understanding both gives us a complete picture of any dataset.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Measures of central tendency</h2>
        
        <p className="mb-6">
          Central tendency measures help us identify the "typical" or "average" value in a dataset. Each measure has its own strengths and is suited to different situations.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">Arithmetic mean</h3>
        
        <p className="mb-4">
          The arithmetic mean, commonly called the average, is the sum of all values divided by the number of values.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
          <p className="font-semibold mb-3">Formula:</p>
          <div className="text-center text-lg">
            <BlockMath>{`\\bar{x} = \\frac{1}{n} \\sum_{i=1}^{n} x_i = \\frac{x_1 + x_2 + ... + x_n}{n}`}</BlockMath>
          </div>
        </div>

        <p className="mb-3"><strong>Uses:</strong></p>
        <ul className="mb-4">
          <li>Calculating average test scores, salaries, or temperatures</li>
          <li>Most common measure in research and everyday applications</li>
          <li>Used in many statistical tests and formulas</li>
        </ul>

        <p className="mb-3"><strong>Advantages:</strong></p>
        <ul className="mb-4">
          <li>Uses all data points in the calculation</li>
          <li>Easy to understand and compute</li>
          <li>Well-defined mathematical properties</li>
        </ul>

        <p className="mb-3"><strong>Limitations:</strong></p>
        <ul className="mb-6">
          <li>Sensitive to extreme values (outliers)</li>
          <li>Can be misleading with skewed distributions</li>
          <li>May produce values that don't exist in the dataset</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">Median</h3>
        
        <p className="mb-4">
          The median is the middle value when data is arranged in order. If there's an even number of values, it's the average of the two middle values.
        </p>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
          <p className="font-semibold mb-3">Formula:</p>
          <div className="text-center text-lg">
            <BlockMath>{`\\text{Median} = \\begin{cases} x_{(n+1)/2} & \\text{if } n \\text{ is odd} \\\\ \\frac{x_{n/2} + x_{(n/2)+1}}{2} & \\text{if } n \\text{ is even} \\end{cases}`}</BlockMath>
          </div>
          <p className="text-sm text-gray-600 mt-3 text-center">(where values are sorted in ascending order)</p>
        </div>

        <p className="mb-3"><strong>Uses:</strong></p>
        <ul className="mb-4">
          <li>Reporting median house prices or income (less affected by extreme values)</li>
          <li>Analyzing skewed distributions</li>
          <li>Describing ordinal data</li>
        </ul>

        <p className="mb-3"><strong>Advantages:</strong></p>
        <ul className="mb-4">
          <li>Not affected by extreme values or outliers</li>
          <li>Better represents the center of skewed distributions</li>
          <li>Always exists and is unique</li>
        </ul>

        <p className="mb-3"><strong>Limitations:</strong></p>
        <ul className="mb-6">
          <li>Doesn't use all data points in calculation</li>
          <li>Less efficient for small samples</li>
          <li>More difficult to work with mathematically</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">Mode</h3>
        
        <p className="mb-4">
          The mode is the value that appears most frequently in a dataset. A dataset can have one mode (unimodal), two modes (bimodal), or more (multimodal).
        </p>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-6">
          <p className="font-semibold mb-3">Definition:</p>
          <div className="text-center text-lg">
            <BlockMath>{`\\text{Mode} = \\text{value(s) with highest frequency}`}</BlockMath>
          </div>
        </div>

        <p className="mb-3"><strong>Uses:</strong></p>
        <ul className="mb-4">
          <li>Finding the most popular product size or color</li>
          <li>Identifying the most common category in categorical data</li>
          <li>Quick identification of typical values</li>
        </ul>

        <p className="mb-3"><strong>Advantages:</strong></p>
        <ul className="mb-4">
          <li>Can be used with categorical data</li>
          <li>Not affected by extreme values</li>
          <li>Easy to identify in small datasets</li>
        </ul>

        <p className="mb-3"><strong>Limitations:</strong></p>
        <ul className="mb-6">
          <li>May not exist if all values are unique</li>
          <li>May not be unique (multiple modes)</li>
          <li>Doesn't use all data points</li>
          <li>Not useful for continuous data without grouping</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Measures of dispersion</h2>
        
        <p className="mb-6">
          Dispersion measures tell us how spread out or variable our data is. Two datasets can have the same mean but very different spreads.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">Variance</h3>
        
        <p className="mb-4">
          Variance measures the average squared deviation from the mean. It quantifies how far each value in the dataset is from the mean.
        </p>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-6">
          <p className="font-semibold mb-3">Formula (Population):</p>
          <div className="text-center text-lg mb-4">
            <BlockMath>{`\\sigma^2 = \\frac{1}{n} \\sum_{i=1}^{n} (x_i - \\mu)^2`}</BlockMath>
          </div>
          <p className="font-semibold mb-3">Formula (Sample):</p>
          <div className="text-center text-lg">
            <BlockMath>{`s^2 = \\frac{1}{n-1} \\sum_{i=1}^{n} (x_i - \\bar{x})^2`}</BlockMath>
          </div>
        </div>

        <p className="mb-3"><strong>Uses:</strong></p>
        <ul className="mb-4">
          <li>Foundation for many statistical methods</li>
          <li>Measuring risk in finance</li>
          <li>Quality control in manufacturing</li>
        </ul>

        <p className="mb-3"><strong>Advantages:</strong></p>
        <ul className="mb-4">
          <li>Uses all data points</li>
          <li>Has nice mathematical properties</li>
          <li>Forms the basis for many statistical tests</li>
        </ul>

        <p className="mb-3"><strong>Limitations:</strong></p>
        <ul className="mb-6">
          <li>Squared units (not in original scale)</li>
          <li>Sensitive to outliers</li>
          <li>Not intuitive to interpret</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">Standard deviation</h3>
        
        <p className="mb-4">
          Standard deviation is the square root of variance. It measures spread in the same units as the original data.
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6">
          <p className="font-semibold mb-3">Formula (Population):</p>
          <div className="text-center text-lg mb-4">
            <BlockMath>{`\\sigma = \\sqrt{\\frac{1}{n} \\sum_{i=1}^{n} (x_i - \\mu)^2}`}</BlockMath>
          </div>
          <p className="font-semibold mb-3">Formula (Sample):</p>
          <div className="text-center text-lg">
            <BlockMath>{`s = \\sqrt{\\frac{1}{n-1} \\sum_{i=1}^{n} (x_i - \\bar{x})^2}`}</BlockMath>
          </div>
        </div>

        <p className="mb-3"><strong>Uses:</strong></p>
        <ul className="mb-4">
          <li>Most common measure of spread</li>
          <li>Reporting variability in scientific studies</li>
          <li>Calculating confidence intervals</li>
          <li>Standardizing scores (z-scores)</li>
        </ul>

        <p className="mb-3"><strong>Advantages:</strong></p>
        <ul className="mb-4">
          <li>In the same units as the data</li>
          <li>Widely understood and used</li>
          <li>Useful for normal distributions</li>
        </ul>

        <p className="mb-3"><strong>Limitations:</strong></p>
        <ul className="mb-6">
          <li>Sensitive to outliers</li>
          <li>Assumes importance of extreme deviations</li>
          <li>Less useful for skewed distributions</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">Interquartile range (IQR)</h3>
        
        <p className="mb-4">
          The IQR is the difference between the third quartile (75th percentile) and the first quartile (25th percentile). It represents the range of the middle 50% of the data.
        </p>

        <div className="bg-teal-50 border-l-4 border-teal-500 p-6 my-6">
          <p className="font-semibold mb-3">Formula:</p>
          <div className="text-center text-lg">
            <BlockMath>{`\\text{IQR} = Q_3 - Q_1`}</BlockMath>
          </div>
          <p className="text-sm text-gray-600 mt-3 text-center">(where Q₁ is the 25th percentile and Q₃ is the 75th percentile)</p>
        </div>

        <p className="mb-3"><strong>Uses:</strong></p>
        <ul className="mb-4">
          <li>Creating box plots</li>
          <li>Detecting outliers (values beyond 1.5 × IQR from quartiles)</li>
          <li>Describing spread in skewed distributions</li>
        </ul>

        <p className="mb-3"><strong>Advantages:</strong></p>
        <ul className="mb-4">
          <li>Resistant to outliers</li>
          <li>Works well with skewed data</li>
          <li>Easy to understand and visualize</li>
        </ul>

        <p className="mb-3"><strong>Limitations:</strong></p>
        <ul className="mb-6">
          <li>Ignores the tails of the distribution</li>
          <li>Doesn't use all data points</li>
          <li>Less efficient for normal distributions</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Which one should I use?</h2>
        
        <p className="mb-6">
          The choice of measure depends on my data and what I want to communicate:
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
          <h4 className="font-semibold mb-3">For central tendency:</h4>
          <ul className="mb-4">
            <li><strong>I use the mean</strong> when data is symmetric and has no extreme outliers</li>
            <li><strong>I use the median</strong> when data is skewed or has outliers</li>
            <li><strong>I use the mode</strong> for categorical data or to find the most common value</li>
          </ul>

          <h4 className="font-semibold mb-3 mt-6">For Dispersion:</h4>
          <ul>
            <li><strong>I use standard deviation</strong> when data is normally distributed and I'm using the mean</li>
            <li><strong>I use IQR</strong> when data is skewed or has outliers, especially with the median</li>
            <li><strong>I use variance</strong> for mathematical and statistical calculations</li>
          </ul>
        </div>

        <p className="mb-6">
          Understanding these measures and their properties is essential for proper data analysis. Using the wrong measure can lead to misleading conclusions, while using the right measure helps reveal the true nature of the data.
        </p>

      </div>
    </article>
  )
}