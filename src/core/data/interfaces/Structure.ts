export default interface Structure 
{
    [property: string]: Structure[keyof Structure]
}