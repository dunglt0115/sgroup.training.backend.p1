import { IArticleDTO } from "../dto/article.dto";

export interface ArticleService {
    createNewArticle(CreateDTO: IArticleDTO): Promise<void>;
}
