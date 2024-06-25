import React from "react";

interface Props {
  params: {
    id: number;
    photoID: number;
  };
}

const UserPhotos = ({ params }: Props) => {
  return (
    <div>
      User {params.id} Photo {params.photoID}
    </div>
  );
};

export default UserPhotos;
