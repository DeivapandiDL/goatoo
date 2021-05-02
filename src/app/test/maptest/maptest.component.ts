
 /// <reference  types="@types/googlemaps"  />
 import { Component, OnInit, ElementRef, ViewChild, NgZone ,AfterViewInit } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';


@Component({
  selector: 'app-maptest',
  templateUrl: './maptest.component.html',
  styleUrls: ['./maptest.component.scss'],
})
export class MaptestComponent implements AfterViewInit  {
	@ViewChild('addresstext') addresstext:  ElementRef;
	@ViewChild('gmap') gmapElement:  any;
	
	ngAfterViewInit():  void {
		this.getPlaceAutocomplete();
	}
	getPlaceAutocomplete() {
		const  autocomplete  =  new  google.maps.places.Autocomplete(this.addresstext.nativeElement,
		{
			componentRestrictions: { country:  'US' },
			types: ['establishment', 'geocode'] 
		});

		google.maps.event.addListener(autocomplete, 'place_changed', () => {
			const  place  =  autocomplete.getPlace();
			const  myLatlng  =  place.geometry.location;
			const  mapOptions  = {
				zoom:  15,
				center:  myLatlng
			};
			const  map  =  new  google.maps.Map(this.gmapElement.nativeElement, mapOptions);
			const  marker  =  new  google.maps.Marker({
				position:  myLatlng,
				title:  place.name
			});
			marker.setMap(map);
		});
	}
}