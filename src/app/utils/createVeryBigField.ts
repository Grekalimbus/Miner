export function createVeryBigField(size: number, Mine: number): number[] {
    const numMines = Math.floor((size * size) / 10);
    const field: number[] = new Array(size * size).fill(0);
    function inc(x: number, y: number) {
      if (x >= 0 && x < size && y >= 0 && y < size) {
        if (field[y * size + x] === Mine) return;
        field[y * size + x] += 1;
      }
    }
  
    for (let i = 0; i < numMines; ) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
  
      if (field[y * size + x] === Mine) continue;
      field[y * size + x] = Mine;
      i += 1;
      inc(x + 1, y);
      inc(x - 1, y);
      inc(x, y + 1);
      inc(x, y - 1);
      inc(x + 1, y - 1);
      inc(x - 1, y - 1);
      inc(x + 1, y + 1);
      inc(x - 1, y + 1);
    }
    return field;
  }