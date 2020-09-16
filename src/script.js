(() => {
    const CONFIG = JSON.parse(document.getElementById('config').innerText);
    const STATES = CONFIG.states;
    const GLOBAL_ACTIONS = CONFIG.globalActions;
    const HISTORY = [];
    const STATE_ENTRIES = {
        init: () => {
            const repeat = (value, times) => {
                return Array.from({ length: times }).fill().map(() => value).join('');
            };

            let progress = 0;
            let interval = setInterval(() => {
                render({
                    title: 'Loading',
                    content: [
                        `[${repeat('#', progress)}${repeat('=', 10 - progress)}]`,
                    ],
                    actions: [],
                    options: {
                        disableActions: true
                    },
                });

                if (progress === 10) {
                    clearInterval(interval);
                    nextState('home');
                } else {
                    progress += 1;
                }
            }, 200);
        },
        cheatCode: () => {
            const cheatCode = window.prompt('Enter a cheat code', '');

            switch (cheatCode) {
                case 'hide': nextState('hiddenRoom'); break;
                default: nextState(HISTORY[1]); break;
            }
        },
    };

    const handleInput = (input) => {
        const currentState = STATES[HISTORY[0]];
        const skipActions = currentState && currentState.options && currentState.options.disableActions;
        const globalAction = GLOBAL_ACTIONS.find(x => x.inputs.includes(input));
        const localAction = currentState.actions.find(x => x.inputs.includes(input));
        const action = globalAction || localAction;

        if (skipActions) {
            console.log(`INPUT_IGNORED`);
        } else if (action) {
            nextState(action.next);
        } else {
            console.log(`BAD_INPUT [${input}]`);
        }
    };

    const nextState = (stateName) => {
        if (STATES[stateName]) {
            HISTORY.unshift(stateName);

            const currentState = STATES[HISTORY[0]];

            if (STATE_ENTRIES[stateName]) {
                STATE_ENTRIES[stateName]();
            }

            render(currentState);
        } else {
            console.log(`BAD_STATE [${stateName}]`);
        }
    };

    const render = (state) => {
        const localActions = state.actions.map(x => x.label).filter(x => x.length > 0);
        const globalActions = GLOBAL_ACTIONS.map(x => x.label).filter(x => {
            const exclude = state.options && state.options.disableActions;
            return exclude ? false : x.length > 0;
        });

        document.getElementById('screen').innerHTML = [
            state.title,
            state.content.join('\n\n'),
            localActions.join('\n\n'),
            globalActions.join('\n\n'),
        ].filter(x => x.length > 0).join('\n\n----------\n\n');
    };

    nextState(CONFIG.initialState);

    document.addEventListener('keyup', (event) => handleInput(event.key.toUpperCase()));
})();