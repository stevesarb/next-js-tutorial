"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  id: number;
}

const DeleteButton = ({ id }: Props) => {
    const router = useRouter();

  return (
    <button
      className="btn"
      onClick={async () => {
        // construct url string
        const url = "http://localhost:3000/api/users/" + JSON.stringify(id);

        // delete data
        const res = await fetch(url, {
          method: "DELETE",
        });

        // reload page
        router.reload(); // NOTE: can't figure out how to either reload or remove this user from the DOM
        // await fetch('http://localhost:3000/users');
      }}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
