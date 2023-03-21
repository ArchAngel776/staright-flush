import { Constructor } from "@data/types/Constructor"

import Exception from "@core/Exception"


export type ExceptConstructor = Constructor<Exception & { 
    getName(): string
    getMessage(): string
}>