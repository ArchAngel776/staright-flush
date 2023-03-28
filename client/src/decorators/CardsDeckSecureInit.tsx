import CardsDeck from "../engine/components/CardsDeck"
import Game from "../engine/Game"


export default function CardsDeckSecureInit(Deck: typeof CardsDeck)
{
    return class extends Deck
    {
        protected initialized: boolean

        protected added: boolean

        public constructor()
        {
            super()
            this.initialized = false
            this.added = false
        }

        public async initDeck(): Promise<void>
        {
            if (this.initialized) {
                return
            }
    
            this.initialized = true
            return super.initDeck()
        }

        public addToTheGame(game: Game): this
        {
            if (this.added) {
                return this
            }

            this.added = true
            return super.addToTheGame(game)
        }
    }
}