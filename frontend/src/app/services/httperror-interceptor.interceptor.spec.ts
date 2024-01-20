import { TestBed } from '@angular/core/testing';

import { HttperrorInterceptorInterceptor } from './httperror-interceptor.interceptor';

describe('HttperrorInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttperrorInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttperrorInterceptorInterceptor = TestBed.inject(HttperrorInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
