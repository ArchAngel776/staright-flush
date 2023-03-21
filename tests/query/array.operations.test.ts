import { QueryArrayOperator } from "@data/enums/QueryArrayOperator"

import { matchFilter } from "./_data"


const date1 = new Date
const date2 = new Date

test("Same array as specified", () =>
{
    matchFilter(
        query => query.whereArray("activity_logs", [ date1, date2 ]),
        {
            activity_logs: { $eq: [ date1, date2 ] }
        }
    )
})

describe("Array contain single value or multi values", () =>
{
    test("Check if array has specified value", () =>
    {
        matchFilter(
            query => query.whereArray("activity_logs", date1, QueryArrayOperator.CONTAIN),
            {
                activity_logs: { $eq: date1 }
            }
        )
    })

    test("Check if array has specified values", () =>
    {
        matchFilter(
            query => query.whereArray("activity_logs", [ date2, date1 ], QueryArrayOperator.CONTAIN),
            {
                activity_logs: { $all: [ date2, date1 ] }
            }
        )
    })
})

test("Check if array has elements like that", () =>
{
    matchFilter(
        query => query.whereArray("statistcs.games.total", { members: { $lte: 20, $gt: 10 } } , QueryArrayOperator.HAS),
        {
            "statistcs.games.total": { members: { $lte: 20, $gt: 10 } }
        }
    )
})

test("Check if array elements match criteria", () =>
{
    matchFilter(
        query => query.whereArray("statistcs.games.total", { name: /UserName/, members: { $gt: 10 } }, QueryArrayOperator.MATCH),
        {
            "statistcs.games.total": { $elemMatch: { name: /UserName/, members: { $gt: 10 } } }
        }
    )
})

test("Check if array has specified size", () =>
{
    matchFilter(
        query => query.whereArray("activity_logs", 5, QueryArrayOperator.LENGTH),
        {
            activity_logs: { $size: 5 }
        }
    )
})