export interface MediaService {
    uploadOne(file?: string, name?: string): Promise<string>;
    deleteOne(id: string): Promise<void>;
}
