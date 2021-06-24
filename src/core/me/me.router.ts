import express from 'express';
const router = express.Router();
import {Request, Response, NextFunction} from 'express';
import {mongoosesToObject} from '../../utils/mongoose';
import Article from '../../models/Articles';

// Show page
router.get('/stored/articles', (req: Request, res: Response, next: NextFunction) => {
    Article.find({})
        .then(articles => res.render('me/stored-articles', {
            articles: mongoosesToObject(articles)
        }))
        .catch(next)
});

export default router;
