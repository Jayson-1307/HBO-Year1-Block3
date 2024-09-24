import { Interact, InteractionActionAlias } from "../actions/InteractAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
/**
 * Constructor for the KeyItem class.
 *
 * Inherits from the base Item class and implements the Examine and Pickup interfaces.
 *
 * @param {string} alias (Optional) Unique identifier for the Key item within the game.
 *   Defaults to the value of the `KeyItemAlias` constant (assumed to be defined elsewhere).
 * @param {string} examineActionAlias (Optional) Unique identifier for the examine action associated with the Key item.
 *   Defaults to the value of the `ExamineActionAlias` constant (assumed to be defined elsewhere).
 * @param {string} InteractionActionAlias (Optional) Unique identifier for the pickup action associated with the Key item.
 *   Defaults to the value of the `InteractionActionAlias` constant (assumed to be defined elsewhere).
 */
export const EntranceRoomKeyItemAlias: string = "entrance-key";
export class EntranceRoomKeyItem extends Item implements Examine, Interact {
    public constructor() {
        super(EntranceRoomKeyItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    /**
     * Returns the display name of the Key item.
     *
     * @returns {string} The name of the Key item, in this case "Key".
     */
    public name(): string {
        return "Key";
    }

    /**
     * Provides a description of the Key item when examined.
     *
     * @returns {TextActionResult | undefined} An object containing text descriptions for examining the Key item.
     *   The first description is a general observation, and the second suggests a potential use.
     */
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You looked at the key it looks to be in a suprisingly good state, maybe you can use this somewhere?",
        ]);
    }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpEntranceKey) {
            playerSession.inventory.push(EntranceRoomKeyItemAlias);
            playerSession.pickedUpEntranceKey = true;
            return new TextActionResult(["You picked up the key"]);
        } else {
            return new TextActionResult(["You already have the key in your inventory"]);
        }
    }
}
