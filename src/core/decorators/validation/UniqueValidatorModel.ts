import { UniqueValue } from "@data/types/UniqueValue"

import MethodModel from "@foundations/MethodModel"
import UniqueValidator from "@foundations/validation/UniqueValidator"
import Unique from "@helpers/Unique"

import except from "@hooks/except"

import Model from "@core/Model"
import CollectionNameException from "@exceptions/CollectionNameException"


export default class UniqueValidatorModel<Schema> extends MethodModel<UniqueValidator<Schema>, Promise<boolean>, [value: UniqueValue]>
{
    public method(this: UniqueValidator<Schema>, { original }: UniqueValidatorModel<Schema>, value: UniqueValue): Promise<boolean>
    {
        return typeof value === "boolean" && value ? this.model instanceof Model ? original(Unique.collection(this.model.getRepository().getModel())) : except(new CollectionNameException) : original(value)
    }
}