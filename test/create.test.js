import assert from 'assert'
import User from '../src/user.js'



describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' })
    joe.save()
      .then(() => {
        assert(!joe.isNew)
        done()
      })
  })
})