import { IArticleDTO } from "../../dto/article/article.dto";
import { ArticleService } from "../api/article.api";
import ArticleModel from "../models/Articles";

class Service implements ArticleService {
    async createNewArticle(CreateDTO: IArticleDTO): Promise<void> {
        const existedArticle = await ArticleModel.findOne({name: CreateDTO.name});
        if (existedArticle) {
            throw new Error(`This book has already been created`);
        }
        
        const newArticle = new ArticleModel(CreateDTO);
        await newArticle.save();
        return;
    }
}

export const ArticleServiceImpl = new Service();
