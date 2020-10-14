import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = (props) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    if (blogTitle && blogAuthor && blogUrl) {
      const newBlog = {
        'title': blogTitle,
        'author': blogAuthor,
        'url': blogUrl
      }

      await blogService.createBlog(newBlog)
      setBlogUrl('')
      setBlogTitle('')
      setBlogAuthor('')

      const blogs = await blogService.getAllBlogs()
      props.setBlogs(blogs)
      props.setNotification(`New Blog ${blogTitle} by ${blogAuthor} added`)
      setTimeout(() => {
        props.setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      <form onSubmit={handleCreateBlog}>
        <div>
          t i t l e :
        <input
            type="text"
            value={blogTitle}
            name="title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          a u t h o r :
        <input
            type="text"
            value={blogAuthor}
            name="author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          u r l :
        <input
            type="text"
            value={blogUrl}
            name="url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit"> c r e a t e </button>
      </form>
    </div>
  )
}

export default CreateBlog