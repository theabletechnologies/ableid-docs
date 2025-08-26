import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/ableid-docs/',
    component: ComponentCreator('/ableid-docs/', '1a4'),
    exact: true
  },
  {
    path: '/ableid-docs/',
    component: ComponentCreator('/ableid-docs/', '0e6'),
    routes: [
      {
        path: '/ableid-docs/',
        component: ComponentCreator('/ableid-docs/', 'f25'),
        routes: [
          {
            path: '/ableid-docs/',
            component: ComponentCreator('/ableid-docs/', '498'),
            routes: [
              {
                path: '/ableid-docs/ableid',
                component: ComponentCreator('/ableid-docs/ableid', '2e1'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/ableid-docs/ablepay',
                component: ComponentCreator('/ableid-docs/ablepay', '6ce'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/ableid-docs/android-sdk',
                component: ComponentCreator('/ableid-docs/android-sdk', 'ea3'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/ableid-docs/errors',
                component: ComponentCreator('/ableid-docs/errors', 'cfe'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/ableid-docs/home',
                component: ComponentCreator('/ableid-docs/home', '1d2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/ableid-docs/hooks',
                component: ComponentCreator('/ableid-docs/hooks', 'aa9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/ableid-docs/ios-sdk',
                component: ComponentCreator('/ableid-docs/ios-sdk', 'bdc'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/ableid-docs/methods',
                component: ComponentCreator('/ableid-docs/methods', '3d6'),
                exact: true
              },
              {
                path: '/ableid-docs/p2p',
                component: ComponentCreator('/ableid-docs/p2p', '37e'),
                exact: true,
                sidebar: "docs"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
