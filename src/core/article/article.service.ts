import {IArticleDTO} from './dto/article.dto';
import {ArticleService} from './api/article.api';
import ArticleModel from '../../models/Articles';
import UserModel from '../../models/Users';

class Service implements ArticleService {


    async createNewArticle(userId: string, CreateDTO: IArticleDTO): Promise<void> {
        const existedArticle = await ArticleModel.findOne({name: CreateDTO.name});

        if (existedArticle) {
            throw new Error('This book has already been created');
        }

        const user = await UserModel.findOne({_id: userId});

        if (!user) {
            throw new Error('This user is not valid');
        }

        const newArticle = new ArticleModel({
            name: CreateDTO.name,
            description: CreateDTO.description,
            image: CreateDTO.image,
            user: user._id
        });
        
        await newArticle.save();
        return;
    }

    async updateArticle(body: any): Promise<void> {
        await ArticleModel.updateOne({slug: body.slug}, {
            name: body.name,
            description: body.description
        });
        return;
    }

    async softDeleteArticle(id: any): Promise<void> {
        await ArticleModel.updateOne(id, {
            deleted: true,
            deletedAt: new Date()
        });
        return;
    }

    async restoreDeletedArticle(body: any): Promise<void> {
        await ArticleModel.findOne({_id: body.id}, function(err: any, docs: any) {
            if (err) {
                console.log(err);
            } else {
                console.log(docs);
            }
        })

        // await ArticleModel.updateOne(id, {
        //     deleted: true,
        //     deletedAt: new Date()
        // });
        return;
    }

    async hardDeleteArticle(id: any): Promise<void> {
        await ArticleModel.deleteOne(id);
        return;
    }
}

export const ArticleServiceImpl = new Service();
