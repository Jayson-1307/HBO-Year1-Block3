import { ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

import { InteractionActionAlias } from "../actions/InteractAction";

export const EasterEggAlias: string = "Easter egg";

export class EasterEgg extends Item {
    public constructor() {
        super(EasterEggAlias, ExamineActionAlias, InteractionActionAlias);
    }

    public name(): string {
        return "Easter egg";
    }
}
