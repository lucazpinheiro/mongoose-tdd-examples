import mongoose from 'mongoose'
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment' // referencia ao modelo comment
  }]
})

const BlogPost = mongoose.model('blogPost', BlogPostSchema)

export default BlogPost
