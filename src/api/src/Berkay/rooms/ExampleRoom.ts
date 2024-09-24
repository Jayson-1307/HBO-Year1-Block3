import { Example, ExampleAction, ExampleActionAlias } from "../actions/ExampleAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { TalkAction } from "../../base/actions/TalkAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { ExampleCharacter } from "../characters/ExampleCharacter";
import { getGameObjectsFromInventory } from "../../instances";
// import { ExampleItem } from "../items/ExampleItem";

export const ExampleRoomAlias: string = "library-room";

export class ExampleRoom extends Room implements Example {
    public constructor() {
        super(ExampleRoomAlias, ExampleActionAlias);
    }

    public name(): string {
        return "library-room";
    }

    public images(): string[] {
        return ["example"];
    }

    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(), new ExampleAction()];
    }

    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems, new ExampleCharacter()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is an example room."]);
    }

    public example(): ActionResult | undefined {
        return new TextActionResult(["This is an example action executed on a room."]);
    }
}
