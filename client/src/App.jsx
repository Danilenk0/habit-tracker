import "./App.css";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <Header />
      <main className="main"></main>
    </div>
  );
}

export default App;
