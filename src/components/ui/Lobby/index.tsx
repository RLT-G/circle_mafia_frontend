import React, { useContext } from "react";
import TestUserImage from "../../../assets/image.png"
import type { WSClient } from "../../../services/wsClient";
import { UserContext } from "../../../context";
import { useNavigate } from "react-router-dom";

// const secondsSince = (isoDate: string): number => {
//   const now = new Date().getTime();
//   const past = new Date(isoDate).getTime();
//   return Math.floor((now - past) / 1000);
// };

const secondsSince = (isoDate: string): number => {
  const utcDate = new Date(isoDate + "Z"); // Принудительно UTC
  const now = new Date(); // локальное время
  const diffSeconds = Math.floor((now.getTime() - utcDate.getTime()) / 1000);
  return diffSeconds;
};

interface ILobby {
  initGame: () => any;
  wsc: WSClient
}

interface IPlauer {
  nickname: string;
}

const Lobby: React.FC<ILobby> = ({ initGame, wsc }) => {
  const navigate = useNavigate()
  const { wsData, setwsData, userData } = useContext(UserContext)

  const [searchDuration, setSearchDuration] = React.useState<string>("01:00")
  const [seconds, setSeconds] = React.useState<number>(300)

  React.useEffect(() => {
    wsc.onPlayerJoined((data: { players: string[], room_id: string }) => {
      console.log("Присоенденился игрок", data)
      setwsData(wsd => ({ ...wsd, players: data.players }))
    })
    wsc.onStartGame(data => {
      console.log('game started', data)
      initGame()
    })
  }, [])

  React.useEffect(() => { console.log('wsData', wsData) }, [wsData])

  React.useEffect(() => {
    console.log(secondsSince(wsData.roomData.created_at))
    const secondsToStart = 5 * 60 - secondsSince(wsData.roomData.created_at)
    if (secondsToStart < 0) {
      navigate('/home')
    } else {
      setSeconds(secondsToStart)
    }
  }, [])

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1)
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
    if (seconds <= 0) {
      wsc.startGame(wsData.currentRoom)
    }
    if (seconds <= -5) {
      navigate('/home')
    }
  }, [seconds])

  const columns = 5;
  const rows = 10;

  return (
    <>
      <div className="w-full mt-[140px] flex flex-col gap-8 justify-start items-center">
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-400 w-full
        flex flex-col justify-start gap-8">
          <div className="w-full flex justify-between items-center relative">
            <div className="flex justify-start items-center gap-2">
              <span className="font-montserrat text-sm text-gray-100">The game will start in</span>
              <span className="font-montserrat text-base text-white font-bold">{searchDuration}</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="flex justify-start items-center gap-0.5">
                <span className="font-montserrat text-base font-bold text-red-400">{wsData.players.length}</span>
                <span className="font-montserrat text-base text-gray-100">/</span>
                <span className="font-montserrat text-base text-gray-100">50</span>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.5 6.66669C12.5 8.0474 11.3807 9.16669 10 9.16669C8.61929 9.16669 7.5 8.0474 7.5 6.66669C7.5 5.28598 8.61929 4.16669 10 4.16669C10.663 4.16669 11.2989 4.43008 11.7678 4.89892C12.2366 5.36776 12.5 6.00365 12.5 6.66669Z" stroke="#FF6060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12.9167 11.6667H7.08333C5.93274 11.6667 5 12.5994 5 13.75C5 14.9006 5.93274 15.8334 7.08333 15.8334H12.9167C14.0673 15.8334 15 14.9006 15 13.75C15 12.5994 14.0673 11.6667 12.9167 11.6667V11.6667Z" stroke="#FF6060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="absolute top-0 left-0 w-full flex justify-center">
              <span className="font-montserrat text-lg font-bold text-red-400">WAITING FOR PLAYERS</span>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-x-3 gap-y-1">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => {
                  const cellIndex = colIndex * rows + rowIndex;
                  const isFilled = cellIndex < wsData.players.length;
                  if (isFilled) {
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className="w-full rounded-lg h-8 bg-gray-200 flex justify-between items-center
                        px-3 py-1"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-montserrat text-sm text-gray-100 min-w-4 max-w-4">{cellIndex + 1}.</span>
                          <span className="font-montserrat text-sm text-white">{`${wsData.players[cellIndex].username.slice(0, 8)}...`}</span>
                        </div>

                        <div className="w-6 h-6 rounded-[50%] bg-cover bg-no-repeat"
                          style={{ backgroundImage: `url(${TestUserImage})` }}
                        />

                      </div>
                    )
                  }
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="w-full rounded-lg h-8 bg-gray-950"
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default Lobby
