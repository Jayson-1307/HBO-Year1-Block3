export type PlayerSession = {
    // General
    currentRoom: string;
    currentCharacter: string;
    inventory: string[];
    currentHP: number;
    isAlive: boolean;

    // Room specific
    pickedUpFlashlight: boolean;
    pickedUpPocketsquare: boolean;
    pickedUpKnife: boolean;
    completedEdwardsRiddle: boolean;
    pickedUpFlaskOpener: boolean;
    pickedUpFlask: boolean;
    pickedUpcutlery: boolean;
    pickedUpbread: boolean;
    pickedUpWelshite: boolean;
    pickedUpPikachurin: boolean;
    pickedUpMispickel: boolean;
    interactedMixer: boolean;
    interactedFlask: boolean;
    mixerWrong: number;
    talkedToAlbert: boolean;
    pickedUpXenoniphage: boolean;
    pickedUpSucrose: boolean;
    pickedUpSoup: any;

    // Keys
    pickedUpLibraryKey: boolean;
    pickedUpLaboratoryKey: boolean;
    pickedUpEntranceKey: boolean;
    pickedUpDiningRoomKey: boolean;

    // Codes
    firstCodeFragment: boolean;
    secondCodeFragment: boolean;
    thirdCodeFragment: boolean;
    pickedUpFourthCodeFragment: boolean;
    collectedAllCodeFragments: boolean;

    // Vault
    vaultOpened: boolean;
    pickedUpFolder: boolean;
    folderInteractions: number;
    suicide: boolean;
    turnedIn: boolean;
};
