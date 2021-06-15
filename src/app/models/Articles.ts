import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { Schema, model } from 'mongoose';
const slug = require('mongoose-slug-generator');

interface IArticle {
    name: string;
    image: string;
    description: string;
    slug: string;
    deleted: boolean;
}

const schema = new Schema<IArticle>({
    name: String,
    image: String,
    description: String,
    slug: {type: String, slug: 'name', unique: true},
}, {
    timestamps: true,
});

// Add plugin
mongoose.plugin(slug);
mongoose.plugin(mongooseDelete);

const ArticleModel = model<IArticle>('Article', schema);

export default ArticleModel;
