const SYMBOLS = {
    // - http://xahlee.info/comp/unicode_arrows.html
    // - https://www.w3schools.com/charsets/ref_utf_misc_symbols.asp
}

const STATES = {
    home: {
        title: `Text Interface`,
        content: [
            `Welcome to Text Interface. This site is designed to function like an old text-based strategy game.`,
            `Below you will find two lists of actions you can take; the first will change based on which screen you're viewing and the second displays options that are available on all screens.`,
            `The symbol in brackets indicates which key you must press to select the action.`,
        ],
        enter: () => {},
        actions: [
            {
                triggers: ['L'],
                label: `[L] Go left.`,
                next: 'left',
            },
            {
                triggers: ['R'],
                label: `[R] Go right.`,
                next: 'right',
            },
        ],
    },
    left: {
        title: `Left`,
        content: [`You have gone left.`],
        enter: () => {},
        actions: [],
    },
    right: {
        title: `Right`,
        content: [`You have gone right.`],
        enter: () => {},
        actions: [],
    },
    hiddenRoom: {
        title: `Hidden Room`,
        content: [`You found the hidden room!`],
        enter: () => {},
        actions: [],
    },
    cheatCode: {
        title: `Cheat Code`,
        content: [],
        enter: () => {
            const cheatCode = window.prompt('Enter a cheat code', '');

            switch (cheatCode) {
                case 'hide': nextState('hiddenRoom'); break;
                default: nextState(HISTORY[1]); break;
            }
        },
        actions: [],
    },
};

const GLOBAL_ACTIONS = [
    {
        triggers: ['H'],
        label: `[H] Home`,
        next: 'home',
    },
    {
        triggers: ['*'],
        label: '',
        next: 'cheatCode',
    }
];

const HISTORY = [];

const handleInput = (input) => {
    const globalAction = GLOBAL_ACTIONS.find(x => x.triggers.includes(input));
    const localAction = STATES[HISTORY[0]].actions.find(x => x.triggers.includes(input));
    const action = globalAction || localAction;

    if (action) {
        nextState(action.next);
    } else {
        console.log(`BAD_INPUT [${input}]`);
    }
};

const nextState = (stateName) => {
    if (STATES[stateName]) {
        HISTORY.unshift(stateName);

        const currentState = STATES[HISTORY[0]];

        render(currentState);

        currentState.enter();
    } else {
        console.log(`BAD_STATE [${stateName}]`);
    }
};

const render = (state) => {
    const localActions = state.actions.map(x => x.label).filter(x => x.length > 0);
    const globalActions = GLOBAL_ACTIONS.map(x => x.label).filter(x => x.length > 0);

    document.getElementById('screen').innerHTML = [
        state.title,
        state.content.join('\n\n'),
        localActions.join('\n\n'),
        globalActions.join('\n\n'),
    ].filter(x => x.length > 0).join('\n\n----------\n\n');
};

(() => {
    nextState('home');

    document.addEventListener('keyup', (event) => handleInput(event.key.toUpperCase()));
})();