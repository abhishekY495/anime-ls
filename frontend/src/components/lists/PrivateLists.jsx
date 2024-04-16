import React, { useContext } from "react";

import { UserDataContext } from "../../contexts/UserDataContext";
import { AddNew } from "./AddNew";
import { ListCard } from "./ListCard";
import "./PrivatePublicLists.css";

export const PrivateLists = () => {
  const {
    state: { userData },
  } = useContext(UserDataContext);

  return (
    <>
      <AddNew isPrivate={true} />
      <div className="mt-3 private-lists">
        {userData.privateLists.map((list) => {
          return <ListCard key={list?._id} list={list} inPrivate={true} />;
        })}
      </div>
    </>
  );
};
