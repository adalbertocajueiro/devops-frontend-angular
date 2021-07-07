import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  info1: string[] = ["Fulano de tal", 'ES32','abc@domain.net']
  info2: string[] = ["Beltrano", 'ES32','ccc@domain.net']
  info3: string[] = ["Ceclano", 'ES35','bbb@domain.net']
  getInfo1(){
    return this.info1;
  }
  getInfo2(){
    return this.info2;
  }
  getInfo3(){
    return this.info3;
  }
  constructor() { }
}
