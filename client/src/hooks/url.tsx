export default function url(url: string): string
{
    return import.meta.env.DEV ? `/api/${url}` : url
}