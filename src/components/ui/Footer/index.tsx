import type React from "react";
import UserLine from "../UserLine";

interface IFooter {
  noUsers?: boolean;
}

const Footer: React.FC<IFooter> = ({ noUsers = false }) => {
  return (
    <footer className="container fixed bottom-0 flex flex-col-reverse">
      <div className="flex justify-center py-1.5">
        <div className="flex gap-6 items-center">
          <span className="font-montserrat text-xs text-white">Privacy Policy</span>
          <span className="font-montserrat text-xs text-white">Cookie Policy</span>
          <span className="font-montserrat text-xs text-white">Terms of Use</span>
          <span className="font-montserrat text-xs text-white">FAQ</span>
        </div>
        <span className="absolute left-0 font-montserrat text-[10px] text-gray-100">Copyright © 2025 Circle Mafia Inc. All Rights Reserved</span>
        <span className="absolute right-0 font-montserrat text-[10px] text-gray-100">ver 1.0028</span>
      </div>

      {!noUsers && (
        <div className="w-full flex py-2 overflow-visible relative -left-1/2">
          <UserLine row />
        </div>
      )}
    </footer>
  )
}

export default Footer
