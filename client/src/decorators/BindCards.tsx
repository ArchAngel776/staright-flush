import CardsDeck from "../engine/components/CardsDeck"


type InitDeck = () => Promise<void>

export default function BindCards(target: CardsDeck, property: "initDeck", descriptor: TypedPropertyDescriptor<InitDeck>): void
{
    const initDeck = descriptor.value
    if (!initDeck) {
        return
    }

    descriptor.value = async function (this: CardsDeck): Promise<void>
    {
        await initDeck.call(this)

        const cards = this.cards.map((card, index) => card.init().getObject().translateY(index / this.cards.length))
        this.object.add(...cards)
    }
}