import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { NgForm, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  
  answer!: Number | undefined;

  n!: number;
  i!: number;
  equation!: string;

  @ViewChild('form', {static: false}) form!: NgForm;

  constructor(private computeService: ServicesService, private router: Router) {
  
  }

  ngOnInit(): void {
    this.answer = this.computeService.answer;
  }

  submitForm(form: NgForm){
    this.form = form;
    this.i = this.form.value.i;
    this.n = this.form.value.n;
    this.equation = this.form.value.equation;

    this.computeEquation();
  }

  computeEquation(){
    this.computeService.currentEquation = this.equation.split("")

    let finalAnswer = 0;
    
    for (let i = this.i; i<this.n+2; i++){
      if (this.computeService.currentEquation.includes("i")){
        this.computeService.currentEquation[this.computeService.currentEquation.indexOf("i")] = i.toString();
      }
      this.computeService.computeEquationFromString()
      this.computeService.calculatedNumber.subscribe(res=>{
      finalAnswer+=Number(res);
  })

      this.answer = finalAnswer;
    }

    return finalAnswer;
  }

  save(){
    this.answer = this.computeEquation();
    let equationToSave = this.equation.split(" ").join(" ")+` from ${this.i} to ${this.n} = ${this.answer}`;
    this.computeService.saveEquation(equationToSave)
    this.computeService.currentEquation = [];
    this.answer = undefined;
    this.router.navigate(["/tabs", "tab2"])
  }

}
