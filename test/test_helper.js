import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/users_test')
mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', error => console.log('Warning', error))