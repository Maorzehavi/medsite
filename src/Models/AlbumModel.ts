import { PhotoModel } from "./PhotoModel";

export interface AlbumModel{
    id?: number;
    title: string;
    photos?: PhotoModel[];
    userId: number;
}
// export class AlbumModel{
//     constructor(
//         public id: number,
//         public title: string,
//         public userId: number,
//         public photos?: PhotoModel[]
//         ){
//         this.id = id;
//         this.title = title;
//         this.userId = userId;
//     }
// }