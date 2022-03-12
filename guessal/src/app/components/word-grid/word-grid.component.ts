import { Component, HostListener, OnInit } from '@angular/core';
import axios from 'axios';
import { response } from 'express';

@Component({
  selector: 'app-word-grid',
  templateUrl: './word-grid.component.html',
  styleUrls: ['./word-grid.component.scss']
})

export class WordGridComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  wotd = 'today'

  wordLength = 5;
  maxAttempts = 6;

  currentAttempt = 0;
  currentGrid = 0;

  grid: any = {
    0: [['', 'd'], ['', 'd'], ['', 'd'], ['', 'd'], ['', 'd']],
    1: [['', 'd'], ['', 'd'], ['', 'd'], ['', 'd'], ['', 'd']],
    2: [['', 'd'], ['', 'd'], ['', 'd'], ['', 'd'], ['', 'd']],
    3: [['', 'd'], ['', 'd'], ['', 'd'], ['', 'd'], ['', 'd']],
    4: [['', 'd'], ['', 'd'], ['', 'd'], ['', 'd'], ['', 'd']],
    5: [['', 'd'], ['', 'd'], ['', 'd'], ['', 'd'], ['', 'd']]
  }
  


  count(num: number = 6){
    const output: any[] = []
    for(let i = 0; i < num; i++){
      output.push(i)
    }

    return output
  }

  key!: any;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: any) { 
    if (!/[^a-zA-Z]/.test(event.key)){
      this.key = event.key
      if(this.currentGrid < 5) {
        this.grid[this.currentAttempt][this.currentGrid] = (this.key.toUpperCase());
        this.currentGrid++

        if(this.currentGrid === 5){
          console.log('check word')
        }
      }

    }    
  }



  virtualKey(key: string){
    if(this.currentGrid < 5) {
      this.grid[this.currentAttempt][this.currentGrid] = key;
      this.currentGrid++
    }
  }

  backSpace(){
    if(this.currentGrid > 0) {
      this.currentGrid--
      this.grid[this.currentAttempt][this.currentGrid] = '';
      return;
    }
  }

  async onSubmit(){
      const checkWordArr = [];
      let dictCheck = false;
      if(this.currentGrid === 5) {
        for(let i = 0; i < 5; i++) {
          checkWordArr.push(this.grid[this.currentAttempt][i])
        }
      }
      const typeWord = checkWordArr.join('').toLowerCase()
      const dictionary:any = await axios.get('../../../assets/dictionary/5-words.json').then(response => {return response.data[typeWord]})
      try{
        if(dictionary === 1) dictCheck = true;
        if(dictionary !== 1) dictCheck = false;
      }
      catch(e) {
      console.log(e)
    }

    if(dictCheck === true) {
      console.log('exists')
    }
    
  }




}
