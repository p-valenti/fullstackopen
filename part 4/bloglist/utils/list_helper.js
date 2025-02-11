const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const blogCount = lodash.countBy(blogs, 'author')

    const topAuthor = lodash.maxBy(Object.keys(blogCount), (author) => blogCount[author])

    return {
        author: topAuthor,
        blogs: blogCount[topAuthor]
    }
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const favorite = blogs.reduce((max, blog) => {
        return blog.likes > max.likes ? blog : max
    })
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes,
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const authorLikes = blogs.reduce((result, blog) => {
        result[blog.author] = (result[blog.author] || 0) + blog.likes
        return result
    }, {})

    const mostLikesAuthor = Object.keys(authorLikes).reduce((maxAuthor, author) => {
        return authorLikes[author] > authorLikes[maxAuthor] ? author : maxAuthor
    })

    return {
        author: mostLikesAuthor,
        likes: authorLikes[mostLikesAuthor]
    }
}

module.exports = {
    dummy,
    totalLikes,
    mostBlogs,
    favoriteBlog,
    mostLikes,
}