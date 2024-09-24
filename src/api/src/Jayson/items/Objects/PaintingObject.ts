import { Interact, InteractionActionAlias } from "../../actions/InteractAction";
import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
import { combineCodeFragments, getPlayerSession } from "../../../instances";
import { PlayerSession } from "../../../types";
import { FirstCodeFragmentItemAlias } from "../roomItems/FirstCodeFragmentItem";
import { KnifeItemAlias } from "../roomItems/KnifeItem";

/**
 * Represents the alias for the painting object
 */
export const PaintingObjectAlias: string = "painting-object";

/**
 * Initializes a variable to define if the player has examined the object
 */
let examined: boolean = false;

/**
 * Represents a painting object within the game
 */
export class PaintingObject extends Item implements Examine, Interact {
    /**
     * Constructs the PaintingObject
     */
    public constructor () {
        super(PaintingObjectAlias, ExamineActionAlias, InteractionActionAlias);
    }

    /**
     * Gets the name of the painting object
     * @returns The name of the painting
     */
    public name(): string {
        return "Painting";
    }
    
    /**
     * Handles the examine action for the painting object
     * @returns The result of the examine action
     */
    public examine(): ActionResult | undefined {
        examined = true;
        return new TextActionResult(["What? That looks like me on the painting! It looks alot like me alot, but not at all like me at the same time. Strange..."]);
    }
    
    /**
     * Handles the interact action for the painting object
     * @returns The result of the interact action
     */
    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (examined) {
            if (playerSession.pickedUpKnife) {
                if (!playerSession.firstCodeFragment) {
                    playerSession.inventory.push(FirstCodeFragmentItemAlias);
                    playerSession.firstCodeFragment = true;
                    const knifeIndex: number = playerSession.inventory.indexOf(KnifeItemAlias);
                    delete playerSession.inventory[knifeIndex];
                    combineCodeFragments();
                    return new TextActionResult([`You use the old knife you found to cut out the painting. There was nothing behind it. 
                    But before putting down the canvas, you see that there is a piece of paper taped to the back of it. It has a number on it. 
                    You put the piece of paper in your pocket. Could be helpful later.`]);
                }

                return new TextActionResult(["You found the code fragment here earlier. There's nothing else here."]);
            }

            return new TextActionResult([`You slide your hand across the whole canvas. 
            In the middle it feels like there is something behind it. 
            Since the frame is stuck to the wall, you'll need something sharp to cut out the canvas and see what's behind.`]);

        }
        return new TextActionResult(["A very beautiful painting. Maybe examining it can give you some information about it."]);
        
    }

}
