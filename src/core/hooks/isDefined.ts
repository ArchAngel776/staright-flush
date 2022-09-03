export default function isDefined<Type>(variable: Type): boolean
{
    return typeof variable !== "undefined"
}