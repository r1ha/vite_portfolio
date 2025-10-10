import React, { useRef } from 'react'

export default function ProjectGallery({ projects = [], labels = {} }){
  const ref = useRef(null)

  function scrollBy(amount){
    if (!ref.current) return
    ref.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const L = {
    title: labels.title || 'Projects',
    noImage: labels.noImage || 'No image',
    scrollLeft: labels.scrollLeft || 'scroll left',
    scrollRight: labels.scrollRight || 'scroll right'
  }

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">{L.title}</h3>
        <div className="hidden sm:flex gap-2">
          <button aria-label={L.scrollLeft} onClick={() => scrollBy(-300)} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button aria-label={L.scrollRight} onClick={() => scrollBy(300)} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div ref={ref} className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-4 py-2">
        {projects.map(p => (
          <article key={p.id} className="snap-center flex-shrink-0 w-80 sm:w-64 bg-white border rounded-xl shadow-sm p-4">
            <div className="w-full h-36 bg-gray-100 rounded-md overflow-hidden mb-3">
              {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-neutral-400">{L.noImage}</div>}
            </div>
            <h4 className="text-sm font-semibold mb-1">{p.title}</h4>
            <p className="text-xs text-neutral-600 mb-3">{p.subtitle}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags && p.tags.map(t => (
                <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded">{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}`}</style>
    </section>
  )
}
