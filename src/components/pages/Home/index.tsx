import React from "react";
import Background from "../../ui/Background";
import Header from "../../ui/Header";
import PopUpHowToPlay from "../../ui/PopUpHowToPlay";
import Footer from "../../ui/Footer";
import WinnersAndLiders from "../../ui/WinnersAndLiders";
import SocialButton from "../../ui/SocialButton";
import Account from "../../ui/Account";

const Home: React.FC = () => {
  const [howToPlayIsOpen, setHowToPlayIsOpen] = React.useState<boolean>(false)

  const openHowToPlay = () => {
    setHowToPlayIsOpen(true)
  }

  const closeHowToPlay = () => {
    setHowToPlayIsOpen(false)
  }

  return (
    <Background>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Header openHowToPlay={openHowToPlay} needLogo />
        <main className="container min-h-screen">
          <div className="w-full mt-[140px] flex gap-5 justify-center items-start">
            <div className="flex flex-col items-center gap-4">
              <WinnersAndLiders />
              <div className="flex flex-col items-center gap-3">
                <span className="font-montserrat text-xs text-white">Be in touch</span>
                <div className="flex items-center gap-5">
                  <SocialButton onClick={() => { }} type="telegram" />
                  <SocialButton onClick={() => { }} type="x" />
                  <SocialButton onClick={() => { }} type="discord" />
                </div>
              </div>
            </div>
            <Account />
          </div>
        </main>
        <Footer noUsers />
      </div>

      {howToPlayIsOpen && <PopUpHowToPlay onClose={closeHowToPlay} />}
    </Background>
  )
}

export default Home
