import { Interact, InteractionActionAlias } from "../actions/interactAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

export const secondHadesStatueAlias: string = "secondHadesStatueAlias";
export let didExamine: boolean;

export class secondHadesStatueItem extends Item implements Examine, Interact{
    public constructor() {
        super(secondHadesStatueAlias, ExamineActionAlias, InteractionActionAlias);
    }
    
    public name(): string {
        return "secondHadesStatueAlias";
    }

    public examine(): ActionResult | undefined {
        didExamine = true;
        return new TextActionResult (["Try to interact with it!"]);
    }

    public interact(): ActionResult | undefined {
        return new TextActionResult (["You are holding the two statues together and u can see what the code is... AHAH it is a 6."]);
    }
}