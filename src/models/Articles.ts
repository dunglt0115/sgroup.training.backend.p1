import mongoose from 'mongoose';
import {Schema, model, Types} from 'mongoose';
const slug = require('mongoose-slug-generator');

export interface IArticle {
    name: string;
    description: string;
    image: string;
    user: Types.ObjectId;
    gallery: string[];
    slug: string;
    deleted: boolean;
    deletedAt: Date;
}

const schema = new Schema<IArticle>({
    name: String,
    description: String,
    image: String,
    user: {
        ref: 'users',
        type: Types.ObjectId
    },
    gallery: {
        type: [String],
        default: ['tech', 'economy']
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

mongoose.plugin(slug);

const ArticleModel = model<IArticle>('Article', schema);

export default ArticleModel;
