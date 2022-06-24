import React from "react"
import { Route, Routes } from "react-router-dom"
import Header from './Header'
import Home from './Home'
import Footer from './Footer'

const App = () => {
  return (
    <div className="App m-0 p-0 box-border text-white relative">
        <div className="relative">
          <Header /> 
        </div>
        <Routes >
            <Route exact path="/" element={<Home />} />
        </Routes >
        <div className="w-full">

          <Footer />
        </div>
    </div>
  );
}

export default App