import React, { useEffect, useState } from "react";
import "./App.css";
import UserInfo from "./components/user-info";
import { useDebounce } from "./hooks/useDebounce";

export interface UserInfoType {
  avatarUrl: string;
  name: string;
  location: string;
  followers: number;
  following: number;
  repos: number;
  login: string;
}

export interface UserList {
  name: string,
  avatar: string,
}

function App() {
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [userList, setUserList] = useState<UserList[] | undefined>();

  const debouncedSearch = useDebounce(username, 500);

  const handleSearchingUsername = (_username?: string) => {
    if (_username) {
      fetch(`https://api.github.com/search/users?q=${_username}`)
        .then((response) => response.json())
        .then((data) => {
          let userList = data?.items?.map((user: { login: string; avatar_url: string; }) =>
            {
              return {
                name: user?.login,
                avatar: user?.avatar_url,
              }
            }
          )
          setUserList(userList);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    handleSearchingUsername(debouncedSearch);
  }, [debouncedSearch]);

  const handleKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSearchingUsername(username);
    }
  };

  return (
    <div className="user-container">
      <div className="title-search">
        <img src={`https://wiki.tino.org/wp-content/uploads/2021/05/word-image-214.png`} alt="github" />
      </div>
      <input
        type={"search"}
        placeholder="Search for username..."
        onKeyPress={handleKeydown}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="user-search-box"
      />
      {userList && <UserInfo userList={userList} />}
    </div>
  );
}

export default App;
