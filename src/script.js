const SCREENS = [
    {
        name: 'main menu',
        content: [
            'MAIN MENU',
            '',
            'Press [M] at any time to return to Main Menu',
            '',
            '[1] Go left.',
            '',
            '[2] Go right.',
        ],
        actions: {
            Digit1: () => navigateTo('left'),
            Numpad1: () => navigateTo('left'),
            Digit2: () => navigateTo('right'),
            Numpad2: () => navigateTo('right'),
        },
    },
    {
        name: 'left',
        content: [
            'LEFT',
            '',
            'You have gone left.'
        ],
        actions: {},
    },
    {
        name: 'right',
        content: [
            'RIGHT',
            '',
            'You have gone right.'
        ],
        actions: {},
    }
];

const STATE = {
    currentScreen: null,
};

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
        console.log(`Rendering [${STATE.currentScreen.name}]`);

        domNode.innerText = screen.content.join('\n');
    }
};

const handleGlobalInput = (event) => {
    switch (event.code) {
        case 'KeyM': navigateTo('main menu'); return true;

        default: return false;
    }
};

const handleScreenInput = (event) => {
    const screen = STATE.currentScreen;

    if (screen && screen.actions[event.code]) {
        screen.actions[event.code]();

        return true;
    } else {
        console.log(`Unrecognized Input [${event.code}]`);

        return false;
    }
};

(() => {
    document.addEventListener('keyup', (event) => {
        return handleGlobalInput(event) || handleScreenInput(event);
    });

    navigateTo('main menu');
})();