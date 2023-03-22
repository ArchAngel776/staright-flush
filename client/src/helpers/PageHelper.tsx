export default class PageHelper
{
    public static goTo(path: string): void
    {
        window.location.href = path
    }

    public static reload(): void
    {
        window.location.reload()
    }
}