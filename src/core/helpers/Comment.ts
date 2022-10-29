export default class Comment
{
    public static block(...lines: Array<string>): string
    {
        return `/**\n${lines.map(line => `\t * ${line}`).join("\n")}\n\t */`
    }
}