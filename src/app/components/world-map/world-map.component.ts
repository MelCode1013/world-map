import { Component, AfterViewInit, ElementRef, HostListener, OnInit  } from '@angular/core';
import { WorldMapServiceService } from 'src/app/world-map-service.service';
@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent {
public countryCode: any;
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
        console.log('Hovered Country Code:', this.countryCode);

        this.worldMapService.getCountryDetailsByCode(this.countryCode).subscribe((data) => {
      // Handle the data from the World Bank API here
      if (Array.isArray(data) && data.length >= 2) {
          // Extract the country data from the response
          const countryArray = data[1];
          const desiredCountry = countryArray.find((country: any) => country.iso2Code === this.countryCode);
          console.log(countryArray) //ensuring the proper data is being pulled
          console.log(desiredCountry)

          if (desiredCountry) {
            this.countryData = desiredCountry;
          } else {
            console.error('Country not found');
          }
        } else {
          console.error('API response is not in the expected format :(');
        }

    });
      });

      grabMap[i].addEventListener('mouseout', (event: MouseEvent) => {
        const targetPath = event.target as HTMLElement;
        targetPath.style.fill = '#00171F'});
      }
    }
    ngOnInit() {
    this.worldMapService.getdata().subscribe(res => {
        this.countryData = res;
    });

  }
  }
