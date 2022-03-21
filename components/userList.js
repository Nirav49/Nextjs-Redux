import React from "react";

const UserList = ({ list }) => {
  return list.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <p style={{textAlign:"center"}}>Lists</p>
        <p style={{textAlign:"center"}}>{item.id}</p>
      </React.Fragment>
    );
  });
};

export default UserList;
