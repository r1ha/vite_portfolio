import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getArticleById } from '../articles'

export default function Article(){
  const { id } = useParams()
  const articleData = getArticleById(id)

  if (!articleData) {
    return (
      <div className="min-h-screen p-8 text-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Article not found</h1>
          <p className="mb-4">No article with ID <strong>{id}</strong> was found</p>
          <Link to="/blog" className="text-sm text-neutral-600 hover:text-black">Back to Blog</Link>
        </div>
      </div>
    )
  }

  const ArticleComponent = articleData.component

  return (
    <div className="min-h-screen p-8 text-black">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-8 my-8 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-8">
            <Link to="/blog" className="text-sm text-neutral-600 hover:text-black transition-colors">
              ← Back to Blog
            </Link>
          </div>
          
          <ArticleComponent />
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black transition-colors">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
