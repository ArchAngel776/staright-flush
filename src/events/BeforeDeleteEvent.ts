import ModelSchema from "@data/interfaces/ModelSchema"
import { ModelEvent } from "@data/enums/ModelEvent"

import EventSignature from "@decorators/signatures/EventSignature"
import EventField from "@decorators/EventField"

import Event from "@core/Event"
import Model from "@core/Model"


export interface BeforeDeleteEventData
{
    isValid: boolean
}

@EventSignature()
export default class BeforeDeleteEvent<Schema extends ModelSchema> extends Event<Model<Schema>, BeforeDeleteEventData>
{
    @EventField isValid!: boolean

    public getName(): string
    {
        return ModelEvent.BEFORE_DELETE
    }
}