import { GameServiceEvent } from "../services/gameservice";

export type MyInputEventData = {
    text: string;
};

export type MyInputEvent = GameServiceEvent<MyInputEventData>;