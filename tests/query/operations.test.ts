import { BSONType } from "mongodb"

import { QueryOperator } from "@data/enums/QueryOperator"

import { matchFilter } from "./_data"


const emailRegex = /[a-zA-Z0-9\.\-\_]+\@([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+/

test("Equal simple value", () =>
{
    matchFilter(
        query => query.where("username", "NewPlayer"), 
        { 
            username: { $eq: "NewPlayer" }
        }
    )
})

test("Check if value is in array", () =>
{
    matchFilter(
        query => query.where("username", [ "NewPlayer", "OldPlayer" ]),
        {
            username: { $in: [ "NewPlayer", "OldPlayer" ] }
        }
    )
})

test("Check expression of neasted field", () =>
{
    matchFilter(
        query => query.where("contact.email", emailRegex),
        {
            "contact.email": { $regex: emailRegex }
        }
    )
})

describe("Compare number values", () =>
{
    test("Check if neasted value is less than", () =>
    {
        matchFilter(
            query => query.where("statistcs.games.quantity", 2, QueryOperator.LT),
            {
                "statistcs.games.quantity": { $lt: 2 }
            }
        )
    })

    test("Check if neasted array value is greater then or equal", () =>
    {
        matchFilter(
            query => query.where("statistcs.games.total.0.members", 6, QueryOperator.GTE),
            {
                "statistcs.games.total.0.members": { $gte: 6 }
            }
        )
    })
})

test("Check type of value", () =>
{
    matchFilter(
        query => query.where("statistcs.games.quantity", BSONType.int, QueryOperator.TYPE),
        {
            "statistcs.games.quantity": { $type: BSONType.int }
        }
    )
})

describe("Check if specified value exists or not", () =>
{
    test("Check if specified value exists", () =>
    {
        matchFilter(
            query => query.where("activity_logs.1", true, QueryOperator.EXISTS),
            {
                "activity_logs.1": { $exists: true }
            }
        )
    })

    test("Check if specified value not exists", () =>
    {
        matchFilter(
            query => query.where("activity_logs.3", false, QueryOperator.EXISTS),
            {
                "activity_logs.3": { $exists: false }
            }
        )
    })
})

test("Exclude specified value", () =>
{
    matchFilter(
        query => query.where("username", "BannedName", QueryOperator.NOT),
        {
            "username": { $ne: "BannedName" }
        }
    )
})

test("Exclude specified array of values", () =>
{
    matchFilter(
        query => query.where("contact.email", [ "banned1@email.com", "banned2@email.com" ], QueryOperator.NOT),
        {
            "contact.email": { $nin: [ "banned1@email.com", "banned2@email.com" ] }
        }
    )
})