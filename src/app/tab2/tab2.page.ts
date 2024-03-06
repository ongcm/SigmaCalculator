import { Component, DoCheck, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  savedEquations!: any[];

  constructor(private router: Router, private service: ServicesService) {}

  async ngOnInit() {
    this.savedEquations = this.service.updateEquationsList()
  }

  loadEquation(e: String){
    this.service.returnToEquation(e);
    this.router.navigate(["/tabs", "tab1"]);
  }

  deleteItem(id: number){
    this.savedEquations = this.service.deleteItem(id);
  }

}
