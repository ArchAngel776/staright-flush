import { AsyncAwait } from "@data/types/AsyncAwait"
import { DataEvent, TargetEvent } from "@data/types/EventComponents"

import Event from "@core/Event"


export default interface Observer<EventTarget extends Event<TargetEvent<EventTarget>, DataEvent<EventTarget>>>
{
    onEvent(event: EventTarget): AsyncAwait<void>
}