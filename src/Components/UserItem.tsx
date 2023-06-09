import { UserModel } from "../Models/UserModel";
import ExpandablePanel from "./ExpandablePanel";
import { AiOutlineUserDelete } from "react-icons/ai";
import AlbumList from "./AlbumList";
import { useDeleteUserMutation } from "../store/apis/userApi";

interface UserItemProps {
  user: UserModel;
}
function UserItem(props: UserItemProps) {
  const [runDeleteUser, isDeletingUser] = useDeleteUserMutation();

  const header = (
    <>
      <div className="flex justify-between p-2">
        <button
          onClick={() => runDeleteUser(props.user)}
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
