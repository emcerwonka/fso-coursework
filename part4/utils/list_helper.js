const dummy = (blogs) => {
  return 1
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : findFavorite(blogs)
}

const findFavorite = (blogs) => {
  const maxLikes =
    blogs
      .map(blog => blog.likes)
      .reduce((prevLikes, nextLikes) => {
        return Math.max(prevLikes, nextLikes)
      })

  return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  return blogs.length === 0
    ? {}
    : findAuthorWithMostBlogs(blogs)
}

const findAuthorWithMostBlogs = (blogs) => {
  let authorList = blogs.reduce((authors, blog) => {
    authors[blog.author] = authors[blog.author] || []
    authors[blog.author].push(blog)
    return authors
  }, {})

  let authorNumbers = []
  for (var entry in authorList) {
    authorNumbers.push({
      author: entry,
      blogs: authorList[entry].length
    })
  }

  return authorNumbers.reduce((maxAuthor, author) => maxAuthor.blogs > author.blogs ? maxAuthor : author)
}

const mostLikes = (blogs) => {
  return blogs.length === 0
    ? {}
    : findAuthorWithMostLikes(blogs)
}

const findAuthorWithMostLikes = (blogs) => {
  let authorList = blogs.reduce((authors, blog) => {
    authors[blog.author] = authors[blog.author] || []
    authors[blog.author].push(blog)
    return authors
  }, {})

  let authorNumbers = []
  for (var entry in authorList) {
    authorNumbers.push({
      author: entry,
      likes: authorList[entry]
        .map(blog => blog.likes)
        .reduce((sum, likes) => {
          return sum + likes
        }, 0)
    })
  }

  return authorNumbers.reduce((maxAuthor, author) => maxAuthor.likes > author.likes ? maxAuthor : author)

}

const totalLikes = (blogs) => {
  const likeSum = (sumLikes, nextLike) => {
    return sumLikes + nextLike
  }

  return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce(likeSum)
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes
}