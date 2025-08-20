import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'AbleID',
    tagline: 'Документация AbleID',
    favicon: 'img/favicon.ico',

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    organizationName: 'theabletechnologies',
    projectName: 'ableid-docs',
    url: 'https://theabletechnologies.github.io',
    baseUrl: '/ableid-docs/',

    i18n: {
        defaultLocale: 'ru',
        locales: ['ru'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/',
                    sidebarPath: './sidebars.js',
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],
    trailingSlash: false,

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'AbleID',
                logo: {
                    alt: 'AbleID Logo',
                    src: 'img/logo.png',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'docs',
                        position: 'left',
                        label: 'Документация',
                    },
                ],
            },
            footer: {
                style: 'dark',
                copyright: `Copyright © ${new Date().getFullYear()} AbleID`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),
};

export default config;
