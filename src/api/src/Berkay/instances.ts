import { Room } from "../base/gameObjects/Room";
import { LaboratoryAlias, Laboratory } from "./rooms/Laboratory";

export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {
        case LaboratoryAlias:
            return new Laboratory();
    }

    return undefined;
}
