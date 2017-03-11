import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';
import { decorateModuleRef } from './app/environment';
import {AppModule} from './app/app.module';

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch((err) => console.error(err));
}

bootloader(main);
