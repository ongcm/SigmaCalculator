import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  savedEquations!: Array<string>;

  constructor(private service: ServicesService, private router: Router) {}

  ngOnInit(): void {
    this.savedEquations = this.service.listSavedEquations;
  }

  deleteItem(e: string){
    this.savedEquations = this.service.deleteEquation(e);
  }

  loadEquation(e: string){
    this.service.returnToEquation(e);
    this.router.navigate(["/tabs", "tab1"])
  }

}
