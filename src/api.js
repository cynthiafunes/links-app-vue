import axios from 'axios'

const API_URL = 'http://localhost:3000'

const apiCall = async (method, url, data = null) => {
  try {
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data
    })
    return response.data
  } catch (error) {
    console.error(`Error en llamada a API (${method} ${url}):`, error)
    throw error
  }
}

export const fetchLinks = (tag = '') => 
  apiCall('get', tag ? `/links?tag=${tag}` : '/links')

export const fetchLinkById = (id) => 
  apiCall('get', `/links/${id}`)

export const fetchTags = () => 
  apiCall('get', '/tags')

export const createLink = (linkData) => 
  apiCall('post', '/links', linkData)

export const addComment = (linkId, commentData) => 
  apiCall('post', `/links/${linkId}/comments`, commentData)

export const addVote = (linkId) => 
  apiCall('post', `/links/${linkId}/votes`, { value: 1 })