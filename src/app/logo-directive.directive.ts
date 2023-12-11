import { Directive, ElementRef, Renderer2, HostListener, AfterViewInit } from '@angular/core';


@Directive({
  selector: '[LogoDirectiveDirective]',
})
export class LogoDirectiveDirective {
  private originalColor: string;
  private originalFontSize: string;
  private originalFontWeight: string;
  private originalFontFamily: string;
  private originalLetterSpacing: string;
  private isMouseOver: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.originalColor = el.nativeElement.style.color || 'aliceblue';
    this.originalFontSize = el.nativeElement.style.fontSize || '22px';
    this.originalFontWeight = el.nativeElement.style.fontWeight || 'normal';
    this.originalLetterSpacing = el.nativeElement.style.letterSpacing || '2px';
    this.originalFontFamily = el.nativeElement.style.fontFamily || 'inherit';

    this.renderer.setStyle(el.nativeElement, 'transition', 'color 0.3s, font-size 0.3s, font-weight 0.3s, font-family 0.3s, letter-spacing 0.3s');
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.isMouseOver) {
      this.isMouseOver = true;
      this.changeStyles('aquamarine', '26px', 'bold', 'Poppins', '4px');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.isMouseOver) {
      this.isMouseOver = false;
      this.changeStyles(this.originalColor, this.originalFontSize, this.originalFontWeight, this.originalFontFamily, this.originalLetterSpacing);
    }
  }

  private changeStyles(color: string, fontSize: string, fontWeight: string, fontFamily: string, letterSpacing: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
    this.renderer.setStyle(this.el.nativeElement, 'font-size', fontSize);
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', fontWeight);
    this.renderer.setStyle(this.el.nativeElement, 'font-family', fontFamily);
    this.renderer.setStyle(this.el.nativeElement, 'letter-spacing', letterSpacing);
  }
}