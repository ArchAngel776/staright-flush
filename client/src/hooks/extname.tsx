export default function extname(path: string): string
{
    return path.substring(path.lastIndexOf(".") + 1, path.length)
}