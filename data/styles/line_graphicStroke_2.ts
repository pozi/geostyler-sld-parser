import { Style } from 'geostyler-style';

const lineSimpleLine: Style = {
  name: 'Simple Line',
  rules: [{
    name: '',
    symbolizers: [{
      kind: 'Line',
      graphicStroke: {
        kind: 'Mark',
        wellKnownName: 'circle',
        color: '#FF0000',
        radius: 8,
		strokeColor: '#FFFFFF',
		strokeWidth: 3
      }
    }]
  }]
};

export default lineSimpleLine;
