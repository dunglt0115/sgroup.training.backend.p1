export interface IUserInfo {
    _id: string;
    email: string;
}

export function UserInfo(data: any): IUserInfo {
    return {
        _id: data._id,
        email: data.email
    }
}
