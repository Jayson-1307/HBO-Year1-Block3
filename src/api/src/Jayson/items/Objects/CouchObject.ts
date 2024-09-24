import { Interact, InteractionActionAlias } from "../../actions/InteractAction";
import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
import { getPlayerSession } from "../../../instances";
import { PlayerSession } from "../../../types";
import { PocketsquareItemAlias } from "../roomItems/PocketsquareItem";

/**
 * Represents the alias for the couch object
 */
export const CouchObjectAlias: string = "couch-object";

/**
 * Initializes a variable to define if the player has examined the object
 */
let examined: boolean = false;

/**
 * Represents a couch object within the game
 */
export class CouchObject extends Item implements Examine, Interact {
    /**
     * Constructs the CouchObject
     */
    public constructor() {
        super(CouchObjectAlias, ExamineActionAlias, InteractionActionAlias);
    }
    
    /**
     * Gets the name of the couch object
     * @returns The name of the couch
     */
    public name(): string {
        return "Couch";
    }

    /**
     * Handles the examine action for the couch object
     * @returns The result of the examine action
     */
    public examine(): ActionResult | undefined {
        examined = true;
        
        return new TextActionResult(["A very old, but comfortable looking couch"]);
    }

    /**
     * Handles the interact action for the couch object
     * @returns The result of the interact action
     */
    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if(examined) {
            if (!playerSession.pickedUpPocketsquare) {
                playerSession.pickedUpPocketsquare = true;
                playerSession.inventory.push(PocketsquareItemAlias);
                return new TextActionResult(["You search through the couch, and find Edward's pocket square and pick it up. You should probably tell Edward."]);
            } else {
                return new TextActionResult(["You take a seat on the couch. It's very comfy. However, you've got to keep going."]);
            }
        } else {
            return new TextActionResult(["We don't know if it's safe. You should probably examine first."]);
        }
    }
}
