import { Request, Response } from "express";

class NewsController {
    // [GET] /news
    index(req: Request, res: Response) {
        res.render('news');
    }

    // [GET] /news/:slug
    show(req: Request, res: Response) {
        res.send('News detail');
    }
}

export default new NewsController;