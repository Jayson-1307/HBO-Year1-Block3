import { Interact, InteractionActionAlias } from "../../actions/InteractAction";
import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
import { getPlayerSession } from "../../../instances";
import { PlayerSession } from "../../../types";
import { KnifeItemAlias } from "../roomItems/KnifeItem";

/**
 * Represents the alias for the carpet object.
 */
export const CarpetObjectAlias: string = "carpet-object";

/**
 * Initializes a variable to define if the player has examined the object
 */
let examined: boolean = false; 

export class CarpetObject extends Item implements Examine, Interact {
    /**
     * Constructs the CarpetObject.
     */
    public constructor() {
        super(CarpetObjectAlias, ExamineActionAlias, InteractionActionAlias);
    }

    /**
     * Gets the name of the carpet object
     * @returns The name of the carpet
     */
    public name(): string {
        return "Carpet";
    }

    /**
     * Handles the examine action for the carpet object
     * @returns The result of the examine action
     */
    public examine(): ActionResult | undefined {
        examined = true; 
        return new TextActionResult(["A very old and dusty carpet. But hey look! it looks like there is something under the carpet."]);
    }

    /**
     * Handles the interact action for the carpet object
     * @returns The result of the interact action
     */
    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (examined) {
            if (!playerSession.pickedUpKnife) {
                if (playerSession.pickedUpFlashlight) {
                    playerSession.pickedUpKnife = true; // Registers that the player picked up the item
                    playerSession.inventory.push(KnifeItemAlias);
                    return new TextActionResult(["You lift up the carpet, and YES! There is an old knife underneath. You stretch your arm to get it and pick it up. "]);
                }
                return new TextActionResult(["You lift up the carpet, but it's too dark to see anything. Perhaps there's something in this room that can help with that."]);
            }
            return new TextActionResult(["There is nothing else under the carpet, better keep going."]);
        }
        return new TextActionResult(["You don't know if it's safe yet. You should probably examine it first."]);
    }
}
