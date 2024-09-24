import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Interact, InteractionActionAlias } from "../actions/InteractAction";
import { MispickelFlaskItemAlias } from "./MispickelFlaskItem";
import { PikachurinFlaskItemAlias } from "./PikachurinFlaskItem";
import { WelshiteFlaskItemAlias } from "./WelshiteFlaskItem";

export const ResearchTableItemAlias: string = "research table";
export class ResearchTableItem extends Item implements Examine, Interact {
    public constructor() {
        super(ResearchTableItemAlias, ExamineActionAlias, InteractionActionAlias);
    }

    public name(): string {
        return "Research table";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It looks like a really old research table, but it looks like there are still some flasks with liquid in it",
        ]);
    }
    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.inventory.push(
            MispickelFlaskItemAlias,
            PikachurinFlaskItemAlias,
            WelshiteFlaskItemAlias
        );
        playerSession.pickedUpMispickel = true;
        playerSession.pickedUpPikachurin = true;
        playerSession.pickedUpWelshite = true;

        return new TextActionResult([
            "You picked up 3 flasks from the research table. one with welshite, one with pikachurin and one with mispickel",
        ]);
    }
}
