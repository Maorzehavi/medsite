import { faker } from "@faker-js/faker";
// import { useSelector } from "react-redux";
import { AlbumModel } from "../Models/AlbumModel";
import { UserModel } from "../Models/UserModel";
import notificationService from "../services/NotificationService";
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store/store";
import ExpandablePanel from "./ExpandablePanel";

interface AlbumListProps {
  user: UserModel;
}
function AlbumList(props: AlbumListProps) {
  const { data, isLoading, error } = useFetchAlbumsQuery(props.user.id!);
  const [addAlbum, results] = useAddAlbumMutation();
  
  
  // const albums: AlbumModel[] = useSelector((state: any) => state.albums.albums);

  const randomAlbum = (user: UserModel): AlbumModel => {
    return {
      title: faker.commerce.productName(),
      userId: user.id!,
    };
  };

  const addAlbumHandler = () => {
    addAlbum(randomAlbum(props.user));
  };
  if (error) {
    notificationService.error(error);
  }

  const header = (album: AlbumModel) => (
    <>
      <div className="flex justify-between p-2">
        <div className="flex my-auto ml-5">
          <span className="text-gray-500 ml-1">{album.title}</span>
        </div>
      </div>
    </>
  );

  const children = <>photosList</>;

  return (
    <div>
      <div className="flex justify-between">
      <span className=" text-2xl ml-3 ">Albums for {props.user.name}</span>
        <button onClick={addAlbumHandler} className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-auto mr-2" title="Add Album"
        >Add Album</button>
      </div>
      {isLoading && <div>Loading...</div>}
      {data &&
        data.map((album) => {
          return (
            <div className="m-2" key={album.id}>
                <ExpandablePanel
            //   key={album.id}
              header={header(album)}
              children={children}
            />
            </div>
          );
        })}
    </div>
  );
}

export default AlbumList;
