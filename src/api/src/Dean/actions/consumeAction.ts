import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const ConsumeActionAlias: string = "consume";

export interface Consume {
    consume(currentHP: number): ActionResult | undefined;
}

export class ConsumeAction extends Action {
    public constructor() {
        super(ConsumeActionAlias, "Consume", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, ConsumeActionAlias)) {
            const playerSession: PlayerSession = getPlayerSession();
            return castTo<Consume>(gameObject).consume(playerSession.currentHP);
        }

        return undefined;
    }
}