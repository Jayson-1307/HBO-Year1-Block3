import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { Interact, InteractionActionAlias } from "../actions/interactAction";

export const thirdCodeFragmentItemAlias: string = "third-code-fragment";

export class ThirdCodeFragmentItem extends Item implements Examine, Interact {
    public constructor() { 
        super(thirdCodeFragmentItemAlias, InteractionActionAlias, ExamineActionAlias);
    }

    public name(): string {
        return "6";
    }
    
    public examine(): ActionResult | undefined {
        return new TextActionResult(["You just got a key fragment this could be used for something..."]);
    }
    
    public interact(): ActionResult | undefined {
        return new TextActionResult(["You cannot interact with it just yet..."]);
    }

}