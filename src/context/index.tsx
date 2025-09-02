import React, { createContext, useState } from "react";
import UserService from "../services/users";
import type { IRoom } from "../services/wsClient";

interface IUserProvider {
  children: React.ReactElement | React.ReactNode
}

export interface IUserData {
  user_id: string;
  username: string;
  wallet_address: string;
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
      UserService.getMe().then((userProfile) => {
        console.log({ userProfile })
        setUserData({
          user_id: userProfile.user_id,
          username: userProfile.username,
          wallet_address: userProfile.wallet_address
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

