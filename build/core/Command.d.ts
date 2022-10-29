import { AsyncAwait } from "./data/types/AsyncAwait";
export default abstract class Command {
    static SUCCESS: number;
    static ERROR: number;
    init(): void;
    check(): boolean;
    abstract execute(): AsyncAwait<number>;
    except(status: number): void;
}
