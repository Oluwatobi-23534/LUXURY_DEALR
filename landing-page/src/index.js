import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider
import "./index.css";
import App from "./App";
import Font from "../src/fonts/Roboto-Regular.ttf";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

// const fontFace = `
//   @font-face {
//     font-family: 'Roboto ';
//     src: local('Roboto'), url(${Font}) format('truetype');
//     font-style: normal;
//   }
// `;




root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Save bucket items to local storage whenever they change
store.subscribe(() => {
  localStorage.setItem(
    "bucketItems",
    JSON.stringify(store.getState().bucketList.bucketItems)
  );
});
