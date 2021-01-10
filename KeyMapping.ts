// const A = 128;
// const S = 64;
// const D = 32;
// const F = 16;
// const J = 8;
// const K = 4;
// const L = 2;
// const SC = 1;

export enum BinaryKeyCodes {
    A = 128,
    S = 64,
    D = 32,
    F = 16,
    J = 8,
    K = 4,
    L = 2,
    SC = 1,
}

const key = BinaryKeyCodes;

export const mapping = {
    [key.A]: {
        [key.A]: '',
        [key.S]: '',
        [key.D]: '',
        [key.F]: '',
        [key.J]: '',
        [key.K]: '',
        [key.L]: '',
        [key.SC]: 'j',
    },
    [key.S]: {
        [key.A]: '',
        [key.S]: '',
        [key.D]: '',
        [key.F]: '',
        [key.J]: 'f',
        [key.K]: 'w',
        [key.L]: 'v',
        [key.SC]: 'z',
    },
    [key.D]: {
        [key.A]: '',
        [key.S]: '',
        [key.D]: '',
        [key.F]: '',
        [key.J]: 'c',
        [key.K]: 'd',
        [key.L]: 'm',
        [key.SC]: 'g',

    },
    [key.F]: {
        [key.A]: '',
        [key.S]: '',
        [key.D]: '',
        [key.F]: '',
        [key.J]: 'a',
        [key.K]: 'i',
        [key.L]: 't',
        [key.SC]: 's',
    },
    [key.J]: {
        [key.A]: 'n',
        [key.S]: 'o',
        [key.D]: 'r',
        [key.F]: 'e',
        [key.J]: '',
        [key.K]: '',
        [key.L]: '',
        [key.SC]: '',
    },
    [key.K]: {
        [key.A]: 'h',
        [key.S]: 'p',
        [key.D]: 'u',
        [key.F]: 'l',
        [key.J]: '',
        [key.K]: '',
        [key.L]: '',
        [key.SC]: '',
    },
    [key.L]: {
        [key.A]: 'x',
        [key.S]: 'k',
        [key.D]: 'y',
        [key.F]: 'b',
        [key.J]: '',
        [key.K]: '',
        [key.L]: '',
        [key.SC]: '',
    },
    [key.SC]: {
        [key.A]: 'q',
        [key.S]: '',
        [key.D]: '',
        [key.F]: '',
        [key.J]: '',
        [key.K]: '',
        [key.L]: '',
        [key.SC]: '',
    },
}