import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import rootReducer from "./modules";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
const store = createStore(
  rootReducer,
   // logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
); //여러개 미들웨어 적용 가능
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
);
