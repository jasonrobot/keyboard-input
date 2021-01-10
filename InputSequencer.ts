import { createStore } from 'redux';

import {
    BinaryKeyCodes,
    mapping
} from './KeyMapping';

// 1, 2, 3, 4, c, v
// 8, 9, 0, -, n, m

const keyCodeToInternalCodeMapping: {[key:number]: number} = {
    // a
    65: 128,
    // s
    83: 64,
    // d
    68: 32,
    // f
    70: 16,
    // j
    74: 8,
    // k
    75: 4,
    // l
    76: 2,
    // ;
    59: 1
}

type MappingEntry = {
    [key: number]: string | MappingEntry
}

export class InputSequencer {
    keysPressed : Set<BinaryKeyCodes>;
    keyMapping : MappingEntry;
    currentMap : MappingEntry;
    inputCallback: (input: string) => any;
    isMaybeChord: boolean = false;

    constructor (inputCallback : (input: string) => any) {
        this.inputCallback = inputCallback;

        this.keysPressed = new Set();
        this.keyMapping = mapping;

        this.currentMap = this.keyMapping;
    }

    resetState() {
        this.currentMap = this.keyMapping;
        this.isMaybeChord = false;
        this.keysPressed.clear();
    }

    // isMaybeChord() {
    //     return Object.keys(this.currentMap).some((key: string) => {
    //         const pk = parseInt(key);
    //         return (this.getCurrentChord() & pk) !== 0;
    //     });
    // }

    checkForChord() {
        this.isMaybeChord = Object.keys(this.currentMap)
        // get all keys that contain our input.
            .filter((key: string) => (this.getCurrentChord() & parseInt(key)) !== 0)
            .length > 1;
    }

    getCurrentChord() : number {
        return [...this.keysPressed].reduce((acc, n) => acc | n, 0);
    }

    handleKeyDown({keyCode}: KeyboardEvent) {
        this.keysPressed.add(keyCodeToInternalCodeMapping[keyCode]);
        this.checkForChord();
        if (this.isMaybeChord) {
            // if this might be a chord, wait till keyup to decide what to do.
            return;
        }

        const selectedMap = this.currentMap[this.getCurrentChord()];
        if (typeof selectedMap === 'string') {
            this.inputCallback(selectedMap);
            this.resetState();
        } else if (typeof selectedMap === 'object') {
            this.currentMap = selectedMap;
            this.keysPressed.delete(keyCodeToInternalCodeMapping[keyCode])
            console.log(`current map is: ${JSON.stringify(this.currentMap)}`);
        } else {
            // do nothing I guess
        }
    }

    handleKeyUp({keyCode}: KeyboardEvent) {
        // if we were in a potential chord state, check if we should register an input now.
        if (this.isMaybeChord) {
            // that last chord had multiple options
            const selectedMap = this.currentMap[this.getCurrentChord()];
            if (typeof selectedMap === 'string') {
                this.inputCallback(selectedMap);
                this.resetState();
            } else if (typeof selectedMap === 'object') {
                this.currentMap = selectedMap;
                console.log(`current map is: ${JSON.stringify(this.currentMap)}`);
            } else {
                // do nothing I guess
            }
        }
        this.keysPressed.delete(keyCodeToInternalCodeMapping[keyCode]);
        this.checkForChord();
    }
}
