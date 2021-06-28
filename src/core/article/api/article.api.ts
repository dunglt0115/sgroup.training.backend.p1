import {IArticleDTO} from '../dto/article.dto';

export interface ArticleService {
    createNewArticle(CreateDTO: IArticleDTO): Promise<void>;
    updateArticle(id: any, CreateDTO: IArticleDTO): Promise<void>;
    hardDeleteArticle(id: any): Promise<void>;
}
