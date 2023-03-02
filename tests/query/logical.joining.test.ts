import { BSONType } from "mongodb"
import { QueryArrayOperator } from "../../src/core/data/enums/QueryArrayOperator"
import { QueryOperator } from "../../src/core/data/enums/QueryOperator"
import { matchFilter } from "./_data"

describe("Simple negation", () =>
{
    test("Single value negation", () =>
    {
        matchFilter(
            query => query.not.where("contact.email", /restricted\@email.domain/),
            {
                "contact.email": { $not: { $regex: /restricted\@email.domain/ } }
            }
        )
    })

    test("Negation of array query", () =>
    {
        matchFilter(
            query => query.not.whereArray("statistcs.games.total", { name: /GameName/, members: { $gte: 3 } }, QueryArrayOperator.MATCH),
            {
                "statistcs.games.total": { $not: { $elemMatch: { name: /GameName/, members: { $gte: 3 } } } }
            }
        )
    })
})

describe("Simple 1-level queries", () =>
{
    test("Simple OR condition", () =>
    {
        matchFilter(
            query => query
                .where("username", /NewPlayer/)
                .or.not.whereArray("statistcs.games.quantity", { $lt: 20, $gte: 10 }, QueryArrayOperator.MATCH),
            {
                $or: [
                    {
                        username: { $regex: /NewPlayer/ }
                    },
                    {
                        "statistcs.games.quantity": { $not: { $elemMatch: { $lt: 20, $gte: 10 } } }
                    }
                ]
            }
        )
    })

    test("Simple NOR query", () =>
    {
        matchFilter(
            query => query
                .where("username", /NewPlayer/)
                .nor.not.whereArray("statistcs.games.quantity", { $lte: 30, $gt: 25 }, QueryArrayOperator.HAS)
                .nor.where("contact.email", BSONType.string, QueryOperator.TYPE),
            {
                $nor: [
                    { username: { $regex: /NewPlayer/ } },
                    { "statistcs.games.quantity": { $not: { $lte: 30, $gt: 25 } } },
                    { "contact.email": { $type: BSONType.string } }
                ]
            }
        )
    })
})

describe("Advanced mulit-level queries", () =>
{
    test("Double OR in AND", () =>
    {
        matchFilter(
            query => query
                .where("username", /NewPlayer/)
                .or.where("contact.email", ["email1@email.com", "email2@email.com"], QueryOperator.NOT)
                .and.whereQuery(query => query
                    .whereArray("statistcs.games.quantity", { $lt: 25, $gt: 10 }, QueryArrayOperator.MATCH)
                    .or.whereArray("statistcs.games.total", { name: "NewPlayer" }, QueryArrayOperator.HAS)
                ),
            {
                $and: [
                    {
                        $or: [
                            { username: { $regex: /NewPlayer/ } },
                            { "contact.email": { $nin: [ "email1@email.com", "email2@email.com" ] } }
                        ]
                    },
                    {
                        $or: [
                            { "statistcs.games.quantity": { $elemMatch: { $lt: 25, $gt: 10 } } },
                            { "statistcs.games.total": { name: "NewPlayer" } }
                        ]
                    }
                ]
            }
        )
    })

    test("Mix of logical joiners", () =>
    {
        const date1 = new Date
        const date2 = new Date

        matchFilter(
            query => query
                .whereQuery(query => query
                    .where("contact.email", "specified@email.com")
                    .or.not.whereArray("activity_logs", 10, QueryArrayOperator.LENGTH)
                )
                .and.whereQuery(query => query
                    .whereArray("statistcs.games.quantity", { $lt: 20, $gte: 5 }, QueryArrayOperator.MATCH)
                    .nor.whereArray("statistcs.games.total", { name: "NewPlayer", members: { $gt: 3 } }, QueryArrayOperator.HAS)
                    .nor.not.where("username", /NewPlayer/)
                )
                .and.whereQuery(query => query
                    .not.whereArray("activity_logs", [ date1, date2 ], QueryArrayOperator.CONTAIN)
                    .or.whereQuery(query => query
                        .not.where("statistcs.games.quantity", BSONType.int, QueryOperator.TYPE)
                        .nor.whereArray("statistcs.games.total", { name: /NewPlayer/, members: { $lt: 10 } }, QueryArrayOperator.MATCH)    
                    )
                ),
            {
                $and: [
                    {
                        $or: [
                            { "contact.email": { $eq: "specified@email.com" } },
                            { "activity_logs": { $not: { $size: 10 } } }
                        ]
                    },
                    {
                        $nor: [
                            { "statistcs.games.quantity": { $elemMatch: { $lt: 20, $gte: 5 } } },
                            { "statistcs.games.total": { name: "NewPlayer", members: { $gt: 3 } } },
                            { "username": { $not: { $regex: /NewPlayer/ } } }
                        ]
                    },
                    {
                        $or: [
                            {
                                "activity_logs": { $not: { $all: [ date1, date2 ] } }
                            },
                            {
                                $nor: [
                                    { "statistcs.games.quantity": { $not: { $type: BSONType.int } } },
                                    { "statistcs.games.total": { $elemMatch: { name: /NewPlayer/, members: { $lt: 10 } } } }
                                ]
                            }
                        ]
                    }
                ] 
            }
        )
    })
})