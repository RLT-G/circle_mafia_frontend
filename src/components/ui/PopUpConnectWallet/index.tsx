import React, { useContext } from "react";
import PopUpWrapper from "../PopUpWrapper";
import QRExample from "../../../assets/QRExample.webp"
import { useNavigate } from "react-router-dom";
import UserService from "../../../services/users";
import { UserContext } from "../../../context";
import api from "../../../services/api";
import TronLinkService from "../../../services/tronLink";
import Scripts from "../../../scripts";

interface IPopUpConnectWallet {
  onClose: () => any
}

const PopUpConnectWallet: React.FC<IPopUpConnectWallet> = ({ onClose }) => {
  const navigate = useNavigate()
  const {
    isAuth,
    setIsAuth,
    userData,
    setUserData,
    accessToken,
    setAccessToken
  } = useContext(UserContext);

  const [isQR, setIsQR] = React.useState<boolean>(true)
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false)
  const [tronStatus, setTronStatus] = React.useState<string>("");
  const [showTronLinkInstall, setShowTronLinkInstall] = React.useState(false);

  const openQR = (): any => {
    setIsQR(true)
    setIsDesktop(false)
  }

  const openDesktop = (): any => {
    setIsDesktop(true)
    setIsQR(false)
  }

  const signIn = async () => {
    // const isMobile = Scripts.isMobile()
    const isMobile = false
    // FIXIT: бесконечный редирект на мобилках будет
    if (isMobile) {
      TronLinkService.redirectToMobileApp()
      return
    }

    if (!TronLinkService.isInstalled()) {
      setTronStatus("TronLink not installed");
      return;
    }

    setTronStatus("Connecting...");

    try {
      await TronLinkService.requestAccounts()
    } catch (error) {
      console.error(error)
      setTronStatus("Requesting accounts failed, trying to get address...");
    }

    const address = TronLinkService.getWalletAddress();
    console.log({ address })

    if (!address) {
      setTronStatus("Address unavailable");
      return;
    }

    const nonce = await UserService.getNonce(address)
    console.log({ nonce })

    const signature = await TronLinkService.signMessage(address, nonce)
    console.log({ signature })

    const { access_token, wallet_address, user_id, username } = await UserService.login(
      address,
      signature,
      nonce
    )
    console.log({ access_token, wallet_address, user_id, username })

    setUserData({
      wallet_address,
      user_id,
      username
    })
    setAccessToken(access_token)
    localStorage.setItem("accessToken", access_token)
    setIsAuth(true)
    navigate("/home")

    setTronStatus("Connected");
  }

  return (
    <PopUpWrapper onClose={onClose}>
      <div className="w-[280px] flex flex-col items-center gap-5">
        <div className="w-full flex flex-col items-center">
          <div className="flex justify-between w-full">
            <button className="w-[128px] py-3 cursor-pointer transition-colors duration-200"
              style={{ borderBottom: isQR ? '1px solid red' : '1px solid transparent' }}
              onClick={openQR}
            >
              <span className="font-montserrat font-bold text-sm text-center"
                style={{ color: isQR ? '#f33' : '#FFF' }}
              >QR CODE</span>
            </button>
            <button className="w-[128px] py-3 cursor-pointer transition-colors duration-200"
              style={{ borderBottom: isDesktop ? '1px solid red' : '1px solid transparent' }}
              onClick={openDesktop}
            >
              <span className="font-montserrat font-bold text-sm text-center"
                style={{ color: isDesktop ? '#f33' : '#FFF' }}
              >DESKTOPE</span>
            </button>
          </div>
        </div>
        {isQR && (
          <div className="w-full flex flex-col items-center gap-6">
            <span className="text-center font-montserrat text-xs text-gray-100">Scan QR-code with a WalletConnect-compatible wallet</span>
            <div className="w-[230px] h-[230px] rounded-lg bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${QRExample})` }}
            >
            </div>
            <button className="w-full cursor-pointer">
              <span className="text-center font-montserrat text-xs text-red-500">Copy to clipboard</span>
            </button>
          </div>
        )}
        {isDesktop && (
          <div className="w-full flex flex-col items-center gap-6">
            <span className="text-center font-montserrat text-xs text-gray-100">Choose wallet you want to connect in</span>
            <div className="w-full flex flex-col items-start gap-5">
              {/* TronLink */}
              <div className="w-full flex justify-between items-center cursor-pointer group" onClick={signIn}>
                <div className="flex gap-3 items-center">
                  {/* TronLink SVG (updated) */}
                  <svg width="24" height="24" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="83" height="83" rx="20" fill="#125ECD" />
                    <mask id="mask0_2212_104" maskUnits="userSpaceOnUse" x="0" y="0" width="83" height="83">
                      <rect width="83" height="83" rx="20" fill="#125ECD" />
                    </mask>
                    <g mask="url(#mask0_2212_104)">
                      <path fillRule="evenodd" clipRule="evenodd" d="M17 24L58.7842 129L117 58.1602L96.3895 38.5915L17 24ZM31.8131 32.3522L89.0374 42.8715L66.8249 61.3555L31.8131 32.3522ZM27.8448 36.2588L64.3332 66.4864L58.628 113.622L27.8448 36.2588ZM95.1117 45.0199L107.256 56.5508L74.0421 62.5585L95.1117 45.0199ZM69.6148 68.9868L106.394 62.3363L64.2078 113.671L69.6148 68.9868Z" fill="white" />
                    </g>
                  </svg>
                  <span className="font-montserrat text-sm text-white group-hover:text-red-500 transition-colors duration-200">TronLink</span>
                </div>
                <span className="font-montserrat text-xs text-green-600">{tronStatus === "Connected" ? "Installed" : tronStatus}</span>
              </div>

              <div className="w-full flex justify-between items-center cursor-pointer group"
                onClick={signIn}>
                <div className="flex gap-3 items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5844 12.9532L14.2386 11.3552L17.3226 12.3645C19.3413 13.0374 20.3507 14.271 20.3507 16.0093C20.3507 17.3272 19.846 18.1963 18.8367 19.3178L18.5283 19.6542L18.6404 18.8692C19.0889 16.0093 18.2479 14.7757 15.4722 13.8784L12.5844 12.9532ZM8.43478 3.16823L16.8461 5.97197L15.0236 7.7103L10.6498 6.25234C9.13578 5.74767 8.63108 4.93458 8.43478 3.22431V3.16823ZM7.93008 17.4112L9.83666 15.5887L13.4255 16.7664C15.3039 17.3832 15.9488 18.1963 15.7526 20.243L7.93008 17.4112ZM5.51892 9.28033C5.51892 8.74772 5.79929 8.24302 6.27593 7.8224C6.7806 8.55142 7.64976 9.19625 9.02356 9.6449L11.9956 10.6262L10.3414 12.2243L7.42545 11.271C6.07966 10.8225 5.51892 10.1495 5.51892 9.28033ZM14.3227 24C20.4908 19.9066 23.7993 17.1309 23.7993 13.7103C23.7993 11.4393 22.4535 10.1775 19.4815 9.19625L17.2385 8.43921L23.3788 2.55141L22.1451 1.23365L20.3227 2.83177L11.7152 0C9.05159 0.869165 5.68715 3.42056 5.68715 5.97196C5.68715 6.25233 5.71519 6.53271 5.7993 6.84115C3.58434 8.10278 2.68715 9.28033 2.68715 10.7383C2.68715 12.1121 3.41612 13.486 5.74322 14.243L7.59368 14.8598L1.20117 20.9999L2.43481 22.3177L4.42547 20.4954L14.3227 24Z" fill="#FFEF46" />
                  </svg>
                  <span className="font-montserrat text-sm text-white group-hover:text-red-500 transition-colors duration-200">Solflare</span>
                </div>
                <span className="font-montserrat text-xs text-green-600">Installed</span>
              </div>

              <div className="w-full flex justify-between items-center cursor-pointer group"
                onClick={signIn}>
                <div className="flex gap-3 items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.57774 17.2282C8.20422 19.3345 5.90258 22 2.83997 22C1.39218 22 4.62299e-05 21.4037 1.11278e-09 18.8129C-0.000115571 12.2145 9.00212 2.00014 17.3548 2C22.1065 1.99991 24 5.29896 24 9.04542C24 13.8543 20.8816 19.353 17.782 19.353C16.7983 19.353 16.3156 18.8124 16.3156 17.9552C16.3156 17.7315 16.3526 17.4891 16.427 17.2282C15.3689 19.0361 13.3272 20.714 11.4153 20.714C10.0232 20.714 9.31793 19.8378 9.31791 18.6075C9.31791 18.1601 9.41072 17.6943 9.57774 17.2282ZM15.7775 7.07338C15.0215 7.07472 14.506 7.71754 14.5076 8.63456C14.5092 9.55159 15.027 10.2109 15.7831 10.2096C16.5209 10.2083 17.0361 9.54714 17.0345 8.6301C17.0329 7.71307 16.5153 7.07208 15.7775 7.07338ZM19.7881 7.06901C19.032 7.07035 18.5166 7.71317 18.5182 8.63019C18.5198 9.54721 19.0373 10.2066 19.7936 10.2052C20.5315 10.204 21.0467 9.54277 21.0451 8.62573C21.0434 7.7087 20.5259 7.06771 19.7881 7.06901Z" fill="#AB9FF2" />
                  </svg>
                  <span className="font-montserrat text-sm text-white group-hover:text-red-500 transition-colors duration-200">Phantom</span>
                </div>
                <span className="font-montserrat text-xs text-green-600"></span>
              </div>

              <div className="w-full flex justify-between items-center cursor-pointer group"
                onClick={signIn}>
                <div className="flex gap-3 items-center">
                  <svg width="24" height="24" viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_691_1480)">
                      <path d="M20.5073 7.49625V7.99988H23.9731V5.72843H23.4681V7.49625H20.5073ZM20.5073 0V0.503653H23.4681V2.27157H23.9731V0H20.5073ZM18.72 3.89632V2.72599H19.5122C19.8984 2.72599 20.0371 2.85435 20.0371 3.20502V3.41239C20.0371 3.77286 19.9033 3.89632 19.5122 3.89632H18.72ZM19.9775 4.10368C20.3389 4.00986 20.5914 3.67401 20.5914 3.2741C20.5914 3.02227 20.4924 2.79507 20.3043 2.61232C20.0666 2.38512 19.7497 2.27157 19.3388 2.27157H18.2248V5.72831H18.72V4.35061H19.4627C19.8439 4.35061 19.9974 4.50861 19.9974 4.90374V5.72843H20.5024V4.98274C20.5024 4.43953 20.3737 4.23217 19.9775 4.17289V4.10368ZM15.8088 4.21723H17.3338V3.76294H15.8088V2.72587H17.4823V2.27157H15.3037V5.72831H17.5565V5.27401H15.8088V4.21723ZM14.1501 4.39997V4.63697C14.1501 5.13573 13.9669 5.29875 13.5065 5.29875H13.3976C12.9371 5.29875 12.7143 5.15055 12.7143 4.46415V3.53573C12.7143 2.84443 12.947 2.70113 13.4074 2.70113H13.5064C13.957 2.70113 14.1005 2.86905 14.1054 3.33326H14.6501C14.6006 2.65177 14.1451 2.22222 13.4618 2.22222C13.1301 2.22222 12.8528 2.32596 12.6449 2.52341C12.333 2.81479 12.1597 3.30864 12.1597 3.99994C12.1597 4.66662 12.3083 5.16047 12.6152 5.46656C12.8231 5.66902 13.1103 5.77766 13.3926 5.77766C13.6896 5.77766 13.962 5.6591 14.1005 5.40238H14.1698V5.72831H14.6253V3.94568H13.2835V4.39997H14.1501ZM9.78335 2.72587H10.3231C10.8331 2.72587 11.1104 2.85423 11.1104 3.54565V4.45423C11.1104 5.14553 10.8331 5.27401 10.3231 5.27401H9.78335V2.72587ZM10.3676 5.72843C11.3133 5.72843 11.6647 5.01239 11.6647 4.00006C11.6647 2.97291 11.2885 2.27169 10.3576 2.27169H9.28813V5.72843H10.3676ZM6.8969 4.21723H8.42187V3.76294H6.8969V2.72587H8.57032V2.27157H6.39177V5.72831H8.64464V5.27401H6.8969V4.21723ZM3.97575 2.27157H3.47078V5.72831H5.74829V5.27401H3.97575V2.27157ZM0 5.72843V8H3.46575V7.49625H0.504968V5.72843H0ZM0 0V2.27157H0.504968V0.503653H3.46575V0H0Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_691_1480">
                        <rect width="24" height="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="font-montserrat text-sm text-white group-hover:text-red-500 transition-colors duration-200">Ledger</span>
                </div>
                <span className="font-montserrat text-xs text-green-600"></span>
              </div>

              <div className="w-full flex justify-between items-center cursor-pointer group"
                onClick={signIn}>
                <div className="flex gap-3 items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.24686 0C2.00595 0 1 1.00595 1 2.24686V4.86426C1 6.10517 2.00595 7.11113 3.24686 7.11113H7.22215V21.7532C7.22215 22.9941 8.2281 24 9.469 24H12.0864C13.3273 24 14.3332 22.9941 14.3332 21.7532V4.8833C14.3333 4.87696 14.3333 4.87062 14.3333 4.86427V2.24686C14.3333 1.00595 13.3274 0 12.0865 0H9.46901H3.24686Z" fill="#0364FF" />
                    <path d="M19.6679 7.11112C21.6315 7.11112 23.2234 5.51924 23.2234 3.55556C23.2234 1.59188 21.6315 0 19.6679 0C17.7042 0 16.1123 1.59188 16.1123 3.55556C16.1123 5.51924 17.7042 7.11112 19.6679 7.11112Z" fill="#0016DE" />
                  </svg>
                  <span className="font-montserrat text-sm text-white group-hover:text-red-500 transition-colors duration-200">Torus</span>
                </div>
                <span className="font-montserrat text-xs text-green-600"></span>
              </div>

              <div className="w-full flex justify-between items-center cursor-pointer group"
                onClick={signIn}>
                <div className="flex gap-3 items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.9113 11.4596C17.4099 10.9584 17.4099 10.1458 17.9113 9.64462C18.4126 9.14343 19.2255 9.14343 19.7269 9.64462C20.2282 10.1458 20.2282 10.9584 19.7269 11.4596C19.2255 11.9608 18.4126 11.9608 17.9113 11.4596ZM13.5992 15.7702C13.2232 15.3943 13.2232 14.7849 13.5992 14.409C13.9752 14.0331 14.5849 14.0331 14.9609 14.409C15.3369 14.7849 15.3369 15.3943 14.9609 15.7702C14.5849 16.1461 13.9752 16.1461 13.5992 15.7702ZM20.4077 13.5015C20.0317 13.1256 20.0317 12.5161 20.4077 12.1402C20.7837 11.7643 21.3934 11.7643 21.7694 12.1402C22.1455 12.5161 22.1455 13.1256 21.7694 13.5015C21.3934 13.8774 20.7837 13.8774 20.4077 13.5015ZM18.1382 15.7702C17.7622 15.3943 17.7622 14.7849 18.1382 14.409C18.5142 14.0331 19.1239 14.0331 19.4999 14.409C19.8759 14.7849 19.8759 15.3943 19.4999 15.7702C19.1239 16.1461 18.5142 16.1461 18.1382 15.7702ZM22.9042 15.5433C22.6535 15.2927 22.6535 14.8864 22.9042 14.6358C23.1549 14.3852 23.5613 14.3852 23.812 14.6358C24.0627 14.8864 24.0627 15.2927 23.812 15.5433C23.5613 15.7939 23.1549 15.7939 22.9042 15.5433ZM20.6347 17.8121C20.384 17.5615 20.384 17.1552 20.6347 16.9046C20.8854 16.654 21.2918 16.654 21.5425 16.9046C21.7932 17.1552 21.7932 17.5615 21.5425 17.8121C21.2918 18.0626 20.8854 18.0626 20.6347 17.8121ZM15.6418 13.7283C15.1404 13.2271 15.1404 12.4145 15.6418 11.9134C16.1431 11.4122 16.956 11.4122 17.4574 11.9134C17.9587 12.4145 17.9587 13.2271 17.4574 13.7283C16.956 14.2295 16.1431 14.2295 15.6418 13.7283ZM15.6418 9.19088C15.1404 8.68968 15.1404 7.87709 15.6418 7.3759C16.1431 6.8747 16.956 6.8747 17.4574 7.3759C17.9587 7.87709 17.9587 8.68968 17.4574 9.19088C16.956 9.69207 16.1431 9.69207 15.6418 9.19088ZM13.3723 11.4596C12.8709 10.9584 12.8709 10.1458 13.3723 9.64462C13.8736 9.14343 14.6865 9.14343 15.1879 9.64462C15.6892 10.1458 15.6892 10.9584 15.1879 11.4596C14.6865 11.9608 13.8736 11.9608 13.3723 11.4596ZM8.81214 11.4596C8.31077 10.9584 8.31077 10.1458 8.81214 9.64462C9.31351 9.14343 10.1264 9.14343 10.6277 9.64462C11.1291 10.1458 11.1291 10.9584 10.6277 11.4596C10.1264 11.9608 9.31351 11.9608 8.81214 11.4596ZM4.50008 15.7702C4.12405 15.3943 4.12405 14.7849 4.50008 14.409C4.8761 14.0331 5.48576 14.0331 5.86178 14.409C6.23781 14.7849 6.23781 15.3943 5.86178 15.7702C5.48576 16.1461 4.8761 16.1461 4.50008 15.7702ZM11.3086 13.5015C10.9326 13.1256 10.9326 12.5161 11.3086 12.1402C11.6846 11.7643 12.2943 11.7643 12.6703 12.1402C13.0463 12.5161 13.0463 13.1256 12.6703 13.5015C12.2943 13.8774 11.6846 13.8774 11.3086 13.5015ZM9.03909 15.7702C8.66307 15.3943 8.66307 14.7849 9.03909 14.409C9.41512 14.0331 10.0248 14.0331 10.4008 14.409C10.7768 14.7849 10.7768 15.3943 10.4008 15.7702C10.0248 16.1461 9.41512 16.1461 9.03909 15.7702ZM0.188012 15.5433C-0.0626707 15.2927 -0.0626707 14.8864 0.188012 14.6358C0.438695 14.3852 0.845132 14.3852 1.09581 14.6358C1.3465 14.8864 1.3465 15.2927 1.09581 15.5433C0.845132 15.7939 0.438695 15.7939 0.188012 15.5433ZM2.45752 17.8121C2.20684 17.5615 2.20684 17.1552 2.45752 16.9046C2.7082 16.654 3.11464 16.654 3.36532 16.9046C3.61601 17.1552 3.61601 17.5615 3.36532 17.8121C3.11464 18.0626 2.7082 18.0626 2.45752 17.8121ZM11.5356 17.8121C11.2849 17.5615 11.2849 17.1552 11.5356 16.9046C11.7862 16.654 12.1927 16.654 12.4434 16.9046C12.694 17.1552 12.694 17.5615 12.4434 17.8121C12.1927 18.0626 11.7862 18.0626 11.5356 17.8121ZM2.23057 13.5015C1.85454 13.1256 1.85454 12.5161 2.23057 12.1402C2.60659 11.7643 3.21625 11.7643 3.59227 12.1402C3.9683 12.5161 3.9683 13.1256 3.59227 13.5015C3.21625 13.8774 2.60659 13.8774 2.23057 13.5015ZM6.54263 13.7283C6.04127 13.2271 6.04127 12.4145 6.54263 11.9134C7.044 11.4122 7.85687 11.4122 8.35824 11.9134C8.85961 12.4145 8.85961 13.2271 8.35824 13.7283C7.85687 14.2295 7.044 14.2295 6.54263 13.7283ZM6.54263 9.19088C6.04127 8.68968 6.04127 7.87709 6.54263 7.3759C7.044 6.8747 7.85687 6.8747 8.35824 7.3759C8.85961 7.87709 8.85961 8.68968 8.35824 9.19088C7.85687 9.69207 7.044 9.69207 6.54263 9.19088ZM4.27313 11.4596C3.77176 10.9584 3.77176 10.1458 4.27313 9.64462C4.77449 9.14343 5.58737 9.14343 6.08873 9.64462C6.5901 10.1458 6.5901 10.9584 6.08873 11.4596C5.58737 11.9608 4.77449 11.9608 4.27313 11.4596Z" fill="white" />
                  </svg>
                  <span className="font-montserrat text-sm text-white group-hover:text-red-500 transition-colors duration-200">Solog</span>
                </div>
                <span className="font-montserrat text-xs text-green-600"></span>
              </div>

              <div className="w-full flex justify-between items-center cursor-pointer group"
                onClick={signIn}>
                <div className="flex gap-3 items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_691_1503)">
                      <path d="M10.5215 0C9.7911 -6.76068e-08 9.09054 0.29017 8.57406 0.806676L0.460931 8.91996C0.15364 9.22728 -2.51579e-06 9.63 0 10.0328C2.51591e-06 10.4356 0.15365 10.8383 0.46094 11.1456L5.77772 16.4624V7.0497C5.77772 6.34728 6.34272 5.77782 7.04514 5.77782C10.0129 5.77782 17.2367 5.77782 18.2221 5.77782L23.9998 8.18838e-05L10.5215 0Z" fill="#4A21EF" />
                      <path d="M5.77773 18.2222H16.9502C17.6526 18.2222 18.222 17.6528 18.222 16.9503V7.5376L23.5389 12.8544C23.8461 13.1618 23.9998 13.5645 23.9998 13.9673C23.9998 14.37 23.8461 14.7728 23.5389 15.0801L15.4257 23.1933C14.9093 23.7099 14.2087 24 13.4783 24L0 24L5.77773 18.2222Z" fill="#4A21EF" />
                    </g>
                    <defs>
                      <clipPath id="clip0_691_1503">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="font-montserrat text-sm text-white group-hover:text-red-500 transition-colors duration-200">SafePal</span>
                </div>
                <span className="font-montserrat text-xs text-green-600"></span>
              </div>
            </div>
            {showTronLinkInstall && (
              <div className="w-full flex flex-col items-center gap-2 mt-4">
                <span className="text-center font-montserrat text-xs text-red-500">
                  Failed to open tronlink. Make sure the TronLink app is installed on your device.
                </span>
                <a
                  href="https://tronlink.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline text-xs font-montserrat"
                >
                  Install TronLink
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </PopUpWrapper>
  );
};

export default PopUpConnectWallet;
