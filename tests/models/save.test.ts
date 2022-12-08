import { ObjectId } from "mongodb"
import Hash from "../../src/core/helpers/Hash"
import User from "../../src/models/User"

test("Create and save model", async () => {
    const user = new User({
        username: "ArchAngel776",
        email: "karol.marciniak155@gmail.com",
        password_hash: "password"
    })

    expect(await user.save()).toBeTruthy()
    expect(user._id).toBeInstanceOf(ObjectId)
    expect(Hash.compare("password", <string> user.attributes.password_hash)).toBeTruthy()
})

test("Try create model with restricted email", async () => {
    const user = new User({
        username: "NewPlayer",
        email: "karol.marciniak155@gmail.com",
        password_hash: "password"
    })
    
    expect(await user.save()).toBeFalsy()
    expect(user.errors.getFirstError("email")).toEqual("Property email must be unqiue in collection users.")
})

test("Try create model with incorrect email", async () => {
    const user = new User({
        username: "NewPlayer",
        email: "it is incorrect email",
        password_hash: "password"
    })

    expect(await user.save()).toBeFalsy()
    expect(user.errors.getFirstError("email")).toEqual("Property email must be correct email format")
})

test("Create and change email and password in model", async () => {
    const user = new User({
        username: "NewPlayer",
        email: "old@email.com",
        password_hash: "old_password"
    })

    expect(await user.save()).toBeTruthy()
    expect(user.email).toEqual("old@email.com")
    expect(Hash.compare("old_password", <string> user.attributes.password_hash)).toBeTruthy()

    user.email = "new@email.com"
    user.attributes.password_hash = "new_password"

    expect(await user.save()).toBeTruthy()
    expect(user.email).toEqual("new@email.com")
    expect(Hash.compare("new_password", <string> user.attributes.password_hash)).toBeTruthy()
})