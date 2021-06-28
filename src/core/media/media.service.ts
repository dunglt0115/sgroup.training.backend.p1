import { MediaService } from "./api/media.api";
import {cloudinary} from '../../config/cloudinary/index';

class Service implements MediaService {
    async uploadOne(file: string): Promise<string> {
        const response = await cloudinary.upload(file, {
            folder: '/one'
        });

        return response.secure_url;
    }
}

export const MediaServiceImpl = new Service();
