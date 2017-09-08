
import Header from './../components/Header.vue';

//帮助
const Help = resolve => {
    require.ensure([], () => {
        resolve(require('./../components/help/Help.vue'));
    }, 'help');
}

const HelpComponent = resolve => {
    require.ensure([], () => {
        resolve(require('./../components/help/HelpComponent.vue'));
    }, 'help');
};

const Relieved = resolve => {
    require.ensure(['./../components/help/HelpComponent.vue'], () => {
        resolve(require('./../components/help/Relieved.vue'));
    }, 'help');
};

const Process = resolve => {
    require.ensure(['./../components/help/HelpComponent.vue'], () => {
        resolve(require('./../components/help/Process.vue'));
    }, 'help');
};

const Commodity = resolve => {
    require.ensure([], () => {
        resolve(require('./../components/help/commodity.vue'));
    }, 'help');
};

const Security = resolve => {
    require.ensure([], () => {
        resolve(require('./../components/help/security.vue'));
    }, 'help');
};

const Guarantee = resolve => {
    require.ensure([], () => {
        resolve(require('./../components/help/guarantee.vue'));
    }, 'help');
};

const Purchase = resolve => {
    require.ensure([], () => {
        resolve(require('./../components/help/purchase.vue'));
    }, 'help');
};

export const helpRoute =

{
    path: '/vue/help', components: {
    default: Help,
},
    children: [
        {
            path: '/vue/help/relieved',
            components: {
                default: Relieved,
                'help-header': Header,
            }
        },
        {
            path: '/vue/help/process',
            components: {
                default: Process,
                'help-header': Header,
            }
        },
        {
            path: '/vue/help/commodity',
            components: {
                default: Commodity
            }
        },
        {
            path: '/vue/help/security',
            components: {
                default: Security
            }
        },
        {
            path: '/vue/help/guarantee',
            components: {
                default: Guarantee
            }
        },
        {
            path: '/vue/help/purchase',
            components: {
                default: Purchase
            }
        },
    ],
    meta: {isPublish: true, requireAuth: false}
};
