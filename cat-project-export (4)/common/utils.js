// Add zero in front of numbers < 10 in date and time
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
