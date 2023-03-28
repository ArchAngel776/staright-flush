import { BufferGeometry, Mesh } from "three"
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader"
import Loader from "../../data/interfaces/Loader"
import LoaderSignature from "../../decorators/LoaderSignature"
import ModelLoader from "../foundations/ModelLoader"


@LoaderSignature()
export default class PLYModelLoader extends ModelLoader<BufferGeometry>
{
    public getLoader(): Loader<BufferGeometry>
    {
        return new PLYLoader
    }

    public extract(geometry: BufferGeometry): Mesh
    {
        return new Mesh(geometry)
    }
}