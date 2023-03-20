export default function wait(seconds: number): Promise<void>
{
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}