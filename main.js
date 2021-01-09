const codes = [
    65, //a
    83, //s
    68, //d
    70, //f
    74, //j
    75, //k
    76, //l
    59, //;
];

const flagToCode = Object.fromEntries([
    ...codes.map( (code, i) => {
        return [2**i, code];
    }),
]);

const codeToFlag = Object.fromEntries([
    ...codes.map( (code, i) => {
        return [code, 2**i];
    }),
]);

function getKeyFlags(keysList) {
    return keysList
        .map(key => codeToFlag[key])
        .reduce((acc, n) => acc | n, 0);
}


// E 	11.1607% 	56.88 	M 	3.0129% 	15.36
// A 	8.4966% 	43.31 	H 	3.0034% 	15.31
// R 	7.5809% 	38.64 	G 	2.4705% 	12.59
// I 	7.5448% 	38.45 	B 	2.0720% 	10.56
// O 	7.1635% 	36.51 	F 	1.8121% 	9.24
// T 	6.9509% 	35.43 	Y 	1.7779% 	9.06
// N 	6.6544% 	33.92 	W 	1.2899% 	6.57
// S 	5.7351% 	29.23 	K 	1.1016% 	5.61
// L 	5.4893% 	27.98 	V 	1.0074% 	5.13
// C 	4.5388% 	23.13 	X 	0.2902% 	1.48
// U 	3.6308% 	18.51 	Z 	0.2722% 	1.39
// D 	3.3844% 	17.25 	J 	0.1965% 	1.00
// P 	3.1671% 	16.14 	Q 	0.1962% 	(1)

const mapping = new Map();
mapping.set(0b0001_0000, 'e');
mapping.set(0b0000_1000, 'a');
mapping.set(0b0010_0000, 'r');
mapping.set(0b0000_0100, 'i');
mapping.set(0b0100_0000, 'o');
mapping.set(0b0000_0010, 't');
mapping.set(0b1000_0000, 'n');
mapping.set(0b0000_0001, 's');
mapping.set(0b0011_0000, 'l');
mapping.set(0b0000_1100, 'c');
mapping.set(0b0110_0000, 'u');
mapping.set(0b0000_0110, 'd');
mapping.set(0b0101_0000, 'p');

mapping.set(0b0000_1010, 'n');
mapping.set(0b0, 'h');
mapping.set(0b0, 'g');
mapping.set(0b0, 'b');
mapping.set(0b0, 'f');
mapping.set(0b0, 'y');
mapping.set(0b0, 'w');
mapping.set(0b0, 'k');
mapping.set(0b0, 'v');
mapping.set(0b0, 'x');
mapping.set(0b0, 'z');
mapping.set(0b0, 'j');
mapping.set(0b0, 'q');

// vaguely binary on the right hand
// with left pinky to activate
mapping.set(0b0001_0001, '1');
mapping.set(0b0010_0001, '2');
mapping.set(0b0011_0001, '3');
mapping.set(0b0100_0001, '4');
mapping.set(0b0101_0001, '5');
mapping.set(0b0110_0001, '6');
mapping.set(0b0111_0001, '7');
mapping.set(0b1000_0001, '8');
mapping.set(0b1001_0001, '9');
mapping.set(0b1111_0001, '0');

mapping.set(0, '!');
mapping.set(0, '@');
mapping.set(0, '#');
mapping.set(0, '$');
mapping.set(0, '%');
mapping.set(0, '^');
mapping.set(0, '&');
mapping.set(0, '*');

// parens
// xxx- x---, xxx- -x--
// xxx- x---, xxx- -x--
// xxx- x---, xxx- -x--
// xxx- x---, xxx- -x--
mapping.set(0b0001_0111, '(');
mapping.set(0b0010_0111, ')');
mapping.set(0b0100_0111, '<');
mapping.set(0b1000_0111, '>');
mapping.set(0b0001_1111, '[');
mapping.set(0b0010_1111, ']');
mapping.set(0b0100_1111, '{');
mapping.set(0b1000_1111, '}');

// There should be two additional keys for the thumbs:
// 01 SPACE
// 10 BACKSPACE
// 11 RETURN


const pressedKeys = new Set();

function updateKeysPressed() {
    const pressedKeysArray = [...pressedKeys];
    const keysNode = document.querySelector('#keys');
    keysNode.textContent = pressedKeysArray.join(' ');

    const keyFlags = getKeyFlags(pressedKeysArray);
    const keyFlagsNode = document.querySelector('#flags');
    keyFlagsNode.textContent = keyFlags;

    const mappingNode = document.querySelector('#mapped');
    mappingNode.textContent = mapping.get(keyFlags);
}

codes.forEach( code => {
    const container = document.createElement('div');
    container.appendChild(document.createTextNode(`${code}: `));
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', `checkbox${code}`);
    container.appendChild(input);

    document.querySelector('#checkboxes')?.appendChild(container);
});

const keyCodeToIndex = Object.fromEntries(codes.map((code, i) => [code, i]));

// const sequenceCodes = {
//     //a
//     // 65: {},
//     //s
//     // 83: {},
//     //d
//     // 68: {},
//     //f
//     70: {
//         65: 'p',
//         83: 'l',
//         68: 'o',
//         70: 'e',
//         74: 'r',
//         75: 'n',
//         76: 'u',
//         59: 'h',
//     },
//     //j
//     // 74: {},
//     //k
//     // 75: {},
//     //l
//     // 76: {},
//     //;
//     // 59: {},
// };
const sequenceCodes = [
    //a
    ['<', '>', '{', '}', '(', ')', '[', ']'],
    //s
    ['@', '#', '$', '%', '^', '&', '*'],
    //d
    ['"', 'j', 'k', 'b', 'y', 'x'],
    //f
    ['p','l','o','e','r','n','u','h'],
    //j
    ['m', 'c', 't', 'a', 'i', 's', 'd', 'g'],
    //k
    ['\'', 'q', 'v', 'f', 'w', 'z', ':', ';'],
    //l
    ['1', '2', '3', '4', '5', '+', '-', '='],
    //;
    ['6', '7', '8', '9', '0', '_'],
];

const sequenceCodeDisplay = [
    `a: ${sequenceCodes[0].join(' ')}`,
    `s: ${sequenceCodes[1].join(' ')}`,
    `d: ${sequenceCodes[2].join(' ')}`,
    `f: ${sequenceCodes[3].join(' ')}`,
    `j: ${sequenceCodes[4].join(' ')}`,
    `k: ${sequenceCodes[5].join(' ')}`,
    `l: ${sequenceCodes[6].join(' ')}`,
    `;: ${sequenceCodes[7].join(' ')}`,
].join('<br/>');

document.querySelector('#sequenceKey').innerHTML = sequenceCodeDisplay;

class SequenceInput {
    constructor(outputHandler) {
        this.outputHandler = outputHandler;
        this.rootLayer = sequenceCodes;
        this.layer = this.rootLayer;
    }

    input(keyCode) {
        const nextLayer = this.layer[keyCodeToIndex[keyCode]];

        if ( nextLayer === undefined ) {
            return;
        }

        if (typeof nextLayer !== 'object') {
            // unless it maps to layer
            // select root layer
            this.layer = this.rootLayer;
            // send output
            this.outputHandler(nextLayer);
        } else {
            // select new layer
            this.layer = nextLayer;
        }
    }
}

function sequenceOutputHandler(output) {
    const sequenceOutputNode = document.querySelector('#sequence-area');
    sequenceOutputNode.value = sequenceOutputNode.value + output;

}

// listeners that actually update things

window.addEventListener('keydown', ({keyCode: code}) => {
    pressedKeys.add(code);
    document.querySelector(`#checkbox${code}`)?.setAttribute('checked', 'checked');
    updateKeysPressed();
});

const theSequenceInput = new SequenceInput(sequenceOutputHandler);

window.addEventListener('keyup', ({keyCode: code}) => {
    pressedKeys.delete(code);
    document.querySelector(`#checkbox${code}`)?.removeAttribute('checked');
    updateKeysPressed();
    theSequenceInput.input(code);
});

