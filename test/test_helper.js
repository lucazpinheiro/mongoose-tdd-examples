import mongoose from 'mongoose'

before(done => {
  mongoose.connect('mongodb://localhost/users_test')
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      throw err
    })
})

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done()
      })
    })
  })
})