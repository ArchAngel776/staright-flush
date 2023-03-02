import NeastedObjectHelper from "../../src/core/helpers/NeastedObjectHelper"

test("Find simple value", () => {
    const helper = new NeastedObjectHelper({
        name: {
            first: "Karol",
            last: "Marciniak"
        }
    })

    expect(helper.get("name.first")).toEqual("Karol")
})

test("Set simple value", () => {
    const helper = new NeastedObjectHelper({
        name: {
            first: "Karol",
            last: "Marciniak"
        }
    })

    expect(helper.set("name.first", "Michał")).toBeInstanceOf(NeastedObjectHelper)
    expect(helper.set("name.last", "Michajłowicz").result).toStrictEqual({ name: { first: "Michał", last: "Michajłowicz" } })
})