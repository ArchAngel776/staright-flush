import { Constructor } from "../../data/types/Constructor"
import Exception from "../../Exception"

export type ExceptConstructor = Constructor<Exception & { 
    getName(): string
    getMessage(): string
}>