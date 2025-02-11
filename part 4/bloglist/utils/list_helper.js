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

module.exports = {
    dummy,
    totalLikes,
    mostBlogs,
}