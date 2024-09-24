import { Interact, InteractionActionAlias } from "../actions/InteractAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";

export const MixerItemAlias: string = "mixer";

let examined: boolean = false;

export class MixerItem extends Item implements Examine, Interact {
    public constructor() {
        super(MixerItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    public name(): string {
        return "Mixer";
    }

    public examine(): ActionResult | undefined {
        examined = true;
        const playerSession: PlayerSession = getPlayerSession();
        if (!playerSession.interactedMixer) {
            playerSession.interactedMixer = true;
            return new TextActionResult([
                "The mixer hums softly, its well-worn exterior hinting at years of concocting alchemical blends. With its simple design, it promises to transform two ingredients into something greater, embodying the essence of creation and invention.",
            ]);
        } else {
            return new TextActionResult([
                "The mixer hums softly, its well-worn exterior hinting at years of concocting alchemical blends. With its simple design, it promises to transform two ingredients into something greater, embodying the essence of creation and invention. Maybe you should ask Dr. Kurt about it?",
            ]);
        }
    }

    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (examined) {
            playerSession.interactedMixer = true;
            return new TextActionResult(["The mixer doesn't seem to work"]);
        }
        return new TextActionResult(["You should examine the mixer first to know if it's safe to use."]);
    }
}
