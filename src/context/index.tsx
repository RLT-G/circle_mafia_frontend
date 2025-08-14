import React, { createContext, useState } from "react";
import { getMe } from "../services/users";
import type { IRoom } from "../services/wsClient";

interface IUserProvider {
  children: React.ReactElement | React.ReactNode
}

export interface IUserData {
  user_id: string;
  username: string;
  email: string;
  balance: number;
  password?: string;
  hashed_password?: string;
}

export interface IPlayer {
  username: string;
  user_id: string;
}

export interface IWSData {
  isAuth: boolean;
  currentRoom: string | null;
  players: IPlayer[],
  roomData: IRoom | null
}

export interface IGameData {
  time_to_next_shrink: string;
  mass: number;
}

export const UserContext = createContext();

const UserProvider: React.FC<IUserProvider> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState<IUserData | {}>({})
  const [wsData, setwsData] = useState<IWSData>({
    isAuth: false,
    currentRoom: null,
    players: [],
    roomData: null
  })
  const [gameData, setGameData] = useState<IGameData | {}>({})

  const [accessToken, setAccessToken] = useState<string>("")

  React.useEffect(() => {
    const accessToken: string | null = localStorage.getItem("accessToken")
    if (accessToken) {
      setIsAuth(true)
      setAccessToken(accessToken)
      getMe(accessToken).then((userProfile) => {
        setUserData({
          user_id: userProfile.user_id,
          username: userProfile.username,
          email: userProfile.email,
          balance: userProfile.balance,
          hashed_password: userProfile.hashed_password
        })
      })
    }
  }, [])

  React.useEffect(() => {
    console.log({
      isAuth,
      userData,
      accessToken
    })
  }, [
    isAuth,
    userData,
    accessToken
  ])

  return <UserContext.Provider value={{
    isAuth,
    setIsAuth,
    userData,
    setUserData,
    accessToken,
    setAccessToken,
    wsData,
    setwsData,
    gameData,
    setGameData
  }}>{children}</UserContext.Provider>;
};

export default UserProvider;

