import { Mesh } from "three"
import Loader from "../data/interfaces/Loader"
import WithMaterials from "../data/interfaces/WithMaterials"
import ModelLoader from "../engine/foundations/ModelLoader"


export interface ModelLoaderConstructor<Target, Params extends WithMaterials>
{
    new (...args: Array<any>): (ModelLoader<Target, Params> & {
        getLoader(): Loader<Target>
        extract(data: Target): Mesh
    })
}

export default function LoaderSignature<Target, Params extends WithMaterials>()
{
    return function <Loader extends ModelLoaderConstructor<Target, Params>>(Loader: Loader): Loader
    {
        return class extends Loader
        {
            public extract(data: Target): Mesh
            {
                const mesh = super.extract(data)

                const { materials } = this.params
                mesh.material = materials

                mesh.geometry.clearGroups()
                for (const index of materials.keys()) {
                    mesh.geometry.addGroup(0, Infinity, index)
                }

                return mesh
            }
        }
    }
}