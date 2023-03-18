import { chekedWin } from "./checkWin";
import { Mask } from "./gameField";

export  function stylesCell(died: boolean,field: number[], mask: Mask[], Mine: number): string {
    if (!died) {
      if (chekedWin(field, mask, Mine) === true) {
        return 'rgba(236, 146, 11, 0.932)';
      }
      return '(233, 233, 233, 0.342)';
    }
    return 'rgba(219, 22, 22, 0.596)';
  }