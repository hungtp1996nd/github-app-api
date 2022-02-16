import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { UserList } from "../../App";

const UserInfo: React.FC<{ userList: UserList[] | undefined }> = ({ userList }) => {
  return (
    <div className="user-card">
      {userList?.length ? (
        <>
          {userList.map(user => (
            <div key={user.name}>
              <img
                className="user-card_avatar"
                alt="avatar"
                src={`${user.avatar}`}
              />
              <h3>{user.name}</h3>
              <Link to={`repo/${user.name}`}>
                <div className="btn btn-info" style={{width: '100%', color: 'white'}}>More</div>
              </Link>
            </div>
          ))}
        </>
      ) : (
        <div className="user-not-found">
          <h2>Oops !!!</h2>
          <p>We Couldn't Find The You Were Looking For . Try Again </p>
        </div>
      )}
    </div>
  )
}

export default UserInfo;