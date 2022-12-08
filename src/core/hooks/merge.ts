export default function merge<TypeA, TypeB>(targetA: TypeA, targetB: TypeB): TypeA & TypeB
{
    return { ...targetA, ...targetB }
}