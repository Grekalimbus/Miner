import { createVeryBigField } from './createVeryBigField'
import { createBigField } from "./createBigField";
import { createField } from "./createField";

export function sizeField(size: number, Mine: number): number[] {
    if (size < 9) {
      return createField(size, Mine);
    }
    if (size < 17) {
      return createBigField(size, Mine);
    }
    return createVeryBigField(size, Mine);
  }