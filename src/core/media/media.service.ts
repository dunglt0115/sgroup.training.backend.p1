import {MediaService} from './api/media.api';
import {cloudinary} from '../../config/cloudinary/index';
import {unlinkSync} from 'fs';
import ArticleModel from '../../models/Articles';

class Service implements MediaService {
    async uploadOne(file: string, name: string): Promise<string> {
        const response = await cloudinary.uploader.upload(file, {
            folder: '/one',
            public_id: name,
            overwrite: true,
            invalidate: true
        });

        return response.secure_url;
    }

    async deleteOne(id: string): Promise<void> {
        await cloudinary.uploader.destroy(id);
        return;
    }

    async uploadMany(files: Express.Multer.File[], name: string): Promise<any> {
        try {
            if (!files) {
                throw new Error('No files');
            }

            const urls = [];

            for (const file of files) {
                const {path} = file;
                const imageUrl = await cloudinary.uploader.upload(path, {
                    folder: `/many/${name}`,
                    public_id: file.originalname,
                    overwrite: true,
                    invalidate: true
                })
                urls.push(imageUrl.secure_url);
                unlinkSync(path);
            }

            await ArticleModel.updateOne({slug: name}, {gallery: urls});

            return urls;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteMany(body: any): Promise<void> {
        switch (body.action) {
            case 'delete':
                await cloudinary.api.delete_resources(body.publicIds);

                await ArticleModel.updateOne({slug: body.galleryName}, {gallery: body.urls});
                
                break;
            default:
                throw new Error('Invalid action');
        }

        return;
    }
}

export const MediaServiceImpl = new Service();
