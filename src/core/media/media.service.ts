import { MediaService } from "./api/media.api";
import {cloudinary} from '../../config/cloudinary/index';

class Service implements MediaService {
    async deleteOne(id: string): Promise<void> {
        await cloudinary.uploader.destroy(id, function(error, result) {
            console.log(result, error);
        });
        return;
    }

    async uploadOne(file: string, name: string): Promise<string> {
        const response = await cloudinary.uploader.upload(file, {
            folder: '/one',
            public_id: name,
            overwrite: true,
            invalidate: true
        });
        
        return response.secure_url;
    }
}

export const MediaServiceImpl = new Service();
