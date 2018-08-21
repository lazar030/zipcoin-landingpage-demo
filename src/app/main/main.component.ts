import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css',
  "../../assets/css/crypto-fintech.css",
  "../../assets/css/bootstrap.min.css",
  "../../assets/css/vendor/magnific-popup.css",
  "../../assets/css/main.css",
  "../../assets/css/responsive.css"
]
})
export class MainComponent implements OnInit {
  constructor(private renderer: Renderer2){
    this.addJsToElement("../../assets/js/vendor/jquery.waypoints.min.js");
    // this.addJsToElement("../../assets/js/vendor/jquery.countdown.min.js");
    this.addJsToElement("../../assets/js/main.js");
    this.addJsToElement("https://maps.googleapis.com/maps/api/js?key=AIzaSyD6Cn2XCz3_n_J57QSN_rw6gwtQDWQJ3MM&callback=initMap");
  }
    ngOnInit(){
    }

  addJsToElement(src: string): HTMLScriptElement {
     const script = document.createElement('script');
     script.type = 'text/javascript';
     script.src = src;
     this.renderer.appendChild(document.body, script);
     return script;
   }
  } 