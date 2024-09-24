import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { Interact, InteractionActionAlias } from "../actions/InteractAction";


export const XenoniphageFlaskItemAlias: string = "Xenoniphage flask";

export class XenoniphageFlaskItem extends Item implements Examine, Interact {

    public constructor() {
        super(XenoniphageFlaskItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    public name(): string {
        return "Xenoniphage flask";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The flask has a label on it. It says 'Xenoniphage'"]);
    }
    public interact(): ActionResult | undefined {
        return new TextActionResult([
            "You open the flask of xenoniphage but the smell is so good, but you close it immediately. Maybe you need it sometime in the future?",
        ]);
    }
}
