import { NextFunction, Request, Response } from "express";
import Article from '../models/Articles';
import { mongoosesToObject } from '../../tools/mongoose';

class Controller {
    // [GET] /me/stored/articles
    storedArticles(req: Request, res: Response, next: NextFunction) {
        Article.find({})
            .then(articles => res.render('me/stored-articles', {
                articles: mongoosesToObject(articles)
            }))
            .catch(next)
    }
}

export const MeController = new Controller();
