import React from "react";
import UserCard from "../UserCard";

interface IUsers {
  username: string;
  pln: string;
  addr: string;
}

interface IUserLine {
  row?: boolean;
  col?: boolean;
}

const UserLine: React.FC<IUserLine> = ({ row = false, col = false }) => {
  const [users, setUsers] = React.useState<IUsers[]>([])
  const [appeared, setAppeared] = React.useState<boolean[]>([])

  React.useEffect(() => {
    const userList = [
      { username: "Username", pln: "PLN+23 SOL", addr: "b26af...252ff" },
      { username: "Username", pln: "PLN+23 SOL", addr: "b26af...252ff" },
      { username: "Username", pln: "PLN+23 SOL", addr: "b26af...252ff" },
      { username: "Username", pln: "PLN+23 SOL", addr: "b26af...252ff" },
      { username: "Username", pln: "PLN+23 SOL", addr: "b26af...252ff" },
      { username: "Username", pln: "PLN+23 SOL", addr: "b26af...252ff" },
      { username: "Username", pln: "PLN+23 SOL", addr: "b26af...252ff" },
      { username: "Username", pln: "PLN+23 SOL", addr: "b26af...252ff" },
      { username: "Username", pln: "PLN+23 SOL", addr: "b26af...252ff" },
      { username: "Username", pln: "PLN+23 SOL", addr: "b26af...252ff" },
      { username: "Username", pln: "PLN+23 SOL", addr: "b26af...252ff" },
      { username: "Username", pln: "PLN+23 SOL", addr: "b26af...252ff" },
    ];
    setUsers(userList);
    setAppeared(Array(userList.length).fill(false));
    userList.forEach((_, i) => {
      setTimeout(() => {
        setAppeared(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 80 * i);
    });
  }, []);

  return (
    <div className={`flex items-center ${row && 'flex-row gap-3'} ${col && 'flex-col gap-4'}`}>
      {users.map(({ username, pln, addr }, index) => (
        <div
          key={index}
          className={`transition-opacity duration-500 ${appeared[index] ? 'opacity-100' : 'opacity-0'}`}
        >
          <UserCard
            username={username}
            pln={pln}
            addr={addr}
            needBackground
          />
        </div>
      ))}
    </div>
  )
}

export default UserLine
