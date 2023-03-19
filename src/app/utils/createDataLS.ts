import { formatTimeElapsed } from "src/app/utils/resultTime";
import { TableData } from "../store/tableSlice";

export function createDataLS(size: number, time: number) {
    const firstTime = size < 9 ? 10 * 60 : size < 17 ? 40 * 60 : 100 * 60
    const nikName: string | null = prompt(
      'Ты выиграл! Введи твой ник, чтобы записать тебя в таблицу'
    );
    const lvl: string =
      size < 9 ? 'Простой (8х8)' : size < 17 ? 'Средний (16х16)' : 'Сложный (32х32)';
    if (nikName) {
      const data: TableData = {nik: nikName, lvl: lvl, time: formatTimeElapsed(firstTime, time), timeNum: time}    
      const dataString = JSON.stringify([data])
      const dataLS = localStorage.getItem('results')     
      if(!dataLS){
        localStorage.setItem('results', dataString)        
      }      
      if(dataLS){
        const parseDataLS = JSON.parse(dataLS)        
        parseDataLS.push(data)
        localStorage.setItem('results', JSON.stringify(parseDataLS))             
    }        
  }        
}
  