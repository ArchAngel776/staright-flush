import type { Filter } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import { ModelEvent } from "@data/enums/ModelEvent"
import type { ProjectionData } from "@data/types/ProjectionData"

import EventSignature from "@decorators/signatures/EventSignature"
import EventField from "@decorators/EventField"

import Event from "@core/Event"
import Model from "@core/Model"


export interface BeforeFindEventData<Schema extends ModelSchema>
{
    filter: Filter<Schema>
    projection?: ProjectionData<Schema>
}

@EventSignature()
export default class BeforeFindEvent<Schema extends ModelSchema> extends Event<Model<Schema>, BeforeFindEventData<Schema>>
{
    @EventField filter!: Filter<Schema>

    @EventField projection?: ProjectionData<Schema>

    public getName(): string
    {
        return ModelEvent.BEFORE_FIND
    }
}