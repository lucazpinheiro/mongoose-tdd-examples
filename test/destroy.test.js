import assert from 'assert'
import mongoose from 'mongoose'
import User from '../src/user.js'

describe('Deleting a user', () => {
  let joe

  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      // ready to run the next test 
    })
    joe = new User({ name: 'Joe' })
    joe.save()
      .then(() => done())
  })

  it('model instance remove', (done) => {
    joe.remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })

  it('class method remove', (done) => {
    // acessa o método remove da "classe" User
    User.remove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })
})