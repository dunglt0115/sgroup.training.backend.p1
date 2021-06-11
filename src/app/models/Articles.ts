import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

interface Article {
    name: string;
    image: string;
    description: string;
}

const schema = new Schema<Article>({
    name: {type: String},
    image: {type: String},
    description: {type: String},
    slug: {type: String, slug: 'name', unique: true},
}, {
    timestamps: true,
})

const ArticleModel = model<Article>('Article', schema);

export default ArticleModel;
