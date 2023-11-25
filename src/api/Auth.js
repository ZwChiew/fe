import { setGlobalState } from "../components/context";

const checkCredentials = (users, username, password) => {
  const user = users.find(
    (user) => user.name === username && user.password === password
  );
  return user;
};

export const LoginUser = async (allUsers, name, password) => {
  // Check if the credentials match
  const authenticatedUser = checkCredentials(allUsers, name, password);
  if (authenticatedUser) {
    console.log(authenticatedUser);
    setGlobalState("userId", authenticatedUser.id);
    setGlobalState("messages", authenticatedUser.messages);
    return true;
  } else {
    return false;
  }
};
