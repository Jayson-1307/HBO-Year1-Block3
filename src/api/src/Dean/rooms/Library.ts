import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { RedBookItem } from "../items/redBook";
import { PurpleBookItem } from "../items/purpleBook";
import { BlueBookItem } from "../items/blueBook";
import { HourGlassItem, HourglassItemAlias } from "../items/hourglass";
import { HadesStatueAlias, HadesStatueItem } from "../items/hadesStatue";
import { LadderItem } from "../items/ladder";
import { TalkAction } from "../../base/actions/TalkAction";
import { BertaCharacter } from "../characters/Berta";
import { getGameObjectsFromInventory, getPlayerSession, resetPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { InteractionAction } from "../actions/interactAction";
import { ConsumeAction } from "../actions/consumeAction";
import { SmokePipeItem, SmokePipeItemAlias } from "../items/smokePipe";
import { CustomAction } from "../../base/actions/CustomAction";
import { Laboratory } from "../../Berkay/rooms/Laboratory";
import { Diningroom } from "../../Aydin/rooms/diningRoom";
import { StartupRoom } from "../../Jayson/rooms/StartupRoom";

export const LibraryAlias: string = "Library";

export class Library extends Room {
    public constructor() {
        super(LibraryAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It is very dusty in here...", "And look at all those books!"]);
    }
    public name(): string {
        return "Library";
    }

    public images(): string[] {
        return ["library"];
    }

    public actions(): Action[] {
        let actionList: Action[] = [
            new ExamineAction(),
            new TalkAction(),
            new InteractionAction(),
            new ConsumeAction(),
        ];
        const playersession: PlayerSession = getPlayerSession();

        if (playersession.pickedUpDiningRoomKey) {
            actionList.push(new CustomAction("previous-room", "Previous Room", false));
        }

        if (playersession.pickedUpLaboratoryKey) {
            actionList.push(new CustomAction("next-room", "Next Room", false));
        }
        
        if (!playersession.isAlive) {
            actionList = [];
            actionList.push(new CustomAction("restart", "Restart Game", false));
        }

        return [...actionList];
    }

    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();
        const playerSession: PlayerSession = getPlayerSession();
        const gameObjects: GameObject[] = [
            this,
            new BertaCharacter(),
            new LadderItem(),
            new PurpleBookItem(),
            new RedBookItem(),
            new BlueBookItem(),
            ...inventoryItems,
        ];

        if (!playerSession.inventory.includes(HadesStatueAlias)) {
            gameObjects.push(new HadesStatueItem());
        }

        if (!playerSession.inventory.includes(HourglassItemAlias)) {
            gameObjects.push(new HourGlassItem());
        }

        if (!playerSession.inventory.includes(SmokePipeItemAlias)) {
            gameObjects.push(new SmokePipeItem());
        }

        return gameObjects;
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "next-room") {
            const playerSession: PlayerSession = getPlayerSession(); // Retrieves the player session
            const removeKey: number = playerSession.inventory.indexOf("laboratory-Key");
            playerSession.inventory.splice(removeKey, 1);

            const room: Laboratory = new Laboratory();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }   else if (alias === "previous-room"){
            const room: Diningroom = new Diningroom();

            //Set the current room to the Dining room
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }

        else if (alias === "restart") {
            const room: StartupRoom = new StartupRoom();
            getPlayerSession().isAlive = true;
            getPlayerSession().currentHP = 10;

            //Set the current room to the Dining room
            getPlayerSession().currentRoom = room.alias;
            resetPlayerSession();
            return room.examine();  
        }   

        return undefined;
    }
}
