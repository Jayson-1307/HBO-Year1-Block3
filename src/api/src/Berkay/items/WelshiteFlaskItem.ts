import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { Interact, InteractionActionAlias } from "../actions/InteractAction";
export const WelshiteFlaskItemAlias: string = "welshite flask";
export class WelshiteFlaskItem extends Item implements Examine, Interact {
    public constructor() {
        super(WelshiteFlaskItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    public name(): string {
        return "Welshite flask";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The flask has a label on it. It says 'Welshite'"]);
    }
    public interact(): ActionResult | undefined {
        return new TextActionResult([
            "You open the flask of welshite but the smell is horrendous so you close it immediately",
        ]);
    }
}
