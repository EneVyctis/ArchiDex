import { Directive, ElementRef, Host, HostListener, input } from '@angular/core';
import { getArchimonstreColor } from './archimonstre.model'
@Directive({
  selector: '[appArchimonstreBorder]',
})
export class ArchimonstreBorder {

  private initialColor: string;
  archimonstreRes = input.required<string>();

  constructor(private el: ElementRef) {

    this.initialColor = this.el.nativeElement.style.borderColor;
    this.el.nativeElement.style.borderWidth = '2px';
  }

  @HostListener('mouseenter') 
  onMouseEnter() {
    const color = getArchimonstreColor(this.archimonstreRes());
    this.setBorder(color);
  }

  @HostListener('mouseleave') 
  onMouseLeave() {
    const color = this.initialColor;  
    this.setBorder(color);
  }

  private setBorder(color: string) {
    this.el.nativeElement.style.borderColor = color;
  }

  private getBorderColor() {
    return 
  }
}
