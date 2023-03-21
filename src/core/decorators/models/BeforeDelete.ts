import ModelEvents from "@data/interfaces/ModelEvents"
import ModelSchema from "@data/interfaces/ModelSchema"

import MethodModel from "@foundations/MethodModel"


export default class BeforeDelete<Schema extends ModelSchema> extends MethodModel<ModelEvents<Schema>, Promise<boolean>>
{
    public async method(this: ModelEvents<Schema>, { original }: BeforeDelete<Schema>): Promise<boolean>
    {
        return await this.beforeDelete() ? original() : false
    }
}