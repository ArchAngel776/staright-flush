import { BufferGeometry, Mesh } from "three"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"
import Loader from "../../data/interfaces/Loader"
import LoaderSignature from "../../decorators/LoaderSignature"
import ModelLoader from "../foundations/ModelLoader"


@LoaderSignature()
export default class STLModelLoader extends ModelLoader<BufferGeometry>
{
    public getLoader(): Loader<BufferGeometry>
    {
        return new STLLoader
    }

    public extract(geometry: BufferGeometry): Mesh
    {
        return new Mesh(geometry)
    }
}