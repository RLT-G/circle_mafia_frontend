import React from "react";
import TestUserImage from "../../../assets/image.png"

interface IUsers {
  username: string;
  avatar: string;
  amount: string;
}

const Leaderboard: React.FC = () => {
  const [users, setUsers] = React.useState<IUsers[]>([])

  React.useEffect(() => {
    setUsers([
      { username: "NebulaX", avatar: TestUserImage, amount: "1,000" },
      { username: "NebulaX", avatar: TestUserImage, amount: "1,000" },
      { username: "NebulaX", avatar: TestUserImage, amount: "1,000" },
      { username: "NebulaX", avatar: TestUserImage, amount: "1,000" },
      { username: "NebulaX", avatar: TestUserImage, amount: "1,000" },
      { username: "NebulaX", avatar: TestUserImage, amount: "1,000" },
      { username: "NebulaX", avatar: TestUserImage, amount: "1,000" },
      { username: "NebulaX", avatar: TestUserImage, amount: "1,000" },
      { username: "NebulaX", avatar: TestUserImage, amount: "1,000" },
      { username: "NebulaX", avatar: TestUserImage, amount: "1,000" },
      { username: "NebulaX", avatar: TestUserImage, amount: "1,000" },
      { username: "NebulaX", avatar: TestUserImage, amount: "1,000" },
      { username: "NebulaX", avatar: TestUserImage, amount: "1,000" },
      { username: "NebulaX", avatar: TestUserImage, amount: "1,000" },
    ])
  }, [])

  return (
    <div className="w-full flex flex-col gap-4">
      {users.map(({ username, avatar, amount }, index) => (
        <div className="w-full flex justify-between items-center px-1">
          <div className="flex gap-3 items-center">
            <div className="w-[25px]">
              <span className="text-start font-montserrat text-xs text-gray-100">{index}.</span>
            </div>
            <div className="w-[103px]">
              <span className="text-start font-montserrat text-xs text-white">{username}</span>
            </div>
            <div className="w-6 h-6 rounded-[50%] bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${avatar})` }}
            />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-start font-montserrat text-xs text-white">{amount}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_691_2363)">
                <path d="M0 2.66667C0 1.19391 1.19391 0 2.66667 0H13.3333C14.8061 0 16 1.19391 16 2.66667V13.3333C16 14.8061 14.8061 16 13.3333 16H2.66667C1.19391 16 0 14.8061 0 13.3333V2.66667Z" fill="#1A1A1A" />
                <path d="M4.39998 10.107C4.46525 10.0446 4.55374 10.0096 4.64601 10.0096H13.1588C13.3139 10.0096 13.3915 10.189 13.2818 10.2939L11.5997 11.9025C11.5344 11.9649 11.4459 12 11.3537 12H2.84088C2.68581 12 2.60818 11.8205 2.71786 11.7156L4.39998 10.107Z" fill="url(#paint0_linear_691_2363)" />
                <path d="M4.39998 4.09748C4.46525 4.03506 4.55374 4 4.64601 4H13.1588C13.3139 4 13.3915 4.17947 13.2818 4.28439L11.5997 5.89297C11.5344 5.95537 11.4459 5.99043 11.3537 5.99043H2.84088C2.68581 5.99043 2.60818 5.81096 2.71786 5.70606L4.39998 4.09748Z" fill="url(#paint1_linear_691_2363)" />
                <path d="M11.5997 7.08311C11.5344 7.02071 11.4459 6.98565 11.3537 6.98565H2.84088C2.68581 6.98565 2.60818 7.16512 2.71786 7.27002L4.39998 8.8786C4.46525 8.94102 4.55374 8.97608 4.64601 8.97608H13.1588C13.3139 8.97608 13.3915 8.79661 13.2818 8.6917L11.5997 7.08311Z" fill="url(#paint2_linear_691_2363)" />
              </g>
              <defs>
                <linearGradient id="paint0_linear_691_2363" x1="9.8778" y1="1.80557" x2="4.3825" y2="12.8036" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00FFA3" />
                  <stop offset="1" stopColor="#DC1FFF" />
                </linearGradient>
                <linearGradient id="paint1_linear_691_2363" x1="9.8778" y1="1.80557" x2="4.3825" y2="12.8036" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00FFA3" />
                  <stop offset="1" stopColor="#DC1FFF" />
                </linearGradient>
                <linearGradient id="paint2_linear_691_2363" x1="9.8778" y1="1.80557" x2="4.3825" y2="12.8036" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00FFA3" />
                  <stop offset="1" stopColor="#DC1FFF" />
                </linearGradient>
                <clipPath id="clip0_691_2363">
                  <rect width="16" height="16" rx="8" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      ))}

    </div>
  )
}

export default Leaderboard
