import { addProviders, inject } from '@angular/core/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => addProviders([AppComponent]));

  it('should have a name', inject([AppComponent], (app) => {
    expect(app.name).toEqual('spring-boot-angular2');
  }));

});
