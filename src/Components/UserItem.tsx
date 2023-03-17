import { UserModel } from "../Models/UserModel";
import { useDeleteUserThunk } from "../store/store";
import ExpandablePanel from "./ExpandablePanel";
import { AiOutlineUserDelete } from "react-icons/ai";
import AlbumList from "./AlbumList";

interface UserItemProps {
  user: UserModel;
}
function UserItem(props: UserItemProps) {
  const [runDeleteUser, isDeletingUser] = useDeleteUserThunk();

  const header = (
    <>
      <div className="flex justify-between p-2">
        <button
          onClick={() => runDeleteUser(props.user)}
          disabled={isDeletingUser}
          className="my-auto"
          title="Delete User"
        >
          <AiOutlineUserDelete />
        </button>

        <div className="flex my-auto ml-5">
          <span className="text-gray-500 ml-1">{props.user.name}</span>
        </div>
      </div>
    </>
  );

  const children = (
    <>
      <AlbumList user={props.user} />
    </>
  );

  return <ExpandablePanel header={header} children={children} />;
}

export default UserItem;
