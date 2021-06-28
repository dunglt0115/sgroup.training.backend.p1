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
            return res.render('articles/create', {
                errs: ["Can not upload image!"]
            });
        } else {
            const fileInput: string = req.file.originalname;
            const fileBuffer: Buffer = req.file.buffer;
            const datauri: string | undefined = parser.format(path.extname(fileInput).toString(), fileBuffer).content;

            const src = await this.mediaService.uploadOne(datauri);

            return res.status(200).json({src});
        }
    }
}

export const MediaController = new Controller(MediaServiceImpl);
