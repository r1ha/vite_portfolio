import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getAllArticles, getCategories, getArticlesByCategory, searchArticles } from '../articles'

export default function Blog(){
    const [category, setCategory] = useState('All')
    const [query, setQuery] = useState('')
    
    const allArticles = getAllArticles()
    const categories = getCategories()

    // combine category filter and search query
    const filtered = useMemo(() => {
        let results = getArticlesByCategory(category)
        if (query.trim()) {
            const searchTerm = query.toLowerCase().trim()
            results = results.filter(article => 
                article.metadata.title.toLowerCase().includes(searchTerm) ||
                article.metadata.description.toLowerCase().includes(searchTerm)
            )
        }
        return results
    }, [category, query])

    return (
        <div className="min-h-screen text-black p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header: stacks on small screens, row on sm+ */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                    <h1 className="text-5xl font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300 }}>Blog</h1>
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
                                    {categories.map(cat => (
                                        <CategoryButton 
                                            key={cat}
                                            label={cat} 
                                            active={category === cat} 
                                            onClick={() => setCategory(cat)} 
                                        />
                                    ))}
                                </>
                            )
                        })()
                    }
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6">
                    <div>
                        {filtered.length === 0 && <p className="text-sm text-neutral-500">No articles in this category.</p>}
                        {filtered.map(article => (
                            <article key={article.id} className="mb-6 p-6 bg-white shadow-sm rounded-lg hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                                    <span className="uppercase tracking-wide">{article.metadata.category}</span>
                                    {article.metadata.date && (
                                        <>
                                            <span>•</span>
                                            <span>{article.metadata.date}</span>
                                        </>
                                    )}
                                </div>
                                <h4 className="font-semibold text-xl text-neutral-800 mb-3">
                                    <Link to={`/article/${article.id}`} className="hover:underline hover:text-neutral-600 transition-colors">
                                        {article.metadata.title}
                                    </Link>
                                </h4>
                                {article.metadata.description && (
                                    <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{article.metadata.description}</p>
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="text-xs text-neutral-500">
                                        By {article.metadata.author || 'Anonymous'}
                                    </div>
                                    <Link 
                                        to={`/article/${article.id}`} 
                                        className="text-sm text-neutral-700 hover:text-neutral-900 font-medium transition-colors"
                                    >
                                        Read more
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
