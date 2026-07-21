import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

try {
  localStorage.setItem('sonar_consent', 'granted')
  import('sonar-sdk/browser').then(({ SonarWeb }) => {
    window.__sonar = new SonarWeb({
      apiKey: 'wdp_1109979e_913bea168dbba1e3b502664503d83a33fc824c538d51b61a',
      autoTrack: true,
      sessionRecording: true,
    })
  })
} catch {
  // analytics unavailable
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
