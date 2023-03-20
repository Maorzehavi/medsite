import { faker } from "@faker-js/faker";
import { UserModel } from "../Models/UserModel";
import notificationService from "../services/NotificationService";
import { useAddUserMutation, useFetchUsersQuery } from "../store/apis/userApi";
import UserCard from "./UserCard";

function Users() {
  const { data,isLoading,error } = useFetchUsersQuery();
  const [addUser] =useAddUserMutation();
  
const randomUser = ():UserModel => {
    return {
        name: faker.name.firstName() + " " + faker.name.lastName(),
    };
}

const addUserHandler = () => {
    addUser(randomUser());
    
    notificationService.success( "User added successfully");
}

if (error) {
    notificationService.error(error);
}

if (isLoading) {
    return <div>Loading...</div>;
}

return (
    <div className="container mt-2">
      <div className="flex flex-row justify-between m-3 ">
        <h3 className="m-2 text-3xl">Users </h3>

        <button onClick={addUserHandler}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add User
        </button>

        
      </div>
      {data!.map((user:UserModel) => {
        return (
          <UserCard user={user} key={user.id}  />
        );
      })}
    </div>
  );
}

export default Users;
