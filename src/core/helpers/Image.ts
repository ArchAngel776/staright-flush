import { MimeType } from "@core/data/enums/MimeType"


export default class Image
{
    public static types(): Array<string>
    {
        return [MimeType.PNG, MimeType.JPG, MimeType.GIF, MimeType.WEBP]
    }
}