import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  constructor() { }

  checkRole(role:String){
      console.log("checkRole",role);
      if(role ==="mentor"){
        console.log("mentor")
        return true;
      }
      console.log("admin")
      return false;
  }
}
