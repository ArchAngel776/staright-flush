import React, { useState, useEffect, useRef } from "react"
import GameController from "../app/GameController"
import GraphicalDOMException from "../data/exception/GraphicalDOMException"
import "../css/components/Game.css"

export default function Game(): JSX.Element
{
    const [ init, setInit ] = useState<boolean>(false)
    const gameRootDOM = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!init) {
            return setInit(true)
        }

        if (!gameRootDOM.current) {
            throw new GraphicalDOMException
        }

        const gameController = new GameController(gameRootDOM.current)
        gameController.start()
    }, [ init ])

    return <div ref={ gameRootDOM } className="game-container"></div>
}