import {envConfig} from "../../env";
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: envConfig.get('CLOUDINARY_NAME'),
    api_key: envConfig.get('CLOUDINARY_API_KEY'),
    api_secret: envConfig.get('CLOUDINARY_API_SECRET')
});


export default cloudinary;
