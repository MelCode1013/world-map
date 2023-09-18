import { Component, AfterViewInit, ElementRef, HostListener, OnInit  } from '@angular/core';
import { WorldMapServiceService } from 'src/app/world-map-service.service';
@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent {
private countryCode: string = '';
constructor(private elementRef: ElementRef, private worldMapService: WorldMapServiceService) {}

  ngAfterViewInit() {
    const grabMap = this.elementRef.nativeElement.getElementsByTagName("path");

    for (let i = 0; i < grabMap.length; i++) {
      grabMap[i].addEventListener("mouseover", (event: MouseEvent) => {
        const targetId = (event.target as HTMLElement).id;
        const targetPath = event.target as HTMLElement;
        targetPath.style.fill = '#00A8E8'
        this.countryCode = targetId
        console.log(targetId)
      this.worldMapService.getCountryDetailsByCode(this.countryCode).subscribe((data) => {
      // Handle the data from the World Bank API here
      console.log(data);
    });
      });

      grabMap[i].addEventListener('mouseout', (event: MouseEvent) => {
        const targetPath = event.target as HTMLElement;
        targetPath.style.fill = '#00171F'});
      }
    }
    ngOnInit() {
      
    this.worldMapService.getCountryDetailsByCode(this.countryCode).subscribe((data) => {
      // Handle the data from the World Bank API here
      console.log(data);
    });
  }
  }
