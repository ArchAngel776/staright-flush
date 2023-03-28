import cardURL from "../../assets/models/card.glb?url"
import { Model } from "../../data/enums/Model"
import ModelLoaderException from "../../exception/ModelLoaderException"
import extname from "../../hooks/extname"
import WithMaterials from "../../data/interfaces/WithMaterials"
import ModelLoader from "../foundations/ModelLoader"
import GLTFModelLoader from "../loaders/GLTFModelLoader"
import OBJModelLoader from "../loaders/OBJModelLoader"
import PLYModelLoader from "../loaders/PLYModelLoader"
import STLModelLoader from "../loaders/STLModelLoader"
import { CardColor } from "../../data/enums/CardColor"
import { CardType } from "../../data/enums/CardType"
import { BackSide, MeshPhongMaterial } from "three"
import CardColorException from "../../exception/CardColorException"
import texture from "../../hooks/texture"
import backTexture from "../../assets/textures/cards_back.png"
import CardTextureFactory from "../foundations/CardTextureFactory"
import SpadesTextureFactory from "../textures/SpadesTextureFactory"
import HeartsTextureFactory from "../textures/HeartsTextureFactory"
import DiamondsTextureFactory from "../textures/DiamondsTextureFactory"
import ClubsTextureFactory from "../textures/ClubsTextureFactory"
import { CardsMesh } from "../../data/types/CardsMesh"


export default class CardsFactory
{
    protected modelURL: string
    
    public constructor()
    {
        this.modelURL = cardURL
    }

    public getLoader(): ModelLoader<any, WithMaterials>
    {
        const type = extname(this.modelURL)
        switch (type) {
            case Model.OBJ:
                return new OBJModelLoader(this.modelURL)
            case Model.PLY:
                return new PLYModelLoader(this.modelURL)
            case Model.STL:
                return new STLModelLoader(this.modelURL)
            case Model.GLB:
            case Model.GLTF:
                return new GLTFModelLoader(this.modelURL)
            default:
                throw new ModelLoaderException(type)
        }
    }

    public getTextureFactory(color: CardColor): CardTextureFactory
    {
        switch (color) {
            case CardColor.SPADES:
                return new SpadesTextureFactory
            case CardColor.HEARTS:
                return new HeartsTextureFactory
            case CardColor.DIAMONDS:
                return new DiamondsTextureFactory
            case CardColor.CLUBS:
                return new ClubsTextureFactory
            default:
                throw new CardColorException
        }
    }

    public createBackTexture(): MeshPhongMaterial
    {
        return new MeshPhongMaterial({ map: texture(backTexture), side: BackSide })
    }

    public async createCard(color: CardColor, type: CardType): Promise<CardsMesh>
    {
        const materials = [ this.getTextureFactory(color).getMaterial(type), this.createBackTexture() ]
        return this.getLoader().with({ materials }).load()
    }
}