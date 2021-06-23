import ArticleModel from '../../models/Articles';
import { NextFunction, Request, Response } from "express";
import { ArticleService } from './api/article.api';
import { ArticleServiceImpl } from './article.service';

class Controller {
    private articleService: ArticleService;
    constructor(articleService: ArticleService) {
        this.articleService = articleService;
    }

    // Create new article
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

    // Edit article
    update(req: Request, res: Response, next: NextFunction) {
        ArticleModel.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/articles'))
            .catch(next)
    }

    // Delete article by id
    delete(req: Request, res: Response, next: NextFunction) {
        ArticleModel.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

export const ArticleController = new Controller(ArticleServiceImpl);
