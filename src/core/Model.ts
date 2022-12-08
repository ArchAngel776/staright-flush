/* eslint-disable @typescript-eslint/no-unused-vars */
import { Filter, ObjectId } from "mongodb"
import ModelSchema from "./data/interfaces/ModelSchema"
import ModelValidation from "./decorators/models/ModelValidation"
import ModelEvents from "./data/interfaces/ModelEvents"
import Method from "./helpers/Method"
import BeforeSave from "./decorators/models/BeforeSave"
import AfterSave from "./decorators/models/AfterSave"
import BaseModel from "./foundations/BaseModel"
import { Nullable } from "./data/types/Nullable"
import BeforeFind from "./decorators/models/BeforeFind"
import AfterFind from "./decorators/models/AfterFind"
import { Attr } from "./data/types/Attr"
import Attribute from "./decorators/Attribute"
import CollectionDocumentReader from "./components/database/collections/CollectionDocumentReader"
import CollectionDocumentWriter from "./components/database/collections/CollectionDocumentWriter"
import BindDefaults from "./decorators/models/BindDefaults"
import { ValidationData } from "./foundations/Validation"
import { Scenarios } from "./data/interfaces/Scenarios"
import ObjectValidation from "../validators/core/ObjectValidation"
import { Constructor } from "./data/types/Constructor"

export default abstract class Model<Schema extends ModelSchema> extends BaseModel<Schema> implements ModelEvents<Schema>
{
    @Attribute<Schema, ValidationData>()
    _id: Attr<ObjectId>

    protected original: Partial<Schema>

    public constructor(data: Partial<Schema> = {})
    {
        super(data)
        this.original = {}
    }

    public abstract collection(): string

    public validation(): Scenarios<Schema>
    {
        return {
            _id: [ new ObjectValidation({ typeof: ObjectId }) ]
        }
    }

    public defaults(): Partial<Schema>
    {
        return <Partial<Schema>> {
            _id: new ObjectId
        }
    }

    @Method(BeforeFind)
    @Method(AfterFind)
    public async find(filter: Filter<Schema>): Promise<Nullable<this>>
    {
        return <this> await this.getReader().where(filter).findDocument(this)
    }

    public beforeFind(filter: Filter<Schema>): Filter<Schema>
    {
        return filter
    }

    @Method(<Constructor<BindDefaults<Schema>>> BindDefaults)
    public afterFind(): void
    {
        return
    }

    @Method(BeforeSave)
    @Method(AfterSave)
    public async save(): Promise<boolean>
    {
        return await this.getWriter().saveDocument(this)
    }

    @Method(<Constructor<BindDefaults<Schema>>> BindDefaults)
    @Method(<Constructor<ModelValidation<Schema>>> ModelValidation)
    public beforeSave(): boolean
    {
        return true
    }

    public afterSave(): void
    {
        return
    }

    protected getReader(): CollectionDocumentReader<Schema>
    {
        return new CollectionDocumentReader
    }

    protected getWriter(): CollectionDocumentWriter<Schema>
    {
        return new CollectionDocumentWriter
    }

    public get originalAttributes(): Partial<Schema>
    {
        return this.original
    }
}