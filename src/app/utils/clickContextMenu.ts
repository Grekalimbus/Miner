import { Mask } from "./gameField";
import { chekedWin } from "./checkWin";



export function clickContextMenu(x: number, y: number, mask: Mask[], size: number,setMask: React.Dispatch<React.SetStateAction<Mask[]>>, field: number[], Mine:number) {
    if (mask[y * size + x] === Mask.Transparent) return;
    if (mask[y * size + x] === Mask.Fill) {
      mask[y * size + x] = Mask.Flag;
    } else if (mask[y * size + x] === Mask.Flag) {
      mask[y * size + x] = Mask.Question;
    } else if (mask[y * size + x] === Mask.Question) {
      mask[y * size + x] = Mask.Fill;
    }
    setMask(prev => [...prev])
    chekedWin(field, mask, Mine);
  }