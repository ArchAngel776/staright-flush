import GameEngineObserver from "../callbacks/GameEngineObserver"
import { GameEngineEvent } from "../enums/GameEngineEvent"


export type GameEngineObservers = {
    [event in GameEngineEvent]: Array<GameEngineObserver>
}