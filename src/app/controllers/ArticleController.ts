import { NextFunction, Request, Response } from "express";
import Article from '../models/Articles';
import { mongooseToObject } from '../../util/mongoose';

class Controller {
    // [GET] /articles/:slug
    show(req: Request, res: Response, next: NextFunction) {
        Article.findOne({slug: req.params.slug})
            .then(article => {
                res.render('articles/show', {
                    article: mongooseToObject(article)
                })
            })
            .catch(next)
    }

    // [GET] /articles/create
    create(req: Request, res: Response) {
        res.render('articles/create');
    }

    // [POST] /
    store(req: Request, res: Response) {
        const article = new Article(req.body);
        article.save()
            .then(() => res.redirect('/'))
            .catch(err => {})
    }

    // [GET] /articles/:id/edit
    edit(req: Request, res: Response, next: NextFunction) {
        Article.findById(req.params.id)
            .then(article => res.render('articles/edit', {
                article: mongooseToObject(article)
            }))
            .catch(next)
    }

    // [PUT] /articles/:id
    update(req: Request, res: Response, next: NextFunction) {
        Article.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/articles'))
            .catch(next)
    }

    // [DELETE] /articles/:id
    delete(req: Request, res: Response, next: NextFunction) {
        Article.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

export const ArticleController = new Controller();
