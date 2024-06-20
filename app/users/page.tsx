import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

// Because we are using await in the definition, we must use the async keyword
const UsersPage = async () => {
  // fetch() returns a promise so we must await it
  // Also, fetch will automatically cache the data returned in the file system
  // for quicker/easier access later if the same data is requested again.
  // Pass an object as an optional secondary parameter to configure caching behavior.
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default UsersPage;
