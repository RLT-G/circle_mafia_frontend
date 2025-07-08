import type React from "react";

interface IWhiteButton {
  children: React.ReactElement | React.ReactNode
  onClick: () => any
  noIco?: boolean;
}

const WhiteButton: React.FC<IWhiteButton> = ({ onClick, children, noIco = false }) => {
  return (
    <button
      className="flex gap-2 items-center px-4 rounded-[10px]
      min-w-[138px] min-h-[36px] bg-gradient-to-r from-white to-orange-50 
      font-montserrat cursor-pointer text-black hover:text-red-600
      transition-colors duration-200"
      style={{ justifyContent: noIco ? 'center' : undefined }}
      onClick={onClick}
    >
      {!noIco && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.6504 15.9189V19.2002C13.6503 19.2115 13.6459 19.2232 13.6348 19.2344C13.6234 19.2457 13.611 19.25 13.5996 19.25H10.4004C10.389 19.25 10.3766 19.2457 10.3652 19.2344C10.3541 19.2232 10.3497 19.2115 10.3496 19.2002V15.9111L11.9961 14.2646L13.6504 15.9189ZM19.2002 10.3584C19.2115 10.3584 19.2232 10.362 19.2344 10.373C19.2457 10.3844 19.25 10.3968 19.25 10.4082V13.6084C19.2499 13.6197 19.2456 13.6314 19.2344 13.6426C19.2231 13.6538 19.2115 13.6582 19.2002 13.6582H15.9111L14.2568 12.0039L15.9023 10.3584H19.2002ZM4.7998 10.3496H8.08887L9.73535 11.9961L8.08105 13.6504H4.7998C4.78851 13.6503 4.77684 13.6459 4.76562 13.6348C4.75429 13.6234 4.75 13.611 4.75 13.5996V10.4004C4.75 10.389 4.75429 10.3766 4.76562 10.3652C4.77684 10.3541 4.78851 10.3497 4.7998 10.3496ZM10.4004 4.75H13.5996C13.611 4.75 13.6234 4.75429 13.6348 4.76562C13.6459 4.77684 13.6503 4.78851 13.6504 4.7998V8.08887L12.0039 9.73535L10.3496 8.08105V4.7998C10.3497 4.78851 10.3541 4.77684 10.3652 4.76562C10.3766 4.75429 10.389 4.75 10.4004 4.75Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
      <span className="text-center font-bold text-xs">{children}</span>
    </button>
  )
}

export default WhiteButton


