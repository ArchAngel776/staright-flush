import ModelSchema from "@data/interfaces/ModelSchema"
import { ModelEvent } from "@data/enums/ModelEvent"

import EventSignature from "@decorators/signatures/EventSignature"
import EventField from "@decorators/EventField"

import Event from "@core/Event"
import Model from "@core/Model"


export interface BeforeSaveEventData
{
    isValid: boolean
}

@EventSignature()
export default class BeforeSaveEvent<Schema extends ModelSchema> extends Event<Model<Schema>, BeforeSaveEventData>
{
    @EventField isValid!: boolean

    public getName(): string
    {
        return ModelEvent.BEFORE_SAVE
    }
}