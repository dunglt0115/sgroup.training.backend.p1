import {IArticleDTO} from '../dto/article.dto';

export interface ArticleService {
    createNewArticle(CreateDTO: IArticleDTO): Promise<void>;
    updateArticle(id: any, CreateDTO: IArticleDTO): Promise<void>;
    softDeleteArticle(id: any): Promise<void>;
    restoreDeletedArticle(id: any): Promise<void>;
    hardDeleteArticle(id: any): Promise<void>;
}
