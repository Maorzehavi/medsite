import { faker } from "@faker-js/faker";
import { AlbumModel } from "../Models/AlbumModel";
import { UserModel } from "../Models/UserModel";
import notificationService from "../services/NotificationService";
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store/store";
import ExpandablePanel from "./ExpandablePanel";

interface AlbumListProps {
  user: UserModel;
}
function AlbumList(props: AlbumListProps) {
  const { data, isLoading, error } = useFetchAlbumsQuery(props.user);
  const [addAlbum, results] = useAddAlbumMutation();
  
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
      Albums for {props.user.name}
        <button onClick={addAlbumHandler}>Add Album</button>
      {isLoading && <div>Loading...</div>}
      {data &&
        data.map((album) => {
          return (
            <ExpandablePanel
              key={album.id}
              header={header(album)}
              children={children}
            />
          );
        })}
    </div>
  );
}

export default AlbumList;
