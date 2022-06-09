import assert from 'assert'
import User from '../src/user.js'

describe('Virtual Types', () => {
  it('postCount returns number of posts', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Post' }]
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        // nesse caso, a propriedade postCount só existe na instância do modelo e não no documento do banco
        // por isso o assert deve ser feito diretetamente na instância do modelo
        assert(joe.postCount === 1)
        done()
      })
  })
})
