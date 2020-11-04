import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog) => {
  const response = await axios.post(
    baseUrl, blog, { headers: { Authorization: token } }
  )
  return response.data
}

const deleteBlog = async (blog) => {
  const response = await axios.delete(
    baseUrl + `/${blog.id}`, { headers: { Authorization: token }}
  )
  return response.data
}

const updateBlog = async (blog) => {
  const response = await axios.put(
    baseUrl + `/${blog.id}`, blog, { headers: { Authorization: token }}
  )
  return response.data
}

export default { createBlog, deleteBlog, getAllBlogs, setToken, updateBlog }