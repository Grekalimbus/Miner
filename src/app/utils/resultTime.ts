export function formatTimeElapsed(time: number, time2: number): string {
  const timeElapsed = Math.abs(time - time2);
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  console.log("time", time);
  console.log("time2", time2);
  
  
  return `${formattedMinutes}:${formattedSeconds}`;
}