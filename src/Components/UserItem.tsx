import { UserModel } from "../Models/UserModel";
import { useDeleteUserThunk } from "../store/store";
import ExpandablePanel from "./ExpandablePanel";

interface UserItemProps {
  user: UserModel;
}
function UserItem(props: UserItemProps) {
  const [runDeleteUser, isDeletingUser, deletingUserError] =
    useDeleteUserThunk();

  const header = (
    <>
      <div className="flex items-center justify-between">
        <>{props.user.name}</>

        <button
          disabled={isDeletingUser}
          onClick={() => {
            runDeleteUser(props.user);
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </>
  );
  return <ExpandablePanel header={header} />;
}

export default UserItem;
