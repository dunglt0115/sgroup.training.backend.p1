import {IArticleDTO} from '../dto/article.dto';

export interface ArticleService {
    createNewArticle(userId: string, CreateDTO: IArticleDTO): Promise<void>;
    updateArticle(body: any): Promise<void>;
    softDeleteArticle(id: any): Promise<void>;
    restoreDeletedArticle(id: any): Promise<void>;
    hardDeleteArticle(id: any): Promise<void>;
}
