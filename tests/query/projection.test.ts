import { ProjectionArray } from "../../src/core/data/enums/ProjectionArray"
import { matchProjection, query } from "./_data"

afterEach(() => query.clearProjection())

test("Projection with some fields", () =>
{
    matchProjection(
        query => query.with("username", "contact.email", "activity_logs"),
        {
            "username": 1,
            "contact.email": 1,
            "activity_logs": 1
        }
    )
})

test("Exclude some fields", () =>
{
    matchProjection(
        query => query.without("_id", "activity_logs"),
        {
            "_id": 0,
            "activity_logs": 0
        }
    )
})

test("Transform array projection", () =>
{
    matchProjection(
        query => query
            .withArray("activity_logs", ProjectionArray.SLICE, -1)
            .withArray("statistcs.games.total", ProjectionArray.MATCH, { members: { $gt: 3, $lte: 10 } }),
        {
            "activity_logs": { $slice: -1 },
            "statistcs.games.total": { $elemMatch: { members: { $gt: 3, $lte: 10 } } }
        }
    )
})

test("Mixin of projection types", () =>
{
    matchProjection(
        query => query
            .with("username", "contact.email")
            .withArray("statistcs.games.total", ProjectionArray.MATCH, { name: /foo/, members: { $gte: 2 } })
            .withArray("activity_logs", ProjectionArray.SLICE, [2, 4])
            .without("_id"),
        {
            "_id": 0,
            "username": 1,
            "contact.email": 1,
            "statistcs.games.total": { $elemMatch: { name: /foo/, members: { $gte: 2 } } },
            "activity_logs": { $slice: [ 2, 4 ] }
        }
    )
})