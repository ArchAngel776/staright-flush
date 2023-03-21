export default function hasErrors(errors: Array<string> | undefined): boolean
{
    return errors instanceof Array
}