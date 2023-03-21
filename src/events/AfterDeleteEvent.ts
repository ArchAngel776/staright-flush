import ModelSchema from "@data/interfaces/ModelSchema"
import { ModelEvent } from "@data/enums/ModelEvent"

import Event from "@core/Event"
import Model from "@core/Model"


export default class AfterDeleteEvent<Schema extends ModelSchema> extends Event<Model<Schema>>
{
    public getName(): string
    {
        return ModelEvent.AFTER_DELETE
    }
}