export default interface AsyncForEachCallback<Element>
{
    (element: Element, index: number, target: Array<Element>): Promise<void>
}