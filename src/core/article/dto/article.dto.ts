export interface IArticleDTO {
    name: string;
    description: string;
    image: string;
}

export function CreateDTO(body: any): IArticleDTO {
    return {
        name: body.name,
        description: body.description,
        image: body.image
    }
}
