import { Filter } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import Observer from "@data/interfaces/Observer"
import { ModelEvent } from "@data/enums/ModelEvent"
import { BeforeFindData } from "@data/types/BeforeFindData"
import { ProjectionData } from "@data/types/ProjectionData"

import AfterDeleteEvent from "@events/AfterDeleteEvent"
import AfterFindEvent from "@events/AfterFindEvent"
import AfterSaveEvent from "@events/AfterSaveEvent"
import BeforeDeleteEvent from "@events/BeforeDeleteEvent"
import BeforeFindEvent from "@events/BeforeFindEvent"
import BeforeSaveEvent from "@events/BeforeSaveEvent"


export type ModelObserver<Schema extends ModelSchema, Event> = Event extends ModelEvent ? ModelObservers<Schema>[Event] extends Array<infer Observer> ? Observer : never : never

export interface ModelObservers<Schema extends ModelSchema>
{
    [ModelEvent.BEFORE_FIND]: Array<Observer<BeforeFindEvent<Schema>>>
    [ModelEvent.BEFORE_SAVE]: Array<Observer<BeforeSaveEvent<Schema>>>
    [ModelEvent.BEFORE_DELETE]: Array<Observer<BeforeDeleteEvent<Schema>>>
    [ModelEvent.AFTER_FIND]: Array<Observer<AfterFindEvent<Schema>>>
    [ModelEvent.AFTER_SAVE]: Array<Observer<AfterSaveEvent<Schema>>>
    [ModelEvent.AFTER_DELETE]: Array<Observer<AfterDeleteEvent<Schema>>>
}

export default interface ModelEvents<Schema extends ModelSchema>
{
    beforeFind(filter: Filter<Schema>, projection?: ProjectionData<Schema>): Promise<BeforeFindData<Schema>>
    afterFind(): Promise<void>
    beforeSave(): Promise<boolean>
    afterSave(): Promise<void>
    beforeDelete(): Promise<boolean>
    afterDelete(): Promise<void>
    on(event: ModelEvent.BEFORE_FIND, observer: Observer<BeforeFindEvent<Schema>>): this
    on(event: ModelEvent.AFTER_FIND, observer: Observer<AfterFindEvent<Schema>>): this
    on(event: ModelEvent.BEFORE_SAVE, observer: Observer<BeforeSaveEvent<Schema>>): this
    on(event: ModelEvent.AFTER_SAVE, observer: Observer<AfterSaveEvent<Schema>>): this
    on(event: ModelEvent.BEFORE_DELETE, observer: Observer<BeforeDeleteEvent<Schema>>): this
    on(event: ModelEvent.AFTER_DELETE, observer: Observer<AfterDeleteEvent<Schema>>): this
}