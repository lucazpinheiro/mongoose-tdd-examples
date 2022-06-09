import mongoose from 'mongoose'
import PostSchema from './post-schema.js';
const Schema = mongoose.Schema

// o obejto passado como argumento determina as propriedades e
// tipos de dados do schema
const UserSchema = new Schema({
  name: {
    type: String,  // String é uma referência ao objeto String base do javascript
    validate: {
      validator: (name) => name.length > 2, // check que será realizado pelas funções de validação
      message: 'Name must be longer than 2 characters'
    },
    required: [true, 'Name is required'],
  },
  posts: [PostSchema],
  likes: Number
});

// necessário usar function keyword para ter acesso ao 'this' model que será instanciado
UserSchema.virtual('postCount').get(function() {
  return this.posts.length
})

// o mongoose.model() é o método do mongoose que cria um modelo
// 1. primeiro argumento: nome do modelo/collection, caso a collection
// não exista, ela será criada.
// 2. segundo argumento: o schema do modelo
// IMPORTANTE: User não representa nenhum registro em especifico, mas sim
// um modelo de dados que pode ser usado para criar registros do tipo user
const User = mongoose.model('user', UserSchema)

export default User