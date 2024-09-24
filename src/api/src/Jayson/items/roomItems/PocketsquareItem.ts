import { Interact } from "../../actions/InteractAction";
import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";

/**
 * Represents the alias for the pocketsquare item
 */
export const PocketsquareItemAlias: string = "pocketsquare-item";

/**
 * Represents a pocketsquare item within the game
 */
export class PocketsquareItem extends Item implements Examine, Interact{
    /**
     * Constructs the PocketsquareItem
     */
    public constructor(){
        super(PocketsquareItemAlias, ExamineActionAlias);
    }
    
    /**
     * Gets the name of the pocketsquare item
     * @returns The name of the pocketsquare
     */
    public name(): string {
        return "Pocketsquare";
    }

    /**
     * Handles the examine action for the pocketsquare item.
     * @returns The result of the examine action
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["I don't even know why Edward would want this back. It smells and it doesn't even look that good. Oh well, let's just give it back."]);
    }

    /**
     * Handles the interact action for the pocketsquare item
     * @returns The result of the interact action
     */
    public interact(): ActionResult | undefined {
        return new TextActionResult(["You wave the pocketsquare around, letting it fall on the ground. While picking it up from the wooden floor you get a splinter. You took one damage."]);
    }
    
}
