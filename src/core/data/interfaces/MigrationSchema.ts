import { ObjectId } from "mongodb"


export default interface MigrationSchema
{
    _id?: ObjectId
    migration_name: string
    created_at: Date
}