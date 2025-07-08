import React from "react";
import UserLine from "../UserLine";
import Leaderboard from "../Leaderboard";

const WinnersAndLiders: React.FC = () => {
  const [isWinners, setIsWinners] = React.useState<boolean>(true)
  const [isLeaders, setIsLeaders] = React.useState<boolean>(false)

  const openWinners = (): any => {
    setIsWinners(true)
    setIsLeaders(false)
  }

  const openLeaders = (): any => {
    setIsLeaders(true)
    setIsWinners(false)
  }

  return (
    <div className="border border-gray-200 rounded-xl p-6 pb-0 bg-gray-400 
    min-w-[360px] h-[376px] overflow-hidden">
      <div className="w-full flex flex-col gap-4 items-center">
        <div className="flex justify-between w-full max-h-11">
          <button className="w-[144px] py-3 cursor-pointer transition-colors duration-200"
            style={{ borderBottom: isWinners ? '1px solid red' : '1px solid transparent' }}
            onClick={openWinners}
          >
            <span className="font-montserrat font-bold text-sm text-center"
              style={{ color: isWinners ? '#f33' : '#FFF' }}
            >LATEST WINNERS</span>
          </button>
          <button className="w-[144px] py-3 cursor-pointer transition-colors duration-200"
            style={{ borderBottom: isLeaders ? '1px solid #f33' : '1px solid transparent' }}
            onClick={openLeaders}
          >
            <span className="font-montserrat font-bold text-sm text-center"
              style={{ color: isLeaders ? '#f33' : '#FFF' }}
            >LEADERBOARD</span>
          </button>
        </div>
        <div className="w-full h-[292px] flex justify-start overflow-y-auto">
          {isWinners && <UserLine col />}
          {isLeaders && <Leaderboard />}
        </div>
      </div>
    </div>
  )
}

export default WinnersAndLiders
