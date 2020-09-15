const SYMBOLS = {
    // - http://xahlee.info/comp/unicode_arrows.html
    // - https://www.w3schools.com/charsets/ref_utf_misc_symbols.asp
}

const SCREENS = [
    {
        name: 'main menu',
        content: [
            `Welcome to Text Interface. This site is designed to function like an old text-based strategy game.`,
            `Below you will find two lists of actions you can take; the first will change based on which screen you're viewing and the second displays options that are available on all screens.`,
            `The symbol in brackets indicates which key you must press to select the action.`,
        ],
        actions: [
            {
                keys: ['L', '4'],
                symbol: 'L',
                label: 'Go left.',
                invoke: () => navigateTo('left'),
            },
            {
                keys: ['R', '6'],
                symbol: 'R',
                label: 'Go right.',
                invoke: () => navigateTo('right'),
            },
            {
                keys: ['ARROWUP'],
                symbol: '',
                label: '',
                invoke: () => navigateTo('hidden room'),
            }
        ],
    },
    {
        name: 'left',
        content: [
            `You have gone left.`,
        ],
        actions: [],
    },
    {
        name: 'right',
        content: [
            `You have gone right.`,
        ],
        actions: [],
    },
    {
        name: 'hidden room',
        content: [
            `You found the hidden room!`,
        ],
        actions: [],
    }
];

const STATE = {
    currentScreen: null,
};

const GLOBAL_ACTIONS = [
    {
        keys: ['M'],
        symbol: 'M',
        label: 'Main Menu',
        invoke: () => navigateTo('main menu'),
    },
    {
        keys: ['*'],
        symbol: '',
        label: '',
        invoke: () => enterCheatCode(),
    }
];

const navigateTo = (screenName) => {
    const screen = SCREENS.find(x => x.name === screenName);

    if (screen) {
        STATE.currentScreen = screen;

        render();
    } else {
        console.log(`Unrecognized Screen [${screenName}]`);
    }
};

const render = () => {
    const domNode = document.getElementById('screen');
    const screen = STATE.currentScreen;

    if (screen) {
        const separator = '\n\n----------\n\n';

        const localActions = screen.actions.filter(x => x.symbol.length > 0).map(x => {
            return `[${x.symbol}] ${x.label}`;
        }).join('\n\n');

        const globalActions = GLOBAL_ACTIONS.filter(x => x.symbol.length > 0).map(x => {
            return `[${x.symbol}] ${x.label}`;
        }).join('\n\n');

        const content = [
            screen.name.toUpperCase(),
            screen.content.join('\n\n'),
            localActions.length ? localActions : '',
            globalActions,
        ];

        domNode.innerHTML = content.filter(x => x.length > 0).join(separator);
    }
};

const handleLocalInput = (input) => {
    const screen = STATE.currentScreen;

    if (screen) {
        const action = screen.actions.find(action => action.keys.includes(input));

        if (action) {
            action.invoke();

            return true;
        }
    }

    return false;
};

const handleGlobalInput = (input) => {
    switch (input) {
        case 'M': navigateTo('main menu'); return true;
        case '*': enterCheatCode(); return true;
    }

    return false;
};

const enterCheatCode = () => {
    const cheatCode = window.prompt('Enter a cheat code', '');

    switch (cheatCode) {
        case 'zach': navigateTo('hidden room'); break;
    }
};

(() => {
    document.addEventListener('keyup', (event) => {
        const key = event.key.toUpperCase();

        if (!(handleLocalInput(key) || handleGlobalInput(key))) {
            console.log(`Unrecognized Input [${key}]`);
        }
    });

    navigateTo('main menu');
})();