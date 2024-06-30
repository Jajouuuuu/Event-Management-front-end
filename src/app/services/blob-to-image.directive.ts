import { Directive, ElementRef, Input } from '@angular/core';

/**
 * Directive to display either a Blob or a URL as an image source.
 */
@Directive({
  selector: '[appBlobToImage]'
})
export class BlobToImageDirective {

  /** Input property binding for the directive to accept either an image URL or a Blob */
  @Input('appBlobToImage') imageUrl!: string | Blob;

  constructor(private element: ElementRef<HTMLImageElement>) { }

  /**
   * Lifecycle hook that executes when the bound inputs change.
   * Depending on the type of `imageUrl`, it displays the image accordingly.
   */
  ngOnChanges(): void {
    if (this.imageUrl instanceof Blob) {
      this.displayBlob(this.imageUrl);
    } else if (typeof this.imageUrl === 'string') {
      this.displayUrl(this.imageUrl);
    }
  }

  /**
   * Displays a Blob as an image using FileReader to convert it to a data URL.
   * @param blob - The Blob object representing the image
   */
  private displayBlob(blob: Blob): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.element.nativeElement.src = event.target.result;
    };
    reader.readAsDataURL(blob);
  }

  /**
   * Displays an image from a URL directly.
   * @param url - The URL of the image to display
   */
  private displayUrl(url: string): void {
    this.element.nativeElement.src = url;
  }
}
