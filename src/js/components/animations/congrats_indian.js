const dur = 1500,
      dur2 = dur - 500,
      posL = 0,
      posT = 0;

const pos_opts = {
  top: 0,
  left: 0
}

const burst1 = new mojs.Burst({
  ...pos_opts,
  radius:   { 0: 70 },
  count:    12,
  children: {
    shape:      'cross',
    stroke:     { 'cyan' : 'grey' },
    strokeWidth: { 4 : 1 },
    radius:     30,
    angle:      { 360: 0 },
    duration:   dur
  }
});

const burst2 = new mojs.Burst({
  ...pos_opts,
  radius:   { 0: 70 },
  count:    15,
  children: {
    shape:        'zigzag',
    points:       6, 
    fill:         'none',
    stroke:       { 'magenta' : 'grey' },
    strokeWidth:  { 3 : 1 },
    radius:       30,
    angle:        { '-360' : 0 },
    duration:     dur
  }
});

const burst3 = new mojs.Burst({
  ...pos_opts,
  radius:   { 0: 150 },
  count:    8,
  children: {
    shape:        'rect',
    fill:         { 'yellow' : 'grey' },
    radius:       20,
    radiusY:      { 5 : 1 },
    duration:     dur
  }
});

const burst4 = new mojs.Burst({
  ...pos_opts,
  radius:   { 0: 50 },
  angle:    { 70 : 0 },
  children: {
    oapcity:      { 1 : 0 },
    radius:       5,
    duration:     dur2
  }
});

const circ_opts = {
  ...pos_opts,
  shape:    'circle',
  fill:      'none',
  stroke:    { 'yellow' : 'black' },  
  strokeWidth: { 10 : 1},
  duration:  dur2
};

const circ = new mojs.Shape({
  ...pos_opts,
  ...circ_opts,
  radius:   { 0: 150 },
  opacity:    { 1 : 0 }
});

const circ2 = new mojs.Shape({
  ...pos_opts,
  ... circ_opts,
  opacity:    { 0.5 : 0 },
  radius:     { 0: 100 },
  delay: 300
});

const master = new mojs.Timeline()
.add( burst1, burst2, burst3, burst4, circ, circ2 );


const execute = (e) =>{
  const coords = { x: e.pageX, y: e.pageY };
  
  burst1.tune(coords);
  burst2.tune(coords);
  burst3.tune(coords);
  burst4.tune(coords);
  circ.tune(coords);
  circ2.tune(coords);
  
  master.replay();
}

export default { execute };