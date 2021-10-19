/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Pure Gen',
  tagline: 'Pure gen',
  url: 'https://armindojr.github.io/',
  baseUrl: '/pure-gen/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo-solo.svg',
  organizationName: 'armindojr', // Usually your GitHub org/user name.
  projectName: 'pure-gen', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Pure Gen',
      logo: {
        alt: 'Pure Gen',
        src: 'img/logo-solo.svg',
      },
      items: [
        {
          href: 'https://github.com/armindojr/pure-gen',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Issues',
              href: 'https://github.com/armindojr/pure-gen/issues',
            },
            {
              label: 'Pull Requests',
              href: 'https://github.com/armindojr/pure-gen/pulls',
            },
          ],
        },
        {
          title: 'Legal',
          // Please do not remove the privacy and terms, it's a legal requirement.
          items: [
            {
              label: 'Privacy',
              href: 'https://opensource.facebook.com/legal/privacy/',
            },
            {
              label: 'Terms',
              href: 'https://opensource.facebook.com/legal/terms/',
            },
            {
              label: 'Data Policy',
              href: 'https://opensource.facebook.com/legal/data-policy/',
            },
            {
              label: 'Cookie Policy',
              href: 'https://opensource.facebook.com/legal/cookie-policy/',
            },
          ],
        },
      ],
      logo: {
        alt: 'Pure Gen Logo',
        src: 'img/logo-completo-hor.svg',
        href: 'https://github.com/armindojr/pure-gen',
      },
      // Please do not remove the credits, help to publicize Docusaurus :)
      copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/armindojr/pure-gen/edit/new-docs/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
