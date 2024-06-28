import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appBlobToImage]'
})
export class BlobToImageDirective {

  @Input('appBlobToImage') imageUrl!: string | Blob;

  constructor(private element: ElementRef<HTMLImageElement>) { }

  ngOnChanges(): void {
    if (this.imageUrl instanceof Blob) {
      this.displayBlob(this.imageUrl);
    } else if (typeof this.imageUrl === 'string') {
      this.displayUrl(this.imageUrl);
    }
  }

  private displayBlob(blob: Blob): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.element.nativeElement.src = event.target.result;
    };
    reader.readAsDataURL(blob);
  }

  private displayUrl(url: string): void {
    this.element.nativeElement.src = url;
  }
}
