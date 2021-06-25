import ArticleModel from '../../models/Articles';
import {Request, Response} from 'express';
import {ArticleService} from './api/article.api';
import {ArticleServiceImpl} from './article.service';
import path from 'path';
import DatauriParser from 'datauri/parser';
const parser = new DatauriParser();
import cloudinary from '../../config/cloudinary';

class Controller {
    private articleService: ArticleService;

    constructor(articleService: ArticleService) {
        this.articleService = articleService;
    }

    // Create new article
    store = (req: Request, res: Response) => {
        const errs: string[] = [];

        if (!req.file) {
            errs.push("Can not add new book!");
            return res.render('error', {
                errs: errs
            });
        } else {
            const fileInput: string = req.file.originalname;
            const fileBuffer: Buffer = req.file.buffer;
            const datauri: string | undefined = parser.format(path.extname(fileInput).toString(), fileBuffer).content;

            cloudinary.uploader.upload(datauri)
                .then((result: any) => result.url)
                .then(async (url: string) => {
                    req.body.image = url;
                    await this.articleService.createNewArticle(req.body);
                })
                .catch((error: any) => res.json(error));

            return res.json({
                message: 'Successfully added new article!'
            });
        }
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
