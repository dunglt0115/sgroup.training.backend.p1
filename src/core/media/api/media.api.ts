export interface MediaService {
    uploadOne(file?: string): Promise<string>;
}
