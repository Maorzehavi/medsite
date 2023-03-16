import { AlbumModel } from "./AlbumModel";

export interface UserModel{
    id?: number;
    name: string;
    albums?: AlbumModel[];
}

// export class UserModel{
//     constructor(
//         public name: string,
//         public id?: number,
//         public albums?: AlbumModel[]
//     ){
//         this.name = name;
//         this.id = id;
//         this.albums = albums;
//     }

// }
