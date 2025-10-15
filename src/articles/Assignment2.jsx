import React, { useState, useEffect, useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const metadata = {
  id: 2,
  title: "Using statistics to decode encrypted texts",
  category: "Statistics",
  author: "Erwan Achat",
  studentId: "2244316",
  date: "2025",
  description: "After exploring distributions, we will apply this knowledge to a fascinating problem: breaking encrypted messages. We'll use letter frequency analysis to decode Caesar ciphers, which is a classic example of how statistics can be used in cybersecurity."
}

export default function Assignment2() {
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
        <p className="mb-6">A dataset is just a bunch of collected information. It could be anything: numbers, images, texts, measurements, et cetera. For example, if I record everyone’s hair color in Statistics class, that list of data (properties) is a dataset.</p>

        <p className="mb-6">The distribution is kind of how that information is spread out. Is there a hair color that is more represented on the spectrum of colors? Are there rare hair colors? It’s just the overall shape or pattern of our data, how common or rare certain values are.</p>

        <p className="mb-6">
            
            In this assignment, I used a small dataset of american cereals I found on Kaggle, with various nutritional information.
        </p>

        <p className="mb-6">
            Here's a link to the dataset I used:
        </p>

        <a className="mb-6 underline hover:no-underline" href="https://www.kaggle.com/datasets/crawford/80-cereals" target="_blank" rel="noopener noreferrer">
        Kaggle cereal dataset
        </a>

        <p className="mt-6 mb-6">
            Let's explore the distribution of calories per serving in the population of cereals...
        </p>

        <CerealCaloriesChart />

        <p className="mb-6">
            Maybe by looking at the bivariate distribution of calories and sugar content, we could identify a relationship between the two variables.
        </p>

        <BivariateHeatmapChart />

        <h2 className="text-2xl font-semibold mt-12 mb-6">From Statistics to Cryptanalysis</h2>
        
        <p className="mb-6">
          Now, let's try to decode an encrypted text using its distribution of letters. You can write a message in English to be encrypted in the the following text field:
        </p>

        <CaesarCipherDemo />

        <p className="mb-6">
          The key insight is that even when text is encrypted, the underlying letter frequencies remain distinctive to the language. 
          English has characteristic patterns - 'E' is very common, 'Z' is rare. By comparing the frequency distribution of an encrypted text 
          with known English letter frequencies, we can often determine the shift used.
        </p>

        <p className="mb-6">
            Copy and paste your encrypted message below to break the code. 
        </p>

        <FrequencyAnalysisDemo />

        <p className="mb-6">
            So, this means we have to think of more complex ways than Julius Caesaer to secure our messages.
        </p>

      </div>
    </article>
  )
}

// Interactive Chart Component
function CerealCaloriesChart() {
  const [categories, setCategories] = useState(5)
  const [cerealData, setCerealData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('./datasets/cereal.csv')
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n')
        const headers = lines[0].split(',')
        const nameIndex = headers.indexOf('name')
        const caloriesIndex = headers.indexOf('calories')
        
        const data = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',')
            return {
              name: values[nameIndex],
              calories: parseInt(values[caloriesIndex])
            }
          })
          .filter(item => !isNaN(item.calories))
        
        setCerealData(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading cereal data:', error)
        setLoading(false)
      })
  }, [])

  const histogramData = useMemo(() => {
    if (cerealData.length === 0) return null

    const calories = cerealData.map(item => item.calories)
    const min = Math.min(...calories)
    const max = Math.max(...calories)
    const binWidth = (max - min) / categories
    
    const bins = Array(categories).fill(0).map((_, i) => ({
      range: `${Math.round(min + i * binWidth)}-${Math.round(min + (i + 1) * binWidth)}`,
      count: 0,
      cereals: []
    }))

    calories.forEach((calorie, index) => {
      const binIndex = Math.min(Math.floor((calorie - min) / binWidth), categories - 1)
      bins[binIndex].count++
      bins[binIndex].cereals.push(cerealData[index].name)
    })

    return {
      labels: bins.map(bin => bin.range),
      datasets: [{
        label: 'Frequency',
        data: bins.map(bin => bin.count),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
      }],
      bins
    }
  }, [cerealData, categories])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Cereal Calories Distribution',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: '#374151'
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 6,
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frequency',
          font: { weight: 'bold' },
          color: '#374151'
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Calories per Serving',
          font: { weight: 'bold' },
          color: '#374151'
        },
        grid: {
          display: false
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="not-prose my-8">
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-gray-500">Loading chart data...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="not-prose my-8">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Interactive Calories Distribution
          </h3>
          <div className="flex items-center gap-2 justify-center sm:justify-end">
            <span className="text-sm text-gray-600">Categories:</span>
            <button
              onClick={() => setCategories(Math.max(2, categories - 1))}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-semibold transition-colors"
              disabled={categories <= 2}
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-semibold text-gray-800">
              {categories}
            </span>
            <button
              onClick={() => setCategories(Math.min(15, categories + 1))}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-semibold transition-colors"
              disabled={categories >= 15}
            >
              +
            </button>
          </div>
        </div>
        
        <div className="h-80">
          {histogramData && (
            <Bar data={histogramData} options={chartOptions} />
          )}
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>
            Adjust the number of categories using the + and − buttons.
          </p>
        </div>
      </div>
    </div>
  )
}

// Bivariate Heatmap Component
function BivariateHeatmapChart() {
  const [gridSize, setGridSize] = useState(6)
  const [cerealData, setCerealData] = useState([])
  const [loading, setLoading] = useState(true)
  const canvasRef = React.useRef(null)
  const containerRef = React.useRef(null)

  useEffect(() => {
    fetch('./datasets/cereal.csv')
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n')
        const headers = lines[0].split(',')
        const nameIndex = headers.indexOf('name')
        const caloriesIndex = headers.indexOf('calories')
        const sugarsIndex = headers.indexOf('sugars')
        
        const data = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',')
            return {
              name: values[nameIndex],
              calories: parseInt(values[caloriesIndex]),
              sugars: parseFloat(values[sugarsIndex])
            }
          })
          .filter(item => !isNaN(item.calories) && !isNaN(item.sugars))
        
        setCerealData(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading cereal data:', error)
        setLoading(false)
      })
  }, [])

  const heatmapData = useMemo(() => {
    if (cerealData.length === 0) return null

    const calories = cerealData.map(item => item.calories)
    const sugars = cerealData.map(item => item.sugars)
    
    const minCalories = Math.min(...calories)
    const maxCalories = Math.max(...calories)
    const minSugars = Math.min(...sugars)
    const maxSugars = Math.max(...sugars)
    
    const caloriesBinWidth = (maxCalories - minCalories) / gridSize
    const sugarsBinWidth = (maxSugars - minSugars) / gridSize
    
    // Initialize grid
    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0))
    
    // Fill grid with frequencies
    cerealData.forEach(item => {
      const xBin = Math.min(Math.floor((item.calories - minCalories) / caloriesBinWidth), gridSize - 1)
      const yBin = Math.min(Math.floor((item.sugars - minSugars) / sugarsBinWidth), gridSize - 1)
      grid[yBin][xBin]++
    })
    
    const maxFreq = Math.max(...grid.flat())
    
    return {
      grid,
      maxFreq,
      ranges: {
        calories: { min: minCalories, max: maxCalories, width: caloriesBinWidth },
        sugars: { min: minSugars, max: maxSugars, width: sugarsBinWidth }
      }
    }
  }, [cerealData, gridSize])

  useEffect(() => {
    if (!heatmapData || !canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const { grid, maxFreq, ranges } = heatmapData
    
    // Set canvas size (responsive)
    const containerWidth = containerRef.current.clientWidth
    const maxSize = Math.min(containerWidth - 40, 600) // Max 600px, with some margin
    const minSize = 300 // Minimum size for readability
    const canvasSize = Math.max(minSize, maxSize)
    const padding = Math.max(40, canvasSize * 0.1) // Responsive padding
    const cellSize = (canvasSize - padding * 2) / gridSize
    
    // Set actual canvas dimensions for high DPI
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvasSize * dpr
    canvas.height = canvasSize * dpr
    canvas.style.width = canvasSize + 'px'
    canvas.style.height = canvasSize + 'px'
    ctx.scale(dpr, dpr)
    
    // Clear canvas
    ctx.fillStyle = '#f9fafb'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw grid
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const freq = grid[y][x]
        const opacity = freq / maxFreq
        
        // Calculate position
        const posX = padding + x * cellSize
        const posY = padding + (gridSize - 1 - y) * cellSize // Flip Y axis
        
        // Draw cell background
        ctx.fillStyle = '#e5e7eb'
        ctx.fillRect(posX, posY, cellSize, cellSize)
        
        // Draw frequency overlay
        if (freq > 0) {
          ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`
          ctx.fillRect(posX, posY, cellSize, cellSize)
        }
        
        // Draw border
        ctx.strokeStyle = '#d1d5db'
        ctx.lineWidth = 1
        ctx.strokeRect(posX, posY, cellSize, cellSize)
        
        // Draw frequency text if significant
        if (freq > 0) {
          ctx.fillStyle = opacity > 0.5 ? 'white' : '#374151'
          const fontSize = Math.max(8, Math.min(16, cellSize * 0.3)) // Responsive font size
          ctx.font = `${fontSize}px system-ui`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(freq.toString(), posX + cellSize/2, posY + cellSize/2)
        }
      }
    }
    
    // Draw axes labels (responsive fonts)
    ctx.fillStyle = '#374151'
    const labelFontSize = Math.max(10, Math.min(14, canvasSize * 0.025))
    const titleFontSize = Math.max(12, Math.min(16, canvasSize * 0.03))
    
    ctx.font = `bold ${labelFontSize}px system-ui`
    ctx.textAlign = 'center'
    
    // X-axis labels (Calories)
    for (let x = 0; x <= gridSize; x++) {
      const calValue = Math.round(ranges.calories.min + x * ranges.calories.width)
      const posX = padding + x * cellSize
      ctx.fillText(calValue.toString(), posX, canvasSize - padding/3)
    }
    
    // Y-axis labels (Sugars)
    ctx.textAlign = 'right'
    for (let y = 0; y <= gridSize; y++) {
      const sugarValue = Math.round((ranges.sugars.min + y * ranges.sugars.width) * 10) / 10
      const posY = padding + (gridSize - y) * cellSize + cellSize/2
      ctx.fillText(sugarValue.toString(), padding/1.5, posY)
    }
    
    // Axis titles
    ctx.textAlign = 'center'
    ctx.font = `bold ${titleFontSize}px system-ui`
    ctx.fillText('Calories per Serving', canvasSize/2, canvasSize - 5)
    
    ctx.save()
    ctx.translate(15, canvasSize/2)
    ctx.rotate(-Math.PI/2)
    ctx.fillText('Sugar Content (g)', 0, 0)
    ctx.restore()
    
  }, [heatmapData, gridSize])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Trigger re-render on resize
      if (heatmapData && canvasRef.current && containerRef.current) {
        // Small delay to ensure container has updated dimensions
        setTimeout(() => {
          const event = new Event('resize')
          window.dispatchEvent(event)
        }, 100)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [heatmapData])

  if (loading) {
    return (
      <div className="not-prose my-8">
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-gray-500">Loading bivariate chart data...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="not-prose my-8">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Bivariate Distribution: Calories vs Sugar Content
          </h3>
          <div className="flex items-center gap-2 justify-center sm:justify-end">
            <span className="text-sm text-gray-600">Grid Size:</span>
            <button
              onClick={() => setGridSize(Math.max(3, gridSize - 1))}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-semibold transition-colors"
              disabled={gridSize <= 3}
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-semibold text-gray-800">
              {gridSize}
            </span>
            <button
              onClick={() => setGridSize(Math.min(12, gridSize + 1))}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-semibold transition-colors"
              disabled={gridSize >= 12}
            >
              +
            </button>
          </div>
        </div>
        
        <div ref={containerRef} className="flex justify-center w-full">
          <canvas 
            ref={canvasRef}
            className="border border-gray-200 rounded max-w-full"
          />
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded"></div>
              <span>No cereals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-300 border border-gray-300 rounded"></div>
              <span>Low frequency</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 border border-gray-300 rounded"></div>
              <span>High frequency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Caesar Cipher Demo Component
function CaesarCipherDemo() {
  const [text, setText] = useState("HELLO WORLD")
  const [shift, setShift] = useState(3)

  const encrypt = (text, shift) => {
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65)
      }
      return char
    }).join('')
  }

  const decrypt = (text, shift) => {
    return encrypt(text, -shift)
  }

  const encryptedText = encrypt(text, shift)

  return (
    <div className="not-prose my-8">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Caesar Cipher Demonstration
          </h3>
          <div className="flex items-center gap-2 justify-center sm:justify-end">
            <span className="text-sm text-gray-600">Shift:</span>
            <button
              onClick={() => setShift(Math.max(1, shift - 1))}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-semibold transition-colors"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-semibold text-gray-800">
              {shift}
            </span>
            <button
              onClick={() => setShift(Math.min(25, shift + 1))}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-semibold transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Original Text (uppercase letters only):
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value.toUpperCase().replace(/[^A-Z\s]/g, ''))}
              className="w-full p-3 border border-gray-300 rounded-lg font-mono text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter text to encrypt..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">🔒 Encrypted</h4>
              <div className="font-mono text-lg text-red-700 break-all">
                {encryptedText || "Enter text above"}
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">🔓 Decrypted (known shift)</h4>
              <div className="font-mono text-lg text-green-700 break-all">
                {decrypt(encryptedText, shift) || "Enter text above"}
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <p className="mb-2">
              <strong>How it works:</strong> Each letter is shifted by {shift} positions in the alphabet.
            </p>
            <p>
              Example: A→{String.fromCharCode(((0 + shift) % 26) + 65)}, 
              B→{String.fromCharCode(((1 + shift) % 26) + 65)}, 
              C→{String.fromCharCode(((2 + shift) % 26) + 65)}...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Frequency Analysis Demo Component
function FrequencyAnalysisDemo() {
  const [encryptedText, setEncryptedText] = useState("WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ")
  const [guessedShift, setGuessedShift] = useState(0)

  // English letter frequencies (approximate percentages)
  const englishFreq = {
    'A': 8.2, 'B': 1.5, 'C': 2.8, 'D': 4.3, 'E': 12.7, 'F': 2.2, 'G': 2.0, 'H': 6.1,
    'I': 7.0, 'J': 0.15, 'K': 0.77, 'L': 4.0, 'M': 2.4, 'N': 6.7, 'O': 7.5, 'P': 1.9,
    'Q': 0.095, 'R': 6.0, 'S': 6.3, 'T': 9.1, 'U': 2.8, 'V': 0.98, 'W': 2.4, 'X': 0.15,
    'Y': 2.0, 'Z': 0.074
  }

  const calculateFrequencies = (text) => {
    const letters = text.replace(/[^A-Z]/g, '')
    const counts = {}
    const total = letters.length

    // Initialize all letters
    for (let i = 65; i <= 90; i++) {
      counts[String.fromCharCode(i)] = 0
    }

    // Count letters
    for (let char of letters) {
      counts[char]++
    }

    // Convert to percentages
    const frequencies = {}
    for (let letter in counts) {
      frequencies[letter] = total > 0 ? (counts[letter] / total) * 100 : 0
    }

    return frequencies
  }

  const decrypt = (text, shift) => {
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65)
      }
      return char
    }).join('')
  }

  const decryptedText = decrypt(encryptedText, guessedShift)
  const textFreq = calculateFrequencies(encryptedText)

  // Calculate chi-squared statistic for current shift
  const calculateChiSquared = (shift) => {
    const testText = decrypt(encryptedText, shift)
    const testFreq = calculateFrequencies(testText)
    
    let chiSquared = 0
    for (let letter in englishFreq) {
      const expected = englishFreq[letter]
      const observed = testFreq[letter]
      chiSquared += Math.pow(observed - expected, 2) / expected
    }
    return chiSquared
  }

  // Find best shift (lowest chi-squared)
  const findBestShift = () => {
    let bestShift = 0
    let bestScore = Infinity
    
    for (let shift = 0; shift < 26; shift++) {
      const score = calculateChiSquared(shift)
      if (score < bestScore) {
        bestScore = score
        bestShift = shift
      }
    }
    return bestShift
  }

  const bestShift = findBestShift()

  return (
    <div className="not-prose my-8">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Frequency Analysis Decoder
          </h3>
          <div className="flex items-center gap-2 justify-center sm:justify-end">
            <span className="text-sm text-gray-600">Try Shift:</span>
            <button
              onClick={() => setGuessedShift(Math.max(0, guessedShift - 1))}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-semibold transition-colors"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-semibold text-gray-800">
              {guessedShift}
            </span>
            <button
              onClick={() => setGuessedShift(Math.min(25, guessedShift + 1))}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-semibold transition-colors"
            >
              +
            </button>
            <button
              onClick={() => setGuessedShift(bestShift)}
              className="ml-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              Auto-solve
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Encrypted Message:
            </label>
            <input
              type="text"
              value={encryptedText}
              onChange={(e) => setEncryptedText(e.target.value.toUpperCase().replace(/[^A-Z\s]/g, ''))}
              className="w-full p-3 border border-gray-300 rounded-lg font-mono text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Letter Frequency Comparison</h4>
              <div className="h-64 overflow-y-auto">
                <FrequencyChart 
                  englishFreq={englishFreq} 
                  textFreq={calculateFrequencies(decryptedText)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Decrypted Attempt (Shift {guessedShift})</h4>
                <div className="font-mono text-lg text-blue-700 break-all">
                  {decryptedText}
                </div>
                <div className="text-sm text-blue-600 mt-2">
                  Chi-squared score: {calculateChiSquared(guessedShift).toFixed(2)}
                  {guessedShift === bestShift && " Best match!"}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Statistical Best Guess</h4>
                <div className="font-mono text-lg text-green-700 break-all">
                  {decrypt(encryptedText, bestShift)}
                </div>
                <div className="text-sm text-green-600 mt-2">
                  Detected shift: {bestShift} (score: {calculateChiSquared(bestShift).toFixed(2)})
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <p className="mb-2">
              <strong>How frequency analysis works:</strong> We compare the letter frequencies in the decrypted text 
              with typical English frequencies. The shift that produces the closest match is likely correct.
            </p>
            <p>
              The chi-squared test measures how well the frequencies match - lower scores indicate better matches.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Simple frequency comparison chart
function FrequencyChart({ englishFreq, textFreq }) {
  const letters = Object.keys(englishFreq).sort()

  return (
    <div className="space-y-1">
      {letters.map(letter => (
        <div key={letter} className="flex items-center gap-2 text-sm">
          <span className="w-4 font-mono font-bold">{letter}</span>
          <div className="flex-1 flex gap-1">
            <div className="flex-1 bg-gray-200 rounded h-4 relative">
              <div 
                className="bg-blue-400 h-full rounded" 
                style={{ width: `${(englishFreq[letter] / 15) * 100}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-700">
                {englishFreq[letter].toFixed(1)}%
              </span>
            </div>
            <div className="flex-1 bg-gray-200 rounded h-4 relative">
              <div 
                className="bg-red-400 h-full rounded" 
                style={{ width: `${(textFreq[letter] / 15) * 100}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-700">
                {textFreq[letter].toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      ))}
      <div className="flex gap-2 text-xs text-gray-600 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-400 rounded"></div>
          <span>English</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-400 rounded"></div>
          <span>Your text</span>
        </div>
      </div>
    </div>
  )
}