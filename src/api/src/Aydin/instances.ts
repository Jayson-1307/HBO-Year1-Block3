import { Room } from "../base/gameObjects/Room";
import { Diningroom, DiningroomAlias } from "./rooms/diningRoom";

export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {
        case DiningroomAlias:
            return new Diningroom();
    }

    return undefined;
}