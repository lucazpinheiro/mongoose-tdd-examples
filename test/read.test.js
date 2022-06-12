import assert from 'assert'
import User from '../src/user.js'

describe('Reading users out of the db', () => {
  let joe, maria, alex, zach

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    maria = new User({ name: 'Maria' })
    alex = new User({ name: 'Alex' })
    zach = new User({ name: 'Zach' })
    Promise.all([joe.save(), alex.save(), maria.save(), zach.save()])
      .then(() => done())
  })

  it('finds all users with a name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString())
        done()
      })
  })

  it('finds a user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe')
        done()
      })
  })

  it('can skip and limit the result set', (done) => {
    User.find({}) // sem filtros no find
      .sort({ name: 1 }) // ordena por nome
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2)
        assert(users[0]._id.toString() === joe._id.toString())
        assert(users[1]._id.toString() === maria._id.toString())
        done()
      })
  })
})