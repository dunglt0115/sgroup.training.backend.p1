import { NextFunction, Request, Response } from "express";
import Article from '../models/Articles';
import { mongooseToObject } from '../../tools/mongoose';
import { ArticleService } from '../api/article.api';
import { ArticleServiceImpl } from '../services/ArticleService';

class Controller {
    private articleService: ArticleService;
    constructor(articleService: ArticleService) {
        this.articleService = articleService;
    }

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
        return res.render('articles/create');
    }

    // [POST] /articles/store
    store = async (req: Request, res: Response) => {
        let errs: string[] = [];
        try {
            await this.articleService.createNewArticle(req.body);
        } catch (error) {
            errs.push(error);
            return res.render('error', {
                errs: errs
            });
        }

        return res.status(200).json({
            message: 'Successfully added new article'
        })
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

export const ArticleController = new Controller(ArticleServiceImpl);
