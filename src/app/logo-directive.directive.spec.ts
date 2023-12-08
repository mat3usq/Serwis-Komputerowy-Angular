import { LogoDirectiveDirective } from './logo-directive.directive';

describe('WelcomeDirectiveDirective', () => {
  it('should create an instance', () => {
    const elMock = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    const rendererMock = jasmine.createSpyObj('Renderer2', ['setStyle']);

    const directive = new LogoDirectiveDirective(elMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});
