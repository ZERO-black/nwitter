import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Profile = ({ userObj, refreshUser }) => {
  const onLogOutClick = () => authService.signOut();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    if (userObj.displayName === newDisplayName) return;
    await userObj.updateProfile({
      displayName: newDisplayName,
    });
    refreshUser();
  };
  const getMyNweets = async () => {
    // where로 filtering 가능, where의 중복 사용 가능
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyNweets();
  });
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
