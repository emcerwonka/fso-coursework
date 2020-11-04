import React, { useState } from 'react'

const Blog = ({
  blog,
  addLike,
  deleteBlog
}) => {
  const [blogState, setNewBlogState] = useState(blog)
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 8,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const addLikeHandler = (event) => {
    event.preventDefault()
    blog.likes = blog.likes + 1
    let blogForRequest = blog
    delete blogForRequest.user
    addLike(blogForRequest)
    setNewBlogState(blog)
  }

  const deleteBlogHandler = (event) => {
    event.preventDefault()
    if (window.confirm(`Do you really want to remove ${blog.title}?`)) {
      console.log(`Deleting blog with id ${blog.id}`)
      deleteBlog(blog)
    }
  }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} BY {blog.author} <button onClick={toggleVisibility}>v i e w</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} BY {blog.author} <button onClick={toggleVisibility}>h i d e</button>
        </div>
        <div>
          URL : {blog.url}
        </div>
        <div>
          LIKES : {blog.likes} <button onClick={addLikeHandler}>l i k e</button>
        </div>
        <div>
          <button onClick={deleteBlogHandler}>r e m o v e</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
