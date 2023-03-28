import { CardType } from "../../data/enums/CardType"
import CardTypeException from "../../exception/CardTypeException"
import CardTextureFactory from "../foundations/CardTextureFactory"

import hearts2 from "../../assets/textures/2_of_hearts.png?url"
import hearts3 from "../../assets/textures/3_of_hearts.png?url"
import hearts4 from "../../assets/textures/4_of_hearts.png?url"
import hearts5 from "../../assets/textures/5_of_hearts.png?url"
import hearts6 from "../../assets/textures/6_of_hearts.png?url"
import hearts7 from "../../assets/textures/7_of_hearts.png?url"
import hearts8 from "../../assets/textures/8_of_hearts.png?url"
import hearts9 from "../../assets/textures/9_of_hearts.png?url"
import hearts10 from "../../assets/textures/10_of_hearts.png?url"
import heartsJack from "../../assets/textures/jack_of_hearts.png?url"
import heartsQueen from "../../assets/textures/queen_of_hearts.png?url"
import heartsKing from "../../assets/textures/king_of_hearts.png?url"
import heartsAce from "../../assets/textures/ace_of_hearts.png?url"


export default class HeartsTextureFactory extends CardTextureFactory
{
    public getCard(type: CardType): string
    {
        switch (type) {
            case CardType.TWO:
                return hearts2
            case CardType.THREE:
                return hearts3
            case CardType.FOUR:
                return hearts4
            case CardType.FIVE:
                return hearts5
            case CardType.SIX:
                return hearts6
            case CardType.SEVEN:
                return hearts7
            case CardType.EIGHT:
                return hearts8
            case CardType.NINE:
                return hearts9
            case CardType.TEN:
                return hearts10
            case CardType.JACK:
                return heartsJack
            case CardType.QUEEN:
                return heartsQueen
            case CardType.KING:
                return heartsKing
            case CardType.ACE:
                return heartsAce
            default:
                throw new CardTypeException
        }
    }
}