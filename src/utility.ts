// Counts the amount of digits in a number
export function digitCounter(number: number, count = 0): number {
  if (number) {
    count += 1;
    return digitCounter(Math.floor(number / 10), count);
  }
  return count;
}
// Visual aid to convert large numbers to a number that is easier to understand.
export function numberToAsciiConverter(number: number): string {
  let stringLength = digitCounter(number);
  const ascii = 96;
  let loopCount = 0;
  let finalString = number.toFixed();
  if (stringLength >= 4) {
    while (stringLength >= 4) {
      loopCount += 1;
      stringLength -= 3;
    }
    const divided = 1000 ** loopCount;
    number /= divided;
    if (number > 100) {
      finalString = Math.round(number).toString() + String.fromCharCode(ascii + loopCount);
    } else if (number > 10) {
      finalString = number.toFixed(1) + String.fromCharCode(ascii + loopCount);
    } else {
      finalString = number.toFixed(2) + String.fromCharCode(ascii + loopCount);
    }
  }

  return finalString;
}
// Menu functionality
// Menu button array
export const btnMenu = document.querySelectorAll('.btnMenu');
export const divMenu = document.querySelectorAll('.menuFrame');
export function menuChange(uiElement: Element) {
  if (uiElement.classList.contains('hidden')) {
    for (let i = 0; i < divMenu.length; i += 1) {
      if (!divMenu[i].classList.contains('hidden')) {
        divMenu[i].classList.add('hidden');
      }
    }
    uiElement.classList.remove('hidden');
  }
}
export const btnHelpOpen = document.getElementById('btnHelpOpen') as HTMLButtonElement;
export const btnHelpClose = document.getElementById('btnHelpClose') as HTMLButtonElement;
export function toggleHelp() {
  const helpWindow = document.getElementById('overlayHelp') as HTMLDivElement;
  helpWindow.classList.toggle('hidden');
}

export function output(text?: string, style?: string): void {
  const outputBox = document.getElementById('textOutput') as HTMLDivElement;
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  outputBox.innerHTML += `<${style}><br>${text}<${style}>`;
  outputBox.scrollTop = outputBox.scrollHeight;
}
