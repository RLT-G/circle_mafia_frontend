import React from "react";
import Background from "../../ui/Background";
import Header from "../../ui/Header";
import { useNavigate } from "react-router-dom";
import PopUpHowToPlay from "../../ui/PopUpHowToPlay";
import SolanaSVG from "../../../assets/solana.svg"
import TestUserImg from "../../../assets/avatar.png"

interface IReferrals {
  username: string;
  indirectReferrals: string;
  directRewards: string;
  indirectRewards: string;
  totalRewards: string;
  activationTime: string;
}

const Referral: React.FC = () => {
  const navigate = useNavigate()
  const [howToPlayIsOpen, setHowToPlayIsOpen] = React.useState<boolean>(false)
  const [referrals, setReferrals] = React.useState<IReferrals[]>([])

  React.useEffect(() => {
    setReferrals([
      { username: "NeonStrikeX", indirectReferrals: "27", directRewards: "427.58", indirectRewards: "27.84", totalRewards: "455.42", activationTime: "2025-04-12 09:45" },
      { username: "NeonStrikeX", indirectReferrals: "27", directRewards: "427.58", indirectRewards: "27.84", totalRewards: "455.42", activationTime: "2025-04-12 09:45" },
      { username: "NeonStrikeX", indirectReferrals: "27", directRewards: "427.58", indirectRewards: "27.84", totalRewards: "455.42", activationTime: "2025-04-12 09:45" },
      { username: "NeonStrikeX", indirectReferrals: "27", directRewards: "427.58", indirectRewards: "27.84", totalRewards: "455.42", activationTime: "2025-04-12 09:45" },
      { username: "NeonStrikeX", indirectReferrals: "27", directRewards: "427.58", indirectRewards: "27.84", totalRewards: "455.42", activationTime: "2025-04-12 09:45" },
      { username: "NeonStrikeX", indirectReferrals: "27", directRewards: "427.58", indirectRewards: "27.84", totalRewards: "455.42", activationTime: "2025-04-12 09:45" },
      { username: "NeonStrikeX", indirectReferrals: "27", directRewards: "427.58", indirectRewards: "27.84", totalRewards: "455.42", activationTime: "2025-04-12 09:45" },
      { username: "NeonStrikeX", indirectReferrals: "27", directRewards: "427.58", indirectRewards: "27.84", totalRewards: "455.42", activationTime: "2025-04-12 09:45" },
      { username: "NeonStrikeX", indirectReferrals: "27", directRewards: "427.58", indirectRewards: "27.84", totalRewards: "455.42", activationTime: "2025-04-12 09:45" },
      { username: "NeonStrikeX", indirectReferrals: "27", directRewards: "427.58", indirectRewards: "27.84", totalRewards: "455.42", activationTime: "2025-04-12 09:45" },
      { username: "NeonStrikeX", indirectReferrals: "27", directRewards: "427.58", indirectRewards: "27.84", totalRewards: "455.42", activationTime: "2025-04-12 09:45" },
      { username: "NeonStrikeX", indirectReferrals: "27", directRewards: "427.58", indirectRewards: "27.84", totalRewards: "455.42", activationTime: "2025-04-12 09:45" },
    ])
  }, [])
  const openHowToPlay = () => {
    setHowToPlayIsOpen(true)
  }

  const closeHowToPlay = () => {
    setHowToPlayIsOpen(false)
  }

  return (
    <Background bgBlack>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Header openHowToPlay={openHowToPlay} needLogo />
        <main className="container min-h-screen">
          <div className="flex flex-col gap-5 items-start mt-[140px]">
            <button
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => { navigate('/home') }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3536 7.35355C15.5488 7.15829 15.5488 6.84171 15.3536 6.64645C15.1583 6.45118 14.8417 6.45118 14.6464 6.64645L9.64645 11.6464C9.45118 11.8417 9.45118 12.1583 9.64645 12.3536L14.6464 17.3536C14.8417 17.5488 15.1583 17.5488 15.3536 17.3536C15.5488 17.1583 15.5488 16.8417 15.3536 16.6464L10.7071 12L15.3536 7.35355Z" fill="#FF3333" />
              </svg>
              <span className="font-montserrat text-sm text-red-500">Back to Home</span>
            </button>

            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex flex-col gap-2 items-start">
                <span className="font-montserrat font-bold text-xl text-red-400">INVITE & EARN</span>
                <span className="font-montserrat text-xs text-gray-100">Invite friends and get a share of their winnings, as well as additional bonuses</span>
              </div>
              <div className="w-full flex justify-center">
                <div className="flex gap-5 items-start">
                  <div className="flex flex-col gap-4 items-center w-[360px] min-h-[292px] border border-gray-200 bg-gray-400 p-6 rounded-lg">
                    <span className="font-montserrat font-bold text-xl text-red-400">REFERRAL BONUSES</span>
                    <div className="w-full flex flex-col gap-5">
                      <div className="w-full flex justify-between items-center">
                        <span className="font-montserrat text-sm text-gray-100">Level 1</span>
                        <span className="font-montserrat text-sm text-white">5% from Friends’ Bets</span>
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <span className="font-montserrat text-sm text-gray-100">Level 2</span>
                        <span className="font-montserrat text-sm text-white">3% from Their Referrals</span>
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <span className="font-montserrat text-sm text-gray-100">Level 3</span>
                        <span className="font-montserrat text-sm text-white">2% from Their Referrals</span>
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <span className="font-montserrat text-sm text-gray-100">Level 4</span>
                        <span className="font-montserrat text-sm text-white">1% from Their Referrals</span>
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <span className="font-montserrat text-sm text-gray-100">Level 5</span>
                        <span className="font-montserrat text-sm text-white">0.5% from Their Referrals</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 min-h-[292px]">
                    <div className="flex flex-col gap-4 items-center w-[740px] border border-gray-200 bg-gray-400 p-6 rounded-lg">
                      <span className="font-montserrat font-bold text-xl text-red-400">EARN</span>
                      <div className="flex gap-4 items-center">
                        <div className="flex flex-col items-center gap-1 min-w-[161px]">
                          <div className="flex items-center gap-1">
                            <span className="font-montserrat font-bold text-lg text-white">183</span>
                          </div>
                          <span className="font-montserrat text-xs text-gray-100">Total referrals</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 min-w-[161px]">
                          <div className="flex items-center gap-1">
                            <img src={SolanaSVG} className="w-5 h-5" />
                            <span className="font-montserrat font-bold text-lg text-white">1,329.53</span>
                          </div>
                          <span className="font-montserrat text-xs text-gray-100">Direct referrals</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 min-w-[161px]">
                          <div className="flex items-center gap-1">
                            <img src={SolanaSVG} className="w-5 h-5" />
                            <span className="font-montserrat font-bold text-lg text-white">182.05</span>
                          </div>
                          <span className="font-montserrat text-xs text-gray-100">Indirect referrals</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 min-w-[161px]">
                          <div className="flex items-center gap-1">
                            <img src={SolanaSVG} className="w-5 h-5" />
                            <span className="font-montserrat font-bold text-lg text-red-400">1,511.58</span>
                          </div>
                          <span className="font-montserrat text-xs text-gray-100">Total rewards</span>
                        </div>
                      </div>

                    </div>
                    <div className="flex flex-col gap-4 items-start w-[740px] border border-gray-200 bg-gray-400 p-6 rounded-lg">
                      <span className="font-montserrat text-sm text-red-400">You receive bonus points for the users you invite through your referral link</span>
                      <div className="w-full flex justify-between items-center p-3 rounded-lg bg-gray-200">
                        <span className="font-montserrat text-sm text-white">https://circlemafia.io/?referrer=8fisnba4TMygvDTQsFAbHGEHTEs</span>
                        <button className="cursor-pointer">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M17.176 14.248C17.176 15.8651 15.8651 17.176 14.248 17.176H6.928C5.31091 17.176 4 15.8651 4 14.248V6.928C4 5.31091 5.31091 4 6.928 4H14.248C15.8651 4 17.176 5.31091 17.176 6.928V14.248Z" stroke="#FF3333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M9.75195 20H17.072C18.689 20 20 18.6891 20 17.072V9.752" stroke="#FF3333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-4">
              <span className="font-montserrat font-bold text-xl text-red-400">DIRECT REFERRALS</span>
              <div className="flex w-full items-center">
                <div className="flex justify-start w-1/6">
                  <span className="font-montserrat text-xs text-gray-100">User</span>
                </div>
                <div className="flex justify-start w-1/6">
                  <span className="font-montserrat text-xs text-gray-100">Indirect referrals</span>
                </div>
                <div className="flex justify-start w-1/6">
                  <span className="font-montserrat text-xs text-gray-100">Direct rewards</span>
                </div>
                <div className="flex justify-start w-1/6">
                  <span className="font-montserrat text-xs text-gray-100">Indirect rewards</span>
                </div>
                <div className="flex justify-start w-1/6">
                  <span className="font-montserrat text-xs text-gray-100">Total rewards</span>
                </div>
                <div className="flex justify-start w-1/6">
                  <span className="font-montserrat text-xs text-gray-100">Activation time</span>
                </div>
              </div>
              <div className="flex w-full flex-col items-start">
                {referrals.map(({ username, indirectReferrals, directRewards, indirectRewards, totalRewards, activationTime }, index) => (
                  <div
                    className="flex w-full items-centere relative h-[64px] border-t border-t-gray-200
                    cursor-pointer hover:bg-white/5 transition-all duration-200"
                    key={index}
                    onClick={() => { navigate(("/referral/direct")) }}
                  >
                    <div className="flex justify-start w-1/6">
                      <div className="flex gap-3 items-center">
                        <img src={TestUserImg} className="w-10 h-10" />
                        <span className="font-montserrat text-sm text-white">{username}</span>
                      </div>
                    </div>
                    <div className="flex justify-start w-1/6">
                      <div className="flex gap-3 items-center">
                        <span className="font-montserrat text-sm text-white">{indirectReferrals}</span>
                      </div>
                    </div>
                    <div className="flex justify-start w-1/6">
                      <div className="flex gap-3 items-center">
                        <img src={SolanaSVG} className="w-5 h-5" />
                        <span className="font-montserrat text-sm text-white">{directRewards}</span>
                      </div>
                    </div>
                    <div className="flex justify-start w-1/6">
                      <div className="flex gap-3 items-center">
                        <img src={SolanaSVG} className="w-5 h-5" />
                        <span className="font-montserrat text-sm text-white">{indirectRewards}</span>
                      </div>
                    </div>
                    <div className="flex justify-start w-1/6">
                      <div className="flex gap-3 items-center">
                        <img src={SolanaSVG} className="w-5 h-5" />
                        <span className="font-montserrat text-sm text-white">{totalRewards}</span>
                      </div>
                    </div>
                    <div className="flex justify-start w-1/6">
                      <div className="flex gap-3 items-center">
                        <span className="font-montserrat text-sm text-gray-100">{activationTime}</span>
                      </div>
                    </div>
                    <div className="absolute right-0 h-full flex items-center">
                      <button className="cursor-pointer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M17.0003 17.2341C16.969 16.3071 16.1976 15.5777 15.2702 15.5986C14.3428 15.6194 13.6049 16.3826 13.6153 17.3102C13.6258 18.2377 14.3807 18.9842 15.3083 18.9841C16.2586 18.9677 17.0159 18.1845 17.0003 17.2341Z" stroke="#FF3333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M11.0774 11.9841C11.1007 13.41 9.9642 14.585 8.53836 14.6091C7.1129 14.5845 5.97696 13.4096 6.00035 11.9841C5.97696 10.5587 7.1129 9.38379 8.53836 9.35915C9.9642 9.38325 11.1007 10.5583 11.0774 11.9841Z" stroke="#FF3333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.1541 6.73414C16.169 7.34862 15.8497 7.92293 15.3199 8.23456C14.7901 8.54619 14.133 8.54619 13.6032 8.23456C13.0734 7.92293 12.7541 7.34862 12.7691 6.73414C12.7541 6.11966 13.0734 5.54536 13.6032 5.23372C14.133 4.92209 14.7901 4.92209 15.3199 5.23372C15.8497 5.54536 16.169 6.11966 16.1541 6.73414Z" stroke="#FF3333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M13.6044 16.688C13.9423 16.9275 14.4104 16.8478 14.65 16.5099C14.8895 16.1719 14.8097 15.7038 14.4718 15.4643L13.6044 16.688ZM10.9718 12.9833C10.6339 12.7437 10.1658 12.8235 9.92622 13.1614C9.68668 13.4993 9.76643 13.9675 10.1044 14.207L10.9718 12.9833ZM13.7006 8.44267C14.003 8.15959 14.0187 7.68498 13.7356 7.38259C13.4525 7.08019 12.9779 7.06454 12.6755 7.34761L13.7006 8.44267ZM10.0295 9.82461C9.72714 10.1077 9.71148 10.5823 9.99456 10.8847C10.2776 11.1871 10.7523 11.2027 11.0546 10.9197L10.0295 9.82461ZM14.4718 15.4643L10.9718 12.9833L10.1044 14.207L13.6044 16.688L14.4718 15.4643ZM12.6755 7.34761L10.0295 9.82461L11.0546 10.9197L13.7006 8.44267L12.6755 7.34761Z" fill="#FF3333" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </main>
      </div>
      {howToPlayIsOpen && <PopUpHowToPlay onClose={closeHowToPlay} />}
    </Background>
  )
}

export default Referral
