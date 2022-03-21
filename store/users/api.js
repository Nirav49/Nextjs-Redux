export const getUserList = async () => {
  const request = await fetch("https://jsonplaceholder.typicode.com/users");
  const response = await request.json();
  return response;
};

export default getUserList;
