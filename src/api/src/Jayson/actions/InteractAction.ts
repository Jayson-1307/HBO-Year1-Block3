import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

/**
 * Represents the alias for interaction actions
 */
export const InteractionActionAlias: string = "interact";

/**
 * Represents the interface for objects that can be interacted with
 */
export interface Interact {
    /**
     * Handles the interaction with the object
     * @returns The result of the interaction
     */
    interact(): ActionResult | undefined;
}

/**
 * Represents an interaction action
 */
export class InteractionAction extends Action {
    /**
     * Constructs an InteractionAction
     */
    public constructor() {
        super(InteractionActionAlias, "interact", true);
    }

    /**
     * Handles the interaction action for a game object
     * @param gameObject The game object to interact with
     * @returns The result of the interaction
     */
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, InteractionActionAlias)) {
            return castTo<Interact>(gameObject).interact();
        }

        return undefined;
    }
}
