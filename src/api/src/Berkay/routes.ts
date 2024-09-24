import { ActionResult } from "../base/actionResults/ActionResult";
import { ExamineActionAlias, ExamineAction } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { ConsumeActionAlias, ConsumeAction } from "./actions/ConsumeAction";
import { ExampleActionAlias, ExampleAction } from "./actions/ExampleAction";
import { InteractionActionAlias, InteractionAction } from "./actions/InteractAction";
import { PickupActionAlias, PickupAction } from "./actions/PickupAction";

export function HandleRoutes(
    _room: Room,
    alias: string,
    gameObjects: GameObject[]
): ActionResult | undefined {
    switch (alias) {
        case ExamineActionAlias:
            return ExamineAction.handle(gameObjects[0]);

        case ExampleActionAlias:
            return ExampleAction.handle(gameObjects[0]);

        case PickupActionAlias:
            return PickupAction.handle(gameObjects[0]);

        case InteractionActionAlias:
            return InteractionAction.handle(gameObjects[0]);
        case ConsumeActionAlias:
            const currentPlayerSession: PlayerSession = getPlayerSession();
            return ConsumeAction.handle(gameObjects[0], currentPlayerSession.currentHP);
    }
    return undefined;
}
