export function numberColor(number: number) {
  if (number === 8) {
    return 'rgb(255, 255, 255)';
  }
  if (number === 7) {
    return 'black';
  }
  if (number === 6) {
    return 'rgb(50, 232, 238)';
  }
  if (number === 5) {
    return 'rgb(105, 52, 1)';
  }
  if (number === 4) {
    return 'rgb(0, 8, 119)';
  }
  if (number === 3) {
    return 'rgb(243, 17, 9)';
  }
  if (number === 2) {
    return 'rgb(76, 243, 9)';
  }
  if (number === 1) {
    return 'rgb(15, 58, 248)';
  }
  return 'rgb(247, 171, 30)';
}
