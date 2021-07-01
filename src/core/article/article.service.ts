import {IArticleDTO} from './dto/article.dto';
import {ArticleService} from './api/article.api';
import ArticleModel from '../../models/Articles';

class Service implements ArticleService {
    async updateArticle(id: any, CreateDTO: IArticleDTO): Promise<void> {
        await ArticleModel.updateOne(id, CreateDTO);
        return;
    }
    
    async hardDeleteArticle(id: any): Promise<void> {
        await ArticleModel.deleteOne(id);
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

    async createNewGallery(): Promise<void> {
        
    }
}

export const ArticleServiceImpl = new Service();
