import { InteractionAction } from "../actions/InteractAction";

import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { ConsumeAction } from "../actions/ConsumeAction";
import { CustomAction } from "../../base/actions/CustomAction";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { TalkAction } from "../../base/actions/TalkAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { DrKurtCharacter } from "../characters/DrKurtCharacter";
import { getGameObjectsFromInventory, getPlayerSession, resetPlayerSession } from "../../instances";
import { CabinetItem } from "../items/CabinetItem";
// import { CodeItem } from "../items/CodeItem";
import { FlaskItem } from "../items/FlaskItem";
import { MicroscopeItem } from "../items/MicrosopeItem";
import { MixerItem } from "../items/MixerItem";
import { PlayerSession } from "../../types";
import { EntranceRoom } from "../../Jayson/rooms/Entrance-room";
import { MispickelFlaskItem } from "../items/MispickelFlaskItem";
import { PikachurinFlaskItem } from "../items/PikachurinFlaskItem";
import { WelshiteFlaskItem } from "../items/WelshiteFlaskItem";
import { ResearchTableItem } from "../items/ResearchTableItem";
import { SucroseFlaskItem } from "../items/SucroseFlaskItem";
import { StartupRoom } from "../../Jayson/rooms/StartupRoom";
import { Library } from "../../Dean/rooms/Library";
export const LaboratoryAlias: string = "laboratory";

export class Laboratory extends Room {
    public constructor() {
        super(LaboratoryAlias);
    }

    public name(): string {
        return "Laboratory";
    }
    public images(): string[] {
        return ["lab"];
    }

    public actions(): Action[] {
        let actionList: Action[] = [
            new ExamineAction(),
            new TalkAction(),
            new InteractionAction(),
            new ConsumeAction(),
            // new CustomAction("test-me", "Test me", false),
        ];

        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.pickedUpLaboratoryKey) {
            actionList.push(new CustomAction("previous-room", "Previous Room", false));
        }

        if (playerSession.pickedUpEntranceKey) {
            actionList.push(new CustomAction("next-room", "Next Room", false));
        }
        if (!playerSession.isAlive) {
            actionList = [];
            actionList.push(new CustomAction("restart", "Restart Game", false));
        }

        return [...actionList];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];
        if (!playerSession.pickedUpFlask) {
            objects.push(new FlaskItem());
        }
        if (playerSession.pickedUpMispickel) {
            objects.push(new MispickelFlaskItem());
        }
        if (playerSession.pickedUpPikachurin) {
            objects.push(new PikachurinFlaskItem());
        }
        if (playerSession.pickedUpWelshite) {
            objects.push(new WelshiteFlaskItem());
        }

        if (playerSession.pickedUpSucrose) {
            objects.push(new SucroseFlaskItem());
        }

        objects.push(
            new ResearchTableItem(),
            new CabinetItem(),
            new MicroscopeItem(),
            new MixerItem(),
            new DrKurtCharacter()
            // new TestCharacter(),
            // new FoodItem()
        );
        return objects;
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        return (
            console.log(playerSession),
            new TextActionResult([
                "You see an old room with lots of flasks and tests with different fluids around. The aura around here is very unpleasant.",
            ])
        );
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "next-room") {
            const playerSession: PlayerSession = getPlayerSession(); // Retrieves the player session
            const removeKey: number = playerSession.inventory.indexOf("entrance-key");
            playerSession.inventory.splice(removeKey, 1);
            const room: EntranceRoom = new EntranceRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        } else if (alias === "previous-room") {
            const room: Library = new Library();

            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        } else if (alias === "restart") {
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
