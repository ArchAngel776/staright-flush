export default function isRecord<Target>(target: Target): boolean
{
    return Object.getPrototypeOf(target) === Object.prototype
}