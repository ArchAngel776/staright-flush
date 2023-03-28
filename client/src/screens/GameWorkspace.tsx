import { useRef, useEffect, useCallback } from "react"
import { AmbientLight } from "three"
import Page from "../components/Page"
import Game from "../engine/Game"
import CardsDeck from "../engine/components/CardsDeck"
import { GameEngineEvent } from "../data/enums/GameEngineEvent"
import "../assets/sass/Game.sass"


export default function GameWorkspace(): JSX.Element
{
    const gameContainer = useRef<HTMLDivElement>(null)
    const game = new Game(75)

    game.on(GameEngineEvent.INIT, (scene, camera) => {
        camera.position.set(20, 20, 0)
        camera.lookAt(scene.position)

        const light = new AmbientLight(0x909090)
        scene.add(light)
    })


    const start = useCallback(async () => {
        if (!gameContainer.current || game.isStarted) {
            return
        }

        game.start()

        const cardsDeck = new CardsDeck
        await cardsDeck.initDeck()

        cardsDeck.addToGame(game)

        setTimeout(async () => {
            await new Promise(resolve => cardsDeck.animations().onFinish(resolve).startShuffle().play())
            
            const firstCards = cardsDeck.getCards().slice(0, 3)
            console.log(firstCards)

        }, 2000)

        game.init(gameContainer.current)
        game.render()

    }, [gameContainer])


    useEffect(() => {
        start()
    })

    return <Page>
        <div ref={gameContainer} className="game-container"></div>
    </Page>
}