import { ActionResult } from "../../base/actionResults/ActionResult";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

export const InteractionActionAlias: string = "interact";

export interface Interact {
    interact(): ActionResult | undefined;
}

export class InteractionAction extends Action {
    public constructor() {
        super(InteractionActionAlias, "interact", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, InteractionActionAlias)) {
            return castTo<Interact>(gameObject).interact();
        }

        return undefined;
    }
}