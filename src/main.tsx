import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PreviewBanner } from './components/PreviewBanner.tsx'
import { SelectedHospitalsContextProvider } from './components/SelectedHospitalContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PreviewBanner />
    <SelectedHospitalsContextProvider>
      <App />
    </SelectedHospitalsContextProvider>
  </React.StrictMode>,
)
