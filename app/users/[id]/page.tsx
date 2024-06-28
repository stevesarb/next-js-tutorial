import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: number };
}

// destructuring the interface (pulling the id out) in function definition
const UserDetails = ({ params: { id } }: Props) => {
  if (id > 10) notFound();

  return <div>UserDetails {id}</div>;
};

export default UserDetails;
