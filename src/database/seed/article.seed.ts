import {Collection} from 'mongoose';
import ArticleModel from '../../models/Articles';

export default class ArticleSeed {
    static async run(connection: Collection) {
        await ArticleModel.insertMany([
            {
                gallery: ["https://res.cloudinary.com/rungxanu/image/upload/v1626075434/many/hamlet/perry.png.png", "https://res.cloudinary.com/rungxanu/image/upload/v1626081890/many/hamlet/perry4.png.png", "https://res.cloudinary.com/rungxanu/image/upload/v1626078476/many/hamlet/perry7.png.png"],
                deleted: false,
                deletedAt: null,
                name: "Hamlet",
                description: "Hamlet",
                image: "https://res.cloudinary.com/rungxanu/image/upload/v1625048815/one/hamlet.jpg.jpg",
                slug: "hamlet"
            },
            {
                gallery: ["tech", "economy"],
                deleted: false,
                deletedAt: null,
                name: "Madame Bovary",
                description: "Madame Bovary",
                image: "https://res.cloudinary.com/rungxanu/image/upload/v1624886193/one/madame-bovary.jpg.jpg",
                slug: "madame-bovary"
            },
            {
                gallery: ["tech", "economy"],
                deleted: false,
                deletedAt: null,
                name: "War and Peace",
                description: "War and Peace",
                image: "https://res.cloudinary.com/rungxanu/image/upload/v1625131573/one/war-and-peace.jpg.jpg",
                slug: "war-and-peace"
            },
            {
                gallery: ["tech", "economy"],
                deleted: false,
                deletedAt: null,
                name: "The Odyssey",
                description: "The Odyssey",
                image: "https://res.cloudinary.com/rungxanu/image/upload/v1625557884/one/the-odyssey.jpg.jpg",
                slug: "the-odyssey"
            },
            {
                gallery: ["tech", "economy"],
                deleted: false,
                deletedAt: null,
                name: "Moby Dick",
                description: "Moby Dick",
                image: "https://res.cloudinary.com/rungxanu/image/upload/v1626096113/one/moby-dick.jpg.jpg",
                slug: "moby-dick"
            }
        ])
    }
}
