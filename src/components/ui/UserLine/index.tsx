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

  React.useEffect(() => {
    setUsers([
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
    ])
  }, [])

  return (
    <div className={`flex items-center ${row && 'flex-row gap-3'} ${col && 'flex-col gap-4'}`}>
      {users.map(({ username, pln, addr }, index) => (
        <UserCard
          key={index}
          username={username}
          pln={pln}
          addr={addr}
          needBackground
        />
      ))}
    </div>
  )
}

export default UserLine
