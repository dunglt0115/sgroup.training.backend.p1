import multer from 'multer';

const storage = multer.memoryStorage();
const multerUploader = multer({ storage }).single('image');

export { multerUploader };
