import { CardType } from "../../data/enums/CardType"
import CardTypeException from "../../exception/CardTypeException"
import CardTextureFactory from "../foundations/CardTextureFactory"

import clubs2 from "../../assets/textures/2_of_clubs.png?url"
import clubs3 from "../../assets/textures/3_of_clubs.png?url"
import clubs4 from "../../assets/textures/4_of_clubs.png?url"
import clubs5 from "../../assets/textures/5_of_clubs.png?url"
import clubs6 from "../../assets/textures/6_of_clubs.png?url"
import clubs7 from "../../assets/textures/7_of_clubs.png?url"
import clubs8 from "../../assets/textures/8_of_clubs.png?url"
import clubs9 from "../../assets/textures/9_of_clubs.png?url"
import clubs10 from "../../assets/textures/10_of_clubs.png?url"
import clubsJack from "../../assets/textures/jack_of_clubs.png?url"
import clubsQueen from "../../assets/textures/queen_of_clubs.png?url"
import clubsKing from "../../assets/textures/king_of_clubs.png?url"
import clubsAce from "../../assets/textures/ace_of_clubs.png?url"


export default class ClubsTextureFactory extends CardTextureFactory
{
    public getCard(type: CardType): string
    {
        switch (type) {
            case CardType.TWO:
                return clubs2
            case CardType.THREE:
                return clubs3
            case CardType.FOUR:
                return clubs4
            case CardType.FIVE:
                return clubs5
            case CardType.SIX:
                return clubs6
            case CardType.SEVEN:
                return clubs7
            case CardType.EIGHT:
                return clubs8
            case CardType.NINE:
                return clubs9
            case CardType.TEN:
                return clubs10
            case CardType.JACK:
                return clubsJack
            case CardType.QUEEN:
                return clubsQueen
            case CardType.KING:
                return clubsKing
            case CardType.ACE:
                return clubsAce
            default:
                throw new CardTypeException
        }
    }
}