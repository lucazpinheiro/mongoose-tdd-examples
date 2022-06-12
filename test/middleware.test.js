import assert from 'assert'
import mongoose from 'mongoose'
import User from '../src/user.js'
import BlogPost from '../src/blogPost.js'

describe('Middleware', () => {
  let joe, blogPost

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' })

    // mongoose entende que a propriedade blogPosts é um array para associação
    // e ao invés de ser um array de objetos, é um array de referências para outros documentos
    joe.blogPosts.push(blogPost)

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done())
  })

  it('users clean up dangling blogposts on remove', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0)
        done()
      })
  })
})