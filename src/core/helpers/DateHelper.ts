import { String } from "../data/enums/String"
import ZeroLeads from "./ZeroLeads";

export default class DateHelper
{
    public static LETTER_YEAR = "Y";
    public static LETTER_MONTH = "m";
    public static LETTER_DAY = "d";

    public static LETTER_HOUR = "H";
    public static LETTER_MINUTE = "i";
    public static LETTER_SECOND = "s";

    public static formatLetter(letter: string, date: Date): string
    {
        switch (letter) {
            case DateHelper.LETTER_SECOND:
                return ZeroLeads.format(date.getSeconds(), 2)
            case DateHelper.LETTER_MINUTE:
                return ZeroLeads.format(date.getMinutes(), 2)
            case DateHelper.LETTER_HOUR:
                return ZeroLeads.format(date.getHours(), 2)
            case DateHelper.LETTER_DAY:
                return ZeroLeads.format(date.getDate(), 2)
            case DateHelper.LETTER_MONTH:
                return ZeroLeads.format(date.getMonth() + 1, 2)
            case DateHelper.LETTER_YEAR:
                return ZeroLeads.format(date.getFullYear(), 4)
            default:
                return letter
        }
    }

    public static format(format: string, date: Date = new Date): string
    {
        return format.split(String.EMPTY).map(letter => DateHelper.formatLetter(letter, date)).join(String.EMPTY)
    }
}