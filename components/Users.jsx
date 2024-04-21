/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUser] = useState(loadedUsers);
  console.log(users);

  const handleDelete = (_id) => {
    console.log("delete", _id);
    fetch(`http://localhost:5000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("Delete Successfully");
          const remaining = users.filter((user) => user._id !== _id);
          setUser(remaining);
        }
      });
  };
  return (
    <div>
      <h2>Users : {users.length}</h2>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} : {user.email} {user._id}
            <Link to={`/update/${user._id}`}>
              <button>Update</button>
            </Link>
            <button onClick={() => handleDelete(user._id)}>x</button>
          </p>
        ))}
      </div>
      <Link to={"/"}>Back to form</Link>
    </div>
  );
};

export default Users;
