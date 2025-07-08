import React, { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import Index from './components/pages/Index';
import Home from './components/pages/Home';
import Wallet from './components/pages/Wallet';
import Referral from './components/pages/Referral';
import DirectReferral from './components/pages/DirectReferrals';


const routes = [
  { path: "/circle_mafia_frontend/", component: Index },
  { path: "/circle_mafia_frontend/home", component: Home },
  { path: "/circle_mafia_frontend/wallet", component: Wallet },
  { path: "/circle_mafia_frontend/referral", component: Referral },
  { path: "/circle_mafia_frontend/referral/direct", component: DirectReferral },
];


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, component: Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
