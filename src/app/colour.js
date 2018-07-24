import {
  red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal,
  green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey
} from '@material-ui/core/colors';

const COLOURS = [
  red, pink, purple, deepPurple, indigo,
  blue, lightBlue, teal, green,
  lightGreen, lime, yellow, orange,
  deepOrange, brown, grey
];

const COLOUR_NAMES = [
  'red', 'pink', 'purple', 'deepPurple', 'indigo',
  'blue', 'lightBlue', 'teal', 'green',
  'lightGreen', 'lime', 'yellow', 'orange',
  'deepOrange', 'brown', 'grey'
];

export const getColour = (name, key) => {
  let colourIndex = COLOUR_NAMES.indexOf(name);
  colourIndex = colourIndex == -1 ? 0 : colourIndex;
  return COLOURS[colourIndex][key];
};

export const get = getColour;

export const mapNames = (fn) => {
  return COLOUR_NAMES.map(fn);
}