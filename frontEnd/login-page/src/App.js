import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import AppRoutes from "./routes/AppRoutes"
function App() {
  return (
    <div className="App">
      <AppRoutes />
    </div>


  );
}

export default App;
