import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ServicesService{

  listSavedEquations: String[] = [];

  answer!: Number | undefined;

  currentEquation: Array<string> = [];
  calculatedNumber: Subject<string> = new Subject<string>();
  calculatedResult: string = "0";

  constructor(private storage: Storage){}

  updateEquationsList(){

    this.storage['forEach']((key: any, value: String, index: any) => {
      if (!this.listSavedEquations.includes(key))
        this.listSavedEquations.push(key);
    });

    return this.listSavedEquations;

  }

  async saveEquation(equation: String){
    const length = (await this.storage.length()).toString()

    this.storage.set(length, equation.toString())
    this.listSavedEquations = this.updateEquationsList();
    this.listSavedEquations.push(equation);
  }

  deleteItem(id: number){
    this.storage.remove(id.toString())
    this.listSavedEquations.splice(id, 1)
    return this.listSavedEquations
  }

  returnToEquation(fullEquation: String){
    const equation = fullEquation.split("=")
    this.currentEquation = equation[0].split("");
    this.calculatedNumber.next(equation[1]);
  }

  add(num1: number, num2: number){
    return num1+num2;
  }

  subtract(num1: number, num2: number){
    return num1-num2;
  }

  multiply(num1: number, num2: number){
    return num1*num2;
  }

  divide(num1: number, num2: number): number | string{

    if (num2==0){
      return "Error!"
    }
  
    return (num1/num2).toString().slice(0, 7);
  }

  convertToNegativeOrPositive(num1: number){
    return num1/-1;
  }

  convertToPercent(num1: number){
    return num1/100;
  }

  subCalculateDoubleOperators(num1: any, num2: any, operator: string){

    let res = num1;

    switch (operator){
      case "+":
        res = this.add(Number(num1), Number(num2));
        break;
      case "-":
        res = this.subtract(Number(num1), Number(num2));
        break;
      case "*":
        res = this.multiply(Number(num1), Number(num2));
        break;
      case "/":
        res = this.divide(Number(num1), Number(num2));
        break;
    }

    this.calculatedResult = res;

    this.calculatedNumber.next(res.toString());

  }

  computeEquationFromString(){
    const doubleOperations: Array<string> = ["/", "*", "-", "+"]

    let num = "";

    let calculateIndividualNumbers: any[] = []
    let operationSymbols = [];

    let nums = [];

    for (let index = 0; index<this.currentEquation.length; index++){
      if (doubleOperations.includes(this.currentEquation[index])){
        operationSymbols.push(this.currentEquation[index]);
      }else{
        num+=this.currentEquation[index];
      }
    }

    nums = this.currentEquation.join(",").split("+").join("|").split("-").join("|").split("*").join("|").split("/").join("|").replace(",", "").split("|");
      
    for (let i = 0; i<nums.length; i++){
      calculateIndividualNumbers.push(nums[i].split(",").join("").split(" ").join(""));
    }

    for (let i = 0; i<operationSymbols.length; i++){
      this.subCalculateDoubleOperators(calculateIndividualNumbers[i], calculateIndividualNumbers[i+1], operationSymbols[i]);
      calculateIndividualNumbers[i+1] = this.calculatedResult;
    }


  }

}
