import { AiOutlineUserDelete } from "react-icons/ai";
import { UserModel } from "../Models/UserModel";
import notificationService from "../services/NotificationService";
import { useDeleteUserMutation } from "../store/apis/userApi";
import AlbumList from "./AlbumList";
import ExpandablePanel from "./ExpandablePanel";

interface UserCardProps {
  user: UserModel;
}
function UserCard(props: UserCardProps) {
  const [runDeleteUser] = useDeleteUserMutation();

  const header = (
    <>
      <div className="flex justify-between p-2">
        <button
          onClick={() => {
            runDeleteUser(props.user);
            notificationService.success(`User deleted successfully`);
          }}
          className="my-auto"
          title="Delete User"
        >
          <AiOutlineUserDelete />
        </button>

        <div className="flex my-auto ml-5">
          <span className="text-gray-500 ml-1 text-xl">{props.user.name}</span>
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

export default UserCard;
