import { CardType } from "../../data/enums/CardType"
import CardTypeException from "../../exception/CardTypeException"
import CardTextureFactory from "../foundations/CardTextureFactory"

import diamonds2 from "../../assets/textures/2_of_diamonds.png?url"
import diamonds3 from "../../assets/textures/3_of_diamonds.png?url"
import diamonds4 from "../../assets/textures/4_of_diamonds.png?url"
import diamonds5 from "../../assets/textures/5_of_diamonds.png?url"
import diamonds6 from "../../assets/textures/6_of_diamonds.png?url"
import diamonds7 from "../../assets/textures/7_of_diamonds.png?url"
import diamonds8 from "../../assets/textures/8_of_diamonds.png?url"
import diamonds9 from "../../assets/textures/9_of_diamonds.png?url"
import diamonds10 from "../../assets/textures/10_of_diamonds.png?url"
import diamondsJack from "../../assets/textures/jack_of_diamonds.png?url"
import diamondsQueen from "../../assets/textures/queen_of_diamonds.png?url"
import diamondsKing from "../../assets/textures/king_of_diamonds.png?url"
import diamondsAce from "../../assets/textures/ace_of_diamonds.png?url"


export default class DiamondsTextureFactory extends CardTextureFactory
{
    public getCard(type: CardType): string
    {
        switch (type) {
            case CardType.TWO:
                return diamonds2
            case CardType.THREE:
                return diamonds3
            case CardType.FOUR:
                return diamonds4
            case CardType.FIVE:
                return diamonds5
            case CardType.SIX:
                return diamonds6
            case CardType.SEVEN:
                return diamonds7
            case CardType.EIGHT:
                return diamonds8
            case CardType.NINE:
                return diamonds9
            case CardType.TEN:
                return diamonds10
            case CardType.JACK:
                return diamondsJack
            case CardType.QUEEN:
                return diamondsQueen
            case CardType.KING:
                return diamondsKing
            case CardType.ACE:
                return diamondsAce
            default:
                throw new CardTypeException
        }
    }
}