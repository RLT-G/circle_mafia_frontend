import React from "react";
import TestAvatar from "../../../assets/avatar.png"
import FrameImg from "../../../assets/Frame.png"
import SolanaSVG from "../../../assets/solana.svg"
import RedButton from "../RedButton";
import WhiteButton from "../WhiteButton";
import { useNavigate } from "react-router-dom";


const Account: React.FC = () => {
  const navigate = useNavigate()
  const [walletCreated, setWalletCreated] = React.useState<boolean>(false)

  return (
    <div className="flex gap-5 items-start">
      <div className="border border-gray-200 rounded-xl p-6 pb-0 bg-gray-400 
      min-w-[360px] h-[482px] overflow-hidden flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-4 items-center">
          <div className="w-20 h-20 bg-cover bg-no-repeat relative rounded-[50%] cursor-pointer"
            style={{ backgroundImage: `url(${TestAvatar})` }}
          >
            <div className="w-8 h-8 bg-black rounded-[50%] flex justify-center 
            items-center absolute bottom-0 right-0 animate-bounce">
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.04904e-05 6.19543C0.00205769 5.74948 0.0705199 5.31069 0.199848 4.89226C0.415396 4.19489 0.800021 3.55409 1.32806 3.03103C1.9796 2.38563 2.80831 1.96026 3.69885 1.80206C3.93269 1.76051 4.17079 1.73739 4.41107 1.73354C4.5253 1.70477 4.62051 1.62382 4.66667 1.51363C4.68099 1.47945 4.6972 1.44609 4.71522 1.41371C5.20202 0.53901 6.12537 -0.0023311 7.12632 7.5469e-06H8.8737C9.15826 -0.000657308 9.43655 0.0426186 9.70032 0.125003C10.0164 0.223737 10.3117 0.378642 10.5719 0.5814C10.8583 0.804564 11.1023 1.0857 11.2848 1.41371C11.3028 1.44609 11.319 1.47945 11.3334 1.51363C11.3541 1.56307 11.3847 1.60663 11.4224 1.64222C11.4688 1.68596 11.526 1.71768 11.589 1.73354C12.5277 1.74858 13.4332 2.05779 14.181 2.61028C14.3535 2.73778 14.5177 2.87824 14.672 3.03103C15.5168 3.86793 15.9946 5.00623 16 6.19543L16 6.20001L16 10.5376C15.9946 11.7268 15.5168 12.8651 14.672 13.702C14.5597 13.8132 14.4422 13.9178 14.32 14.0157C13.5807 14.6081 12.6705 14.9524 11.72 14.9955C11.6462 14.9988 11.5721 15.0003 11.4978 15H4.5022C3.46251 15.0045 2.45844 14.6476 1.6581 13.9981C1.54377 13.9053 1.4336 13.8065 1.32807 13.702C0.483206 12.8651 0.00548029 11.7268 2.09808e-05 10.5376L0 10.533L1.04904e-05 6.19543ZM11.5 14H4.50001C3.57609 14.0045 2.68822 13.6418 2.03181 12.9915C1.37541 12.3413 1.00424 11.4569 1.00001 10.533V6.20001C1.00424 5.27608 1.37541 4.3917 2.03181 3.74148C2.68822 3.09126 3.57609 2.72849 4.50001 2.73301C4.90061 2.67987 5.25306 2.45446 5.47026 2.12341C5.68745 1.79236 6.37387 1.21415 7.12501 1.00001C7.78224 0.812641 8.87501 1.00001 8.87501 1.00001C8.87501 1.00001 10.2219 1.44852 10.411 1.90001C10.6001 2.3515 11.0148 2.66864 11.5 2.73301C12.4239 2.72849 13.3118 3.09126 13.9682 3.74148C14.6246 4.3917 14.9958 5.27608 15 6.20001V10.533C14.9958 11.4569 14.6246 12.3413 13.9682 12.9915C13.3118 13.6418 12.4239 14.0045 11.5 14Z" fill="#FF3333" />
                <path fillRule="evenodd" clipRule="evenodd" d="M8.02987 5.69911C6.56015 5.69396 5.36327 6.87881 5.35357 8.3485C5.34388 9.81819 6.52502 11.0187 7.99467 11.033L7.99698 11.033C8.70697 11.0366 9.38931 10.758 9.89388 10.2585C10.3985 9.75899 10.6839 9.0795 10.6875 8.36951L10.6875 8.3672C10.6881 6.89748 9.49958 5.70427 8.02987 5.69911ZM6.35355 8.3551C6.35962 7.43647 7.10772 6.69589 8.02636 6.69911C8.94462 6.70233 9.68728 7.44753 9.68752 8.36565C9.68497 8.81 9.50617 9.23518 9.19036 9.54782C8.87455 9.86045 8.44757 10.0349 8.00323 10.033C7.08515 10.0235 6.34749 9.27334 6.35355 8.3551Z" fill="#FF3333" />
              </svg>
            </div>
          </div>
          <span className="font-montserrat text-lg text-red-400 font-bold">0x3234565..34</span>
        </div>
        <div className="w-full flex items-start">
          <input
            className="w-full h-10 bg-black text-center font-montserrat
            text-xs text-white font-bold placeholder:font-montserrat placeholder:text-xs
            placeholder:text-gray-100 placeholder:font-bold rounded-xl outline-0"
            type="text"
            placeholder="Enter your nickname"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex items-center justify-between">
            <span className="font-montserrat font-sm text-gray-100">Games played</span>
            {walletCreated && (
              <span className="font-montserrat font-sm text-white">42</span>
            )}
            {!walletCreated && (
              <span className="font-montserrat font-sm text-white">-</span>
            )}
          </div>
          <div className="w-full flex items-center justify-between">
            <span className="font-montserrat font-sm text-gray-100">Total winnings</span>
            {walletCreated && (
              <div className="flex gap-2 items-center">
                <span className="font-montserrat font-sm text-white">100.24</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_691_2453)">
                    <path d="M0 3.33333C0 1.49238 1.49238 0 3.33333 0H16.6667C18.5076 0 20 1.49238 20 3.33333V16.6667C20 18.5076 18.5076 20 16.6667 20H3.33333C1.49238 20 0 18.5076 0 16.6667V3.33333Z" fill="#1A1A1A" />
                    <path d="M5.49986 12.6338C5.58145 12.5558 5.69206 12.512 5.80739 12.512H16.4484C16.6422 12.512 16.7393 12.7363 16.6021 12.8674L14.4995 14.8781C14.4179 14.9562 14.3073 15 14.192 15H3.55097C3.35714 15 3.2601 14.7757 3.39721 14.6445L5.49986 12.6338Z" fill="url(#paint0_linear_691_2453)" />
                    <path d="M5.49986 5.12185C5.58144 5.04383 5.69205 5 5.80739 5H16.4484C16.6422 5 16.7393 5.22434 16.6021 5.35548L14.4995 7.36621C14.4179 7.44422 14.3073 7.48804 14.192 7.48804H3.55097C3.35714 7.48804 3.2601 7.2637 3.39721 7.13258L5.49986 5.12185Z" fill="url(#paint1_linear_691_2453)" />
                    <path d="M14.4995 8.85389C14.4179 8.77588 14.3073 8.73207 14.192 8.73207H3.55097C3.35714 8.73207 3.2601 8.9564 3.39721 9.08752L5.49986 11.0982C5.58144 11.1763 5.69205 11.2201 5.80739 11.2201H16.4484C16.6422 11.2201 16.7393 10.9958 16.6021 10.8646L14.4995 8.85389Z" fill="url(#paint2_linear_691_2453)" />
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_691_2453" x1="12.3471" y1="2.25696" x2="5.47801" y2="16.0045" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00FFA3" />
                      <stop offset="1" stopColor="#DC1FFF" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_691_2453" x1="12.3471" y1="2.25696" x2="5.47801" y2="16.0045" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00FFA3" />
                      <stop offset="1" stopColor="#DC1FFF" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_691_2453" x1="12.3471" y1="2.25696" x2="5.47801" y2="16.0045" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00FFA3" />
                      <stop offset="1" stopColor="#DC1FFF" />
                    </linearGradient>
                    <clipPath id="clip0_691_2453">
                      <rect width="20" height="20" rx="10" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            )}
            {!walletCreated && (
              <span className="font-montserrat font-sm text-white">-</span>
            )}

          </div>
          <div className="w-full flex items-center justify-between">
            <span className="font-montserrat font-sm text-gray-100">Leaderboard rank</span>
            {walletCreated && (
              <span className="font-montserrat font-sm text-white">357</span>
            )}
            {!walletCreated && (
              <span className="font-montserrat font-sm text-white">-</span>
            )}
          </div>
        </div>
        {walletCreated && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2 items-center">
              <div className="p-[6px] rounded-lg flex gap-1 items-center bg-gray-200 cursor-pointer">
                <img src={SolanaSVG} className="w-4 h-4 bg-cover bg-no-repeat" />
                <span className="font-montserrat font-bold text-xs text-white">1</span>
              </div>
              <div className="p-[6px] rounded-lg flex gap-1 items-center bg-gray-200 cursor-pointer">
                <img src={SolanaSVG} className="w-4 h-4 bg-cover bg-no-repeat" />
                <span className="font-montserrat font-bold text-xs text-white">5</span>
              </div>
              <div className="p-[6px] rounded-lg flex gap-1 items-center bg-gray-200 cursor-pointer">
                <img src={SolanaSVG} className="w-4 h-4 bg-cover bg-no-repeat" />
                <span className="font-montserrat font-bold text-xs text-white">10</span>
              </div>
              <div className="p-[6px] rounded-lg flex gap-1 items-center bg-gray-200 cursor-pointer">
                <img src={SolanaSVG} className="w-4 h-4 bg-cover bg-no-repeat" />
                <span className="font-montserrat font-bold text-xs text-white">30</span>
              </div>
              <div className="p-[6px] rounded-lg flex gap-1 items-center bg-gray-200 cursor-pointer">
                <img src={SolanaSVG} className="w-4 h-4 bg-cover bg-no-repeat" />
                <span className="font-montserrat font-bold text-xs text-white">50</span>
              </div>
              <div className="p-[6px] rounded-lg flex gap-1 items-center bg-gray-200 cursor-pointer">
                <img src={SolanaSVG} className="w-4 h-4 bg-cover bg-no-repeat" />
                <span className="font-montserrat font-bold text-xs text-white">100</span>
              </div>
            </div>
            <span className="font-montserrat text-xs text-gray-100">We will match you with a game that fits your bet</span>
            <RedButton onClick={() => { }}>
              Search for a game
            </RedButton>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="border border-gray-200 rounded-xl p-6 pb-0 bg-gray-400 
        min-w-[360px] min-h-[95px] overflow-hidden flex flex-col gap-6 items-center">

          <div className="w-full flex justify-between items-center">
            {walletCreated && (
              <>
                <div className="flex flex-col gap-1">
                  <span className="font-montserrat text-xs text-gray-100">Balance</span>
                  <div className="flex gap-2 items-center">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_691_2485)">
                        <path d="M0 4.5C0 2.29086 1.79086 0.5 4 0.5H20C22.2091 0.5 24 2.29086 24 4.5V20.5C24 22.7091 22.2091 24.5 20 24.5H4C1.79086 24.5 0 22.7091 0 20.5V4.5Z" fill="#1A1A1A" />
                        <path d="M6.60022 15.6605C6.69813 15.5669 6.83086 15.5144 6.96926 15.5144H19.7384C19.971 15.5144 20.0875 15.7836 19.9229 15.9409L17.3998 18.3538C17.3019 18.4474 17.1692 18.5 17.0308 18.5H4.26156C4.02896 18.5 3.91251 18.2308 4.07704 18.0734L6.60022 15.6605Z" fill="url(#paint0_linear_691_2485)" />
                        <path d="M6.60022 6.64622C6.69811 6.55259 6.83085 6.5 6.96926 6.5H19.7384C19.971 6.5 20.0875 6.76921 19.9229 6.92658L17.3998 9.33945C17.3019 9.43306 17.1691 9.48564 17.0308 9.48564H4.26156C4.02896 9.48564 3.91251 9.21644 4.07704 9.05909L6.60022 6.64622Z" fill="url(#paint1_linear_691_2485)" />
                        <path d="M17.3998 11.1247C17.3019 11.0311 17.1691 10.9785 17.0308 10.9785H4.26156C4.02896 10.9785 3.91251 11.2477 4.07704 11.405L6.60022 13.8179C6.69811 13.9115 6.83085 13.9641 6.96926 13.9641H19.7384C19.971 13.9641 20.0875 13.6949 19.9229 13.5375L17.3998 11.1247Z" fill="url(#paint2_linear_691_2485)" />
                      </g>
                      <defs>
                        <linearGradient id="paint0_linear_691_2485" x1="14.8169" y1="3.20835" x2="6.574" y2="19.7055" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#00FFA3" />
                          <stop offset="1" stopColor="#DC1FFF" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_691_2485" x1="14.8169" y1="3.20835" x2="6.574" y2="19.7055" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#00FFA3" />
                          <stop offset="1" stopColor="#DC1FFF" />
                        </linearGradient>
                        <linearGradient id="paint2_linear_691_2485" x1="14.8169" y1="3.20835" x2="6.574" y2="19.7055" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#00FFA3" />
                          <stop offset="1" stopColor="#DC1FFF" />
                        </linearGradient>
                        <clipPath id="clip0_691_2485">
                          <rect y="0.5" width="24" height="24" rx="10" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="font-montserrat text-lg font-bold text-white">24,068.83</span>

                  </div>
                </div>
                <RedButton
                  width="36px"
                  heigth="36px"
                  onClick={() => { navigate('/wallet') }}
                >
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.9324 9.74381C15.3466 9.74381 15.6824 9.40802 15.6824 8.99381C15.6824 8.57959 15.3466 8.24381 14.9324 8.24381V9.74381ZM14.9884 12.8438C15.4026 12.8438 15.7384 12.508 15.7384 12.0938C15.7384 11.6796 15.4026 11.3438 14.9884 11.3438V12.8438ZM15.6724 8.8715C15.6048 8.46283 15.2188 8.1863 14.8101 8.25385C14.4014 8.3214 14.1249 8.70745 14.1925 9.11612L15.6724 8.8715ZM15.0054 9.88281H15.7554V9.88277L15.0054 9.88281ZM14.2408 12.0301C14.2078 12.443 14.5158 12.8045 14.9287 12.8374C15.3416 12.8704 15.7031 12.5624 15.736 12.1495L14.2408 12.0301ZM14.1921 9.11416C14.2586 9.52301 14.6439 9.80056 15.0528 9.73409C15.4616 9.66762 15.7392 9.2823 15.6727 8.87345L14.1921 9.11416ZM11.3806 4.02556C10.9828 3.91005 10.5667 4.13886 10.4512 4.53664C10.3357 4.93442 10.5645 5.35053 10.9623 5.46605L11.3806 4.02556ZM15.7364 12.1484C15.7666 11.7353 15.4561 11.376 15.043 11.3458C14.6299 11.3156 14.2706 11.6261 14.2404 12.0392L15.7364 12.1484ZM9.75542 16.9938V17.7438L9.76081 17.7438L9.75542 16.9938ZM6.25542 16.9938L6.24949 17.7438H6.25542V16.9938ZM1.00542 11.6608L1.75542 11.6666V11.6608H1.00542ZM1.00542 9.88281H1.75542L1.75542 9.88208L1.00542 9.88281ZM2.03958 8.27697C2.18216 7.88807 1.98248 7.45722 1.59358 7.31464C1.20468 7.17206 0.773832 7.37174 0.631251 7.76064L2.03958 8.27697ZM10.966 5.46684C11.3642 5.58085 11.7794 5.35046 11.8934 4.95224C12.0075 4.55403 11.7771 4.13879 11.3789 4.02478L10.966 5.46684ZM9.75542 4.54581L9.75661 3.79581H9.75542V4.54581ZM6.25542 4.54581V3.7958L6.25194 3.79582L6.25542 4.54581ZM0.629887 7.76439C0.489377 8.15405 0.691348 8.58383 1.081 8.72434C1.47066 8.86485 1.90044 8.66288 2.04095 8.27322L0.629887 7.76439ZM10.516 5.10854C10.7163 5.47108 11.1726 5.60259 11.5351 5.40226C11.8977 5.20193 12.0292 4.74563 11.8289 4.38308L10.516 5.10854ZM10.3524 3.26181L9.6889 3.61144C9.69121 3.61583 9.69357 3.6202 9.69597 3.62454L10.3524 3.26181ZM7.74705 1.15711L7.54471 1.8793L7.74705 1.15711ZM4.42742 1.60181L4.04214 0.958328L4.03974 0.959777L4.42742 1.60181ZM3.17542 2.35781L2.78768 1.71569L2.77704 1.72236L3.17542 2.35781ZM0.639557 8.29859C0.794078 8.6829 1.23089 8.86919 1.6152 8.71467C1.99951 8.56015 2.1858 8.12334 2.03128 7.73902L0.639557 8.29859ZM14.9324 8.24381H13.0424V9.74381H14.9324V8.24381ZM13.0424 8.24381C11.7722 8.24381 10.7424 9.27355 10.7424 10.5438H12.2424C12.2424 10.102 12.6006 9.74381 13.0424 9.74381V8.24381ZM10.7424 10.5438C10.7424 11.8141 11.7722 12.8438 13.0424 12.8438V11.3438C12.6006 11.3438 12.2424 10.9856 12.2424 10.5438H10.7424ZM13.0424 12.8438H14.9884V11.3438H13.0424V12.8438ZM14.1925 9.11612C14.2343 9.36954 14.2554 9.62598 14.2554 9.88285L15.7554 9.88277C15.7554 9.54398 15.7276 9.20576 15.6724 8.8715L14.1925 9.11612ZM14.2554 9.88281V11.6608H15.7554V9.88281H14.2554ZM14.2554 11.6608C14.2554 11.7851 14.2505 11.9082 14.2408 12.0301L15.736 12.1495C15.749 11.9874 15.7554 11.8245 15.7554 11.6608H14.2554ZM15.6727 8.87345C15.2973 6.56465 13.6269 4.67792 11.3806 4.02556L10.9623 5.46605C12.6526 5.95695 13.9097 7.37675 14.1921 9.11416L15.6727 8.87345ZM14.2404 12.0392C14.0683 14.3969 12.1139 16.2268 9.75003 16.2438L9.76081 17.7438C12.9066 17.7212 15.5073 15.2859 15.7364 12.1484L14.2404 12.0392ZM9.75542 16.2438H6.25542V17.7438H9.75542V16.2438ZM6.26135 16.2438C3.75317 16.224 1.73588 14.1748 1.75539 11.6666L0.25544 11.655C0.229485 14.9915 2.91299 17.7174 6.24949 17.7438L6.26135 16.2438ZM1.75542 11.6608V9.88281H0.255417V11.6608H1.75542ZM1.75542 9.88208C1.75489 9.33449 1.85109 8.79111 2.03958 8.27697L0.631251 7.76064C0.381952 8.44062 0.25472 9.15929 0.255418 9.88353L1.75542 9.88208ZM11.3789 4.02478C10.8513 3.87374 10.3053 3.79668 9.75661 3.79581L9.75423 5.29581C10.1641 5.29646 10.5719 5.35402 10.966 5.46684L11.3789 4.02478ZM9.75542 3.79581H6.25542V5.29581H9.75542V3.79581ZM6.25194 3.79582C3.7307 3.8075 1.48515 5.39262 0.629887 7.76439L2.04095 8.27322C2.68261 6.4938 4.36733 5.30456 6.25889 5.2958L6.25194 3.79582ZM11.8289 4.38308L11.0089 2.89908L9.69597 3.62454L10.516 5.10854L11.8289 4.38308ZM11.0159 2.91217C10.3774 1.70031 9.26841 0.804472 7.94938 0.434922L7.54471 1.8793C8.467 2.1377 9.24239 2.76409 9.6889 3.61144L11.0159 2.91217ZM7.94938 0.434922C6.63036 0.0653719 5.2174 0.254651 4.04214 0.958333L4.8127 2.24528C5.63446 1.75326 6.62243 1.62091 7.54471 1.8793L7.94938 0.434922ZM4.03974 0.959777L2.78774 1.71578L3.5631 2.99984L4.8151 2.24384L4.03974 0.959777ZM2.77704 1.72236C0.566694 3.1081 -0.333644 5.87811 0.639557 8.29859L2.03128 7.73902C1.32896 5.99227 1.97869 3.99328 3.5738 2.99325L2.77704 1.72236Z" fill="white" />
                  </svg>
                </RedButton>
              </>
            )}
            {!walletCreated && (
              <>
                <span className="font-montserrat text-xs text-white max-w-[174px]">
                  Create your game wallet and start earning!
                </span>
                <RedButton
                  width="114px"
                  heigth="36px"
                  onClick={() => { setWalletCreated(true) }}
                >
                  Create wallet
                </RedButton>
              </>
            )}
          </div>

        </div>

        <div className="border border-gray-200 rounded-xl p-6 pb-0 bg-gray-400 
        min-w-[360px] min-h-[206px] overflow-hidden flex flex-col gap-6 items-center">
          <span className="font-montserrat text-lg text-red-400 font-bold">INVITE & EARN</span>

          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex items-center justify-between">
              <span className="font-montserrat font-sm text-gray-100">Total referrals</span>
              {walletCreated && (
                <span className="font-montserrat font-sm text-white">183</span>
              )}
              {!walletCreated && (
                <span className="font-montserrat font-sm text-white">-</span>
              )}
            </div>
            <div className="w-full flex items-center justify-between">
              <span className="font-montserrat font-sm text-gray-100">Referral earnings</span>
              {walletCreated && (
                <div className="flex gap-2 items-center">
                  <span className="font-montserrat font-sm text-white">1,511.58</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_691_2499)">
                      <path d="M0 3.33333C0 1.49238 1.49238 0 3.33333 0H16.6667C18.5076 0 20 1.49238 20 3.33333V16.6667C20 18.5076 18.5076 20 16.6667 20H3.33333C1.49238 20 0 18.5076 0 16.6667V3.33333Z" fill="#1A1A1A" />
                      <path d="M5.49986 12.6338C5.58145 12.5558 5.69206 12.512 5.80739 12.512H16.4484C16.6422 12.512 16.7393 12.7363 16.6021 12.8674L14.4995 14.8781C14.4179 14.9562 14.3073 15 14.192 15H3.55097C3.35714 15 3.2601 14.7757 3.39721 14.6445L5.49986 12.6338Z" fill="url(#paint0_linear_691_2499)" />
                      <path d="M5.49986 5.12185C5.58144 5.04383 5.69205 5 5.80739 5H16.4484C16.6422 5 16.7393 5.22434 16.6021 5.35548L14.4995 7.36621C14.4179 7.44422 14.3073 7.48804 14.192 7.48804H3.55097C3.35714 7.48804 3.2601 7.2637 3.39721 7.13258L5.49986 5.12185Z" fill="url(#paint1_linear_691_2499)" />
                      <path d="M14.4995 8.85389C14.4179 8.77588 14.3073 8.73207 14.192 8.73207H3.55097C3.35714 8.73207 3.2601 8.9564 3.39721 9.08752L5.49986 11.0982C5.58144 11.1763 5.69205 11.2201 5.80739 11.2201H16.4484C16.6422 11.2201 16.7393 10.9958 16.6021 10.8646L14.4995 8.85389Z" fill="url(#paint2_linear_691_2499)" />
                    </g>
                    <defs>
                      <linearGradient id="paint0_linear_691_2499" x1="12.3471" y1="2.25696" x2="5.47801" y2="16.0045" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00FFA3" />
                        <stop offset="1" stopColor="#DC1FFF" />
                      </linearGradient>
                      <linearGradient id="paint1_linear_691_2499" x1="12.3471" y1="2.25696" x2="5.47801" y2="16.0045" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00FFA3" />
                        <stop offset="1" stopColor="#DC1FFF" />
                      </linearGradient>
                      <linearGradient id="paint2_linear_691_2499" x1="12.3471" y1="2.25696" x2="5.47801" y2="16.0045" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00FFA3" />
                        <stop offset="1" stopColor="#DC1FFF" />
                      </linearGradient>
                      <clipPath id="clip0_691_2499">
                        <rect width="20" height="20" rx="10" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              )}
              {!walletCreated && (
                <span className="font-montserrat font-sm text-white">-</span>
              )}
            </div>
          </div>
          <WhiteButton
            onClick={() => { navigate(('/referral')) }}
            noIco
          >
            More details
          </WhiteButton>
        </div>
        <div
          className="border border-gray-200 rounded-xl pb-0 bg-gray-400 min-w-[360px]
          min-h-[149px] overflow-hidden flex flex-col items-center justify-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${FrameImg})` }}
        >
          <span className="font-montserrat text-lg text-red-400 font-bold">OFFERS</span>
        </div>
      </div>
    </div>
  )
}

export default Account
