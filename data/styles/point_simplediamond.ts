import { Style } from 'geostyler-style';

const pointSimpleDiamond: Style = {
  name: 'Simple Diamond',
  rules: [{
    name: 'Small populated New Yorks',
    symbolizers: [{
      kind: 'Mark',
      wellKnownName: 'diamond',
      color: '#FF0000',
      radius: 5,
      strokeColor: '#000000',
      strokeWidth: 2,
      opacity: 1,
      rotate: 45
    }]
  }]
};

export default pointSimpleDiamond;
