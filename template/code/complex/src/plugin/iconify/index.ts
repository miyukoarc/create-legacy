import { addCollection, Icon } from '@iconify/vue2';

/**
 * @description iconify offline usage
 * 图标从https://icon-sets.iconify.design/mdi添加
 */
addCollection({
  prefix: 'mdi',
  icons: {
    account: {
      body: '<path d="M11.5 14c4.142 0 7.5 1.567 7.5 3.5V20H4v-2.5c0-1.933 3.358-3.5 7.5-3.5zm6.5 3.5c0-1.38-2.91-2.5-6.5-2.5S5 16.12 5 17.5V19h13v-1.5zM11.5 5a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7zm0 1a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5z" fill="currentColor"/>',
    },
    home: {
      body: '<path d="M16 8.414l-4.5-4.5L4.414 11H6v8h3v-6h5v6h3v-8h1.586L17 9.414V6h-1v2.414zM2 12l9.5-9.5L15 6V5h3v4l3 3h-3v7.998h-5v-6h-3v6H5V12H2z" fill="currentColor"/>',
    },
    'clipboard-list-outline': {
      body: '<path fill="currentColor" d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 0c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1M7 7h10V5h2v14H5V5h2v2m5 10v-2h5v2h-5m0-6V9h5v2h-5m-4 1V9H7V8h2v4H8m1.25 2c.41 0 .75.34.75.75c0 .2-.08.39-.21.52L8.12 17H10v1H7v-.92L9 15H7v-1h2.25"/>',
    },
    'rocket-launch-outline': {
      body: '<path fill="currentColor" d="m13.13 22.19l-1.63-3.83c1.57-.58 3.04-1.36 4.4-2.27l-2.77 6.1M5.64 12.5l-3.83-1.63l6.1-2.77C7 9.46 6.22 10.93 5.64 12.5M19.22 4c.28 0 .53 0 .74.05c.17 1.39-.02 4.25-3.3 7.53c-1.7 1.71-3.73 3.02-6.01 3.89l-2.15-2.1c.92-2.31 2.23-4.34 3.92-6.03C15.18 4.58 17.64 4 19.22 4m0-2c-1.98 0-4.98.69-8.22 3.93c-2.19 2.19-3.5 4.6-4.35 6.71c-.28.75-.09 1.57.46 2.13l2.13 2.12c.38.38.89.61 1.42.61c.23 0 .47-.06.7-.15A19.1 19.1 0 0 0 18.07 13c5.66-5.66 3.54-10.61 3.54-10.61S20.7 2 19.22 2m-4.68 7.46c-.78-.78-.78-2.05 0-2.83s2.05-.78 2.83 0c.77.78.78 2.05 0 2.83c-.78.78-2.05.78-2.83 0m-5.66 7.07l-1.41-1.41l1.41 1.41M6.24 22l3.64-3.64c-.34-.09-.67-.24-.97-.45L4.83 22h1.41M2 22h1.41l4.77-4.76l-1.42-1.41L2 20.59V22m0-2.83l4.09-4.08c-.21-.3-.36-.62-.45-.97L2 17.76v1.41Z"/>',
    },
    'card-account-details-outline': {
      body: '<path fill="currentColor" d="M22 3H2c-1.09.04-1.96.91-2 2v14c.04 1.09.91 1.96 2 2h20c1.09-.04 1.96-.91 2-2V5a2.074 2.074 0 0 0-2-2m0 16H2V5h20v14m-8-2v-1.25c0-1.66-3.34-2.5-5-2.5c-1.66 0-5 .84-5 2.5V17h10M9 7a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 9 12a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 9 7m5 0v1h6V7h-6m0 2v1h6V9h-6m0 2v1h4v-1h-4"/>',
    },
    'book-education-outline': {
      body: '<path fill="currentColor" d="M6 20h7v2H6c-1.11 0-2-.89-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8.54l-1.5-.82l-.5.28V4h-5v8l-2.5-2.25L8 12V4H6v16m18-3l-5.5-3l-5.5 3l5.5 3l5.5-3m-9 2.09v2L18.5 23l3.5-1.91v-2L18.5 21L15 19.09Z"/>',
    },
    'cog-box': {
      body: '<path fill="currentColor" d="M17.25 12c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.29.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.19.69l-.25 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.3L10 16.85c-.44-.18-.83-.41-1.19-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42a.351.351 0 0 1 .08-.45l1.48-1.16c-.03-.22-.05-.45-.05-.68c0-.23.02-.46.05-.68l-1.48-1.16a.353.353 0 0 1-.08-.45l1.4-2.42c.09-.16.27-.22.43-.16l1.74.71c.36-.28.75-.52 1.19-.69l.25-1.86c.03-.16.18-.29.35-.29h2.8c.17 0 .32.13.35.29L14 7.15c.43.17.83.41 1.19.69l1.74-.71c.16-.06.34 0 .43.16l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.22.05.45.05.68M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-7 7c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2Z"/>',
    },
    'cash-register': {
      body: '<path fill="currentColor" d="M2 17h20v4H2v-4M6.25 7H9V6H6V3h8v3h-3v1h6.8c1 0 2 1 2.2 2l.5 7h-17l.55-7c0-1 1-2 2.2-2M13 9v2h5V9h-5M6 9v1h2V9H6m3 0v1h2V9H9m-3 2v1h2v-1H6m3 0v1h2v-1H9m-3 2v1h2v-1H6m3 0v1h2v-1H9M7 4v1h6V4H7Z"/>',
    },
    multimedia: {
      body: '<path fill="currentColor" d="M9 13V5c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2v6h-3.43l-1.28-1.74a.14.14 0 0 0-.24 0L15.06 12c-.06.06-.18.07-.24 0l-1.43-1.75a.152.152 0 0 0-.23 0l-2.11 2.66c-.08.09-.01.24.11.24h6.34V15H11c-1.11 0-2-.89-2-2m-3 9v-1H4v1H2V2h2v1h2V2h2.39C7.54 2.74 7 3.8 7 5v8c0 2.21 1.79 4 4 4h4.7c-1.03.83-1.7 2.08-1.7 3.5c0 .53.11 1.03.28 1.5H6M4 7h2V5H4v2m0 4h2V9H4v2m0 4h2v-2H4v2m2 4v-2H4v2h2m17-6v2h-2v5.5a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 1 3.5-2.29V13H23Z"/>',
    },
    'account-group-outline': {
      body: '<path fill="currentColor" d="M12 5a3.5 3.5 0 0 0-3.5 3.5A3.5 3.5 0 0 0 12 12a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 12 5m0 2a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 10a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 7M5.5 8A2.5 2.5 0 0 0 3 10.5c0 .94.53 1.75 1.29 2.18c.36.2.77.32 1.21.32c.44 0 .85-.12 1.21-.32c.37-.21.68-.51.91-.87A5.42 5.42 0 0 1 6.5 8.5v-.28c-.3-.14-.64-.22-1-.22m13 0c-.36 0-.7.08-1 .22v.28c0 1.2-.39 2.36-1.12 3.31c.12.19.25.34.4.49a2.482 2.482 0 0 0 1.72.7c.44 0 .85-.12 1.21-.32c.76-.43 1.29-1.24 1.29-2.18A2.5 2.5 0 0 0 18.5 8M12 14c-2.34 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.66-3.5-7-3.5m-7.29.55C2.78 14.78 0 15.76 0 17.5V19h3v-1.93c0-1.01.69-1.85 1.71-2.52m14.58 0c1.02.67 1.71 1.51 1.71 2.52V19h3v-1.5c0-1.74-2.78-2.72-4.71-2.95M12 16c1.53 0 3.24.5 4.23 1H7.77c.99-.5 2.7-1 4.23-1Z"/>',
    },
    'tooltip-account': {
      body: '<path fill="currentColor" d="M20 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4l4 4l4-4h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m-8 2.3c1.5 0 2.7 1.2 2.7 2.7c0 1.5-1.2 2.7-2.7 2.7c-1.5 0-2.7-1.2-2.7-2.7c0-1.5 1.2-2.7 2.7-2.7M18 15H6v-.9c0-2 4-3.1 6-3.1s6 1.1 6 3.1v.9Z"/>',
    },
    'account-multiple-plus-outline': {
      body: '<path fill="currentColor" d="M13 11a3 3 0 1 0-3-3a3 3 0 0 0 3 3m0-4a1 1 0 1 1-1 1a1 1 0 0 1 1-1m4.11 3.86a5 5 0 0 0 0-5.72A2.91 2.91 0 0 1 18 5a3 3 0 0 1 0 6a2.91 2.91 0 0 1-.89-.14M13 13c-6 0-6 4-6 4v2h12v-2s0-4-6-4m-4 4c0-.29.32-2 4-2c3.5 0 3.94 1.56 4 2m7 0v2h-3v-2a5.6 5.6 0 0 0-1.8-3.94C24 13.55 24 17 24 17M8 12H5v3H3v-3H0v-2h3V7h2v3h3Z"/>',
    },
    'book-multiple-outline': {
      body: '<path fill="currentColor" d="M19 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10m0 2h-3v6l-2.5-2.25L11 10V4H9v12h10M3 20a2 2 0 0 0 2 2h12v-2H5V6H3Z"/>',
    },
    'clipboard-file-outline': {
      body: '<path fill="currentColor" d="M15 23a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h4l4 4v7c0 1.11-.89 2-2 2h-6m0-2h6v-6.17L18.17 12H15v9m4-18c1.1 0 2 .9 2 2v4.17L19.83 8H19V5h-2v2H7V5H5v14h6v2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h4.18C9.6 1.84 10.7 1 12 1c1.3 0 2.4.84 2.82 2H19m-7 0c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1Z"/>',
    },
    'chart-areaspline': {
      body: '<path fill="currentColor" d="M17.45 15.18L22 7.31V21H2V3h2v12.54L9.5 6L16 9.78l4.24-7.33l1.73 1l-5.23 9.05l-6.51-3.75L4.31 19h2.26l4.39-7.56l6.49 3.74Z"/>',
    },
    'file-tree': {
      body: '<path fill="currentColor" d="M3 3h6v4H3V3m12 7h6v4h-6v-4m0 7h6v4h-6v-4m-2-4H7v5h6v2H5V9h2v2h6v2Z"/>',
    },
  },
  width: 24,
  height: 24,
});

export default {
  install(Vue: any) {
    Vue.component('Icon', Icon);
  },
};