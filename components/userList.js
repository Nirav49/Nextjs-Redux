import React from "react";

const UserList = ({ list }) => {
  return list.map((item) => {
    return (
      <ul key={item.id} style={{textAlign: 'center',listStyle:"none"}}>
        <li>{item.id}</li>
        <li>{item.name}</li>
        <li>{item.username}</li>
        <li>{item.email}</li>
        <hr />
      </ul>
    );
  });
};

export default UserList;
