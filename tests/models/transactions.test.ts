import { TransactionData } from "@data/types/TransactionData"

import Connection from "@components/database/Connection"
import Transaction from "@components/database/Transaction"

import TestUser from "./TestUser"


class Data
{
    public static transaction: Transaction

    public static getUser(transaction: TransactionData): TestUser
    {
        return new TestUser({
            user: {
                name: "CarlJohnson",
                email: "carl.johnson@grove.st"
            },
            password: {
                hash: "cjgrove4ever"
            },
            consents: {
                terms: "on"
            }
        }).withTransaction(transaction)
    }
}

describe("Transactions tests", () => {

    beforeEach(async () => Data.transaction = await Connection.getConnection().beginTransaction())

    afterEach(() => TestUser.deleteAll(query => query.where("user.name", "CarlJohnson")))

    test("Read within and without transaction", async () => {
        await Data.transaction.make(async (...transaction) => {
            const user = Data.getUser(transaction)

            const save = await user.save()
            expect(save).toBeTruthy()

            const pureResult = await TestUser.query(query => query.where("user.name", "CarlJohnson"))
            expect(pureResult).toBeNull()

            const transactionResult = await TestUser.query(query => query.where("user.name", "CarlJohnson"), transaction)
            expect(transactionResult).toBeInstanceOf(TestUser)
        })

        await Data.transaction.rollback()
    })

    test("Read within transaction after rollback", async () => {
        await Data.transaction.make(async (...transaction) => {
            const user = Data.getUser(transaction)

            const save = await user.save()
            expect(save).toBeTruthy()

            const transactionResult = await TestUser.query(query => query.where("user.name", "CarlJohnson"), transaction)
            expect(transactionResult).toBeInstanceOf(TestUser)
        })

        await Data.transaction.rollback()
        expect(TestUser.query(query => query.where("user.name", "CarlJohnson"))).resolves.toBeNull()
    })

    test("Read without transaction after commit", async () => {
        await Data.transaction.make(async (...transaction) => {
            const user = Data.getUser(transaction)

            const save = await user.save()
            expect(save).toBeTruthy()

            const pureResult = await TestUser.query(query => query.where("user.name", "CarlJohnson"))
            expect(pureResult).toBeNull()
        })

        await Data.transaction.commit()
        expect(TestUser.query(query => query.where("user.name", "CarlJohnson"))).resolves.toBeInstanceOf(TestUser)
    })

})