import { Interact, InteractionActionAlias } from "../../actions/InteractAction";
import { ActionResult } from "../../../base/actionResults/ActionResult";
import { TextActionResult } from "../../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../../base/actions/ExamineAction";
import { Item } from "../../../base/gameObjects/Item";
import { PlayerSession } from "../../../types";
import { getPlayerSession } from "../../../instances";
// import { getPlayerSession } from "../instances";
// import { PlayerSession } from "../types";

/**
 * Represents the alias for the vault object
 */
export const VaultObjectAlias: string = "vault-object";

/**
 * Initializes a variable to define if the player has examined the object
 */
let examined: boolean = false;

/**
 * Represents a vault object within the game
 */
export class VaultObject extends Item implements Examine, Interact {
    // private playerSession:PlayerSession = getPlayerSession();

    /**
     * Constructs the VaultObject
     */
    public constructor() {
        super(VaultObjectAlias, ExamineActionAlias, InteractionActionAlias);
    }

    /**
     * Gets the name of the vault object
     * @returns The name of the vault
     */
    public name(): string {
        return "Vault";
    }

    /**
     * Handles the examine action for the vault object
     * @returns The result of the examine action
     */
    public examine(): ActionResult | undefined {
        examined = true;
        return new TextActionResult(["There is a huge vault door in the wall. It needs a 4 digit code. Better keep an eye out for any numbers then!"]);
    }

    /**
     * Handles the interact action for the vault object
     * @returns The result of the interact action
     */
    public interact(): ActionResult | undefined {
    const playerSession: PlayerSession = getPlayerSession(); 

        if (examined) {
            if (playerSession.collectedAllCodeFragments) {
                playerSession.vaultOpened = true;
                return new TextActionResult(["You enter the code, and the vault door opens."]);
            }

            return new TextActionResult(["You try a few code combinations, but nothing works. Better come back when you have the 4 digit code."]);
        }
        return new TextActionResult(["You better examine it first. You never know what could happen."]);

    }
}
