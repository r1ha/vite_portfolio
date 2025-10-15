import Assignment1, { metadata as assignment1Meta } from './Assignment1'
import Assignment2, { metadata as assignment2Meta } from './Assignment2'

// Central index of all articles
export const articles = [
  {
    id: assignment1Meta.id,
    component: Assignment1,
    metadata: assignment1Meta
  },

  {
    id: 2,
    component: Assignment2,
    metadata: assignment2Meta
  }
]

// Helper functions
export const getArticleById = (id) => {
  const numericId = parseInt(id)
  return articles.find(article => article.id === numericId)
}

export const getAllArticles = () => articles

export const getArticlesByCategory = (category) => {
  if (category === 'All') return articles
  return articles.filter(article => article.metadata.category === category)
}

export const searchArticles = (query) => {
  const searchTerm = query.toLowerCase().trim()
  if (!searchTerm) return articles
  
  return articles.filter(article => 
    article.metadata.title.toLowerCase().includes(searchTerm) ||
    article.metadata.description.toLowerCase().includes(searchTerm) ||
    article.metadata.category.toLowerCase().includes(searchTerm)
  )
}

// Get unique categories for filter buttons
export const getCategories = () => {
  const categories = ['All', ...new Set(articles.map(article => article.metadata.category))]
  return categories
}