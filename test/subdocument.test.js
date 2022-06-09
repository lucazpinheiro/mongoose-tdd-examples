import assert from 'assert'
import User from '../src/user.js'

describe('Subdocuments', () => {
  it('can create a subdocument', () => {
    const user = new User({
      name: 'Al',
      posts: [{ title: 'New Post' }]
    })

    user.save()
      .then(() => User.findOne({ name: 'Al' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post')
      })
  })

  it('can add subdocuments to an existing record', (done) => {
    const joe = new User({ name: 'Joe', posts: [] })
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' })
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post')
        done()
      })
  })

  it('can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [
        { title: 'New Post' }
      ]
    })
    joe.save()
      .then(() => User.findOne({name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove() // .remove() é um método do mongoose para remover elementos de um array
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0)
        done()
      })
  })
})