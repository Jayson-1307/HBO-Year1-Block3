import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { CustomAction } from "../../base/actions/CustomAction";

import { GameObject } from "../../base/gameObjects/GameObject";

import { Room } from "../../base/gameObjects/Room";
import { getPlayerSession, resetPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { StartupRoom } from "./StartupRoom";



export const vaultRoomAlias: string = "Vault";

export class VaultRoom extends Room {
    
    public constructor() {
        super(vaultRoomAlias);
    }

    public name(): string {
        return "The Vault";
    }

    public images(): string[] {
        return ["vault"];
    }

    /**
     * Gets the available actions in the room
     * @returns An array of available actions
     */
    public actions(): Action[] {
        let actionList: Action[] = [new CustomAction("1", "Grab Folder", false)];

        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.pickedUpFolder) {
            actionList = [new CustomAction("2", "Open folder", false)];
        }

        if (playerSession.folderInteractions !== 0) {
            actionList = [new CustomAction("3", "Continue", false)];
        }

        if (playerSession.folderInteractions > 9) {
            actionList = [new CustomAction("4", "Kill yourself", false), new CustomAction("5", "Turn yourself in", false)];
        }

        if (playerSession.suicide || playerSession.turnedIn) {
            actionList = [new CustomAction("restart", "Restart Game", false)] ;
        }

        return [...actionList];
    }

    /**
     * Gets the game objects present in the room
     * @returns An array of game objects
     */
    public objects(): GameObject[] {
        const gameObjects: GameObject[] = [
            this,
        ];

        console.log(gameObjects);

        return gameObjects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["*You hesitantly enter the vault...*", 
        `"There is a cabinet open over there, 
        maybe that's where 'the truth' is"`]);
    }


    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (alias === "1") {
            playerSession.pickedUpFolder = true;
            return new TextActionResult([`"This is it. The truth should be in here. 
            This is what we've been waiting for."`]);
        } else if (alias === "2") {
            playerSession.folderInteractions += 1;
            return new TextActionResult([`"What?... 
            What is this?.."`]);
        } else if (alias === "3") {
            if (playerSession.folderInteractions === 1) {
                playerSession.folderInteractions += 1;
                return new TextActionResult(["*There is a picture pinned to the top right of the file*",
                `"Wait... 
                that's me?.."`
            ]);

            } else if (playerSession.folderInteractions === 2) {
                playerSession.folderInteractions += 1;
                return new TextActionResult([`"There are also images of 
                the people I met here..."`]);

            } else if (playerSession.folderInteractions === 3) {
                playerSession.folderInteractions += 1;
                return new TextActionResult([`"Edward... Olga... Kevin... 
                Berta... Kurt... Albert..."`]);

            } else if (playerSession.folderInteractions === 4) {
                playerSession.folderInteractions += 1;
                return new TextActionResult([`"How can that be, 
                I just spoke to all of them?"`]);

            } else if (playerSession.folderInteractions === 5) {
                playerSession.folderInteractions += 1;
                return new TextActionResult([`*You read the through the 
                folder some more*`]);

            } else if (playerSession.folderInteractions === 6) {
                playerSession.folderInteractions += 1;
                return new TextActionResult([`"Notorious serial killer Ethan 
                'Hades' Sterling, who killed 6 people inside Blackwood Manor, 
                Recently escaped a mental Asylum."`]);

            } else if (playerSession.folderInteractions === 8) {
                playerSession.folderInteractions += 1;
                return new TextActionResult([`"Did I kill all of 
                them?.."`]);

            } else if (playerSession.folderInteractions === 7) {
                playerSession.folderInteractions += 1;
                return new TextActionResult([`"It says I'm schizophrenic... 
                Are those people I met here all imagination?"`]);

            } else if (playerSession.folderInteractions === 9) {
                playerSession.folderInteractions += 1;
                return new TextActionResult([`"This is too much for 
                me to take"`]);

            } 
        } else if (alias === "4") {
            playerSession.suicide = true;
            return new TextActionResult(["*Grabs gun from holster...*", 
            "*Bang*"]);
        } else if (alias === "5") {
            playerSession.turnedIn = true;
            return new TextActionResult(["I'm gonna turn myself in...", 
            "*Leaves Blackwood manor, never to return.*"]);
        } else if (alias === "restart") {
            const room: StartupRoom = new StartupRoom();
            getPlayerSession().isAlive = true;
            getPlayerSession().currentHP = 10;

            //Set the current room to the Dining room
            getPlayerSession().currentRoom = room.alias;
            resetPlayerSession();
            return room.examine();
        }
        
        return new TextActionResult(["The end."]);
    }

}
