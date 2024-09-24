import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { Interact, InteractionActionAlias } from "../actions/InteractAction";
export const SucroseFlaskItemAlias: string = "welshite flask";
export class SucroseFlaskItem extends Item implements Examine, Interact {
    public constructor() {
        super(SucroseFlaskItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    public name(): string {
        return "Sucrose flask";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The flask has a label on it. It says 'Sucrose'. I think Albert in the dining room wants it",
        ]);
    }
    public interact(): ActionResult | undefined {
        return new TextActionResult([
            "You open the flask of pikachurin but the smell is too good so you close it immediately",
        ]);
    }
}
