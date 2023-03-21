export default function timestamp(date: Date): number
{
    return Date.parse(date.toDateString())
}