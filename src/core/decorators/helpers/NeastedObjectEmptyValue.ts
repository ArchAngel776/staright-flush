import { NeastedObjectChain } from "@data/types/NeastedObject"

import MethodModel from "@foundations/MethodModel"
import NeastedObjectHelper from "@helpers/NeastedObjectHelper"


export default class NeastedObjectEmptyValue<Schema> extends MethodModel<NeastedObjectHelper<Schema>, NeastedObjectChain<Schema>, [value: NeastedObjectChain<Schema>, key: string]>
{
    public method(this: NeastedObjectHelper<Schema>, { original }: NeastedObjectEmptyValue<Schema>, value: NeastedObjectChain<Schema>, key: string): NeastedObjectChain<Schema>
    {
        return value ? original(value, key) : <NeastedObjectChain<Schema>> undefined
    }
}