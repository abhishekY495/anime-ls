import React from "react";

export const PublicUserDetails = ({ userData }) => {
  const profileIcon = "https://api.dicebear.com/8.x/bottts-neutral/svg?seed=";

  return (
    <div className="mt-3 pb-3 d-flex gap-2 border-bottom">
      <img
        src={profileIcon + userData?.username}
        className="rounded"
        alt="profile"
        style={{ width: "70px" }}
      />
      <div className="d-flex flex-column">
        <span
          className="fw-bold"
          style={{ fontSize: "30px", margin: "10px 0 -8px 0" }}
        >
          {userData?.fullname}
        </span>
        <span className="text-muted fw-semibold">@{userData?.username}</span>
      </div>
    </div>
  );
};
