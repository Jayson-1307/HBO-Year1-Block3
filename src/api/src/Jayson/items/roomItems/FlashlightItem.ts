import { ActionResult } from "../../../base/actionResults/ActionResult";
// import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Interact, InteractionActionAlias } from "../../actions/InteractAction";
import { Item } from "../../../base/gameObjects/Item";
import { PlayerSession } from "../../../types";
import { getPlayerSession } from "../../../instances";

/**
 * Represents the alias for the flashlight item
 */
export const FlaslightItemAlias: string = "Flashlight";

/**
 * Represents a flashlight item within the game
 */
export class FlashlightItem extends Item implements Examine, Interact {
    /**
     * Constructs the FlashlightItem
     */
    public constructor() {
        super(FlaslightItemAlias, ExamineActionAlias, InteractionActionAlias);
    }
    
    /**
     * Gets the name of the flashlight item
     * @returns The name of the flashlight
     */
    public name(): string {
        return "Flashlight";
    }

    /**
     * Handles the examine action for the flashlight item
     * @returns The result of the examine action
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["An old flashlight. It looks like it might still work. Could be useful."]);
    }

    /**
     * Handles the interact action for the flashlight item
     * @returns The result of the interact action
     */
    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (!playerSession.inventory.includes(FlaslightItemAlias)) { // Checks if flashlight isn't already in inventory
            playerSession.pickedUpFlashlight = true;
            playerSession.inventory.push(FlaslightItemAlias);  // Puts flashlight in inventory
            return new TextActionResult(["You pick up the flashlight and test it. It still works!"]);
        } else {
            return new TextActionResult(["You shine it around you, just for fun."]);
        }  
    }
}
