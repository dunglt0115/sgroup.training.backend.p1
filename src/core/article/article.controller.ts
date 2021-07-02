import ArticleModel from '../../models/Articles';
import {Request, Response} from 'express';
import {ArticleService} from './api/article.api';
import {ArticleServiceImpl} from './article.service';

class Controller {
    private articleService: ArticleService;

    constructor(articleService: ArticleService) {
        this.articleService = articleService;
    }

    create = async (req: Request, res: Response) => {
        try {
            await this.articleService.createNewArticle(req.body);
        } catch (error) {
            return res.render('error', {
                errs: [error]
            })
        }

        return res.status(200).json({
            message: 'Successfully added new article!'
        });
    }

    updateById = async (req: Request, res: Response) => {
        try {
            await this.articleService.updateArticle({_id: req.params.id}, req.body);
        } catch (error) {
            return res.render('error', {
                errs: [error]
            });
        }

        return res.redirect('/me/stored/articles');
    }

    deleteById = async (req: Request, res: Response) => {
        try {
            await this.articleService.hardDeleteArticle({_id: req.params.id});
        } catch (error) {
            return res.render('error', {
                errs: [error]
            });
        }

        return res.redirect('back');
    }
}

export const ArticleController = new Controller(ArticleServiceImpl);
