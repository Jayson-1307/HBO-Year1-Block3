import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Room } from "../../base/gameObjects/Room";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { CustomAction } from "../../base/actions/CustomAction";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { chandelierItem } from "../items/chandelier";
import { cutleryItem, cutleryItemAlias } from "../items/cutleryItem";
import { OlgaCharacter } from "../characters/OlgaCharacter";
import { TalkAction } from "../../base/actions/TalkAction";
import { KevinCharacter } from "../characters/KevinCharacter";
import { getGameObjectsFromInventory, getPlayerSession, resetPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { ConsumeAction } from "../actions/ConsumeAction";
import { InteractionAction } from "../actions/InteractAction";
import { Library } from "../../Dean/rooms/Library";
import { ovenItem } from "../items/ovenItem";
import { AlbertCharacter } from "../characters/AlbertCharacter";
import { wineBarItem } from "../items/wineBarItem";
import { diningTableItem } from "../items/diningTableItem";
import { portraitItem } from "../items/portraitItem";
import { EntranceRoom } from "../../Jayson/rooms/Entrance-room";
import { StartupRoom } from "../../Jayson/rooms/StartupRoom";

/**
 * An alias for the dining room location.
 */
export const DiningroomAlias: string = "Diningroom";

/**
 * Represents the dining room location in the Blackwood Manor.
 */
export class Diningroom extends Room {
    public constructor() {
        super(DiningroomAlias);
    }

    /**
     * Returns the name of the dining room.
     * @returns "Dining Room"
     */
    public name(): string {
        return "Dining Room";
    }

    /**
     * Provides an array of image URLs for the dining room background.
     * @returns An array of strings representing image URLs (e.g., ["diningroom.jpg"])
     */
    public images(): string[] {
        return ["diningroom2"];
    }

    /**
     * Lists the available actions the player can perform in the dining room.
     * @returns An array of Action objects representing the available actions.
     */
    public actions(): Action[] {
        let actionList: Action[] = [
            new ExamineAction(),
            new InteractionAction(),
            new TalkAction(),
            new ConsumeAction(),
        ];

        const playersession: PlayerSession = getPlayerSession();

        if (playersession.pickedUpDiningRoomKey) {
            actionList.push(new CustomAction("previous-room", "Previous Room", false));
        }

        if (playersession.pickedUpLibraryKey) {
            actionList.push(new CustomAction("next-room", "Next Room", false));
        }

        if (!playersession.isAlive) {
            actionList = [];
            actionList.push(new CustomAction("restart", "Restart Game", false));
        }

        return [...actionList];
    }

    /**
     * Retrieves a list of game objects present in the dining room,
     * including the room itself, objects in the player's inventory,
     * and potentially dynamic objects based on game state.
     * @returns An array of GameObject instances representing the objects in the room.
     */
    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        if (!playerSession.inventory.includes(cutleryItemAlias)) {
            objects.push(new cutleryItem());
        }

        objects.push(
            new chandelierItem(),
            new wineBarItem(),
            new diningTableItem(),
            new portraitItem(),
            new ovenItem(),
            new AlbertCharacter(),
            new OlgaCharacter(),
            new KevinCharacter()
        );
        return objects;
    }

    /**
     * Provides a descriptive text for examining the dining room.
     * @returns A TextActionResult object containing the examination description.
     */
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        console.log(playerSession);
        return new TextActionResult([
            "This is the diningroom of the Blackwood Manor",
            "The room is dimly lit and the air is heavy with the smell of old wood and dust",
            "The room is filled with a large dining table and chairs with a kitchen in the corner",
            "There are only two people inside.",
            "Olga with her sharp cheekbones and piercing green eyes, exudes an air of quiet strength. Her dark hair is pulled back in a practical bun, revealing a face that has seen its share of life's challenges. Lines etch around her eyes, hinting at a wry smile that can disarm or surprise.",
            "And Kevin who bustles with quiet focus, toque askew. Flour-dusted apron hints at hands-on work. Playful hazel eyes promise humor alongside plating precision.",
            "There is a door to the north and a door to the east",
        ]);
    }

    public custom(alias: string): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (alias === "Test") {
            return console.log(playerSession), new TextActionResult(["Test"]);
        }

        if (alias === "next-room") {
            const playerSession: PlayerSession = getPlayerSession(); // Retrieves the player session
            const removeKey: number = playerSession.inventory.indexOf("library-key");
            playerSession.inventory.splice(removeKey, 1);

            const room: Library = new Library();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        } else if (alias === "previous-room") {
            const room: EntranceRoom = new EntranceRoom();

            //Set the current room to the Dining room
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
