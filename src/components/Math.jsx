import React, { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export function InlineMath({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      katex.render(children, ref.current, {
        throwOnError: false,
        displayMode: false
      })
    }
  }, [children])

  return <span ref={ref} className="inline-math" />
}

export function BlockMath({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      katex.render(children, ref.current, {
        throwOnError: false,
        displayMode: true
      })
    }
  }, [children])

  return <div ref={ref} className="block-math my-4" />
}
