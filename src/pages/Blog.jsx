import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import articlesData from '../data/articles.json'

export default function Blog(){
    const [articles] = useState(articlesData)
    const [category, setCategory] = useState('All')
    const [query, setQuery] = useState('')

    // combine category filter and search query (title)
    const filtered = articles
        .filter(a => category === 'All' ? true : a.category === category)
        .filter(a => a.title.toLowerCase().includes(query.trim().toLowerCase()))

    return (
        <div className="min-h-screen text-black p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header: stacks on small screens, row on sm+ */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                    <h1 className="text-3xl font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300 }}>Blog</h1>
                    <Link to="/" className="text-sm transition text-neutral-600 hover:text-black sm:ml-4">Back</Link>
                </div>

                <div className="mb-4">
                    <input
                        aria-label="Search articles by title"
                        className="w-full max-w-lg px-3 py-2 bg-gray-50 border border-gray-200 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                        placeholder="Search by title..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* Category buttons (factorized) */}
                <div className="mb-4 flex gap-2">
                    {/** Small local button component to keep markup compact and consistent */}
                    {
                        (() => {
                            function CategoryButton({ label, active, onClick }){
                                const base = 'px-3 py-1 rounded transition-colors duration-150 text-sm'
                                const activeCls = 'bg-neutral-800 text-white'
                                const inactiveCls = 'bg-gray-100 text-neutral-800'
                                // also apply hover to set bg to neutral-800 when not active
                                const hoverCls = 'hover:bg-neutral-600 hover:text-white'
                                return (
                                    <button
                                        aria-pressed={active}
                                        onClick={onClick}
                                        className={`${base} ${active ? activeCls : inactiveCls} ${hoverCls}`}
                                    >
                                        {label}
                                    </button>
                                )
                            }

                            return (
                                <>
                                    <CategoryButton label="All" active={category==='All'} onClick={() => setCategory('All')} />
                                    <CategoryButton label="Statistics" active={category==='Statistics'} onClick={() => setCategory('Statistics')} />
                                    <CategoryButton label="Other" active={category==='Other'} onClick={() => setCategory('Other')} />
                                </>
                            )
                        })()
                    }
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6">
                    <div>
                        {filtered.length === 0 && <p className="text-sm text-neutral-500">No articles in this category.</p>}
                        {filtered.map(a => (
                            <article key={a.id} className="mb-4 p-6 bg-gray-50 shadow-sm border border-gray-100 rounded-lg">
                                <div className="text-xs text-neutral-500 mb-2">{a.category}</div>
                                <h4 className="font-semibold text-xl text-neutral-800">
                                    <Link to={`/article/${a.id}`} className="hover:underline">{a.title}</Link>
                                </h4>
                                <p className="mt-3 text-sm text-neutral-700 whitespace-pre-line">{a.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
