import {IArticleDTO} from './dto/article.dto';
import {ArticleService} from './api/article.api';
import ArticleModel from '../../models/Articles';

class Service implements ArticleService {
    async updateArticle(id: any, CreateDTO: IArticleDTO): Promise<void> {
        await ArticleModel.updateOne(id, CreateDTO);
        return;
    }
    
    async softDeleteArticle(id: any): Promise<void> {
        await ArticleModel.updateOne(id, {
            deleted: true,
            deletedAt: new Date(),
        });
        return;
    }

    async createNewArticle(CreateDTO: IArticleDTO): Promise<void> {
        const existedArticle = await ArticleModel.findOne({name: CreateDTO.name});

        if (existedArticle) {
            throw new Error('This book has already been created');
        }

        const newArticle = new ArticleModel(CreateDTO);
        await newArticle.save();
        return;
    }

    async restoreDeletedArticle(id: any): Promise<void> {
        // const article = await ArticleModel.findOne(id, function(err: any, docs: any) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log(docs);
        //     }
        // })
        
        await ArticleModel.updateOne(id, {
            deleted: true,
            deletedAt: new Date(),
        });
        return;
    }

    async hardDeleteArticle(id: any): Promise<void> {
        await ArticleModel.deleteOne(id);
        return;
    }
}

export const ArticleServiceImpl = new Service();
