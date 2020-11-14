import React, { useState } from 'react'

const CreateBlogForm = ({
  createBlog
}) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const blogAuthorChangeHandler = (event) => {
    setBlogAuthor(event.target.value)
  }

  const blogTitleChangeHandler = (event) => {
    setBlogTitle(event.target.value)
  }

  const blogUrlChangeHandler = (event) => {
    setBlogUrl(event.target.value)
  }

  const createBlogHandler = (event) => {
    event.preventDefault()
    createBlog(blogTitle, blogAuthor, blogUrl)

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <form className='createBlogForm' onSubmit={createBlogHandler}>
        <div>
          t i t l e :
          <input 
            className='title'
            id='title'
            type="text"
            value={blogTitle}
            name="title"
            onChange={blogTitleChangeHandler}
          />
        </div>
        <div>
          a u t h o r :
          <input 
            className='author'
            id='author'
            type="text"
            value={blogAuthor}
            name="author"
            onChange={blogAuthorChangeHandler}
          />
        </div>
        <div>
          u r l :
          <input 
            className='url'
            id='url'
            type="text"
            value={blogUrl}
            name="url"
            onChange={blogUrlChangeHandler}
          />
        </div>
        <button type="submit"> c r e a t e </button>
      </form>
    </div>
  )
}

export default CreateBlogForm