import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { Interact, InteractionActionAlias } from "../actions/InteractAction";
export const PikachurinFlaskItemAlias: string = "pikachurin flask";
export class PikachurinFlaskItem extends Item implements Examine, Interact {
    public constructor() {
        super(PikachurinFlaskItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    public name(): string {
        return "Pikachurin flask";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The flask has a label on it. It says 'Pikachurin'"]);
    }
    public interact(): ActionResult | undefined {
        return new TextActionResult([
            "You open the flask of pikachurin but the smell is too good so you close it immediately",
        ]);
    }
}
