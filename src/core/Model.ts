/* eslint-disable no-duplicate-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectId } from "mongodb"
import type { Filter } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import ModelCollection from "@data/interfaces/ModelCollection"
import ModelEvents, { ModelObserver, ModelObservers } from "@data/interfaces/ModelEvents"
import { Nullable } from "@data/types/Nullable"
import { Constructor } from "@data/types/Constructor"
import { Defaults } from "@data/types/Defaults"
import { BeforeFindData } from "@data/types/BeforeFindData"
import { ModelEvent } from "@data/enums/ModelEvent"
import { TransactionData } from "@data/types/TransactionData"
import type { Attr } from "@data/types/Attr"
import type { ProjectionData } from "@data/types/ProjectionData"

import BaseModel from "@foundations/BaseModel"
import CollectionDocumentReader from "@components/database/collections/CollectionDocumentReader"
import CollectionDocumentWriter from "@components/database/collections/CollectionDocumentWriter"
import CollectionDocumentRemover from "@components/database/collections/CollectionDocumentRemover"
import Method from "@helpers/Method"
import ModelSignature from "@decorators/signatures/ModelSignature"
import ModelValidation from "@decorators/models/ModelValidation"
import BindDefaults from "@decorators/models/BindDefaults"
import BeforeSave from "@decorators/models/BeforeSave"
import AfterSave from "@decorators/models/AfterSave"
import BeforeFind from "@decorators/models/BeforeFind"
import AfterFind from "@decorators/models/AfterFind"
import BeforeFindAll from "@decorators/models/BeforeFindAll"
import AfterFindAll from "@decorators/models/AfterFindAll"
import BeforeDelete from "@decorators/models/BeforeDelete"
import AfterDelete from "@decorators/models/AfterDelete"
import Attribute from "@decorators/Attribute"
import TransactionDocument from "@decorators/models/document/TransactionDocument"

import cast from "@hooks/cast"
import asyncForEach from "@hooks/asyncForEach"

import BeforeFindEvent from "@events/BeforeFindEvent"
import AfterFindEvent from "@events/AfterFindEvent"
import BeforeSaveEvent from "@events/BeforeSaveEvent"
import AfterSaveEvent from "@events/AfterSaveEvent"
import BeforeDeleteEvent from "@events/BeforeDeleteEvent"
import AfterDeleteEvent from "@events/AfterDeleteEvent"

import ObjectValidation, { ObjectValidationData } from "@validators/core/ObjectValidation"
import Repository from "./foundations/Repository"

@ModelSignature()
export default abstract class Model<Schema extends ModelSchema> extends BaseModel<Schema> implements ModelCollection, ModelEvents<Schema>
{
    @Attribute<Schema, ObjectValidationData<Schema>>(ObjectValidation, { typeof: ObjectId })
    _id: Attr<ObjectId>

    protected original: Partial<Schema>

    protected transaction: TransactionData | undefined

    protected observers: ModelObservers<Schema>

    public constructor(data: Partial<Schema> = {})
    {
        super(data)
        this.original = {}
        this.observers = {
            [ModelEvent.BEFORE_FIND]: [], [ModelEvent.BEFORE_SAVE]: [], [ModelEvent.BEFORE_DELETE]: [],
            [ModelEvent.AFTER_FIND]: [], [ModelEvent.AFTER_SAVE]: [], [ModelEvent.AFTER_DELETE]: []
        }
    }

    public abstract getRepository(): Repository<Schema, Model<Schema>>

    public abstract collection(): string

    public defaults(): Defaults<Schema>
    {
        return cast({
            _id: new ObjectId
        })
    }

    @Method(<Constructor<BeforeFind<Schema>>> BeforeFind)
    @Method(<Constructor<AfterFind<Schema>>> AfterFind)
    public async find(filter: Filter<Schema>, projection: ProjectionData<Schema> = {}): Promise<Nullable<this>>
    {
        return await this.getReader().select(projection).where(filter).findDocument(this)
    }

    @Method(<Constructor<BeforeFindAll<Schema>>> BeforeFindAll)
    @Method(<Constructor<AfterFindAll<Schema>>> AfterFindAll)
    public async findAll(filter: Filter<Schema>, projection: ProjectionData<Schema> = {}): Promise<Array<this>>
    {
        return await this.getReader().select(projection).where(filter).findDocuments(this)
    }

    @Method(<Constructor<BeforeSave<Schema>>> BeforeSave)
    @Method(<Constructor<AfterSave<Schema>>> AfterSave)
    public async save(): Promise<boolean>
    {
        return await this.getWriter().saveDocument(this)
    }

    @Method(<Constructor<BeforeDelete<Schema>>> BeforeDelete)
    @Method(<Constructor<AfterDelete<Schema>>> AfterDelete)
    public async delete(): Promise<boolean>
    {
        return await this.getRemover().removeDocument(this)
    }

    public on<Event extends ModelEvent>(event: Event, observer: ModelObserver<Schema, Event>): this
    {
        this.observers[event].push(observer)
        return this
    }

    public async beforeFind(filter: Filter<Schema>, projection?: ProjectionData<Schema>): Promise<BeforeFindData<Schema>>
    {
        const event = new BeforeFindEvent(this, { filter, projection })
        await asyncForEach(this.observers[ModelEvent.BEFORE_FIND], async (observer) => await observer.onEvent(event))

        return [ event.filter, event.projection ]
    }

    @Method(<Constructor<BindDefaults<Schema>>> BindDefaults)
    public async afterFind(): Promise<void>
    {
        const event = new AfterFindEvent(this, {})
        await asyncForEach(this.observers[ModelEvent.AFTER_FIND], async (observer) => await observer.onEvent(event))

        return
    }

    @Method(<Constructor<BindDefaults<Schema>>> BindDefaults)
    @Method(<Constructor<ModelValidation<Schema>>> ModelValidation)
    public async beforeSave(): Promise<boolean>
    {
        const event = new BeforeSaveEvent(this, { isValid: true })
        await asyncForEach(this.observers[ModelEvent.BEFORE_SAVE], async (observer) => await observer.onEvent(event))

        return event.isValid
    }

    public async afterSave(): Promise<void>
    {
        const event = new AfterSaveEvent(this, {})
        await asyncForEach(this.observers[ModelEvent.AFTER_SAVE], async (observer) => await observer.onEvent(event))

        return
    }

    public async beforeDelete(): Promise<boolean>
    {
        const event = new BeforeDeleteEvent(this, { isValid: true })
        await asyncForEach(this.observers[ModelEvent.BEFORE_DELETE], async (observer) => await observer.onEvent(event))

        return event.isValid
    }

    public async afterDelete(): Promise<void>
    {
        const event = new AfterDeleteEvent(this, {})
        await asyncForEach(this.observers[ModelEvent.AFTER_DELETE], async (observer) => await observer.onEvent(event))

        return
    }

    public withTransaction(transaction?: TransactionData): this
    {
        this.transaction = transaction
        return this
    }

    public withoutTransaction(): this
    {
        this.transaction = undefined
        return this
    }

    @Method(<Constructor<TransactionDocument<Schema>>> TransactionDocument)
    protected getReader(): CollectionDocumentReader<Schema>
    {
        return new CollectionDocumentReader
    }

    @Method(<Constructor<TransactionDocument<Schema>>> TransactionDocument)
    protected getWriter(): CollectionDocumentWriter<Schema>
    {
        return new CollectionDocumentWriter
    }

    @Method(<Constructor<TransactionDocument<Schema>>> TransactionDocument)
    protected getRemover(): CollectionDocumentRemover<Schema>
    {
        return new CollectionDocumentRemover
    }

    public get originalAttributes(): Partial<Schema>
    {
        return this.original
    }

    public static collection(): string
    {
        return this.prototype.collection()
    }
}