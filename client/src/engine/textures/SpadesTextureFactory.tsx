import { CardType } from "../../data/enums/CardType"
import CardTypeException from "../../exception/CardTypeException"
import CardTextureFactory from "../foundations/CardTextureFactory"

import spades2 from "../../assets/textures/2_of_spades.png?url"
import spades3 from "../../assets/textures/3_of_spades.png?url"
import spades4 from "../../assets/textures/4_of_spades.png?url"
import spades5 from "../../assets/textures/5_of_spades.png?url"
import spades6 from "../../assets/textures/6_of_spades.png?url"
import spades7 from "../../assets/textures/7_of_spades.png?url"
import spades8 from "../../assets/textures/8_of_spades.png?url"
import spades9 from "../../assets/textures/9_of_spades.png?url"
import spades10 from "../../assets/textures/10_of_spades.png?url"
import spadesJack from "../../assets/textures/jack_of_spades.png?url"
import spadesQueen from "../../assets/textures/queen_of_spades.png?url"
import spadesKing from "../../assets/textures/king_of_spades.png?url"
import spadesAce from "../../assets/textures/ace_of_spades.png?url"


export default class SpadesTextureFactory extends CardTextureFactory
{
    public getCard(type: CardType): string
    {
        switch (type) {
            case CardType.TWO:
                return spades2
            case CardType.THREE:
                return spades3
            case CardType.FOUR:
                return spades4
            case CardType.FIVE:
                return spades5
            case CardType.SIX:
                return spades6
            case CardType.SEVEN:
                return spades7
            case CardType.EIGHT:
                return spades8
            case CardType.NINE:
                return spades9
            case CardType.TEN:
                return spades10
            case CardType.JACK:
                return spadesJack
            case CardType.QUEEN:
                return spadesQueen
            case CardType.KING:
                return spadesKing
            case CardType.ACE:
                return spadesAce
            default:
                throw new CardTypeException
        }
    }
}