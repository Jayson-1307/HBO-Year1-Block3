import { Interact, InteractionAction, InteractionActionAlias } from "../actions/InteractAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { TalkAction, TalkActionAlias } from "../../base/actions/TalkAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { EdwardCharacter } from "../characters/EdwardCharacter";
import { getGameObjectsFromInventory, getPlayerSession, resetPlayerSession } from "../../instances";
import { CouchObject } from "../items/Objects/CouchObject";
import { FlashlightItem, FlaslightItemAlias } from "../items/roomItems/FlashlightItem";
import { FlowerpotObject } from "../items/Objects/FlowerpotObject";
import { PaintingObject } from "../items/Objects/PaintingObject";
import { PlayerSession } from "../../types";
import { CarpetObject } from "../items/Objects/CarpetObject";
import { CustomAction } from "../../base/actions/CustomAction";
import { Diningroom } from "../../Aydin/rooms/diningRoom";
import { VaultObject } from "../items/Objects/VaultObject";
import { ConsumeAction } from "../actions/ConsumeAction";
import { Laboratory } from "../../Berkay/rooms/Laboratory";
import { VaultRoom } from "./Vault-room";
import { StartupRoom } from "./StartupRoom";
/**
 * Represents the alias for the Entrance room.
 */
export const entranceRoomAlias: string = "entrance-room";

// returnHpAmount();

/**
 * Represents the entrance room of the game
 */
export class EntranceRoom extends Room implements Interact {
    /**
     * Constructs the EntranceRoom object
     */
    public constructor() {
        super(entranceRoomAlias, TalkActionAlias, InteractionActionAlias);
    }

    /**
     * Gets the name of the room
     * @returns The name of the room
     */
    public name(): string {
        return "The Entrance";
    }

    /**
     * Gets the images associated with the room
     * @returns An array of image names
     */
    public images(): string[] {
        return ["Main-hall"];
    }

    /**
     * Gets the available actions in the room
     * @returns An array of available actions
     */
    public actions(): Action[] | any {
        let actionList: Action[] = [
            new ExamineAction(),
            new TalkAction(),
            new InteractionAction(),
            new ConsumeAction(),
        ];
        const playersession: PlayerSession = getPlayerSession();

        if (playersession.pickedUpEntranceKey) {
            actionList.push(new CustomAction("previous-room", "Previous Room", false));
        }

        if (playersession.pickedUpDiningRoomKey) {
            actionList.push(new CustomAction("next-room", "Next Room", false));
        }

        if (playersession.vaultOpened) {
            actionList = [];
            actionList.push(new CustomAction("open-vault", "Enter the vault", false));
        }

        if (!playersession.isAlive) {
            actionList = [];
            actionList.push(new CustomAction("restart", "Restart Game", false));
        }

        return [...actionList];
    }

    /**
     * Gets the game objects present in the room
     * @returns An array of game objects
     */
    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory(); // Defines the items in the inventory
        const playerSession: PlayerSession = getPlayerSession(); // Retrieves the player session
        const gameObjects: GameObject[] = [
            this,
            new VaultObject(),
            new EdwardCharacter(),
            new CouchObject(),
            new FlowerpotObject(),
            new PaintingObject(),
            ...inventoryItems,
        ];

        // Checks if Flashlight is NOT in inventory
        if (!playerSession.inventory.includes(FlaslightItemAlias)) {
            gameObjects.push(new FlashlightItem());
        }

        // Checks if the player completed edwards riddle
        if (playerSession.completedEdwardsRiddle) {
            gameObjects.push(new CarpetObject());
        }

        // checks if the player picked up the knife, so it can remove the carpet from the object list
        if (playerSession.pickedUpKnife) {
            const removeObject: number = gameObjects.indexOf(new CarpetObject()); // Gets the index of dining-room-key
            gameObjects.splice(removeObject, 1); // removes dining-room-key from inventory
        }

        console.log(gameObjects);

        return gameObjects;
    }

    /**
     * Handles the examine action for the room.`
     * @returns The dialogue associated to examine action for this room.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            `[Edward]: "Step into the realm of Blackwood Manor, Mr. Sterling. 
        I am Edward, steward of these halls. Here, secrets weave through the air like whispers in the night. 
        Allow me to be your guide through this labyrinth of mysteries, where the past and present intertwine in shadows and tales. 
        If there is anything I can assist you with, please don't hesitate to talk to me!"`,
        ]);
    }

    public interact(): ActionResult | undefined {
        return new TextActionResult(["Erra, ERRA Erra erra"]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "next-room") {
            const playerSession: PlayerSession = getPlayerSession(); // Retrieves the player session
            const removeKey: number = playerSession.inventory.indexOf("dining-room-key"); // Gets the index of dining-room-key
            playerSession.inventory.splice(removeKey, 1); // removes dining-room-key from inventory

            const room: Diningroom = new Diningroom();

            //Set the current room to the Dining room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        } else if (alias === "previous-room") {
            const room: Laboratory = new Laboratory();

            //Set the current room to the Dining room
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        } else if (alias === "open-vault") {
            const room: VaultRoom = new VaultRoom();

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
