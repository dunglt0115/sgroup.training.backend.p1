import ArticleModel from '../../models/Articles';
import {Request, Response} from 'express';
import {ArticleService} from './api/article.api';
import {ArticleServiceImpl} from './article.service';

class Controller {
    private articleService: ArticleService;

    constructor(articleService: ArticleService) {
        this.articleService = articleService;
    }

    // Create new article
    store = async (req: Request, res: Response) => {
        const errs: string[] = [];
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
    update = async (req: Request, res: Response) => {
        try {
            await ArticleModel.updateOne({_id: req.params.id}, req.body);
            return res.redirect('/me/stored/articles');
        } catch (error) {
            console.log(error);
        }
    }

    // Delete article by id
    delete = async (req: Request, res: Response) => {
        try {
            await ArticleModel.deleteOne({_id: req.params.id});
            return res.redirect('back');
        } catch (error) {
            console.log(error);
        }
    }
}

export const ArticleController = new Controller(ArticleServiceImpl);
