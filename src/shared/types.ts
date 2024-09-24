export type GameState = {
    roomAlias: string;
    roomTitle: string;
    roomImages: string[];
    characterImages: string[];
    text: string[];
    actions: ActionReference[];
    objects: GameObjectReference[];
    images: string[];
};

export type GameObjectReference = {
    alias: string;
    name: string;
};

export type ActionReference = {
    alias: string;
    label: string;
    needsObject: boolean;
};

export type PerformActionRequest = {
    action: string;
    objects?: string[];
};
