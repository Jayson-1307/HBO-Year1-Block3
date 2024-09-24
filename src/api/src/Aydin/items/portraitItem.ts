import { Interact, InteractionActionAlias } from "../actions/InteractAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

export const portraitItemAlias: string = "portrait";
let examined: boolean = false;
export class portraitItem extends Item implements Examine, Interact {
    public constructor() {
        super(portraitItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    public name(): string {
        return "Portrait";
    }

    public interact(): ActionResult | undefined {
        if (examined) {
            return new TextActionResult(["Portrait of Hades."]);
        }
        return new TextActionResult([
            "there seems to be nothing special about it, but maybe you should examine it first.",
        ]);
    }

    public examine(): ActionResult | undefined {
        examined = true;
        return new TextActionResult(["Portrait."]);
    }
}
