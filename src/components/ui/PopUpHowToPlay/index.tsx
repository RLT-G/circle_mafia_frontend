import type React from "react";
import PopUpWrapper from "../PopUpWrapper";

interface IPopUpHowToPlay {
  onClose: () => any;
}

const PopUpHowToPlay: React.FC<IPopUpHowToPlay> = ({ onClose }) => {
  return (
    <PopUpWrapper onClose={onClose}>
      <div className="w-[560px] flex flex-col gap-5">
        <div className="w-full flex justify-center">
          <span className="text-center font-montserrat font-bold text-sm text-red-500">GAME RULES</span>
        </div>
        <div className="w-full flex flex-col gap-3 items-start">
          <span className="font-montserrat font-bold text-sm text-white">Objective</span>
          <span className="font-montserrat text-xs text-gray-100">Grow in mass by absorbing pellets and other players. The bigger you are, the better your chances of survival</span>
        </div>
        <div className="w-full flex flex-col gap-3 items-start">
          <span className="font-montserrat font-bold text-sm text-white">Controls</span>
          <div className="flex gap-1">
            <span className="font-montserrat text-xs text-white">🖱 Mouse</span>
            <span className="font-montserrat text-xs text-gray-100">— controls your movement direction</span>
          </div>
          <div className="flex gap-1">
            <span className="font-montserrat text-xs text-white">␣ Spacebar</span>
            <span className="font-montserrat text-xs text-gray-100">— controls your movement direction</span>
          </div>
          <div className="flex gap-1">
            <span className="font-montserrat text-xs text-white">W</span>
            <span className="font-montserrat text-xs text-gray-100">— eject some mass for strategy or to feed a teammate</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 items-start">
          <span className="font-montserrat font-bold text-sm text-white">Hazards</span>
          <span className="font-montserrat text-xs text-gray-100">⚠️ Avoid players larger than you — they can eat you!</span>
          <span className="font-montserrat text-xs text-gray-100">⚡ Watch out for obstacles and traps — they can slow you down or split you.</span>
        </div>
        <div className="w-full flex flex-col gap-3 items-start">
          <span className="font-montserrat font-bold text-sm text-white">Strategy</span>
          <span className="font-montserrat text-xs text-gray-100">Use split to catch opponents off guard.</span>
          <span className="font-montserrat text-xs text-gray-100">Hide, merge, boost — think smart, not just big.</span>
        </div>
        <div className="w-full">
          <span className="text-center font-montserrat text-xs text-red-500">🎯 The winner is the one who survives the longest and gains the most mass!</span>
        </div>
      </div>
    </PopUpWrapper>
  )
}

export default PopUpHowToPlay
