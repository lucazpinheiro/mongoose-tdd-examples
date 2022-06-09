import assert from 'assert'
import mongoose from 'mongoose'
import User from '../src/user.js'

describe('Updating records', () => {
  let joe

  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      // ready to run the next test 
    })
    joe = new User({ name: 'Joe', likes: 0 })
    joe.save()
      .then(() => done())
  })

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1)
        assert(users[0].name === 'Joel')
        done()
      })
  }

  it('instance using set and save', (done) => {
    joe.set('name', 'Joel')
    assertName(joe.save(), done)
  })

  it('instance using', (done) => {
    assertName(joe.update({ name: 'Joel' }), done)
  })

  it('class using update', (done) => {
    assertName(
      User.updateMany({ name: 'Joe' }, { name: 'Joel' }),
      done
    )
  })

  it('class update one record', (done) => {
    assertName(
      User.updateOne({ name: 'Joe' }, { name: 'Joel' }),
      done
    )
  })

  it('class update a record with a given ID', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Joel' }),
      done
    )
  })

  it('a user can have their likes incremented by 1', (done) => {
    // $inc é um update operator, update operators trazem uma série
    // de ações que podem ser aplicadas a um documento
    User.updateOne({ name: 'Joe' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 1)
        done()
      })
  })
})