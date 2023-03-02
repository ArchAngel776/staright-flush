import { NeastedObjectChain } from "../../data/types/NeastedObject";
import MethodModel from "../../foundations/MethodModel"
import NeastedObjectHelper from "../../helpers/NeastedObjectHelper";

export default class NeastedObjectSetter<Schema> extends MethodModel<NeastedObjectHelper<Schema>, NeastedObjectChain<Schema>, [value: NeastedObjectChain<Schema>, key: string, currentIndex: number, keys: Array<string>]>
{
    public method(this: NeastedObjectHelper<Schema>, { original }: NeastedObjectSetter<Schema>, value: NeastedObjectChain<Schema>, key: string, currentIndex: number, keys: Array<string>): NeastedObjectChain<Schema>
    {
        if (currentIndex > 0) {
            return original(value, key, currentIndex, keys)
        }

        const overValue = this.target
        const index = <Extract<keyof Schema, string>> key
            
        overValue[index] = <Schema[Extract<keyof Schema, string>]> value
        return <NeastedObjectChain<Schema>> overValue
    }
}