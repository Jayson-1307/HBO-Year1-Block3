import { Interact, InteractionActionAlias } from "../../actions/InteractAction";
import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
import { getPlayerSession } from "../../../instances";
import { PlayerSession } from "../../../types";
import { DiningRoomKeyItemAlias } from "../roomItems/DiningRoomKeyItem";

/**
 * Represents the alias for the flowerpot object
 */
export const FlowerpotObjectAlias: string = "flowerpot-object";

/**
 * Initializes a variable to define if the player has examined the object
 */
let examined: boolean = false;

/**
 * Represents a flowerpot object within the game
 */
export class FlowerpotObject extends Item implements Examine, Interact {
    /**
     * Constructs the FlowerpotObject
     */
    public constructor(){
        super(FlowerpotObjectAlias, ExamineActionAlias, InteractionActionAlias);
    }

    /**
     * Gets the name of the flowerpot object
     * @returns The name of the flowerpot
     */
    public name(): string {
        return "Flowerpot";
    }

    /**
     * Handles the examine action for the flowerpot object
     * @returns The result of the examine action
     */
    public examine(): ActionResult | undefined {
        examined = true;
        return new TextActionResult(["A beautiful old flowerpot. The dirt looks a bit messy. Could be worth checking."]);
    }

    /**
     * Handles the interact action for the flowerpot object
     * @returns The result of the interact action
     */
    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (examined) {
            if (!playerSession.pickedUpDiningRoomKey) {
                playerSession.pickedUpDiningRoomKey = true;
                playerSession.inventory.push(DiningRoomKeyItemAlias);
                return new TextActionResult(["You dig into the dirt... And you find a key in the dirt. It could be used to open the door to the Dining room."]);
            } else {
                return new TextActionResult(["You dig around some more but you find nothing. You should try something else."]);  
            }          
        } 
        return new TextActionResult(["We don't know if it's safe. You should probably examine first."]);
    }
}
