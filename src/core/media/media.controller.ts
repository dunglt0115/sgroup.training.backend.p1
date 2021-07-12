import {Request, Response} from 'express';
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
                message: 'No image attached!'
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
            const imagePublicId = `one/${req.file.originalname}`;
            await this.mediaService.deleteOne(imagePublicId);

            return res.status(200).json({
                message: 'Delete image file on cloudinary successfully!'
            });
        }
    }

    uploadMany = async (req: Request, res: Response) => {
        try {
            const imageFiles = req.files;

            if (!imageFiles) {
                return res.status(400).json({
                    message: 'No image attached!'
                });
            }

            const name = req.body.galleryName;

            const uploadResponse = await this.mediaService.uploadMany(imageFiles, name);

            return res.status(200).json({
                images: uploadResponse
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    deleteMany = async (req: Request, res: Response) => {
        try {
            await this.mediaService.deleteMany(req.body);
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                trace: error.trace,
                stack: error.stack
            });
        }

        return res.status(200).json({
            message: 'OK'
        });
    }
}

export const MediaController = new Controller(MediaServiceImpl);
