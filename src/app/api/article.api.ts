import { IArticleDTO } from "../../dto/article/article.dto";

export interface ArticleService {
    createNewArticle(CreateDTO: IArticleDTO): Promise<void>;
}
