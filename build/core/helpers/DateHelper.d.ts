export default class DateHelper {
    static LETTER_YEAR: string;
    static LETTER_MONTH: string;
    static LETTER_DAY: string;
    static LETTER_HOUR: string;
    static LETTER_MINUTE: string;
    static LETTER_SECOND: string;
    static formatLetter(letter: string, date: Date): string;
    static format(format: string, date?: Date): string;
}
