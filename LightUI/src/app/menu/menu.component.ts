import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LightService } from '../light.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  
  constructor(private http: HttpClient, private lightService: LightService){}

}
