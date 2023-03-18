import { Mask } from "./gameField";
import { chekedWin } from "./checkWin";



export function clickContextMenu(x: number, y: number, mask: Mask[], sizeX: number,setMask: React.Dispatch<React.SetStateAction<Mask[]>>, field: number[], Mine:number) {
    if (mask[y * sizeX + x] === Mask.Transparent) return;
    if (mask[y * sizeX + x] === Mask.Fill) {
      mask[y * sizeX + x] = Mask.Flag;
    } else if (mask[y * sizeX + x] === Mask.Flag) {
      mask[y * sizeX + x] = Mask.Question;
    } else if (mask[y * sizeX + x] === Mask.Question) {
      mask[y * sizeX + x] = Mask.Fill;
    }
    setMask(prev => [...prev])
    chekedWin(field, mask, Mine);
  }