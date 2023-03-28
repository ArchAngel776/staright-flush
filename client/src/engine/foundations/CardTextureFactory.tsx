import { FrontSide, MeshPhongMaterial } from "three"
import { CardType } from "../../data/enums/CardType"
import texture from "../../hooks/texture"

export default abstract class CardTextureFactory
{
    public getMaterial(type: CardType): MeshPhongMaterial
    {
        const card = this.getCard(type)
        return new MeshPhongMaterial({ map: texture(card), side: FrontSide })
    }

    public abstract getCard(type: CardType): string
}