import React from "react";

// [[...NAME]] specifies a route of variable size

interface Props {
  params: {
    slug: string[];
  };
}

const ProductPage = ({ params: { slug } }: Props) => {
  return <div>ProductPage {slug}</div>;
};

export default ProductPage;
