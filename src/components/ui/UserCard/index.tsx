import type React from "react";
import TestUserImg from "../../../assets/image.png"

interface IUserCard {
  username: string;
  pln: string;
  addr: string;
  needBackground?: boolean;
}

const UserCard: React.FC<IUserCard> = ({ username, pln, addr, needBackground = false }) => {
  return (
    <div className={`py-3 px-2 rounded-lg flex justify-between items-center gap-2 
    w-[154px] h-[64px] ${needBackground && 'bg-gray-200'}`}>
      <div className="rounded-[50%] bg-cover bg-no-repeat w-10 h-10"
        style={{ backgroundImage: `url(${TestUserImg})` }}
      >
      </div>
      <div className="flex flex-col items-start">
        <span className="font-montserrat font-bold text-xs text-white">{username}</span>
        <span className="font-montserrat font-bold text-xs text-green-600">{pln}</span>
        <div className="flex items-center gap-1">
          <span className="font-montserrat font-bold text-xs text-gray-100">{addr}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.22576 4.19643C9.93211 3.49008 11.0773 3.49008 11.7837 4.19643C12.49 4.90278 12.49 6.04801 11.7837 6.75436L10.269 8.26903C10.1388 8.3992 10.1388 8.61026 10.269 8.74043C10.3992 8.87061 10.6102 8.87061 10.7404 8.74043L12.2551 7.22576C13.2218 6.25906 13.2218 4.69173 12.2551 3.72503C11.2884 2.75832 9.72106 2.75832 8.75435 3.72503L7.23969 5.23969C7.10951 5.36987 7.10951 5.58092 7.23969 5.7111C7.36986 5.84127 7.58092 5.84127 7.71109 5.7111L9.22576 4.19643Z" fill="#FF3333" />
            <path d="M9.73176 6.72043C9.86193 6.59026 9.86193 6.3792 9.73176 6.24903C9.60158 6.11885 9.39053 6.11885 9.26035 6.24903L6.23102 9.27836C6.10085 9.40854 6.10085 9.61959 6.23102 9.74976C6.36119 9.87994 6.57225 9.87994 6.70242 9.74976L9.73176 6.72043Z" fill="#FF3333" />
            <path d="M5.69176 7.73176C5.82193 7.60159 5.82193 7.39053 5.69176 7.26036C5.56158 7.13019 5.35053 7.13019 5.22035 7.26036L3.70569 8.77503L3.70268 8.77807C2.75707 9.74828 2.76711 11.2984 3.7252 12.2563C4.68329 13.2142 6.23343 13.2239 7.20343 12.2781L7.20637 12.2751L8.72104 10.7611C8.85124 10.631 8.85129 10.4199 8.72114 10.2897C8.591 10.1595 8.37994 10.1595 8.24974 10.2896L6.73659 11.8021C6.02775 12.4918 4.89614 12.4843 4.19655 11.7848C3.49699 11.0854 3.48917 9.95387 4.17866 9.24487L5.69176 7.73176Z" fill="#FF3333" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default UserCard
