import mongoose from 'mongoose';
import {Schema, model} from 'mongoose';
const slug = require('mongoose-slug-generator');

interface IArticle {
    name: string;
    description: string;
    image: string;
    gallery: string[];
    slug: string;
    deleted: boolean;
    deletedAt: Date;
}

const schema = new Schema<IArticle>({
    name: String,
    description: String,
    image: String,
    gallery: {
        type: [String],
        default: ["tech", "economy"]
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null
    },
}, {
    timestamps: true
});

mongoose.plugin(slug);

const ArticleModel = model<IArticle>('Article', schema);

export default ArticleModel;
