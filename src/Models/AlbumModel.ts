import { PhotoModel } from "./PhotoModel";

export interface AlbumModel{
    id?: number;
    title: string;
    photos?: PhotoModel[];
    userId: number;
}
