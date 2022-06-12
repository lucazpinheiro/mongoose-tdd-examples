import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user' // referencia ao modelo user
  }
})

const CommentModel = mongoose.model('comment', CommentSchema)

export default CommentModel
