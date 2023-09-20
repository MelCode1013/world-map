import { Component, AfterViewInit, ElementRef, HostListener, OnInit  } from '@angular/core';
import { WorldMapServiceService } from 'src/app/world-map-service.service';
@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent {
private countryCode: string = '';
public countryData: any;
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
      if (typeof data == 'object' && !Array.isArray(data)) {
        const desiredCountry =data.find((country: any) => this.countryCode === this.countryCode)
        if (desiredCountry) {
          this.countryData = desiredCountry
        } else {
          console.error('Country not found')
        }
      } else {
        console.error('API response is not a valid JSON :(')
      }
      console.log(data);
      console.log(this.countryCode)

    });
    this.worldMapService.getdata().subscribe(res => {
        this.countryData = res;
        console.log(this.countryData)
    });

  }
  }
