import type React from "react";

interface IRedButton {
  width?: string;
  heigth?: string;
  children: React.ReactElement | React.ReactNode
  onClick: () => any
}

const RedButton: React.FC<IRedButton> = ({ width, heigth, onClick, children }) => {
  return (
    <button
      className={`flex items-center justify-center rounded-[10px]
      bg-gradient-to-r from-red-500 to-red-600
      font-montserrat cursor-pointer text-white hover:text-black
      transition-colors duration-200`}
      style={{
        width: width ? width : undefined,
        height: heigth ? heigth : undefined,
        minWidth: width ? undefined : '138px',
        minHeight: heigth ? undefined : '36px'
      }}
      onClick={onClick}
    >
      <span className="text-center font-bold text-xs">{children}</span>
    </button>
  )
}

export default RedButton



