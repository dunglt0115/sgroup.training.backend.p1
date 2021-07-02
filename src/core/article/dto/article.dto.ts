export interface IArticleDTO {
    name: string;
    description: string;
    image: string;
}

// export interface IGalleryDTO {
//     gallery: Array<string>;
// }

// export function CreateGalleryDTO(body: any): IGalleryDTO {
//     return {
//         gallery: body.gallery
//     }
// }

export function CreateDTO(body: any): IArticleDTO {
    return {
        name: body.name,
        description: body.description,
        image: body.image
    }
}
