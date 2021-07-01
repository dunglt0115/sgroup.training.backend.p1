import { MediaService } from "./api/media.api";
import {cloudinary} from '../../config/cloudinary/index';
import {unlinkSync} from 'fs';
import { fstat } from "fs";

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
        await cloudinary.uploader.destroy(id, function(error, result) {
            console.log(result, error);
        });
        return;
    }

    async uploadMany(files: Express.Multer.File[], name: string): Promise<any> {
        try {
            if (!files) {
                return 'Error!';
            }

            let urls = [];

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
            
            return urls;
        } catch (error) {
            console.log(error);
            return 'Upload failed!';
        }
    }
}

export const MediaServiceImpl = new Service();
