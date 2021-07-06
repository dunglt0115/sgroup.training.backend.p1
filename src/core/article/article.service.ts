import {IArticleDTO} from './dto/article.dto';
import {ArticleService} from './api/article.api';
import ArticleModel from '../../models/Articles';
import UserModel from '../../models/Users';
import mongoose from 'mongoose';
import {Types} from 'mongoose';

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

    async restoreDeletedArticle(id: any): Promise<void> {
        await ArticleModel.updateOne(id, {
            deleted: false,
            deletedAt: undefined
        });
        return;
    }

    async hardDeleteArticle(id: any): Promise<void> {
        await ArticleModel.deleteOne(id);
        return;
    }

    async archievePageActionHandler(body: any): Promise<void> {
        switch (body.actions) {
            case 'delete':
                body.articleIds.forEach(async (id: string) => {
                    await ArticleModel.updateOne({_id: mongoose.Types.ObjectId(id)}, {
                        deleted: true,
                        deletedAt: new Date()
                    });
                });

                break;
            default:
                throw new Error('Invalid action');
        }

        return;
    }

    async trashPageActionHandler(body: any): Promise<void> {
        switch (body.actions) {
            case 'restore':
                body.articleIds.forEach(async (id: string) => {
                    await ArticleModel.updateOne({_id: mongoose.Types.ObjectId(id)}, {
                        deleted: false,
                        deletedAt: undefined
                    });
                });
                break;
            case 'delete':
                body.articleIds.forEach(async (id: string) => {
                    await ArticleModel.deleteOne({_id: mongoose.Types.ObjectId(id)});
                });
                break;
            default:
                throw new Error('Invalid action');
        }

        return;
    }
}

export const ArticleServiceImpl = new Service();
