import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";



export const PickupActionAlias: string = "Pickup";
export interface Pickup {
    Pickup(): ActionResult | undefined;
}
export class PickupAction extends Action {
    public constructor() {
        super(PickupActionAlias, "Pickup", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, PickupActionAlias)) {
            return castTo<Pickup>(gameObject).Pickup();
        }

        return undefined;
    }
}