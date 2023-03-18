import { Mask } from "./gameField";

export function chekedWin(field: number[], mask: Mask[], Mine: number): boolean | undefined {
    let cheked = 0;
    field.forEach((f, i) => {
      if (
        (f !== Mine && mask[i] === Mask.Transparent) ||
        (f === Mine && mask[i] === Mask.Flag) ||
        (f === Mine && mask[i] === Mask.Fill)
      ) {
        cheked += 1;
      }
    });
    if (cheked === field.length) {
      return true;
    }
  }