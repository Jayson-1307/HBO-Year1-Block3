import { ActionResult } from "../../base/actionResults/ActionResult";
import { GameObject } from "../../base/gameObjects/GameObject";
import { implementsInterface, castTo } from "../../base/helpers";
import { Action } from "../../base/actions/Action";

/** Alias used to identify the Consume action and interface */
export const ConsumeActionAlias: string = "consume";

/**
 * Interface for GameObjects that need to support the Consume action
 */
export interface Consume {
    /**
     * Execute the Consume action
     *
     * @returns Result of the Consume action
     */
    consume(currentHP: number): ActionResult | undefined;
}

/**
 * Class used to represent the Consume action
 */
export class ConsumeAction extends Action {
    /**
     * Create a new instance of the Consume action
     */
    public constructor() {
        super(ConsumeActionAlias, "Consume", true);
    }

    /**
     * Handle the Consume action
     *
     * @param gameObject Reference to the GameObject on which the Consume action should be executed
     * @param currentHP Current HP of the player
     *
     * @returns Result of the action
     */
    public static handle(gameObject: GameObject, currentHP: number): ActionResult | undefined {
        if (implementsInterface(gameObject, ConsumeActionAlias)) {
            const result: any = castTo<Consume>(gameObject).consume(currentHP);
            if (result && result.hpChange) {
                const newHP: any = Math.min(Math.max(currentHP + result.hpChange, 0), 10);
                return { ...result, hpChange: newHP - currentHP };
            }
            return result;
        }
        return undefined;
    }
}
