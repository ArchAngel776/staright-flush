import { Group, Mesh } from "three"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import LoadingObjectException from "../../exception/LoadingObjectException"
import Loader from "../../data/interfaces/Loader"
import ModelLoader from "../foundations/ModelLoader"
import LoaderSignature from "../../decorators/LoaderSignature"
import { CardsMesh } from "../../data/types/CardsMesh"


@LoaderSignature()
export default class OBJModelLoader extends ModelLoader<Group>
{
    public getLoader(): Loader<Group>
    {
        return new OBJLoader
    }

    public extract(data: Group): CardsMesh
    {
        const [mesh] = data.children

        if (mesh instanceof Mesh) {
            return mesh
        }

        throw new LoadingObjectException
    }
}