import { AlbumModel } from "./AlbumModel";

export interface UserModel{
    id?: number;
    name: string;
    albums?: AlbumModel[];
}


