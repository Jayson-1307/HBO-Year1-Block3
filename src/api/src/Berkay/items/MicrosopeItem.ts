import { Interact, InteractionActionAlias } from "../actions/InteractAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

export const MicroscopeItemAlias: string = "microscope";

let examined: boolean = false;
export class MicroscopeItem extends Item implements Examine, Interact {
    public constructor() {
        super(MicroscopeItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    public name(): string {
        return "Microscope";
    }

    public examine(): ActionResult | undefined {
        examined = true;
        return new TextActionResult([
            "The aged microscope stands as a testament to bygone scientific exploration, its metal frame worn but sturdy. Despite the passage of time, its lens still holds the promise of revealing hidden marvels.",
        ]);
    }

    public interact(): ActionResult | undefined {
        if (examined) {
            return new TextActionResult([
                "You look through the microscope and see an object of the crime scene, weirdly it has only your fingerprints on it.",
            ]);
        }
        return new TextActionResult([
            "You should examine the microscope first to know what you're looking at.",
        ]);
    }
}
