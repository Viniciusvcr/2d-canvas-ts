import React from "react";
import { Header, Canvas } from "./Components";
import { Provider } from "react-redux";
import { createStore } from "redux";

import rootReducer from "./store";

function App() {
  const store = createStore(rootReducer);

  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <Canvas />
      </Provider>
    </div>
  );
}

export default App;
