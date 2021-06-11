import { NextFunction, Request, Response } from "express";
export const validate = function(req: Request, res: Response, next: NextFunction) {
    let errs = [];
        
    if (!req.body.name) {
        errs.push("Name is required!");
    }

    if (!req.body.image) {
        errs.push("Image is required!");
    }

    if (errs.length > 0) {
        res.render('articles/create', {
            errs: errs,
            values: req.body,
        });
        return;
    }

    next();
}
