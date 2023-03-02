import { ObjectId } from "mongodb"
import Hash from "../src/core/helpers/Hash"
import User from "../src/models/User"

describe("Save model", () =>
{
    test("Create and save model", async () =>
    {
        const user = new User({
            user: {
                name: "ArchAngel776",
                email: "karol.marciniak155@gmail.com"
            },
            password: {
                hash: "password"
            }
        })

        expect(await user.save()).toBeTruthy()
        expect(user._id).toBeInstanceOf(ObjectId)
        expect(Hash.compare("password", <string> user.attributes.password?.hash)).toBeTruthy()
    })

    test("Try create model with restricted email", async () =>
    {
        const user = new User({
            user: {
                name: "NewPlayer",
                email: "karol.marciniak155@gmail.com"
            },
            password: {
                hash: "password"
            }
        })
        
        expect(await user.save()).toBeFalsy()
        expect(user.errors.getFirstError("user.email")).toEqual("Property user.email must be unqiue in collection users.")
    })

    test("Try create model with incorrect email", async () =>
    {
        const user = new User({
            user: {
                name: "NewPlayer",
                email: "it is incorrect email"
            },
            password: {
                hash: "password"
            }
        })

        expect(await user.save()).toBeFalsy()
        expect(user.errors.getFirstError("user.email")).toEqual("Property user.email must be correct email format")
    })

    describe("Create and change email and password in model", () =>
    {
        const user = new User({
            user: {
                name: "NewPlayer",
                email: "old@email.com"
            },
            password: {
                hash: "old_password"
            }
        })

        afterEach(() =>
        {
            if (user.user) {
                user.user.email = "new@email.com"
            }
            if (user.attributes.password) {
                user.attributes.password.hash = "new_password"
            }
        })

        test("Create model", async () =>
        {
            expect(await user.save()).toBeTruthy()
            expect(user.user?.email).toEqual("old@email.com")
            expect(Hash.compare("old_password", <string> user.attributes.password?.hash)).toBeTruthy()
        })

        test("Change email and password in model", async () =>
        {
            expect(await user.save()).toBeTruthy()
            expect(user.user?.email).toEqual("new@email.com")
            expect(Hash.compare("new_password", <string> user.attributes.password?.hash)).toBeTruthy()
        })
    })
})

describe("Find model", () =>
{
    test("Simple find model by name", async () =>
    {
        const user = await User.query(query => query.where("user.name", "ArchAngel776"))

        expect(user).toBeInstanceOf(User)
        expect(user?.user?.name).toEqual("ArchAngel776")
    })

    test("Find all active models", async () =>
    {
        const users = await User.queryAll(query => query.where("active", true))

        expect(users).toHaveLength(2)
        users.forEach(user => expect(user.active).toBeTruthy())
    })

    test("Find model only contains user data", async () =>
    {
        const users = await User.queryAll(query => query.with("user.name", "user.email").where("user.name", /^ArchAngel/).or.where("user.email", "new@email.com"))

        expect(users).toHaveLength(2)
        users.forEach(user => {
            expect(user.user).toBeDefined()
            expect(user.user).toHaveProperty("name")
            expect(user.user).toHaveProperty("email")
            expect(user.timestamps).toBeUndefined()
        })
    })
})

describe("Delete model", () =>
{
    test("Find and delete single model", async () =>
    {
        const user = await User.query(query => query.where("user.name", /ArchAngel/))

        expect(user).toBeInstanceOf(User)
        expect(user?.user?.name).toEqual("ArchAngel776")

        expect(await user?.delete()).toBeTruthy()
    })

    test("Find and delete all active models", async () =>
    {
        const remove = await User.deleteAll(query => query.where("active", true))

        expect(remove).toBeGreaterThanOrEqual(1)
    })
})