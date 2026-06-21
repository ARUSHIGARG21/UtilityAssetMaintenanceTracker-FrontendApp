import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

import { App } from './app/app';
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';
// import { provideHttpClient } from '@angular/common/http';

// bootstrapApplication(App, {
//   providers: [
//     provideHttpClient(),   // ✅ HttpClient globally available
//     ...appConfig.providers // ✅ keep your existing config
//   ]
// }).catch((err) => console.error(err));
