import mongoose from 'mongoose'
const Schema = mongoose.Schema

// o obejto passado como argumento determina as propriedades e
// tipos de dados do schema
const UserSchema = new Schema({
  name: String, // String é uma referência ao objeto String base do javascript
});

// o mongoose.model() é o método do mongoose que cria um modelo
// 1. primeiro argumento: nome do modelo/collection, caso a collection
// não exista, ela será criada.
// 2. segundo argumento: o schema do modelo
// IMPORTANTE: User não representa nenhum registro em especifico, mas sim
// um modelo de dados que pode ser usado para criar registros do tipo user
const User = mongoose.model('user', UserSchema)

export default User