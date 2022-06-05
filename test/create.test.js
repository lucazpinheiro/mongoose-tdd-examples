import assert from 'assert'
import mongoose from 'mongoose'
import User from '../src/user.js'



describe('Creating records', () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      // ready to run the next test
      done()
    })
  })

  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' })
    joe.save()
      .then(() => {
        assert(!joe.isNew)
        done()
      })
  })
})