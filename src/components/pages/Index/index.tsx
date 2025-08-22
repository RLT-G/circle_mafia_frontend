import React, { useContext } from "react";
import Background from "../../ui/Background";
import Header from "../../ui/Header";
import RedButton from "../../ui/RedButton";
import SocialButton from "../../ui/SocialButton";
import Footer from "../../ui/Footer";
import PopUpConnectWallet from "../../ui/PopUpConnectWallet";
import PopUpHowToPlay from "../../ui/PopUpHowToPlay";
import { UserContext } from "../../../context";


const Index: React.FC = () => {
  const { isAuth } = useContext(UserContext);

  React.useEffect(() => { console.log('isAuth', isAuth) }, [])


  const [connectIsOpen, setConnectIsOpen] = React.useState<boolean>(false)
  const [howToPlayIsOpen, setHowToPlayIsOpen] = React.useState<boolean>(false)

  const openConnect = () => {
    setConnectIsOpen(true)
  }

  const closeConnect = () => {
    setConnectIsOpen(false)
  }

  const openHowToPlay = () => {
    setHowToPlayIsOpen(true)
  }

  const closeHowToPlay = () => {
    setHowToPlayIsOpen(false)
  }

  // Анимация для текста
  const animatedText = "ABSORB, EARN, SURVIVE".split("").map((char, i) => (
    <span
      key={i}
      className="absorb-letter"
      style={{ animationDelay: `${i * 0.07}s` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <Background>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Header openHowToPlay={openHowToPlay} />

        <main className="flex flex-col gap-20 items-center">
          <div className="flex flex-col gap-4 items-center">
            <span className="font-bebas text-center font-bold text-6xl text-red-500">CIRCLE MAFIA</span>
            <span className="font-montserrat text-center text-xl text-red-500">
              {animatedText}
            </span>
            <svg className="svg-pulse" width="108" height="24" viewBox="0 0 108 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M24.1435 12C24.1435 18.6067 18.7877 23.9626 12.1809 23.9626C5.57402 23.9626 0.218262 18.6067 0.218262 12C0.218262 5.3932 5.57402 0.0373535 12.1809 0.0373535C18.7877 0.0373535 24.1435 5.3932 24.1435 12ZM18.7604 12C18.7604 15.6337 15.8146 18.5794 12.1809 18.5794C8.54715 18.5794 5.6014 15.6337 5.6014 12C5.6014 8.36625 8.54715 5.42053 12.1809 5.42053C15.8146 5.42053 18.7604 8.36625 18.7604 12Z" fill="#FF3333" />
              <path fillRule="evenodd" clipRule="evenodd" d="M54 0L67.8564 24H40.1436L54 0ZM49.4676 18.6168L54 10.7664L58.5325 18.6168H49.4676Z" fill="#FF3333" />
              <path d="M98.5103 0.0373535H93.1272V4.87761H83.8562V10.2608H93.1272V23.9626H98.5103V10.2608H107.781V4.87761H98.5103V0.0373535Z" fill="#FF3333" />
              <path d="M93.1272 20.5993V15.2161H83.8562V20.5993H93.1272Z" fill="#FF3333" />
              <path d="M98.5103 15.2161V20.5993H107.781V15.2161H98.5103Z" fill="#FF3333" />
            </svg>
          </div>

          <div className="flex flex-col gap-10 items-center">
            <RedButton onClick={openConnect}>
              Connect  wallet
            </RedButton>
            <div className="flex gap-6 items-center">
              <SocialButton onClick={() => { }} type="telegram" />
              <SocialButton onClick={() => { }} type="x" />
              <SocialButton onClick={() => { }} type="discord" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
      {connectIsOpen && <PopUpConnectWallet onClose={closeConnect} />}
      {howToPlayIsOpen && <PopUpHowToPlay onClose={closeHowToPlay} />}
    </Background>
  );
};

export default Index;
