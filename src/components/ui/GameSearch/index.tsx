import React, { useContext } from "react";
import { data, useNavigate } from "react-router-dom";
import RedButton from "../RedButton";
import { WSClient, type IRoom } from "../../../services/wsClient";
import { UserContext } from "../../../context";


const getOldestRoom = (rooms: IRoom[]): IRoom => {
  return rooms.reduce((oldest, current) => {
    return new Date(current.created_at) < new Date(oldest.created_at) ? current : oldest;
  });
}

const secondsSince = (isoDate: string): number => {
  const utcDate = new Date(isoDate + "Z"); // Принудительно UTC
  const now = new Date(); // локальное время
  const diffSeconds = Math.floor((now.getTime() - utcDate.getTime()) / 1000);
  return diffSeconds;
};


const filterRecentRooms = (rooms: IRoom[]): IRoom[] => {
  const FIFTEEN_MINUTES = 0.5 * 60; // в секундах

  return rooms.filter((room) => {
    const secondsPassed = secondsSince(room.created_at);
    return secondsPassed <= FIFTEEN_MINUTES;
  });
};

interface IGameSearch {
  initLobby: () => any
  wsc: WSClient
}

const GameSearch: React.FC<IGameSearch> = ({ initLobby, wsc }) => {
  const navigate = useNavigate()
  const { userData, wsData, setwsData } = useContext(UserContext)

  const [searchDuration, setSearchDuration] = React.useState<string>("00:00")
  const [seconds, setSeconds] = React.useState<number>(0)
  const [gameIsReady, setGameIsReady] = React.useState<boolean>(false)

  const [rooms, setRooms] = React.useState<IRoom[]>([])
  const hasRequestedRoom = React.useRef(false)
  const hasRequestedGetRooms = React.useRef(false)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  React.useEffect(() => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    setSearchDuration(
      `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    )
  }, [seconds])

  React.useEffect(() => {
    if (seconds >= 15 && rooms.length !== 0) {
      setGameIsReady(true)
    }
  }, [seconds, rooms])

  React.useEffect(() => {
    wsc.onGetRooms(data => {
      console.log("Всего рум:", data.rooms.length, "Последние:", filterRecentRooms(data.rooms))
      setRooms(filterRecentRooms(data.rooms));
      hasRequestedGetRooms.current = true
    })
    wsc.onCreateRoom(room => { console.log('Рума создана', room); wsc.getRooms() })
    wsc.onError(error => console.log('Error', error))
    wsc.onJoinRoom(data => {
      console.log("Присуенденился к комнате", data)
      setwsData(wsd => ({
        ...wsd,
        currentRoom: data.room_id,
        players: data.players,
        time_to_start: data.time_to_start
      }))
      initLobby()
    })
  }, [])

  React.useEffect(() => {
    if (wsData.isAuth) {
      wsc.getRooms()
    }
  }, [wsData.isAuth])

  React.useEffect(() => {
    if (hasRequestedGetRooms.current) {
      if (rooms.length === 0 && !hasRequestedRoom.current && wsData.isAuth) {
        console.log("Нет рум — создаём")
        wsc.createRoom()
        hasRequestedRoom.current = true
      } else if (rooms.length !== 0 && wsData.isAuth) {
        console.log("Румы есть:", rooms)
      } else if (!wsData.isAuth) {
        console.log("Неавторизован")
      }
    }
  }, [rooms, wsData.isAuth])

  const acceptGameHandler = () => {
    const oldestRoom = getOldestRoom(rooms)
    console.log("oldest", oldestRoom?.room_id)
    setwsData(wsd => ({
      ...wsd,
      roomData: oldestRoom
    }))

    wsc.joinRoom(String(oldestRoom.room_id))
  }

  return (
    <div className="w-full h-screen flex gap-5 justify-center items-center">
      {gameIsReady && (
        <>
          <div className="border border-grey-200 rounded-xl p-10 bg-gray-400
          min-w-[360px] flex flex-col gap-6 justify-start items-center">
            <div className="w-full flex justify-center items-center">
              <span className="font-montserrat text-lg font-bold text-red-400">YOUR GAME IS READY</span>
            </div>
            <div className="w-full flex justify-center items-center">
              <RedButton onClick={acceptGameHandler}>
                Accept
              </RedButton>
            </div>
            <div className="w-full flex justify-center items-center">
              <button className="cursor-pointer flex justify-center items-center"
                onClick={() => { navigate("/home") }}>
                <span className="font-montserrat text-sm text-red-500">Decline match</span>
              </button>
            </div>
          </div>
        </>
      )}
      {!gameIsReady && (
        <>
          <div className="border border-grey-200 rounded-xl p-10 bg-gray-400
          min-w-[360px] flex flex-col gap-6 justify-start items-center">
            <div className="w-full flex justify-center items-center">
              <span className="font-montserrat text-lg font-bold text-red-400">GAME SEARCH</span>
            </div>
            <div className="w-full flex justify-center items-center gap-6">
              <span className="font-montserrat text-xs text-gray-100">Region 1</span>
              <span className="font-montserrat text-xs text-gray-100">|</span>
              <span className="font-montserrat text-xs text-gray-100">10 SOL</span>
            </div>
            <div className="w-full flex justify-center items-center">
              <span className="font-montserrat text-xl font-bold text-white">{searchDuration}</span>
            </div>
            <div className="w-full flex justify-center items-center">
              <button className="cursor-pointer flex justify-center items-center"
                onClick={() => { navigate("/home") }}>
                <span className="font-montserrat text-sm text-red-500">Cancel search</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default GameSearch
