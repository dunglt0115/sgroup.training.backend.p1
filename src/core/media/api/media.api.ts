export interface MediaService {
    uploadOne(file?: string, name?: string): Promise<string>;
    deleteOne(id: string): Promise<void>;
    uploadMany(files: {[fieldname: string]: Express.Multer.File[]} | Express.Multer.File[], name: string): Promise<any>;
    deleteMany(body: any): Promise<void>;
}
