import Command from "../core/Command";
export default class TestCommand extends Command {
    static THROW: number;
    protected testString: string;
    constructor(testString: string);
    init(): void;
    check(): boolean;
    execute(): number;
    except(status: number): void;
}
