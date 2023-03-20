import AsyncForEachCallback from "@data/callbacks/AsyncForEachCallback"


export default async function asyncForEach<Element>(target: Array<Element>, callback: AsyncForEachCallback<Element>): Promise<void>
{
    for (const [ index, element ] of target.entries()) {
        await callback(element, index, target)
    }
}