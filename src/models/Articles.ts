import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import {Schema, model} from 'mongoose';
const slug = require('mongoose-slug-generator');

interface IArticle {
    deleted: boolean;
    name: string;
    description: string;
    image: string;
    gallery: string[];
    slug: string;
}

const schema = new Schema<IArticle>({
    deleted: Boolean,
    name: String,
    description: String,
    image: String,
    gallery: {
        type: [String],
        default: ["tech", "economy"]
    },
    slug: {type: String, slug: 'name', unique: true}
}, {
    timestamps: true
});

// Add plugin
mongoose.plugin(slug);
mongoose.plugin(mongooseDelete);

const ArticleModel = model<IArticle>('Article', schema);

export default ArticleModel;
