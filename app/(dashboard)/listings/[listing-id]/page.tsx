"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const SingleListingPage = () => {
  const params = useParams<{ "listing-id": string }>();
  const listingId = params["listing-id"];

  return <div>Listing ID: {listingId}</div>;
};

export default SingleListingPage;
