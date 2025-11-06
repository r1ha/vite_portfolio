import React, { useState, useEffect, useMemo } from 'react'

export const metadata = {
  id: 3,
  title: "Breaking RSA with statistical analysis",
  category: "Statistics", 
  author: "Erwan Achat",
  studentId: "2244316",
  date: "2025",
  description: "Showcasing RSA vulnerabilities through frequency analysis and statistical methods"
}

export default function Assignment3() {
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
          RSA (Rivest-Shamir-Adleman) is one of the most widely used public-key cryptosystems in the world. 
          Unlike simple substitution ciphers, RSA relies on the mathematical difficulty of factoring large prime numbers. 
          However, even this robust system can have vulnerabilities that statistical analysis can help exploit.
        </p>

        <p className="mb-6">
          While RSA itself is mathematically secure when properly implemented, poor implementation practices, 
          weak key generation, or improper padding can create weaknesses. In this assignment, we'll explore 
          how frequency analysis - the same technique used against Caesar ciphers - can be adapted to attack 
          certain RSA implementations.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Understanding RSA Fundamentals</h2>
        
        <p className="mb-6">
          RSA encryption works by generating two large prime numbers and using modular arithmetic. 
          Let's start with a simplified RSA demonstration to understand how the algorithm works before 
          exploring its potential weaknesses.
        </p>

        <RSADemo />

        <p className="mb-6">
          The strength of RSA lies in the difficulty of factoring the product of two large primes. 
          However, when RSA is used to encrypt character-by-character (which is not recommended in practice), 
          patterns in the plaintext can still emerge in the ciphertext, making frequency analysis possible.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">RSA Frequency Analysis Attack</h2>

        <p className="mb-6">
          When RSA is improperly used to encrypt individual characters with the same key pair, 
          identical characters will always produce identical ciphertext values. This creates a vulnerability 
          that frequency analysis can exploit, similar to simple substitution ciphers.
        </p>

        <RSAFrequencyAttack />

        <p className="mb-6">
          This demonstrates why proper RSA implementation uses padding schemes like OAEP (Optimal Asymmetric Encryption Padding) 
          and typically encrypts larger blocks or symmetric keys rather than individual characters. 
          The statistical patterns we observe here highlight the importance of proper cryptographic practices.
        </p>

      </div>
    </article>
  )
}

// Simple RSA implementation for educational purposes
function generateRSAKeys(keySize = 8) {
  // Generate small primes for demonstration (not cryptographically secure)
  const primes = [7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
  const p = primes[Math.floor(Math.random() * primes.length)]
  let q = primes[Math.floor(Math.random() * primes.length)]
  while (q === p) {
    q = primes[Math.floor(Math.random() * primes.length)]
  }
  
  const n = p * q
  const phi = (p - 1) * (q - 1)
  
  // Choose e (commonly 65537, but we'll use 65 for simplicity)
  let e = 65
  while (gcd(e, phi) !== 1) {
    e++
  }
  
  // Calculate d (private exponent)
  const d = modInverse(e, phi)
  
  return { publicKey: { n, e }, privateKey: { n, d }, p, q, phi }
}

function gcd(a, b) {
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}

function modInverse(a, m) {
  for (let i = 1; i < m; i++) {
    if ((a * i) % m === 1) {
      return i
    }
  }
  return 1
}

function modPow(base, exp, mod) {
  let result = 1
  base = base % mod
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod
    }
    exp = Math.floor(exp / 2)
    base = (base * base) % mod
  }
  return result
}

// RSA Demo Component
function RSADemo() {
  const [message, setMessage] = useState("HELLO")
  const [keys, setKeys] = useState(() => generateRSAKeys())

  const encrypt = (char) => {
    const charCode = char.charCodeAt(0)
    return modPow(charCode, keys.publicKey.e, keys.publicKey.n)
  }

  const decrypt = (cipherNum) => {
    const decrypted = modPow(cipherNum, keys.privateKey.d, keys.privateKey.n)
    return String.fromCharCode(decrypted)
  }

  const encryptedMessage = message.split('').map(char => encrypt(char))
  const decryptedMessage = encryptedMessage.map(num => decrypt(num)).join('')

  return (
    <div className="not-prose my-8">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            RSA Encryption Demonstration
          </h3>
          <div className="flex items-center gap-2 justify-center sm:justify-end">
            <button
              onClick={() => setKeys(generateRSAKeys())}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              Generate New Keys
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Public Key</h4>
              <div className="font-mono text-sm text-blue-700">
                <div>n = {keys.publicKey.n}</div>
                <div>e = {keys.publicKey.e}</div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Private Key</h4>
              <div className="font-mono text-sm text-red-700">
                <div>n = {keys.privateKey.n}</div>
                <div>d = {keys.privateKey.d}</div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message to encrypt (uppercase letters only):
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
              className="w-full p-3 border border-gray-300 rounded-lg font-mono text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter message..."
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Original</h4>
              <div className="font-mono text-lg text-gray-700 break-all">
                {message || "Enter text above"}
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">🔒 Encrypted</h4>
              <div className="font-mono text-sm text-red-700 break-all max-h-20 overflow-y-auto">
                [{encryptedMessage.join(', ')}]
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">🔓 Decrypted</h4>
              <div className="font-mono text-lg text-green-700 break-all">
                {decryptedMessage || "Enter text above"}
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <p className="mb-2">
              <strong>Key Generation:</strong> p = {keys.p}, q = {keys.q}, φ(n) = {keys.phi}
            </p>
            <p>
              <strong>Encryption:</strong> Each character is converted to ASCII and encrypted as: c = m^e mod n
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// RSA Frequency Analysis Attack Component
function RSAFrequencyAttack() {
  const [encryptedText, setEncryptedText] = useState("301,425,301,301,413")
  const [keys] = useState(() => generateRSAKeys())
  const [mappingGuesses, setMappingGuesses] = useState({})

  // English letter frequencies (approximate percentages)
  const englishFreq = {
    'A': 8.2, 'B': 1.5, 'C': 2.8, 'D': 4.3, 'E': 12.7, 'F': 2.2, 'G': 2.0, 'H': 6.1,
    'I': 7.0, 'J': 0.15, 'K': 0.77, 'L': 4.0, 'M': 2.4, 'N': 6.7, 'O': 7.5, 'P': 1.9,
    'Q': 0.095, 'R': 6.0, 'S': 6.3, 'T': 9.1, 'U': 2.8, 'V': 0.98, 'W': 2.4, 'X': 0.15,
    'Y': 2.0, 'Z': 0.074
  }

  const parseEncryptedNumbers = (text) => {
    return text.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
  }

  const calculateCipherFrequencies = (numbers) => {
    const counts = {}
    numbers.forEach(num => {
      counts[num] = (counts[num] || 0) + 1
    })
    
    const total = numbers.length
    const frequencies = {}
    Object.keys(counts).forEach(num => {
      frequencies[num] = (counts[num] / total) * 100
    })
    
    return frequencies
  }

  const encryptedNumbers = parseEncryptedNumbers(encryptedText)
  const cipherFreq = calculateCipherFrequencies(encryptedNumbers)
  const sortedCipherNums = Object.keys(cipherFreq).sort((a, b) => cipherFreq[b] - cipherFreq[a])
  const sortedEnglishLetters = Object.keys(englishFreq).sort((a, b) => englishFreq[b] - englishFreq[a])

  const suggestMapping = () => {
    const newMapping = {}
    sortedCipherNums.forEach((num, index) => {
      if (index < sortedEnglishLetters.length) {
        newMapping[num] = sortedEnglishLetters[index]
      }
    })
    setMappingGuesses(newMapping)
  }

  const updateMapping = (cipherNum, letter) => {
    setMappingGuesses(prev => ({
      ...prev,
      [cipherNum]: letter
    }))
  }

  const decryptAttempt = () => {
    return encryptedNumbers.map(num => mappingGuesses[num] || '?').join('')
  }

  // Generate example encrypted text
  const generateExample = () => {
    const sampleTexts = [
      "HELLO WORLD",
      "THE QUICK BROWN FOX",
      "FREQUENCY ANALYSIS",
      "STATISTICAL ATTACK"
    ]
    const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
    const encrypted = text.replace(/[^A-Z]/g, '').split('').map(char => {
      const charCode = char.charCodeAt(0)
      return modPow(charCode, keys.publicKey.e, keys.publicKey.n)
    })
    setEncryptedText(encrypted.join(', '))
    setMappingGuesses({})
  }

  return (
    <div className="not-prose my-8">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            RSA Frequency Analysis Attack
          </h3>
          <div className="flex items-center gap-2 justify-center sm:justify-end">
            <button
              onClick={generateExample}
              className="px-3 py-1 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
            >
              New Example
            </button>
            <button
              onClick={suggestMapping}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              Auto-map
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Encrypted Message (comma-separated numbers):
            </label>
            <input
              type="text"
              value={encryptedText}
              onChange={(e) => setEncryptedText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Cipher Number Frequencies</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {sortedCipherNums.map(num => (
                  <div key={num} className="flex items-center gap-2 text-sm">
                    <span className="w-12 font-mono font-bold">{num}</span>
                    <div className="flex-1 bg-gray-200 rounded h-6 relative">
                      <div 
                        className="bg-red-400 h-full rounded" 
                        style={{ width: `${(cipherFreq[num] / Math.max(...Object.values(cipherFreq))) * 100}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-700">
                        {cipherFreq[num].toFixed(1)}%
                      </span>
                    </div>
                    <select
                      value={mappingGuesses[num] || ''}
                      onChange={(e) => updateMapping(num, e.target.value)}
                      className="w-12 text-xs border border-gray-300 rounded"
                    >
                      <option value="">?</option>
                      {sortedEnglishLetters.map(letter => (
                        <option key={letter} value={letter}>{letter}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Decryption Attempt</h4>
                <div className="font-mono text-lg text-blue-700 break-all">
                  {decryptAttempt() || "Map cipher numbers to letters"}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Expected English Frequencies</h4>
                <div className="text-xs text-yellow-700 grid grid-cols-3 gap-1">
                  {sortedEnglishLetters.slice(0, 9).map(letter => (
                    <div key={letter}>{letter}: {englishFreq[letter]}%</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <p className="mb-2">
              <strong>Attack method:</strong> When RSA encrypts individual characters, identical plaintext produces 
              identical ciphertext. We can use frequency analysis to map common cipher numbers to common English letters.
            </p>
            <p>
              <strong>Vulnerability:</strong> This attack works because proper RSA should use padding and encrypt larger 
              blocks, not individual characters. The patterns reveal the weakness of character-by-character encryption.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}