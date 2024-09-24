import { Interact, InteractionActionAlias } from "../../actions/InteractAction";
import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";

/**
 * Represents the alias for the key item
 */
export const DiningRoomKeyItemAlias: string = "dining-room-key";

/**
 * Represents a key item within the game
 */
export class DiningRoomKeyItem extends Item implements Examine, Interact {
    /**
     * Constructs the KeyItem
     */
    public constructor(){
        super(DiningRoomKeyItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    /**
     * Gets the name of the key item
     * @returns The name of the key
     */
    public name(): string {
        return "Key";
    }
    
    /**
     * Handles the examine action for the key item
     * @returns The result of the examine action
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Examined the key, fill dialogue"]);
    }

    /**
     * Handles the interact action for the key item
     * @returns The result of the interact action
     */
    public interact(): ActionResult | undefined {
        return new TextActionResult(["Interacted with the key, fill dialogue"]);
    }
}
