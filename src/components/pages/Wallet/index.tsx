import React from "react";
import Background from "../../ui/Background";
import Header from "../../ui/Header";
import PopUpHowToPlay from "../../ui/PopUpHowToPlay";
import { useNavigate } from "react-router-dom";
import SolanaSVG from "../../../assets/solana.svg"
import QRExample from "../../../assets/QRExample.webp"
import RedButton from "../../ui/RedButton";

interface ITransactions {
  type: string;
  amount: string;
  time: string;
  details: string;
  txid: string | null;
  status: string;
}

const Wallet: React.FC = () => {
  const navigate = useNavigate()
  const [howToPlayIsOpen, setHowToPlayIsOpen] = React.useState<boolean>(false)
  const [isWallet, setIsWallet] = React.useState<boolean>(true)
  const [isDeposit, setIsDeposit] = React.useState<boolean>(false)
  const [isWithdrawal, setIsWithdrawal] = React.useState<boolean>(false)
  const [transactions, setTransactions] = React.useState<ITransactions[]>([])

  React.useEffect(() => {
    setTransactions([
      { type: 'Withdraw', amount: '1,000', time: '2025-01-22 08:00', details: 'TM2kLP9Q...Z7Y8powK', txid: null, status: "Rejected" },
      { type: 'Withdraw', amount: '500', time: '2025-01-22 08:00', details: 'TM2kLP9Q...Z7Y8powK', txid: null, status: "Pending" },
      { type: 'Withdraw', amount: '200.50', time: '2025-01-22 08:00', details: 'TM2kLP9Q...Z7Y8powK', txid: null, status: "Completed" },
      { type: 'Deposit', amount: '100', time: '2025-01-22 08:00', details: 'TM2kLP9Q...Z7Y8powK', txid: "b26af...252ff", status: "Completed" },
      { type: 'Deposit', amount: '200', time: '2025-01-22 08:00', details: 'TM2kLP9Q...Z7Y8powK', txid: "b26af...252ff", status: "Completed" },
    ])
  }, [])

  const openWallet = () => {
    setIsWallet(true)
    setIsDeposit(false)
    setIsWithdrawal(false)
  }
  const openDeposit = () => {
    setIsDeposit(true)
    setIsWallet(false)
    setIsWithdrawal(false)
  }
  const openWithdrawal = () => {
    setIsWithdrawal(true)
    setIsWallet(false)
    setIsDeposit(false)
  }

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
            <div className="w-full flex justify-start gap-6">
              <button
                className="min-h-11 cursor-pointer flex justify-center items-center px-2 
                hover:text-red-500 transition-colors duration-200"
                style={{
                  borderBottom: isWallet ? "1px solid #f33" : "1px solid transparent",
                  color: isWallet ? "#f33" : "#FFF"
                }}
                onClick={openWallet}
              >
                <span className="font-montserrat text-sm font-bold">MY WALLET</span>
              </button>
              <button
                className="min-h-11 cursor-pointer flex justify-center items-center px-2 
                hover:text-red-500 transition-colors duration-200"
                style={{
                  borderBottom: isDeposit ? "1px solid #f33" : "1px solid transparent",
                  color: isDeposit ? "#f33" : "#FFF"
                }}
                onClick={openDeposit}
              >
                <span className="font-montserrat text-sm font-bold">DEPOSIT</span>
              </button>
              <button
                className="min-h-11 cursor-pointer flex justify-center items-center px-2 
                hover:text-red-500 transition-colors duration-200"
                style={{
                  borderBottom: isWithdrawal ? "1px solid #f33" : "1px solid transparent",
                  color: isWithdrawal ? "#f33" : "#FFF"
                }}
                onClick={openWithdrawal}
              >
                <span className="font-montserrat text-sm font-bold">WITHDRAWAL</span>
              </button>
            </div>
            <div className="w-full flex gap-10 items-center p-6 rounded-lg bg-gray-400 border border-gray-200">
              <div className="flex flex-col items-start gap-1 min-w-[216px]">
                <div className="flex items-center gap-2.5">
                  <span className="font-montserrat font-bold text-sm text-white">My wallet</span>
                  <button
                    className="w-5 h-5 flex justify-center items-center cursor-pointer"
                  >
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.7594 3.7106C7.01845 3.38738 6.96643 2.91537 6.64321 2.65632C6.32 2.39727 5.84798 2.44929 5.58893 2.77251L6.7594 3.7106ZM1.25917 9.37405L1.8272 9.86379C1.83305 9.85699 1.83879 9.8501 1.8444 9.8431L1.25917 9.37405ZM1.11667 9.72238L0.368124 9.67357L0.36747 9.68769L1.11667 9.72238ZM1 12.2416L0.250803 12.2069C0.249078 12.2441 0.250133 12.2814 0.253958 12.3185L1 12.2416ZM1.65583 12.8141L1.68035 13.5637C1.73037 13.562 1.7801 13.5554 1.82879 13.5438L1.65583 12.8141ZM4.15583 12.2216L4.32881 12.9514L4.34045 12.9485L4.15583 12.2216ZM4.47667 12.0182L5.05527 12.4955L5.06177 12.4874L4.47667 12.0182ZM10.0951 6.21075C10.3542 5.88761 10.3023 5.41558 9.9792 5.15645C9.65606 4.89731 9.18403 4.9492 8.92489 5.27235L10.0951 6.21075ZM5.59159 2.77231C5.33244 3.09544 5.3843 3.56747 5.70743 3.82663C6.03055 4.08578 6.50259 4.03392 6.76174 3.71079L5.59159 2.77231ZM7.5 1.59155L8.08507 2.06079C8.09493 2.0485 8.1044 2.0359 8.11346 2.02302L7.5 1.59155ZM8.8575 1.32489L9.33731 0.748445C9.31342 0.728564 9.28833 0.710186 9.26216 0.693419L8.8575 1.32489ZM10.7217 2.87655L11.2525 2.34671C11.2362 2.3304 11.2192 2.31485 11.2015 2.30011L10.7217 2.87655ZM11.0024 3.56062L11.7524 3.56474V3.56473L11.0024 3.56062ZM10.7142 4.24155L10.1892 3.70591C10.1679 3.72675 10.1479 3.74883 10.1293 3.77204L10.7142 4.24155ZM8.92514 5.27204C8.66584 5.59505 8.71748 6.06711 9.04049 6.32641C9.3635 6.58571 9.83555 6.53407 10.0949 6.21106L8.92514 5.27204ZM6.91839 3.1304C6.857 2.72076 6.47516 2.43845 6.06552 2.49983C5.65588 2.56122 5.37356 2.94306 5.43495 3.3527L6.91839 3.1304ZM9.61098 6.48472C10.0214 6.42895 10.3089 6.05102 10.2532 5.64057C10.1974 5.23013 9.81946 4.94261 9.40902 4.99838L9.61098 6.48472ZM5.58893 2.77251L0.673934 8.90501L1.8444 9.8431L6.7594 3.7106L5.58893 2.77251ZM0.691135 8.88432C0.500594 9.10532 0.387246 9.38239 0.368257 9.67358L1.86508 9.77119C1.86285 9.80536 1.84955 9.83786 1.8272 9.86379L0.691135 8.88432ZM0.36747 9.68769L0.250803 12.2069L1.7492 12.2762L1.86586 9.75708L0.36747 9.68769ZM0.253958 12.3185C0.328755 13.0437 0.951714 13.5875 1.68035 13.5637L1.63131 12.0645C1.68992 12.0625 1.74003 12.1063 1.74604 12.1646L0.253958 12.3185ZM1.82879 13.5438L4.32879 12.9513L3.98287 11.4918L1.48287 12.0843L1.82879 13.5438ZM4.34045 12.9485C4.62079 12.8773 4.87116 12.7186 5.05522 12.4955L3.89812 11.541C3.91694 11.5181 3.94254 11.5019 3.97121 11.4946L4.34045 12.9485ZM5.06177 12.4874L10.0951 6.21075L8.92489 5.27235L3.89156 11.549L5.06177 12.4874ZM6.76174 3.71079L8.08507 2.06079L6.91493 1.12231L5.59159 2.77231L6.76174 3.71079ZM8.11346 2.02302C8.19049 1.91351 8.34011 1.88411 8.45284 1.95635L9.26216 0.693419C8.47308 0.187752 7.4257 0.393499 6.88654 1.16009L8.11346 2.02302ZM8.37769 1.90133L10.2419 3.45299L11.2015 2.30011L9.33731 0.748445L8.37769 1.90133ZM10.1908 3.40639C10.2306 3.4462 10.2528 3.50024 10.2525 3.5565L11.7524 3.56473C11.7549 3.10829 11.5749 2.66977 11.2525 2.34671L10.1908 3.40639ZM10.2525 3.55649C10.2521 3.61274 10.2294 3.66654 10.1892 3.70591L11.2391 4.77719C11.5651 4.4577 11.7499 4.02118 11.7524 3.56474L10.2525 3.55649ZM10.1293 3.77204L8.92514 5.27204L10.0949 6.21106L11.299 4.71106L10.1293 3.77204ZM5.43495 3.3527C5.73621 5.36306 7.59668 6.75842 9.61098 6.48472L9.40902 4.99838C8.20767 5.16161 7.09806 4.32941 6.91839 3.1304L5.43495 3.3527Z" fill="#FF3333" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="font-montserrat font-bold text-sm text-red-400">TM2kLP9Q...Z7Y8powK</span>
                  <button
                    className="w-5 h-5 flex justify-center items-center cursor-pointer"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M14.3135 11.8733C14.3135 13.2208 13.2211 14.3133 11.8735 14.3133H5.7735C4.42592 14.3133 3.3335 13.2208 3.3335 11.8733V5.77325C3.3335 4.42568 4.42592 3.33325 5.7735 3.33325H11.8735C13.2211 3.33325 14.3135 4.42568 14.3135 5.77325V11.8733Z" stroke="#FF3333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.12695 16.6665H14.227C15.5745 16.6665 16.667 15.574 16.667 14.2265V8.12646" stroke="#FF3333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 min-w-[161px]">
                <span className="font-montserrat text-xs text-gray-100">Balance</span>
                <div className="flex items-center gap-2">
                  <img src={SolanaSVG} className="w-6 h-6" />
                  <span className="font-montserrat font-bold text-xl text-white">24,068.83</span>
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 min-w-[161px]">
                <span className="font-montserrat text-xs text-gray-100">Hold</span>
                <div className="flex items-center gap-2">
                  <img src={SolanaSVG} className="w-6 h-6" />
                  <span className="font-montserrat font-bold text-xl text-white">3.23</span>
                </div>
              </div>
            </div>
            <div className="w-full flex">
              {isWallet && (
                <div className="w-full flex flex-col items-start overflow-x-auto">
                  <div className="w-full h-[26px] flex items-center relative">
                    <div className="flex justify-start min-w-[180px]">
                      <span className="font-montserrat text-xs text-gray-100">Transactions</span>
                    </div>
                    <div className="flex justify-start min-w-[120px]">
                      <span className="font-montserrat text-xs text-gray-100">Amount</span>
                    </div>
                    <div className="flex justify-start min-w-[160px]">
                      <span className="font-montserrat text-xs text-gray-100">Time</span>
                    </div>
                    <div className="flex justify-start min-w-[660px]">
                      <span className="font-montserrat text-xs text-gray-100">Details</span>
                    </div>
                    <div className="absolute right-0 flex justify-start items-center">
                      <span className="font-montserrat text-xs text-gray-100">Status</span>
                    </div>
                  </div>

                  {transactions.map(({ type, amount, time, details, txid, status }, index) => (
                    <div className="h-[60px] w-full flex items-center relative " key={index}>
                      <div className="flex justify-start items-center gap-2 min-w-[180px]">
                        {type === "Withdraw" && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5 16C11.5 16.2762 11.7238 16.5 12 16.5C12.2761 16.5 12.5 16.2762 12.5 16V6.42541L15.6095 10.3124C15.7821 10.528 16.0967 10.563 16.3123 10.3905C16.528 10.2179 16.5629 9.9033 16.3904 9.68767L12.3972 4.69613C12.3839 4.67881 12.3694 4.6622 12.3536 4.64645C12.3121 4.6049 12.2647 4.57198 12.2139 4.54796C12.1886 4.53598 12.1623 4.52614 12.1358 4.51869C12.0913 4.50615 12.0456 4.49997 12 4.5C11.9659 4.49998 11.9317 4.50343 11.898 4.51043C11.8599 4.51834 11.8224 4.53077 11.7864 4.54782C11.7818 4.54999 11.7827 4.54947 11.7781 4.55179C11.7408 4.57022 11.7029 4.5959 11.6705 4.62391C11.6613 4.63185 11.655 4.63776 11.6464 4.64645C11.6306 4.6622 11.6161 4.67881 11.6028 4.69613L7.60955 9.68767C7.43704 9.9033 7.472 10.2179 7.68763 10.3905C7.90326 10.563 8.21791 10.528 8.39042 10.3124L11.5 6.42541V16Z" fill="white" />
                            <path d="M5 14.5C5.27614 14.5 5.5 14.7239 5.5 15V16C5.5 17.3807 6.61929 18.5 8 18.5H16C17.3807 18.5 18.5 17.3807 18.5 16V15C18.5 14.7239 18.7239 14.5 19 14.5C19.2761 14.5 19.5 14.7239 19.5 15V16C19.5 17.933 17.933 19.5 16 19.5H8C6.067 19.5 4.5 17.933 4.5 16V15C4.5 14.7239 4.72386 14.5 5 14.5Z" fill="white" />
                          </svg>
                        )}
                        {type === "Deposit" && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 15C5.5 14.7239 5.27614 14.5 5 14.5C4.72386 14.5 4.5 14.7239 4.5 15V16C4.5 17.933 6.067 19.5 8 19.5H16C17.933 19.5 19.5 17.933 19.5 16V15C19.5 14.7239 19.2761 14.5 19 14.5C18.7239 14.5 18.5 14.7239 18.5 15V16C18.5 17.3807 17.3807 18.5 16 18.5H8C6.61929 18.5 5.5 17.3807 5.5 16V15Z" fill="white" />
                            <path d="M12 4.5C12.2761 4.5 12.5 4.72386 12.5 5V14.5746L15.6096 10.6877C15.7821 10.472 16.0967 10.4371 16.3123 10.6096C16.528 10.7821 16.5629 11.0967 16.3904 11.3123L12.3972 16.3039C12.3839 16.3212 12.3694 16.3378 12.3536 16.3536C12.3449 16.3623 12.3386 16.3682 12.3295 16.3761C12.2971 16.4041 12.2591 16.4298 12.2218 16.4482C12.2173 16.4506 12.2182 16.45 12.2136 16.4522C12.1776 16.4692 12.1401 16.4817 12.102 16.4896C12.0683 16.4966 12.0341 16.5 12 16.5C11.9544 16.5 11.9087 16.4939 11.8642 16.4813C11.8377 16.4739 11.8114 16.464 11.7861 16.4521C11.7352 16.428 11.6878 16.3951 11.6464 16.3536C11.6306 16.3378 11.6161 16.3212 11.6028 16.3039L7.60957 11.3123C7.43706 11.0967 7.47202 10.7821 7.68765 10.6096C7.90328 10.4371 8.21793 10.472 8.39043 10.6877L11.5 14.5746V5C11.5 4.72386 11.7239 4.5 12 4.5Z" fill="white" />
                          </svg>
                        )}
                        <span className="font-montserrat text-sm text-white">{type}</span>
                      </div>
                      <div className="flex justify-start items-center gap-2 min-w-[120px]">
                        <img src={SolanaSVG} className="w-5 h-5" />
                        <span className="font-montserrat text-sm text-white">{amount}</span>
                      </div>
                      <div className="flex justify-start items-center gap-2 min-w-[160px]">
                        <span className="font-montserrat text-sm text-gray-100">{time}</span>
                      </div>
                      <div className="flex flex-col justify-start items-start gap-1 min-w-[294px]">
                        <span className="font-montserrat text-xs text-gray-100">
                          {type === "Withdraw" && "To"}
                          {type === "Deposit" && "From"}
                        </span>
                        <span className="font-montserrat text-sm text-white">{details}</span>
                      </div>
                      <div className="flex flex-col justify-start items-start gap-1 min-w-[366px]">
                        {txid !== null && (
                          <>
                            <span className="font-montserrat text-xs text-gray-100">TxID</span>
                            <div className="flex items-center gap-1">
                              <span className="font-montserrat text-sm text-white">{details}</span>
                              <button className="cursor-pointer">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11.5322 5.74554C12.4151 4.8626 13.8467 4.8626 14.7296 5.74554C15.6125 6.62848 15.6125 8.06001 14.7296 8.94295L12.8363 10.8363C12.6736 10.999 12.6736 11.2628 12.8363 11.4255C12.999 11.5883 13.2628 11.5883 13.4255 11.4255L15.3189 9.53221C16.5272 8.32383 16.5272 6.36466 15.3189 5.15628C14.1105 3.94791 12.1513 3.94791 10.9429 5.15628L9.04961 7.04962C8.88689 7.21234 8.88689 7.47615 9.04961 7.63887C9.21233 7.80159 9.47614 7.80159 9.63886 7.63887L11.5322 5.74554Z" fill="#FF3333" />
                                  <path d="M12.1647 8.90054C12.3274 8.73782 12.3274 8.474 12.1647 8.31128C12.002 8.14857 11.7382 8.14857 11.5754 8.31128L7.78877 12.0979C7.62606 12.2607 7.62606 12.5245 7.78877 12.6872C7.95149 12.8499 8.21531 12.8499 8.37803 12.6872L12.1647 8.90054Z" fill="#FF3333" />
                                  <path d="M7.1147 10.1647C7.27742 10.002 7.27742 9.73817 7.1147 9.57545C6.95198 9.41273 6.68816 9.41273 6.52544 9.57545L4.63211 11.4688L4.62835 11.4726C3.44634 12.6854 3.45888 14.623 4.6565 15.8204C5.85412 17.0177 7.79179 17.0298 9.00429 15.8476L9.00797 15.8439L10.9013 13.9514C11.0641 13.7888 11.0641 13.5249 10.9014 13.3622C10.7387 13.1994 10.4749 13.1994 10.3122 13.3621L8.42074 15.2526C7.53468 16.1148 6.12018 16.1053 5.24569 15.2311C4.37123 14.3568 4.36147 12.9423 5.22332 12.0561L7.1147 10.1647Z" fill="#FF3333" />
                                </svg>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="absolute right-0 flex justify-start items-center">
                        <span
                          className="font-montserrat text-sm"
                          style={
                            status === "Rejected" ? {
                              color: '#ff6060'
                            } : status === "Pending" ? {
                              color: '#ffeb3b'
                            } : status === "Completed" ? {
                              color: "#4dd94d"
                            } : undefined
                          }
                        >{status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {isDeposit && (
                <div className="w-full flex gap-5 justify-center items-start">
                  <div className="w-1/2 flex flex-col gap-4 p-6 rounded-lg bg-gray-400 border border-gray-200 min-h-[264px]">
                    <div className="w-full flex flex-col gap-3 items-center">
                      <span className="font-montserrat font-bold text-lg text-red-400">TOP-UP FROM CONNECTED WALLET</span>
                      <span className="font-montserrat font-bold text-lg text-white">0x3234565..34</span>
                    </div>
                    <div className="w-full flex flex-col gap-1 items-start pb-[17px]">
                      <span className="font-montserrat text-xs text-white">Amount</span>
                      <input
                        className="w-full h-10 bg-gray-200 font-montserrat px-4
                        text-xs text-white font-bold placeholder:font-montserrat placeholder:text-xs
                        placeholder:text-gray-100 placeholder:font-bold rounded-xl outline-0"
                        type="text"
                        placeholder="Enter the deposit amount"
                      />
                    </div>
                    <div className="w-full flex justify-center">
                      <RedButton
                        width="144px"
                        onClick={() => { }}
                      >
                        Deposit
                      </RedButton>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col p-6 rounded-lg bg-gray-400 border border-gray-200 min-h-[264px]">
                    <div className="w-full flex flex-col items-center">
                      <span className="font-montserrat font-bold text-lg text-red-400">DIRECT TOP-UP</span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <img src={QRExample} className="w-[165px] h-[165px] rounded-lg" />
                      <div className="flex flex-col gap-1 items-start">
                        <span className="font-montserrat text-sm text-gray-100">SOL Address</span>
                        <div className="flex items-end gap-4">
                          <span className="font-montserrat text-lg text-white">TM2kLP9Q...Z7Y8powK</span>
                          <button className="cursor-pointer">
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M17.176 14.748C17.176 16.3651 15.8651 17.676 14.248 17.676H6.928C5.31091 17.676 4 16.3651 4 14.748V7.428C4 5.81091 5.31091 4.5 6.928 4.5H14.248C15.8651 4.5 17.176 5.81091 17.176 7.428V14.748Z" stroke="#FF3333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M9.75195 20.5H17.072C18.689 20.5 20 19.189 20 17.572V10.252" stroke="#FF3333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}
              {isWithdrawal && (
                <div className="w-full flex flex-col gap-4 items-center p-6 rounded-lg bg-gray-400 border border-gray-200">
                  <div className="w-full flex gap-6 items-start">
                    <div className="w-1/2 flex flex-col gap-1 items-start">
                      <div className="w-full flex justify-between items-center h-5">
                        <span className="font-montserrat text-xs text-white">Amount</span>
                      </div>
                      <input
                        className="w-full h-10 bg-gray-200 font-montserrat px-4
                        text-xs text-white font-bold placeholder:font-montserrat placeholder:text-xs
                        placeholder:text-gray-100 placeholder:font-bold rounded-xl outline-0"
                        type="text"
                        placeholder="Enter the withdrawal amount"
                      />
                    </div>
                    <div className="w-1/2 flex flex-col gap-1 items-start">
                      <div className="w-full flex justify-between items-center h-5">
                        <span className="font-montserrat text-xs text-white">Withdrawal address</span>
                        <button className="flex justify-center items-center cursor-pointer">
                          <span className="font-montserrat text-xs text-red-500">Manage addresses</span>
                        </button>
                      </div>
                      <input
                        className="w-full h-10 bg-gray-200 font-montserrat px-4
                        text-xs text-white font-bold placeholder:font-montserrat placeholder:text-xs
                        placeholder:text-gray-100 placeholder:font-bold rounded-xl outline-0"
                        type="text"
                        placeholder="Enter  SOL address"
                      />
                    </div>
                  </div>
                  {/* TODO: withdrawal range */}
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex justify-between items-center">
                      <span className="font-montserrat text-sm text-gray-100">Received</span>
                      <span className="font-montserrat font-bold text-sm text-white">170 SOL</span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <span className="font-montserrat text-sm text-gray-100">Fee</span>
                      <span className="font-montserrat font-bold text-sm text-gray-100">0 SOL</span>
                    </div>
                  </div>
                  <RedButton onClick={() => { }}>
                    Submit
                  </RedButton>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      {howToPlayIsOpen && <PopUpHowToPlay onClose={closeHowToPlay} />}
    </Background>
  )
}

export default Wallet
