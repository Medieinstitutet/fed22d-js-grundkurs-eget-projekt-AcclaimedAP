/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as unit from './units';
import * as utility from './utility';
// Animation variables
export const canvas = document.getElementById('canvas') as HTMLDivElement;
export const goldCounter = document.getElementById('goldCount') as HTMLSpanElement;
export const dayAndNight = document.getElementById('dayNight') as HTMLImageElement;
export const day = {
  red: 183,
  green: 255,
  blue: 255,
};
export const sunSetAndRise = {
  red: 255,
  green: 221,
  blue: 138,
};
export const night = {
  red: 44,
  green: 47,
  blue: 107,
};
let degree = 0;
let red = 183;
let blue = 255;
let green = 255;
function adjustColor(color: number, target: number, speed = 1): number {
  if (color < target) {
    color += speed;
  } else if (color > target) {
    color -= speed;
  }
  return color;
}
export function backgroundCycle() {
  const sunSetTime = 50;
  const nightStartTime = 90;
  const sunRiseTime = 250;
  const dayTime = 300;
  const colorChangeSpeed = 0.6;
  degree += 0.1;
  if (degree >= 360) {
    degree = 0; // Resets degree to reduce headache
  }
  dayAndNight.style.transform = `rotate(${degree}deg)`;
  if (degree >= dayTime || degree <= sunSetTime) {
    red = adjustColor(red, day.red, colorChangeSpeed);
    green = adjustColor(green, day.green, colorChangeSpeed);
    blue = adjustColor(blue, day.blue, colorChangeSpeed);

    // Sunset & rise
  } else if ((degree < dayTime && degree > sunRiseTime) || (degree > sunSetTime && degree < nightStartTime)) {
    red = adjustColor(red, sunSetAndRise.red, colorChangeSpeed);
    green = adjustColor(green, sunSetAndRise.green, colorChangeSpeed);
    blue = adjustColor(blue, sunSetAndRise.blue, colorChangeSpeed);
    // Night
  } else if (degree > nightStartTime && degree < sunRiseTime) {
    red = adjustColor(red, night.red, colorChangeSpeed);
    green = adjustColor(green, night.green, colorChangeSpeed);
    blue = adjustColor(blue, night.blue, colorChangeSpeed);
  }
  canvas.style.backgroundColor = `rgb(${red},${green},${blue})`;
}

export function degreeDisplay() {
  const spnDegree = document.getElementById('degreeSpn') as HTMLSpanElement;
  spnDegree.innerHTML = `${degree.toFixed(1)}<br>red: ${red.toFixed(1)}<br>green: ${green.toFixed(1)}<br>blue: ${blue.toFixed(1)}`;
}
export function updateGoldDisplay(): void {
  goldCounter.innerHTML = utility.numberToAsciiConverter(unit.player.GOLD);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createText(text: string, positionTarget: any, type: string) {
  const leftRandomOffset = Math.random() * 100 - 50;
  const topRandomOffset = Math.random() * 100 - 50;
  const leftOffset = -120;
  const topOffset = -100;
  const textElement = document.createElement('span');
  textElement.classList.add('displayText');
  switch (type) {
    case 'crit':
      textElement.classList.add('displayTextCrit');
      textElement.innerHTML += `<ruby>${text} <rp>(</rp><rt>Crit!</rt><rp>)</rp></ruby>`;
      break;
    case 'gold':
      textElement.classList.add('displayTextGold');
      textElement.innerHTML = `+${text} Gold`;
      break;
    case 'block':
      textElement.classList.add('displayTextBlock');
      textElement.innerHTML += `<ruby>${text} <rp>(</rp><rt>Block!</rt><rp>)</rp></ruby>`;
      break;
    case 'heal':
      textElement.classList.add('displayTextHeal');
      textElement.innerHTML += `<ruby>${text} <rp>(</rp><rt>Heal!</rt><rp>)</rp></ruby>`;
      break;
    case 'skill':
      textElement.classList.add('displayTextSkill');
      textElement.innerHTML += `<ruby>${text} <rp>(</rp><rt>SMITE!</rt><rp>)</rp></ruby>`;
      break;
    default:
      textElement.innerHTML = text;
      break;
  }
  const position = positionTarget.image?.getBoundingClientRect();
  textElement.style.left = `${(position.left - leftOffset + leftRandomOffset).toString()}px`;
  textElement.style.top = `${(position.top - topOffset + topRandomOffset).toString()}px`;
  canvas.appendChild(textElement);

  const animation = textElement.animate(
    [
      { transform: 'translateY(0px)', opacity: '1' },
      { transform: 'translateY(-100px)', opacity: '0' },
    ],
    {
      duration: 2500,
      iterations: 1,
      easing: 'ease-in-out',
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    }
  );
  animation.play();
  animation.onfinish = () => {
    textElement.remove();
  };
}
