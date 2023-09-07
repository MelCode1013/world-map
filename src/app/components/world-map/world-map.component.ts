import { Component, AfterViewInit, ElementRef, HostListener  } from '@angular/core';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent {
constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const grabMap = this.elementRef.nativeElement.getElementsByTagName("path");

    for (let i = 0; i < grabMap.length; i++) {
      grabMap[i].addEventListener("mouseover", (event: MouseEvent) => {
        const targetId = (event.target as HTMLElement).id;
        console.log(targetId);
      });
    }
  }
}
