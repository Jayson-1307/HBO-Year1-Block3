import { Interact, InteractionActionAlias } from "../actions/InteractAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

export const chandelierItemAlias: string = "chandelier";
let examined: boolean = false;
export class chandelierItem extends Item implements Examine, Interact {
    public constructor() {
        super(chandelierItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    public name(): string {
        return "Chandelier";
    }

    public interact(): ActionResult | undefined {
        if (examined) {
            return new TextActionResult(["You cannot reach the chandelier."]);
        }
        return new TextActionResult(["Maybe you should examine it first."]);
    }

    public examine(): ActionResult | undefined {
        examined = true;
        return new TextActionResult([
            "A tiered cascade of crystals glitters overhead, catching the light and showering the room in a soft brilliance.",
            "I hope it does not fall on me, that would be so cliche.",
        ]);
    }
}
