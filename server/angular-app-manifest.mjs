
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/angular-tasks-app/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/angular-tasks-app"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 510, hash: 'f46b2219bbc3b3c29dc9780bf696438cebf51d6e2ae0ffa3f1f05afda3b64fe4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1023, hash: '37efbcfee0cccae8ea112210f82ebb41d78edea05043f9d4549b70c15fe2e5c3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 20851, hash: '72dc77b52a45cd40b5f8cb205a65a7e81794d24723a00e0302138483a5394c1a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
