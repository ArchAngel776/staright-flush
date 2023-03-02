/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClientSession, Filter, ObjectId } from "mongodb"
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
import ObjectValidation, { ObjectValidationData } from "../validators/core/ObjectValidation"
import { Constructor } from "./data/types/Constructor"
import { Defaults } from "./data/types/Defaults"
import cast from "./hooks/cast"
import { ModelConstructor } from "./data/types/ModelContructor"
import { ProjectionData } from "./data/types/ProjectionData"
import { BeforeFindData } from "./data/types/BeforeFindData"
import BeforeFindAll from "./decorators/models/BeforeFindAll"
import AfterFindAll from "./decorators/models/AfterFindAll"
import CollectionDocumentRemover from "./components/database/collections/CollectionDocumentRemover"
import TransactionDocument from "./decorators/models/document/TransactionDocument"
import BeforeDelete from "./decorators/models/BeforeDelete"
import AfterDelete from "./decorators/models/AfterDelete"

export default abstract class Model<Schema extends ModelSchema> extends BaseModel<Schema> implements ModelEvents<Schema>
{
    @Attribute<Schema, ObjectValidationData>(ObjectValidation, { typeof: ObjectId })
    _id: Attr<ObjectId>

    protected original: Partial<Schema>

    protected transaction: Nullable<ClientSession>

    public constructor(data: Partial<Schema> = {})
    {
        super(data)
        this.original = {}
        this.transaction = null
    }

    public abstract getModel(): ModelConstructor<Schema, Model<Schema>>

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

    public beforeFind(filter: Filter<Schema>, projection?: ProjectionData<Schema>): BeforeFindData<Schema>
    {
        return [ filter, projection ]
    }

    @Method(<Constructor<BindDefaults<Schema>>> BindDefaults)
    public afterFind(): void
    {
        return
    }

    @Method(<Constructor<BeforeSave<Schema>>> BeforeSave)
    @Method(<Constructor<AfterSave<Schema>>> AfterSave)
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

    @Method(<Constructor<BeforeDelete<Schema>>> BeforeDelete)
    @Method(<Constructor<AfterDelete<Schema>>> AfterDelete)
    public async delete(): Promise<boolean>
    {
        return await this.getRemover().removeDocument(this)
    }

    public beforeDelete(): boolean
    {
        return true
    }

    public afterDelete(): void
    {
        return
    }

    public withTransaction(transaction: ClientSession): this
    {
        this.transaction = transaction
        return this
    }

    public withoutTransaction(): this
    {
        this.transaction = null
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
}