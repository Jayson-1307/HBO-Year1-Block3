import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { decreaseHP, getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { PocketsquareItemAlias } from "../items/roomItems/PocketsquareItem";

/**
 * Represents the alias for the Edward character
 */
export const EdwardCharacterAlias: string = "edward-character";

/**
 * Represents whether the riddle given by Edward has been completed
 */
export let riddleCompleted: boolean = false;

/**
 * Represents the Edward character within the game
 */
export class EdwardCharacter extends Character implements Examine {
    /**
     * Constructs the EdwardCharacter
     */
    public constructor() {
        super(EdwardCharacterAlias, ExamineActionAlias);
    }
    
    /**
     * Gets the name of the Edward character
     * @returns The name of the character
     */
    public name(): string {
        return "Edward";
    }

    public images(): string[] {
        return ["Butler-zoom-in"];
    }

    /**
     * Handles the examine action for the Edward character
     * @returns The result of the examine action
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is Edward, the butler of the manor."]);
    }

    /**
     * Handles the talk action for the Edward character
     * @param choiceId The ID of the choice made during the conversation
     * @returns The result of the talk action
     */
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.currentCharacter = EdwardCharacterAlias;

        /**
         * gets the index of Pocketsquare alias in the inventory and saves it
         * got it from: https://www.educative.io/answers/what-is-the-arrayindexof-method-in-typescript
         */
        const pocketsquareIndex: number = playerSession.inventory.indexOf(PocketsquareItemAlias);

        if (!riddleCompleted) {
            if (choiceId === 1) {
                riddleCompleted = true;
                playerSession.completedEdwardsRiddle = true;
                playerSession.currentCharacter = "";
                return new TextActionResult(["Very good. Use that information in whatever way you like. It might help you out."]);
            } else if (choiceId === 2 || choiceId === 3 || choiceId === 4) {
                decreaseHP(1);
                const currentHP:number = playerSession.currentHP;
                if (playerSession.isAlive) {
                    console.log(playerSession.currentHP);
                    return new TalkActionResult(this, [
                        "*Edward Slaps you in the face, you took 1 Damage*",
                        `You currently have ${currentHP} HP left.`,
                        "Unfortunately, that is not correct. I'll give you another chance:",
                        `"In a room of silence and the passing of time,
                        Where secrets slumber, hidden under our climb.
                        Beneath our feet, a sea of fibers fine,
                        A woven blanket, where we tread, so pure and prime.
                        Soft and smooth, it stretches across the floor,
                        A path of dust and threads, a treasure to explore."`,
                        "The object I'm talking about is: "
                    ], [
                        new TalkChoiceAction(1, "A carpet"),
                        new TalkChoiceAction(2, "A couch"),
                        new TalkChoiceAction(3, "An old sweater on the floor"),
                        new TalkChoiceAction(4, "A fireplace")
                    ]);
                } 
                playerSession.currentCharacter = "";
                return new TextActionResult(["You died"]);
            } 
    
            if (!playerSession.pickedUpPocketsquare) {
                if (choiceId === 99) {
                    playerSession.currentCharacter = "";
                    return new TextActionResult(["Okay, i'll give you a general hint. There is a difference between 'Items' and 'Objects.",
                    "An object, something like a cabinet, needs to be examined before you're able to interact with it",
                    "When it comes to items, you don't need to do that, but interactions with items can do different things",
                    "Sometimes you pick it up and put in in your inventory, and if u already have it in your inventory, you'll do some other interaction."
                ]);
                } else if (choiceId === 98) {
                    playerSession.currentCharacter = "";
                    return new TextActionResult(["Before I give you the specific hint, find my pocket square for me, will you?"]); 
                }
                return new TalkActionResult(this, [
                    "How can I be of service, mister Sterling?",
                ], [
                    new TalkChoiceAction(99,"General hint"),
                    new TalkChoiceAction(98,"Specific hint")
                ]);
                    
            } else {
                delete playerSession.inventory[pocketsquareIndex];
                if (choiceId === 99) {
                    playerSession.currentCharacter = "";
                    return new TextActionResult(["Okay, i'll give you a general hint. There is a difference between 'Items' and 'Objects.",
                    "An object, something like a cabinet, needs to be examined before you're able to interact with it",
                    "When it comes to items, you don't need to do that, but interactions with items can do different things",
                    "Sometimes you pick it up and put in in your inventory, and if u already have it in your inventory, you'll do some other interaction."
                ]);
                } else if (choiceId === 98) {
                    return new TalkActionResult(this, [
                        "Thanks for finding my pocket square. I will now give you a riddle.",
                        "If answer the riddle wrong, and u will get slapped in the face.",
                        "If answer the riddle correctly, and the answer will be a useful hint.",
                        `"In a room of silence and the passing of time,
                        Where secrets slumber, hidden under our climb.
                        Beneath our feet, a sea of fibers fine,
                        A woven blanket, where we tread, so pure and prime.
                        Soft and smooth, it stretches across the floor,
                        A path of dust and threads, a treasure to explore."`,
                        "The object I'm talking about is: "
                    ], [
                        new TalkChoiceAction(1, "A carpet"),
                        new TalkChoiceAction(2, "A couch"),
                        new TalkChoiceAction(3, "An old sweater on the floor"),
                        new TalkChoiceAction(4, "A fireplace")
                    ]);
                }
                return new TalkActionResult(this, [
                    "How can I be of service, mister Sterling?",
                ], [
                    new TalkChoiceAction(99,"General hint"),
                    new TalkChoiceAction(98,"Specific hint")
                ]);

                
            }
        } else {
            if (playerSession.pickedUpKnife) {
                if (choiceId === 99) {
                    playerSession.currentCharacter = "";
                    return new TextActionResult(["Okay, i'll give you a general hint. There is a difference between 'Items' and 'Objects.",
                    "An object, something like a cabinet, needs to be examined before you're able to interact with it",
                    "When it comes to items, you don't need to do that, but interactions with items can do different things",
                    "Sometimes you pick it up and put in in your inventory, and if u already have it in your inventory, you'll do some other interaction."
                ]);
                } else if (choiceId === 98) {
                    playerSession.currentCharacter = "";
                    return new TextActionResult(["You already used the information I gave you correctly. I can't help you any further."]);;
                }
                return new TalkActionResult(this, [
                    "How can I be of service, mister Sterling?",
                ], [
                    new TalkChoiceAction(99,"General hint"),
                    new TalkChoiceAction(98,"Specific hint")
                ]);
            }

            if (choiceId === 99) {
                playerSession.currentCharacter = "";
                return new TextActionResult(["Okay, i'll give you a general hint. There is a difference between 'Items' and 'Objects.",
                "An object, something like a cabinet, needs to be examined before you're able to interact with it",
                "When it comes to items, you don't need to do that, but interactions with items can do different things",
                "Sometimes you pick it up and put in in your inventory, and if u already have it in your inventory, you'll do some other interaction."
            ]);
            } else if (choiceId === 98) {
                playerSession.currentCharacter = "";
                return new TextActionResult(["Try to remember the answer of the riddle I gave you."]);;
            }
            return new TalkActionResult(this, [
                "How can I be of service, mister Sterling?",
            ], [
                new TalkChoiceAction(99,"General hint"),
                new TalkChoiceAction(98,"Specific hint")
            ]);

           
        }
    }   
}
