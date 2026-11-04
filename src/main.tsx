// Portfolio entry point.
//
// Keeps the existing first-party Sonar beacon (error capture and web
// analytics for amadi-jason.vercel.app). It's initialized after first
// paint, and a site with no analytics SDK setup code would break its
// published observability setup, so it stays on its own path rather than
// as a component. The beacon must never block first paint.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const initSonar = () => {
  try {
    localStorage.setItem("sonar_consent", "granted");
    import("sonar-sdk/browser").then(({ SonarWeb }) => {
      // @ts-ignore: the SDK ships without full typing for this init shape
      window.__sonar = new SonarWeb({
        apiKey: "wdp_1109979e_913bea168dbba1e3b502664503d83a33fc824c538d51b61a",
        autoTrack: true,
        sessionRecording: true,
      });
    });
  } catch {
    // analytics unavailable; the page must ship without it
  }
};

window.addEventListener("load", () => {
  const w = window as unknown as Window & {
    requestIdleCallback?: (
      cb: () => void,
      opts?: { timeout: number },
    ) => number;
  };
  if (w.requestIdleCallback) {
    w.requestIdleCallback(initSonar, { timeout: 2_000 });
  } else {
    window.setTimeout(initSonar, 1_500);
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
