import Assignment1, { metadata as assignment1Meta } from './Assignment1'
import Assignment2, { metadata as assignment2Meta } from './Assignment2'
import Assignment3, { metadata as assignment3Meta } from './Assignment3'
import Assignment4, { metadata as assignment4Meta } from './Assignment4'
import Assignment5, { metadata as assignment5Meta } from './Assignment5'
import Assignment6, { metadata as assignment6Meta } from './Assignment6'

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
  },

  {
    id: assignment3Meta.id,
    component: Assignment3,
    metadata: assignment3Meta
  },

  {
    id: assignment4Meta.id,
    component: Assignment4,
    metadata: assignment4Meta
  },

  {
    id: assignment5Meta.id,
    component: Assignment5,
    metadata: assignment5Meta
  },

  {
    id: assignment6Meta.id,
    component: Assignment6,
    metadata: assignment6Meta
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