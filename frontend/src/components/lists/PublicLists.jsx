import React, { useContext } from "react";

import { UserDataContext } from "../../contexts/UserDataContext";
import { AddNew } from "./AddNew";
import { ListCard } from "./ListCard";
import "./PrivatePublicLists.css";

export const PublicLists = () => {
  const {
    state: { userData },
  } = useContext(UserDataContext);

  return (
    <>
      <AddNew isPrivate={false} />
      <div className="mt-3 public-lists">
        {userData.publicLists.map((list) => {
          return <ListCard key={list?._id} list={list} inPrivate={false} />;
        })}
      </div>
    </>
  );
};
