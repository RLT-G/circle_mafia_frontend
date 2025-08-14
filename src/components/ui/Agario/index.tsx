import React, { useContext } from "react";
import type { WSClient } from "../../../services/wsClient";
import { useRef } from "react";
import { MainScene } from "../../../game/MainScene";
import { UserContext } from "../../../context";
import AvatarPNG from "../../../assets/avatar.png"
import Spell1PNG from "../../../assets/spell1.png"
import Spell2PNG from "../../../assets/spell2.png"
import Spell3PNG from "../../../assets/spell3.png"
import Spell4PNG from "../../../assets/spell4.png"
import Spell5PNG from "../../../assets/spell5.png"


interface IAgario {
  wsc: WSClient;
}

const Agario: React.FC<IAgario> = ({ wsc }) => {
  const gameRef = useRef<Phaser.Game | null>(null)
  const { userData, gameData, setGameData } = useContext(UserContext)

  React.useEffect(() => {
    if (!gameRef.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: "#000000",
        parent: "game-container",
        scene: [new MainScene(wsc, userData.user_id, 1000, 600, setGameData)],
        physics: { default: "arcade" },
        fps: {
          target: 60,
          forceSetTimeOut: true
        },
      };

      gameRef.current = new Phaser.Game(config);
    }
  }, [])

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <div id="game-container" className="absolute top-0 left-0 w-full h-screen z-10" />
      <div className="absolute top-0 left-0 w-full h-screen">
        <div className="absolute top-10 left-10 z-20">
          <div className="flex flex-col gap-5 items-start">
            <div className="border border-gray-200 rounded-lg p-3 flex gap-3 items-start">
              <div className="rounded-[50%] bg-cover bg-no-repeat w-12 h-12"
                style={{ backgroundImage: `url(${AvatarPNG})` }}
              ></div>
              <div className="flex flex-col gap-0.5 items-start w-[140px]">
                <span className="font-montserrat font-bold text-lg text-red-400">ShadowViper</span>
                <div className="flex justify-between items-center w-full">
                  <span className="font-montserrat font-bold text-sm text-gray-100">Rank</span>
                  <span className="font-montserrat font-bold text-sm text-white">50</span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="font-montserrat font-bold text-sm text-gray-100">Score</span>
                  <span className="font-montserrat font-bold text-sm text-white">{gameData.mass}</span>
                </div>
              </div>
            </div>
            <button className="rounded-lg w-6 h-6 bg-white cursor-pointer flex items-center justify-center" >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.54401 9.53165C6.83763 9.23949 6.83881 8.76462 6.54665 8.47099C6.25449 8.17737 5.77962 8.17619 5.48599 8.46835L6.54401 9.53165ZM2.47099 11.4683C2.17737 11.7605 2.17619 12.2354 2.46835 12.529C2.76051 12.8226 3.23538 12.8238 3.52901 12.5317L2.47099 11.4683ZM3.52901 11.4683C3.23538 11.1762 2.76051 11.1774 2.46835 11.471C2.17619 11.7646 2.17737 12.2395 2.47099 12.5317L3.52901 11.4683ZM5.48599 15.5317C5.77962 15.8238 6.25449 15.8226 6.54665 15.529C6.83881 15.2354 6.83763 14.7605 6.54401 14.4683L5.48599 15.5317ZM3 11.25C2.58579 11.25 2.25 11.5858 2.25 12C2.25 12.4142 2.58579 12.75 3 12.75V11.25ZM17 12.75C17.4142 12.75 17.75 12.4142 17.75 12C17.75 11.5858 17.4142 11.25 17 11.25V12.75ZM5.48599 8.46835L2.47099 11.4683L3.52901 12.5317L6.54401 9.53165L5.48599 8.46835ZM2.47099 12.5317L5.48599 15.5317L6.54401 14.4683L3.52901 11.4683L2.47099 12.5317ZM3 12.75L17 12.75V11.25L3 11.25V12.75Z" fill="#0A0A0A" />
                <path d="M9 15C9 17.2091 10.7909 19 13 19H17C19.2091 19 21 17.2091 21 15V9C21 6.79086 19.2091 5 17 5H13C10.7909 5 9 6.79086 9 9" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="absolute top-0 left-0 z-20 w-full h-0 overflow-visible
        flex justify-center">
          <div className="flex flex-col gap-1 mt-10 items-center">
            <span className="font-montserrat font-bold text-sm text-gray-100">Round ends in</span>
            <span className="font-montserrat font-bold text-xl text-white">{gameData.time_to_next_shrink}</span>
          </div>
        </div>

        <div className="absolute top-10 right-10 z-20">
          <div className="flex flex-col gap-5 items-start">
            <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-4 items-start">

              <div className="flex justify-center w-full">
                <span className="font-montserrat font-bold text-lg text-red-400">LEADERBOARD</span>
              </div>

              <div className="flex flex-col w-[160px] gap-3 items-start">
                <div className="w-full flex items-center gap-2">
                  <span className="font-montserrat font-bold text-sm text-gray-100">1.</span>
                  <div className="rounded-[50%] bg-cover bg-no-repeat w-5 h-5"
                    style={{ backgroundImage: `url(${AvatarPNG})` }}
                  ></div>
                  <span className="font-montserrat font-bold text-sm text-white">CrimsonPulse</span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <span className="font-montserrat font-bold text-sm text-gray-100">2.</span>
                  <div className="rounded-[50%] bg-cover bg-no-repeat w-5 h-5"
                    style={{ backgroundImage: `url(${AvatarPNG})` }}
                  ></div>
                  <span className="font-montserrat font-bold text-sm text-white">CrimsonPulse</span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <span className="font-montserrat font-bold text-sm text-gray-100">3.</span>
                  <div className="rounded-[50%] bg-cover bg-no-repeat w-5 h-5"
                    style={{ backgroundImage: `url(${AvatarPNG})` }}
                  ></div>
                  <span className="font-montserrat font-bold text-sm text-white">CrimsonPulse</span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <span className="font-montserrat font-bold text-sm text-gray-100">4.</span>
                  <div className="rounded-[50%] bg-cover bg-no-repeat w-5 h-5"
                    style={{ backgroundImage: `url(${AvatarPNG})` }}
                  ></div>
                  <span className="font-montserrat font-bold text-sm text-white">CrimsonPulse</span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <span className="font-montserrat font-bold text-sm text-gray-100">5.</span>
                  <div className="rounded-[50%] bg-cover bg-no-repeat w-5 h-5"
                    style={{ backgroundImage: `url(${AvatarPNG})` }}
                  ></div>
                  <span className="font-montserrat font-bold text-sm text-white">CrimsonPulse</span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <span className="font-montserrat font-bold text-sm text-gray-100">6.</span>
                  <div className="rounded-[50%] bg-cover bg-no-repeat w-5 h-5"
                    style={{ backgroundImage: `url(${AvatarPNG})` }}
                  ></div>
                  <span className="font-montserrat font-bold text-sm text-white">CrimsonPulse</span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <span className="font-montserrat font-bold text-sm text-gray-100">7.</span>
                  <div className="rounded-[50%] bg-cover bg-no-repeat w-5 h-5"
                    style={{ backgroundImage: `url(${AvatarPNG})` }}
                  ></div>
                  <span className="font-montserrat font-bold text-sm text-white">CrimsonPulse</span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <span className="font-montserrat font-bold text-sm text-gray-100">8.</span>
                  <div className="rounded-[50%] bg-cover bg-no-repeat w-5 h-5"
                    style={{ backgroundImage: `url(${AvatarPNG})` }}
                  ></div>
                  <span className="font-montserrat font-bold text-sm text-white">CrimsonPulse</span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <span className="font-montserrat font-bold text-sm text-gray-100">9.</span>
                  <div className="rounded-[50%] bg-cover bg-no-repeat w-5 h-5"
                    style={{ backgroundImage: `url(${AvatarPNG})` }}
                  ></div>
                  <span className="font-montserrat font-bold text-sm text-white">CrimsonPulse</span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <span className="font-montserrat font-bold text-sm text-gray-100">10.</span>
                  <div className="rounded-[50%] bg-cover bg-no-repeat w-5 h-5"
                    style={{ backgroundImage: `url(${AvatarPNG})` }}
                  ></div>
                  <span className="font-montserrat font-bold text-sm text-white">CrimsonPulse</span>
                </div>
                <div className="w-full flex items-center gap-2">
                  <span className="font-montserrat font-bold text-sm text-red-400">50.</span>
                  <div className="rounded-[50%] bg-cover bg-no-repeat w-5 h-5"
                    style={{ backgroundImage: `url(${AvatarPNG})` }}
                  ></div>
                  <span className="font-montserrat font-bold text-sm text-red-400">CrimsonPulse</span>
                </div>
              </div>


            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 z-20">
          <div className="flex gap-3 items-center">
            <button
              className="
                relative flex items-center justify-center
                w-12 h-12 rounded-lg border border-red-400 bg-black
                bg-cover bg-no-repea cursor-pointert

                after:content-['S'] after:absolute
                after:bottom-[-1px] after:right-[-1px]
                after:w-[17px] after:h-[13px]
                after:bg-red-400 after:text-black
                after:font-montserrat after:font-bold after:text-xs after:text-center
                after:rounded-xs after:rounded-br-lg
              "
              style={{ backgroundImage: `url(${Spell1PNG})` }}

            >
            </button>
            <button
              className="
                relative flex items-center justify-center
                w-12 h-12 rounded-lg border border-red-400 bg-black
                bg-cover bg-no-repeat cursor-pointer

                after:content-['S'] after:absolute
                after:bottom-[-1px] after:right-[-1px]
                after:w-[17px] after:h-[13px]
                after:bg-red-400 after:text-black
                after:font-montserrat after:font-bold after:text-xs after:text-center
                after:rounded-xs after:rounded-br-lg
              "
              style={{ backgroundImage: `url(${Spell2PNG})` }}

            >
            </button>

            <button
              className="
                relative flex items-center justify-center
                w-12 h-12 rounded-lg border border-red-400 bg-black
                bg-cover bg-no-repea cursor-pointert

                after:content-['S'] after:absolute
                after:bottom-[-1px] after:right-[-1px]
                after:w-[17px] after:h-[13px]
                after:bg-red-400 after:text-black
                after:font-montserrat after:font-bold after:text-xs after:text-center
                after:rounded-xs after:rounded-br-lg
              "
              style={{ backgroundImage: `url(${Spell3PNG})` }}

            >
            </button>
            <button
              className="
                relative flex items-center justify-center
                w-12 h-12 rounded-lg border border-red-400 bg-black
                bg-cover bg-no-repeat cursor-pointer

                after:content-['S'] after:absolute
                after:bottom-[-1px] after:right-[-1px]
                after:w-[17px] after:h-[13px]
                after:bg-red-400 after:text-black
                after:font-montserrat after:font-bold after:text-xs after:text-center
                after:rounded-xs after:rounded-br-lg
              "
              style={{ backgroundImage: `url(${Spell4PNG})` }}

            >
            </button>
            <button
              className="
                relative flex items-center justify-center
                w-12 h-12 rounded-lg border border-red-400 bg-black
                bg-cover bg-no-repeat cursor-pointer

                after:content-['S'] after:absolute
                after:bottom-[-1px] after:right-[-1px]
                after:w-[17px] after:h-[13px]
                after:bg-red-400 after:text-black
                after:font-montserrat after:font-bold after:text-xs after:text-center
                after:rounded-xs after:rounded-br-lg
              "
              style={{ backgroundImage: `url(${Spell5PNG})` }}

            >
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Agario;


