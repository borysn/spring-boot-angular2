import { TestBed, inject, async } from '@angular/core/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';

// app component test
describe('AppComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AppComponent]
    });
  }));

  // sample test
  it('should have a name', inject([AppComponent], (app) => {
    expect(app.name).toEqual('spring-boot-angular2');
  }));

});
