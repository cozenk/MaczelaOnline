"use client";

import EditUserInfo from "@shared/EditUserInfo";
import UserNavigation from "./UserNavigation";
import { useContext } from "react";
import { NavContext } from "@providers/NavProvider";

export default function Client({ user }) {
  const { editUserInfo, closeEditUserInfo } = useContext(NavContext);

  return (
    <>
      <EditUserInfo
        user={user}
        focusTo={editUserInfo.focusTo}
        show={editUserInfo.show}
        onClose={closeEditUserInfo}
      />
      <UserNavigation user={user} />
    </>
  );
}
