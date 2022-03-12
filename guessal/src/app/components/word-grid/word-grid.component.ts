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



  count(num: number = 6) {
    const output: any[] = []
    for (let i = 0; i < num; i++) {
      output.push(i)
    }

    return output
  }

  key!: any;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: any) {

    if (event.key === 'Backspace') {
      this.backSpace();
    }

    if (event.key === 'Enter') {
      this.onSubmit();
    }

    if (!/[^a-zA-Z]/.test(event.key) && event.key.length === 1) {
      this.key = event.key
      if (this.currentGrid < 5) {
        this.grid[this.currentAttempt][this.currentGrid] = (this.key.toUpperCase());
        this.currentGrid++

        if (this.currentGrid === 5) {


        }
      }

    }
  }




  virtualKey(key: string) {
    if (this.currentGrid < 5) {
      this.grid[this.currentAttempt][this.currentGrid] = key;
      this.currentGrid++
    }
  }

  backSpace() {
    if (this.currentGrid > 0) {
      this.currentGrid--
      this.grid[this.currentAttempt][this.currentGrid] = '';
      return;
    }
  }

  async onSubmit() {
    const checkWordArr = [];
    let dictCheck = false;

    if (this.currentGrid === 5) {
      for (let i = 0; i < 5; i++) {
        checkWordArr.push(this.grid[this.currentAttempt][i])
      }
    }

    const typeWord = checkWordArr.join('').toLowerCase()

    if (await this.checkDictionary(typeWord)) {
      console.log('word exists')
    } else console.log('word does not exist')


  }

  async checkDictionary(word: string) {
    let dictCheck = false;
    const dictionary: any = await axios.get('../../../assets/dictionary/5-words.json').then(response => { return response.data[word] })

    try {
      (dictionary === 1) ? dictCheck = true : dictCheck = false;
    }
    catch (e) {
      console.log(e)
    }

    if (dictCheck === true) {
      return true;
    } else return false;

  }


}
