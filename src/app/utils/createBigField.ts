export function createBigField(sizeX: number, sizeY: number, Mine: number): number[] {
  const field: number[] = new Array(sizeX * sizeY).fill(0);

  function inc(x: number, y: number) {
    if (x >= 0 && x < sizeX && y >= 0 && y < sizeY) {
      if (field[y * sizeX + x] === Mine) return;
      field[y * sizeX + x] += 1;
    }
  }

  for (let i = 0; i < sizeX * sizeY; ) {
    const x = Math.floor(Math.random() * sizeX);
    const y = Math.floor(Math.random() * sizeY);

    if (field[y * sizeX + x] === Mine) continue;
    field[y * sizeX + x] = Mine;
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
