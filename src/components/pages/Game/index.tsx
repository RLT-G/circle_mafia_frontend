import React, { useContext } from "react";
import Background from "../../ui/Background";
import Header from "../../ui/Header";
import PopUpHowToPlay from "../../ui/PopUpHowToPlay";
import Footer from "../../ui/Footer";
import GameSearch from "../../ui/GameSearch";
import Lobby from "../../ui/Lobby";
import Agario from "../../ui/Agario";
import wsClient from "../../../services/wsClient";
import { UserContext } from "../../../context";

const Game: React.FC = () => {
  const { userData, wsData, setwsData } = useContext(UserContext)
  const [howToPlayIsOpen, setHowToPlayIsOpen] = React.useState<boolean>(false)
  const [wsc, setWsc] = React.useState(wsClient)

  React.useEffect(() => {
    wsClient.onConnected(data => console.log('Подключено', data))
    wsClient.onDisconnected(() => console.log('Отключено'))
    wsc.onAuthenticatedError(err => console.log('Auth Ошибка', err))
    wsClient.onAuthenticated(data => {
      console.log('Авторизация', data)
      setwsData(wsd => ({ ...wsd, isAuth: true }))
    })

    wsClient.connect()

    setWsc(wsClient)

    return () => {
      wsc.disconnect()
    }
  }, [])

  React.useEffect(() => {
    wsClient.authenticate(userData.user_id)
  }, [userData.user_id])

  const openHowToPlay = () => {
    setHowToPlayIsOpen(true)
  }

  const closeHowToPlay = () => {
    setHowToPlayIsOpen(false)
  }

  const [inSearch, setInSearch] = React.useState<boolean>(true)
  const [inLobby, setInLobby] = React.useState<boolean>(false)
  const [inGame, setInGame] = React.useState<boolean>(false)

  const initLobby = () => {
    setInSearch(false)
    setInLobby(true)
    setInGame(false)
  }

  const initGame = () => {
    setInSearch(false)
    setInLobby(false)
    setInGame(true)
  }



  if (inGame) {
    return <Agario wsc={wsc} />
  }

  return (
    <Background>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Header openHowToPlay={openHowToPlay} needLogo />
        <main className="container min-h-screen">
          {inSearch && (<GameSearch initLobby={initLobby} wsc={wsc} />)}
          {inLobby && (<Lobby initGame={initGame} wsc={wsc} />)}
        </main>
        <Footer noUsers />
      </div>
      {howToPlayIsOpen && <PopUpHowToPlay onClose={closeHowToPlay} />}
    </Background>
  )
}

export default Game
