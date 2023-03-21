import { Filter } from "mongodb"

import ModelSchema from "@data/interfaces/ModelSchema"
import QueryBuilderInterface from "@data/interfaces/QueryBuilderInterface"
import { ProjectionData } from "@data/types/ProjectionData"

import QueryBuilder from "@components/builders/QueryBuilder"


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