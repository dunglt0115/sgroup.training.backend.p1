import multer from 'multer';

const memoryStorage = multer.memoryStorage();
const multerUploadOne = multer({storage: memoryStorage}).single('image');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${process.cwd()}/upload`);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const multerUploadMany = multer({storage: diskStorage}).array('images', 10);

export {multerUploadOne, multerUploadMany};
