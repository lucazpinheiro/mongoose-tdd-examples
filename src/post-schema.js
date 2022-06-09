import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: String
})

export default PostSchema
