import { Interact, InteractionActionAlias } from "../actions/InteractAction";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Consume, ConsumeActionAlias } from "../actions/ConsumeAction";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { combineCodeFragments, decreaseHP, getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { CodeItemAlias } from "./CodeItem";

export const FlaskItemAlias: string = "flask";
export class FlaskItem extends Item implements Examine, Interact, Consume {
    public constructor() {
        super(FlaskItemAlias, ExamineActionAlias, InteractionActionAlias, ConsumeActionAlias);
    }

    public name(): string {
        return "Flask";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (!playerSession.interactedFlask === true) {
            playerSession.interactedFlask = true;
            return new TextActionResult([
                "You looked at a flask it looks like there is a weird fluid in it and another item inside the fluid, but it doesn't look like you can open the flask.",
            ]);
        } else {
            return new TextActionResult([
                "You looked at a flask it looks like there is a weird fluid in it and another item inside the fluid, but it doesn't look like you can open the flask. Maybe you can ask Dr. Kurt about it?",
            ]);
        }
    }
    public interact(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.pickedUpFlaskOpener && !playerSession.pickedUpFlask) {
            playerSession.inventory.push(FlaskItemAlias);

            const removeFlaskOpener: number = playerSession.inventory.indexOf("flaskopener");
            if (removeFlaskOpener !== -1) {
                playerSession.inventory.splice(removeFlaskOpener, 1);
            }
            playerSession.pickedUpFlask = true;
            return new TextActionResult(["you picked up and opened the flask"]);
        } else if (!playerSession.interactedFlask === true) {
            playerSession.interactedFlask = true;
            return new TextActionResult(["You cannot seem to open the flask"]);
        } else if (playerSession.pickedUpFlask) {
            return new TextActionResult([
                "It looks like there is an object in there maybe you should drink it to get the object inside?",
            ]);
        } else {
            return new TextActionResult([
                "You cannot seem to open the flask. Maybe you should ask Dr. Kurt about it?",
            ]);
        }
    }

    public consume(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (
            !playerSession.pickedUpFourthCodeFragment &&
            playerSession.pickedUpFlask
        ) {
            decreaseHP(2);
            const currentHP: number = playerSession.currentHP;

            if (playerSession.isAlive) {
                playerSession.inventory.push(CodeItemAlias);
                playerSession.pickedUpFourthCodeFragment = true;
                combineCodeFragments();
                return new TextActionResult([
                    `You consumed the contents of the flask and took some damage. Your current HP is now ${currentHP}, 
                    but you found a piece of a code on the bottom of the flask.`,
                ]);
            }

            return new TextActionResult(["You died."]);
           
        } else if (
            playerSession.pickedUpFourthCodeFragment &&
            playerSession.isAlive &&
            playerSession.pickedUpFlask
        ) {
            return new TextActionResult(["The flask is empty now there is nothing to consume"]);
        } 
        return undefined;
    }
}
