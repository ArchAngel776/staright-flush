import NeastedObjectHelper from "@helpers/NeastedObjectHelper"


test("Find simple value", () => {
    const helper = new NeastedObjectHelper({
        name: {
            first: "John",
            last: "Smith"
        }
    })

    expect(helper.get("name.first")).toEqual("John")
})

test("Set simple value", () => {
    const helper = new NeastedObjectHelper({
        name: {
            first: "John",
            last: "Smith"
        }
    })

    expect(helper.set("name.first", "Harry")).toBeInstanceOf(NeastedObjectHelper)
    expect(helper.set("name.last", "Angel").result).toStrictEqual({ name: { first: "Harry", last: "Angel" } })
})