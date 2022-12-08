import { Document, ObjectId } from "mongodb"

export default interface ModelSchema extends Document
{
    _id: ObjectId
}