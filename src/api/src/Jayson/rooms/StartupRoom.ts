import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { CustomAction } from "../../base/actions/CustomAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getPlayerSession } from "../../instances";
import { EntranceRoom } from "./Entrance-room";
// import { ExampleRoom } from "./ExampleRoom";

export const StartupRoomAlias: string = "introduction";


export class StartupRoom extends Room {
    public constructor() {
        super(StartupRoomAlias);
    }

    public name(): string {
        return "Ambigious Darkness";
    }

    public images(): string[] {
        return ["Manor"];
    }

    public actions(): Action[] {
        return [new CustomAction("start-game", "Start Game", false)];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([`You are standing before the Blackwood Manor,
        You are playing as Ethan Sterling a former detective,
        U got a call last night from a stranger u did not recognise (its) voice... saying there was a case that needs to be solved.
        So here u are the next day, at the abandoned Manor standing in the rain and ready to go inside.`]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "start-game") {
            const room: EntranceRoom = new EntranceRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
