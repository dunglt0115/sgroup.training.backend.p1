import {Request, Response} from 'express';
import {ArticleService} from './api/article.api';
import {ArticleServiceImpl} from './article.service';
import {CreateDTO} from './dto/article.dto';
import {AuthenticatedRequest} from '../auth/guard/jwtAutheticator.guard';

class Controller {
    private articleService: ArticleService;

    constructor(articleService: ArticleService) {
        this.articleService = articleService;
    }

    create = async (req: Request, res: Response) => {
        try {
            await this.articleService.createNewArticle(
                (req as AuthenticatedRequest)['user']['_id'],
                CreateDTO(req.body)
            );
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                trace: error.trace
            });
        }

        return res.status(200).json({
            message: 'Successfully added new article!'
        });
    }

    updateById = async (req: Request, res: Response) => {
        try {
            await this.articleService.updateArticle(req.body);
            return res.status(200).json({
                message: 'Updated successfully'
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                trace: error.trace
            });
        }
    }

    softDeleteById = async (req: Request, res: Response) => {
        try {
            await this.articleService.softDeleteArticle({_id: req.params.id});
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                trace: error.trace,
                stack: error.stack
            });
        }

        return res.status(200).json({
            message: 'OK'
        });
    }

    restoreById = async (req: Request, res: Response) => {
        try {
            await this.articleService.restoreDeletedArticle({_id: req.params.id});
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                trace: error.trace,
                stack: error.stack
            });
        }

        return res.status(200).json({
            message: 'OK'
        });
    }

    hardDeleteById = async (req: Request, res: Response) => {
        try {
            await this.articleService.hardDeleteArticle({_id: req.params.id});
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                trace: error.trace,
                stack: error.stack
            });
        }

        return res.status(200).json({
            message: 'OK'
        });
    }

    handleActionsArchievePage = async (req: Request, res: Response) => {
        try {
            await this.articleService.archievePageActionHandler(req.body);
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                trace: error.trace,
                stack: error.stack
            });
        }

        return res.status(200).json({
            message: 'OK'
        });
    }

    handleActionsTrashPage = async (req: Request, res: Response) => {
        try {
            await this.articleService.trashPageActionHandler(req.body);
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                trace: error.trace,
                stack: error.stack
            });
        }

        return res.status(200).json({
            message: 'OK'
        });
    }
}

export const ArticleController = new Controller(ArticleServiceImpl);
