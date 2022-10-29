import { ExceptConstructor } from "./constructors/ExceptConstructor";
export default function Except<Target extends ExceptConstructor>(Target: Target): {
    new (...args: Array<any>): {
        getName(): string;
        getMessage(): string;
        name: string;
        message: string;
        stack?: string | undefined;
    };
} & Target;
