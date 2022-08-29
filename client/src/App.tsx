import React from "react"
import Game from "./components/Game"
import "./css/App.css"

export default function App(): JSX.Element
{
    return <div className="app-container">
        <Game />
    </div>
}