import { Filter, Document } from "mongodb"
import QueryBuilder from "../../src/core/components/builders/QueryBuilder"
import ModelSchema from "../../src/core/data/interfaces/ModelSchema"
import QueryBuilderInterface from "../../src/core/data/interfaces/QueryBuilderInterface"
import { ProjectionData } from "../../src/core/data/types/ProjectionData"

export default interface Schema extends ModelSchema
{
    username: string
    contact: {
        email: string
    },
    statistcs: {
        games: {
            quantity: number,
            total: Array<{
                name: string
                members: number
                date: Date
            }>
        }
    },
    activity_logs: Array<Date>
}

export const query: QueryBuilderInterface<Schema> = new QueryBuilder<Schema>

export function matchProjection(operation: (query: QueryBuilderInterface<Schema>) => QueryBuilderInterface<Schema>, result: ProjectionData<Schema>): void
{
    return expect(operation(query).getProjection()).toStrictEqual(result)
}

export function matchFilter(operation: (query: QueryBuilderInterface<Schema>) => QueryBuilderInterface<Schema>, result: Filter<Schema>): void
{
    return expect(operation(query).getFilter()).toStrictEqual(result)
}