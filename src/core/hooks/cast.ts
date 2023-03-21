export default function cast<Type, Target>(target: Target): Type
{
    return <Type> <unknown> target
}