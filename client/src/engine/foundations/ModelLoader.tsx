import { Mesh } from "three"
import OnProgressCallback from "../../data/callbacks/OnProgressCallback"
import Loader from "../../data/interfaces/Loader"
import WithMaterials from "../../data/interfaces/WithMaterials"


export default abstract class ModelLoader<Target = any, Params extends WithMaterials = WithMaterials>
{
    protected url: string

    protected _params!: Params

    protected onProgressCallback: OnProgressCallback | undefined

    public constructor(url: string)
    {
        this.url = url
    }

    public abstract getLoader(): Loader<Target>

    public onProgress(callback: OnProgressCallback): this
    {
        this.onProgressCallback = callback
        return this
    }

    public with(params: Params): this
    {
        this.params = params
        return this
    }

    public async load(): Promise<Mesh<any, any>>
    {
        return this.extract(await this.getLoader().loadAsync(this.url, this.onProgressCallback))
    }

    public abstract extract(data: Target): Mesh

    protected get params(): Params
    {
        return this._params || {}
    }

    protected set params(params: Params)
    {
        this._params = params
    }
}