import React from 'react'
import { useParams, Link } from 'react-router-dom'
import articlesData from '../data/articles.json'

export default function Article(){
  const { id } = useParams()
  const article = articlesData.find(a => String(a.id) === String(id))

  if (!article) {
    return (
      <div className="min-h-screen p-8 text-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Article not found</h1>
          <p className="mb-4">No article with ID <strong>{id}</strong>  was found</p>
          <Link to="/blog" className="text-sm text-neutral-600 hover:text-black">Back</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 text-black">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-3xl font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300 }}>{article.title}</h1>
          <Link to="/blog" className="text-sm text-neutral-600 hover:text-black">Back</Link>
        </div>
        <div className="text-xs text-neutral-500 mb-4">{article.category}</div>
        <div className="prose max-w-none text-neutral-800 whitespace-pre-line">{article.text}</div>
      </div>
    </div>
  )
}
