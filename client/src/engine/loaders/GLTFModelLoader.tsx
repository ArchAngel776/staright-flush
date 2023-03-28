import { Mesh } from "three"
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import LoadingObjectException from "../../exception/LoadingObjectException"
import Loader from "../../data/interfaces/Loader"
import ModelLoader from "../foundations/ModelLoader"
import LoaderSignature from "../../decorators/LoaderSignature"


@LoaderSignature()
export default class GLTFModelLoader extends ModelLoader<GLTF>
{
    public getLoader(): Loader<GLTF>
    {
        return new GLTFLoader
    }

    public extract(data: GLTF): Mesh
    {
        const [mesh] = data.scene.children

        if (mesh instanceof Mesh) {
            return mesh
        }

        throw new LoadingObjectException
    }
}