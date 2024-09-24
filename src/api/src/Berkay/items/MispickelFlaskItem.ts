import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { Interact, InteractionActionAlias } from "../actions/InteractAction";
export const MispickelFlaskItemAlias: string = "welshite flask";
export class MispickelFlaskItem extends Item implements Examine, Interact {
    public constructor() {
        super(MispickelFlaskItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    public name(): string {
        return "Mispickel flask";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The flask has a label on it. It says 'Mispickel'"]);
    }
    public interact(): ActionResult | undefined {
        return new TextActionResult([
            "You open the flask of mispickel but the smell is horrendous so you close it immediately",
        ]);
    }
}
