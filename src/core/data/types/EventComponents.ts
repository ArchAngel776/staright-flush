import Event from "@core/Event"


export type EventComponents<EventTarget> = EventTarget extends Event<infer Target, infer Data> ? Data extends object ?
    { target: Target, data: Data } :
    never : never

export type TargetEvent<EventTarget> = EventComponents<EventTarget>["target"]

export type DataEvent<EventTarget> = EventComponents<EventTarget>["data"]