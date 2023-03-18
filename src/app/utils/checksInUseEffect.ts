import { createDataLS } from "src/app/utils/createDataLS";
import { chekedWin } from "./checkWin";
import { Mask } from "./gameField";

export function checksInUseEffect(field: number[], mask: Mask[], Mine: number,size: number, time:number,changeWin: ()=> void,changeDied:()=> void,died: boolean, lose:boolean ){
    if (chekedWin(field, mask, Mine)) {
        changeWin();
        if (time) {
          createDataLS(size, time);
        }
      }
      if (died) {
        changeDied();
      }
      if (lose) {
        setTimeout(() => {
          alert('Ты проиграл, время закончилось');
        }, 1000);
      }
}