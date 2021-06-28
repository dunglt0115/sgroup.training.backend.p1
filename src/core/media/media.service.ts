import { MediaService } from "./api/media.api";
import {cloudinary} from '../../config/cloudinary/index';

class Service implements MediaService {
    async uploadOne(file: string, name: string): Promise<string> {
        const response = await cloudinary.upload(file, {
            folder: '/one',
            public_id: name,
            overwrite: true,
            invalidate: true
        });

        return response.secure_url;
    }
}

export const MediaServiceImpl = new Service();
