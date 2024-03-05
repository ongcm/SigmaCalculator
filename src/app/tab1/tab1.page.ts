import { Component, DoCheck, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { OnSameUrlNavigation, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{

  listButtons!: Array<Array<string>>;
  calculatedResult!: string;
  private sub!: Subscription;

  constructor(private service: ServicesService, private router: Router) {}

  ngOnInit(): void {
    this.listButtons = [["7", "8", "9", "*"], ["4", "5", "6", "-"], ["1", "2", "3", "+"]]
    this.sub = this.service.calculatedNumber.subscribe(result=>{
      this.calculatedResult = result;
    });
  }

  save(){
    let equationToSave = this.service.currentEquation.join("").split(" ").join(" ")+"="+this.calculatedResult;
    this.service.saveEquation(equationToSave)
    this.service.currentEquation = [];
    this.calculatedResult = "0";
    this.router.navigate(["/tabs", "tab2"])
  }

  addToCalculateQueue(item: string){
    if (item=="C"){
      this.service.currentEquation = [];
      this.calculatedResult = "0";
    }else{
      this.service.currentEquation.push(item);
      this.calculatedResult = this.service.currentEquation.join("")
    }
  }

  calculate(){
    this.service.computeEquationFromString();
    this.sub = this.service.calculatedNumber.subscribe(result=>{
      this.calculatedResult = result;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
