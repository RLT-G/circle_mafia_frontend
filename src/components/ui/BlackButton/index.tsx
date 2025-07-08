
import type React from "react";

interface IBlackButton {
  children: React.ReactElement | React.ReactNode
  ping: string
  onClick: () => any
}

const BlackButton: React.FC<IBlackButton> = ({ ping, onClick, children }) => {
  return (
    <button
      className="flex gap-2 items-center px-4 rounded-[10px]
      min-h-[36px] bg-gray-200 border border-gray-200 hover:border-red-600
      font-montserrat cursor-pointer transition-colors duration-200"
      onClick={onClick}
    >
      <span className="text-gray-100 text-center font-bold text-xs">{children}</span>
      <span className="text-yellow-100 text-center font-bold text-xs">{ping}</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0467 5C12.1608 5.00026 12.2725 5.03306 12.3687 5.09457C12.4648 5.15607 12.5414 5.24372 12.5895 5.34723C12.6376 5.45075 12.6552 5.56583 12.6401 5.67897C12.6251 5.79211 12.5781 5.89862 12.5047 5.986L8.4327 10.819C8.37638 10.8859 8.30612 10.9397 8.22683 10.9766C8.14754 11.0135 8.06115 11.0326 7.9737 11.0326C7.88625 11.0326 7.79986 11.0135 7.72057 10.9766C7.64128 10.9397 7.57102 10.8859 7.5147 10.819L3.4407 5.986C3.36727 5.89862 3.32029 5.79211 3.30527 5.67897C3.29025 5.56583 3.30781 5.45075 3.35589 5.34723C3.40397 5.24372 3.48058 5.15607 3.57673 5.09457C3.67287 5.03306 3.78456 5.00026 3.8987 5H12.0467Z" fill="#9E9E9E" />
      </svg>
    </button>
  )
}

export default BlackButton


