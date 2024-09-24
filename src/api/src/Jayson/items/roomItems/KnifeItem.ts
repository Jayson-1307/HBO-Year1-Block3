import { Interact, InteractionActionAlias } from "../../actions/InteractAction";
import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";

/**
 * Represents the alias for the knife item
 */
export const KnifeItemAlias: string = "knife-item";

/**
 * Represents an old knife item within the game
 */
export class KnifeItem extends Item implements Examine, Interact {
    /**
     * Constructs the KnifeItem
     */
    public constructor() {
        super(KnifeItemAlias, ExamineActionAlias, InteractionActionAlias);
    }
    
    /**
     * Gets the name of the knife item
     * @returns The name of the knife
     */
    public name(): string {
        return "Old knife";
    }

    /**
     * Handles the examine action for the knife item
     * @returns The result of the examine action
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult(["It looks very old and used, but it might still be able to cut through things."]);
    }

    /**
     * Handles the interact action for the knife item
     * @returns The result of the interact action
     */
    public interact(): ActionResult | undefined {
        return new TextActionResult(["You touch the tip of the knife with your finger. You feel that it is very sharp, better be careful!"]);
    }

}
