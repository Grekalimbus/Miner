import { Mask } from "./gameField";
import { chekedWin } from "./checkWin";

export function clickCell(x: number, y: number, mask: Mask[], sizeX: number, field: number[], Mine:number, setMask: React.Dispatch<React.SetStateAction<Mask[]>>, setDied: React.Dispatch<React.SetStateAction<boolean>>) {
    if (mask[y * sizeX + x] === Mask.Transparent) return;
    const clearing: [number, number][] = [];
    function clear(x: number, y: number) {
      if (x >= 0 && x < sizeX && y >= 0 && y < sizeX) {
        if (mask[y * sizeX + x] === Mask.Transparent) return;
        clearing.push([x, y]);
      }
    }
    clear(x, y);
    while (clearing.length) {
      const [x, y] = clearing.pop()!!;
      mask[y * sizeX + x] = Mask.Transparent;
      if (field[y * sizeX + x] !== 0) continue;
      clear(x + 1, y);
      clear(x - 1, y);
      clear(x, y + 1);
      clear(x, y - 1);
    }
    if (field[y * sizeX + x] === Mine) {
      mask.forEach((_, i) => (mask[i] = Mask.Transparent));
      setDied(true);
    }
    setMask(prev => [...prev]);
    chekedWin(field, mask, Mine);
  }