import React from "react";

interface Props {
  params: { id: number };
}

// destructuring the interface (pulling the id out) in function definition
const UserDetails = ({ params: { id } }: Props) => {
  return <div>UserDetails {id}</div>;
};

export default UserDetails;
