export default function defined<Type>(variable: Type): boolean
{
    return typeof variable !== "undefined"
}