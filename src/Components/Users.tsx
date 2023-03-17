import { faker } from "@faker-js/faker";
import { UserModel } from "../Models/UserModel";
import notificationService from "../services/NotificationService";
import { useAddUserMutation, useFetchUsersQuery } from "../store/apis/userApi";

function Users() {
  const { data } = useFetchUsersQuery();
  const [addUser] =useAddUserMutation();
  
const randomUser = ():UserModel => {
    return {
        name: faker.name.firstName() + " " + faker.name.lastName(),
    };
}

const addUserHandler = () => {
    addUser(randomUser());
}

  return (
    <div>
        <button onClick={addUserHandler}>Add User</button>
        {data &&
        data.map((user) => {
            return (
                <div key={user.id}>
                    {user.name}
                </div>
            );
        }
        )}
    </div>
    );
}

export default Users;
