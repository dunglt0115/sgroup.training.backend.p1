import {Request, Response, NextFunction} from 'express';
import {MediaService} from './api/media.api';
import {MediaServiceImpl} from './media.service';
import path from 'path';
import DatauriParser from 'datauri/parser';
const parser = new DatauriParser();

class Controller {
    private mediaService: MediaService;

    constructor(mediaService: MediaService) {
        this.mediaService = mediaService;
    }

    uploadOne = async (req: Request, res: Response) => {
        if (!req.file) {
            return res.status(400).json({
                message: 'Can not upload image!'
            });
        } else {
            const imageName: string = req.file.originalname;
            const fileBuffer: Buffer = req.file.buffer;
            const datauri: string | undefined = parser.format(path.extname(imageName).toString(), fileBuffer).content;

            const src = await this.mediaService.uploadOne(datauri, imageName);

            return res.status(200).json({src});
        }
    }

    deleteOne = async (req: Request, res: Response) => {
        if (!req.file) {
            return res.status(400).json({
                message: 'Error: Can not get image file!'
            });
        } else {
            const imagePublicId: string = `one/${req.file.originalname}`;
            await this.mediaService.deleteOne(imagePublicId);

            return res.status(200).json({
                message: 'Delete image file on cloudinary successfully!'
            });
        }
    }
}

export const MediaController = new Controller(MediaServiceImpl);
