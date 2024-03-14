/***************** 
 * Training Test *
 *****************/


// store info about the experiment session:
let expName = 'training';  // from the Builder filename that created this script
let expInfo = {
    'participant': 'Enter Value',
    'session': 'Enter Value',
    'tokenAudio/Visual': 'Enter Value',
    'distractorsSetting': 'Enter Value',
    'scnHeightCM-vDistance-maxRDKSize': 'Enter Value',
};

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from setBeeps

var _clockTicks;
var _sineSignal;
function generateWave(frequency, duration, sampling = 48000) {
    var _clockTicks, _sineSignal;
    _clockTicks = util.range(Number.parseInt((sampling * duration)));
    _sineSignal = [];
    for (var i, _pj_c = 0, _pj_a = _clockTicks, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        i = _pj_a[_pj_c];
        _sineSignal.push(Math.sin(((((2 * Math.PI) * frequency) / sampling) * i)));
    }
    return _sineSignal;
}

var _signal;
function generateInterval(duration, sampling = 48000) {
    var _signal;
    _signal = [];
    for (var i, _pj_c = 0, _pj_a = util.range(Number.parseInt((duration * sampling))), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        i = _pj_a[_pj_c];
        _signal.push(0);
    }
    return _signal;
}

function hann(i, N) {
    return (0.5 * (1 - Math.cos(((6.283185307179586 * i) / (N - 1)))));
}

var _window;
function hannWindow(N) {
    var _window;
    _window = [];
    for (var i, _pj_c = 0, _pj_a = util.range(N), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        i = _pj_a[_pj_c];
        _window.push(hann(i, N));
    }
    return _window;
}

var _hwSize;
var _length;
function apodize(soundArray, rampSize = 0.005, sampleRate = 48000) {
    var _hwSize, _length, _window;
    _hwSize = Number.parseInt((sampleRate * rampSize));
    _window = hannWindow(((2 * _hwSize) + 1));
    _length = soundArray.length;
    for (var i, _pj_c = 0, _pj_a = util.range(_hwSize), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        i = _pj_a[_pj_c];
        soundArray[i] *= _window[i];
        soundArray[((_length - _hwSize) + i)] *= _window[((_hwSize + 1) + i)];
    }
    return soundArray;
}

var _sineWave;
var _silent;
var _soundBin;
function generateSoundbin(frequency, duration, interval, sampling = 48000, rampSize = 0.005) {
    var _silent, _sineWave, _soundBin;
    _sineWave = generateWave(frequency, duration, sampling);
    _sineWave = apodize(_sineWave, rampSize, sampling);
    _silent = generateInterval(interval, sampling);
    _soundBin = [];
    for (var v, _pj_c = 0, _pj_a = _sineWave, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        v = _pj_a[_pj_c];
        _soundBin.push(v);
    }
    for (var v, _pj_c = 0, _pj_a = _silent, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        v = _pj_a[_pj_c];
        _soundBin.push(v);
    }
    return _soundBin;
}

var _u;
var _v;
var _z;
function gaussianRandom(mean = 0, stdev = 1) {
    var _u, _v, _z;
    _u = (1 - Math.random());
    _v = Math.random();
    _z = (Math.sqrt(((- 2.0) * Math.log(_u))) * Math.cos(((2.0 * Math.PI) * _v)));
    return ((_z * stdev) + mean);
}

var _sequence;
function generateAuditorySequence(nbins, initialFrequency, deltaGauss, toneDuration, interToneInterval, sampling = 48000, rampSize = 0.005, std = 1.0) {
    var _sequence, abin, selected;
    _sequence = [];
    for (var i, _pj_c = 0, _pj_a = util.range(nbins), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        i = _pj_a[_pj_c];
        selected = gaussianRandom((initialFrequency + (deltaGauss * i)), std);
        abin = generateSoundbin(selected, toneDuration, interToneInterval, sampling, rampSize);
        for (var v, _pj_f = 0, _pj_d = abin, _pj_e = _pj_d.length; (_pj_f < _pj_e); _pj_f += 1) {
            v = _pj_d[_pj_f];
            _sequence.push(v);
        }
    }
    return _sequence;
}


function randomDotInCircle(_diameter) {
    const _angle = Math.random()*2*pi;
    const _length = (_diameter/2)*sqrt(Math.random());
    const _xPos = _length*cos(_angle);
    const _yPos = _length*sin(_angle);
    return [_xPos, _yPos];
}


function selectNewDirection(_oldPos, _direction, _speed) {
    if(_direction == 'R') {
        return [_oldPos[0]+_speed, _oldPos[1]];
    }
    else if(_direction == 'L') {
        return [_oldPos[0]-_speed, _oldPos[1]];
    }
    const _angle = Math.random()*2*pi;
    return [_oldPos[0]+(_speed*cos(_angle)), _oldPos[1]+(_speed*sin(_angle))];
}
const MYCONTEXT = new AudioContext();


function createSOURCE(arr) {
  var buffer = MYCONTEXT.createBuffer(1, arr.length, 48000)
  var buf = buffer.getChannelData(0);
  for (var i = 0; i < arr.length; i++) buf[i] = arr[i];
  var source = MYCONTEXT.createBufferSource();
  source.buffer = buffer;
  source.connect(MYCONTEXT.destination);
  return source
}
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0,0,0]),
  units: 'height',
  waitBlanking: true
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(welcomeRoutineBegin());
flowScheduler.add(welcomeRoutineEachFrame());
flowScheduler.add(welcomeRoutineEnd());
const loop_setLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(loop_setLoopBegin(loop_setLoopScheduler));
flowScheduler.add(loop_setLoopScheduler);
flowScheduler.add(loop_setLoopEnd);
flowScheduler.add(endScreenRoutineBegin());
flowScheduler.add(endScreenRoutineEachFrame());
flowScheduler.add(endScreenRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
    {'name': 'parameters.csv', 'path': 'parameters.csv'},
    {'name': 'difficulties.csv', 'path': 'difficulties.csv'},
    {'name': 'audio/_.wav', 'path': 'audio/_.wav'},
    {'name': 'audio/1.wav', 'path': 'audio/1.wav'},
    {'name': 'audio/2.wav', 'path': 'audio/2.wav'},
    {'name': 'audio/3.wav', 'path': 'audio/3.wav'},
    {'name': 'audio/4.wav', 'path': 'audio/4.wav'},
    {'name': 'audio/5.wav', 'path': 'audio/5.wav'},
    {'name': 'audio/6.wav', 'path': 'audio/6.wav'},
    {'name': 'audio/8.wav', 'path': 'audio/8.wav'},
    {'name': 'audio/9.wav', 'path': 'audio/9.wav'},
    {'name': 'audio/F.wav', 'path': 'audio/F.wav'},
    {'name': 'audio/G.wav', 'path': 'audio/G.wav'},
    {'name': 'audio/H.wav', 'path': 'audio/H.wav'},
    {'name': 'audio/J.wav', 'path': 'audio/J.wav'},
    {'name': 'audio/K.wav', 'path': 'audio/K.wav'},
    {'name': 'audio/M.wav', 'path': 'audio/M.wav'},
    {'name': 'audio/N.wav', 'path': 'audio/N.wav'},
    {'name': 'audio/P.wav', 'path': 'audio/P.wav'},
    {'name': 'audio/Q.wav', 'path': 'audio/Q.wav'},
    {'name': 'audio/R.wav', 'path': 'audio/R.wav'},
    {'name': 'audio/S.wav', 'path': 'audio/S.wav'},
    {'name': 'audio/X.wav', 'path': 'audio/X.wav'},
    {'name': 'audio/Y.wav', 'path': 'audio/Y.wav'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2023.1.2';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);


  return Scheduler.Event.NEXT;
}


var welcomeClock;
var key_resp_2;
var text_2;
var prepareClock;
var targets;
var distractors;
var positions;
var enableVisual;
var enableAudio;
var distractorsSetting;
var acousticSetting;
var enableAcoustic;
var acousticTargetMatch;
var rdkSetting;
var enableRDK;
var rdkTargetMatch;
var trialClock;
var screenConfigs;
var heightCM;
var distanceCM;
var degHeight;
var maxRDKSize;
var rdkStartTime;
var rdkDuration;
var rdkSize;
var rdkDotCount;
var rdkAllDots;
var rdkOpacity;
var dotSize;
var SOURCE_START_TIME;
var bigCircle;
var token_bg;
var sound0;
var token0;
var sound1;
var token1;
var sound2;
var token2;
var sound3;
var token3;
var sound4;
var token4;
var sound5;
var token5;
var sound6;
var token6;
var sound7;
var token7;
var answerClock;
var answerBox;
var endBlockClock;
var endBlockText;
var key_resp_3;
var endScreenClock;
var text_3;
var key_resp;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "welcome"
  welcomeClock = new util.Clock();
  key_resp_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  text_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_2',
    text: "You will either HEAR or SEE a sequence of letters and numbers. \n\nType the two numbers in the order that you hear/see them, then press ENTER. The number '0' will not be used.\n\nPress space to start.",
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "prepare"
  prepareClock = new util.Clock();
  // Run 'Begin Experiment' code from set_token
  targets = ["1", "2", "3", "4", "5", "6", "8", "9"];
  distractors = ["F", "G", "H", "J", "K", "M", "N", "P", "Q", "R", "S", "X", "Y"];
  positions = [1, 2, 3, 4, 5];
  
  // Run 'Begin Experiment' code from set_opacity
  enableVisual = expInfo["tokenAudio/Visual"].split("/")[1];
  
  // Run 'Begin Experiment' code from set_sound
  enableAudio = expInfo["tokenAudio/Visual"].split("/")[0];
  
  // Run 'Begin Experiment' code from setBeeps
  distractorsSetting = expInfo["distractorsSetting"].split("/");
  acousticSetting = distractorsSetting[0].split("-");
  enableAcoustic = acousticSetting[1];
  acousticTargetMatch = acousticSetting[2];
  
  // Run 'Begin Experiment' code from setRDKDir
  rdkSetting = distractorsSetting[1].split("-");
  enableRDK = rdkSetting[1];
  rdkTargetMatch = rdkSetting[2];
  
  // Initialize components for Routine "trial"
  trialClock = new util.Clock();
  screenConfigs = expInfo['scnHeightCM-vDistance-maxRDKSize'].split('-');
  
  heightCM = parseFloat(screenConfigs[0])           
  distanceCM = parseFloat(screenConfigs[1])           
  const rad2deg = rad => (rad * 180.0) / Math.PI;
  degHeight = rad2deg(Math.atan2(.5 * heightCM, distanceCM)) / (.5)
  maxRDKSize = parseFloat(screenConfigs[2])
  rdkStartTime = [0.55, 1.1, 1.65, 2.2, 2.75, 3.3, 3.85, 4.4];
  rdkDuration = 0.5;
  rdkSize = 20/degHeight <= maxRDKSize ? 20/degHeight : maxRDKSize;
  rdkDotCount = 200;
  
  rdkAllDots = [];
  
  rdkOpacity = 1;
  
  if(enableRDK !== 'yes') {
      rdkOpacity = 0;
  }
  
  dotSize = 20/degHeight <=maxRDKSize ? 0.2/degHeight : (0.2/degHeight)*maxRDKSize/(20/degHeight)
  for(let i=0; i<rdkDotCount; i++) {
      rdkAllDots[i] = new visual.Polygon({
          win: psychoJS.window, name: 'polygon', unit:'height',
          edges: 512, size:[dotSize,dotSize],
          ori: 0.0, pos: [0, 0],
          anchor: 'center',
          lineWidth: 0.0, 
          colorSpace: 'rgb',
          lineColor: new util.Color('white'),
          fillColor: new util.Color('white'),
          opacity: rdkOpacity, depth: -2.5, interpolate: true,
          });
  }
  
  document.body.style.cursor='none';
  
  SOURCE_START_TIME = [0.55, 1.1, 1.65, 2.2, 2.75, 3.3, 3.85, 4.4];
  bigCircle = new visual.Polygon({
    win: psychoJS.window, name: 'bigCircle', 
    edges: 100, size:[rdkSize, rdkSize],
    ori: 0.0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('black'),
    fillColor: new util.Color('black'),
    opacity: rdkOpacity, depth: -2, interpolate: true,
  });
  
  token_bg = new visual.Polygon({
    win: psychoJS.window, name: 'token_bg', 
    edges: 100, size:[0.15, 0.15],
    ori: 0.0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('gray'),
    fillColor: new util.Color('gray'),
    opacity: undefined, depth: -3, interpolate: true,
  });
  
  sound0 = new sound.Sound({
    win: psychoJS.window,
    value: 'A',
    secs: (- 1),
    });
  sound0.setVolume(1.0);
  token0 = new visual.TextStim({
    win: psychoJS.window,
    name: 'token0',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1.0,
    depth: -5.0 
  });
  
  sound1 = new sound.Sound({
    win: psychoJS.window,
    value: 'A',
    secs: (- 1),
    });
  sound1.setVolume(1.0);
  token1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'token1',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1.0,
    depth: -7.0 
  });
  
  sound2 = new sound.Sound({
    win: psychoJS.window,
    value: 'A',
    secs: (- 1),
    });
  sound2.setVolume(1.0);
  token2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'token2',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1.0,
    depth: -9.0 
  });
  
  sound3 = new sound.Sound({
    win: psychoJS.window,
    value: 'A',
    secs: (- 1),
    });
  sound3.setVolume(1.0);
  token3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'token3',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1.0,
    depth: -11.0 
  });
  
  sound4 = new sound.Sound({
    win: psychoJS.window,
    value: 'A',
    secs: (- 1),
    });
  sound4.setVolume(1.0);
  token4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'token4',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1.0,
    depth: -13.0 
  });
  
  sound5 = new sound.Sound({
    win: psychoJS.window,
    value: 'A',
    secs: (- 1),
    });
  sound5.setVolume(1.0);
  token5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'token5',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1.0,
    depth: -15.0 
  });
  
  sound6 = new sound.Sound({
    win: psychoJS.window,
    value: 'A',
    secs: (- 1),
    });
  sound6.setVolume(1.0);
  token6 = new visual.TextStim({
    win: psychoJS.window,
    name: 'token6',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1.0,
    depth: -17.0 
  });
  
  sound7 = new sound.Sound({
    win: psychoJS.window,
    value: 'A',
    secs: (- 1),
    });
  sound7.setVolume(1.0);
  token7 = new visual.TextStim({
    win: psychoJS.window,
    name: 'token7',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1.0,
    depth: -19.0 
  });
  
  // Initialize components for Routine "answer"
  answerClock = new util.Clock();
  answerBox = new visual.TextBox({
    win: psychoJS.window,
    name: 'answerBox',
    text: '',
    placeholder: undefined,
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.05,
    lineSpacing: 1.0,
    size: [0.2, 0.07],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: true,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  // Initialize components for Routine "endBlock"
  endBlockClock = new util.Clock();
  endBlockText = new visual.TextStim({
    win: psychoJS.window,
    name: 'endBlockText',
    text: 'This is the end of a block. \n\nPress SPACE to continue.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_resp_3 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "endScreen"
  endScreenClock = new util.Clock();
  text_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_3',
    text: 'Press space to end',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var _key_resp_2_allKeys;
var welcomeComponents;
function welcomeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'welcome' ---
    t = 0;
    welcomeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_resp_2.keys = undefined;
    key_resp_2.rt = undefined;
    _key_resp_2_allKeys = [];
    // keep track of which components have finished
    welcomeComponents = [];
    welcomeComponents.push(key_resp_2);
    welcomeComponents.push(text_2);
    
    welcomeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function welcomeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'welcome' ---
    // get current time
    t = welcomeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *key_resp_2* updates
    if (t >= 0.0 && key_resp_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_2.tStart = t;  // (not accounting for frame time here)
      key_resp_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_2.clearEvents(); });
    }

    if (key_resp_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_2.getKeys({keyList: ['y', 'n', 'left', 'right', 'space'], waitRelease: false});
      _key_resp_2_allKeys = _key_resp_2_allKeys.concat(theseKeys);
      if (_key_resp_2_allKeys.length > 0) {
        key_resp_2.keys = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].name;  // just the last key pressed
        key_resp_2.rt = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *text_2* updates
    if (t >= 0.0 && text_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_2.tStart = t;  // (not accounting for frame time here)
      text_2.frameNStart = frameN;  // exact frame index
      
      text_2.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    welcomeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function welcomeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'welcome' ---
    welcomeComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    key_resp_2.stop();
    // the Routine "welcome" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var loop_set;
function loop_setLoopBegin(loop_setLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop_set = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'parameters.csv',
      seed: undefined, name: 'loop_set'
    });
    psychoJS.experiment.addLoop(loop_set); // add the loop to the experiment
    currentLoop = loop_set;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    loop_set.forEach(function() {
      snapshot = loop_set.getSnapshot();
    
      loop_setLoopScheduler.add(importConditions(snapshot));
      const blocksLoopScheduler = new Scheduler(psychoJS);
      loop_setLoopScheduler.add(blocksLoopBegin(blocksLoopScheduler, snapshot));
      loop_setLoopScheduler.add(blocksLoopScheduler);
      loop_setLoopScheduler.add(blocksLoopEnd);
      loop_setLoopScheduler.add(loop_setLoopEndIteration(loop_setLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var blocks;
function blocksLoopBegin(blocksLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    blocks = new TrialHandler({
      psychoJS: psychoJS,
      nReps: nBlocks, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'blocks'
    });
    psychoJS.experiment.addLoop(blocks); // add the loop to the experiment
    currentLoop = blocks;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    blocks.forEach(function() {
      snapshot = blocks.getSnapshot();
    
      blocksLoopScheduler.add(importConditions(snapshot));
      const trialsLoopScheduler = new Scheduler(psychoJS);
      blocksLoopScheduler.add(trialsLoopBegin(trialsLoopScheduler, snapshot));
      blocksLoopScheduler.add(trialsLoopScheduler);
      blocksLoopScheduler.add(trialsLoopEnd);
      blocksLoopScheduler.add(endBlockRoutineBegin(snapshot));
      blocksLoopScheduler.add(endBlockRoutineEachFrame());
      blocksLoopScheduler.add(endBlockRoutineEnd(snapshot));
      blocksLoopScheduler.add(blocksLoopEndIteration(blocksLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var trials;
function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: nreps, method: TrialHandler.Method.FULLRANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'difficulties.csv',
      seed: undefined, name: 'trials'
    });
    psychoJS.experiment.addLoop(trials); // add the loop to the experiment
    currentLoop = trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    trials.forEach(function() {
      snapshot = trials.getSnapshot();
    
      trialsLoopScheduler.add(importConditions(snapshot));
      trialsLoopScheduler.add(prepareRoutineBegin(snapshot));
      trialsLoopScheduler.add(prepareRoutineEachFrame());
      trialsLoopScheduler.add(prepareRoutineEnd(snapshot));
      trialsLoopScheduler.add(trialRoutineBegin(snapshot));
      trialsLoopScheduler.add(trialRoutineEachFrame());
      trialsLoopScheduler.add(trialRoutineEnd(snapshot));
      trialsLoopScheduler.add(answerRoutineBegin(snapshot));
      trialsLoopScheduler.add(answerRoutineEachFrame());
      trialsLoopScheduler.add(answerRoutineEnd(snapshot));
      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function trialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trialsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function blocksLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(blocks);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function blocksLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function loop_setLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(loop_set);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function loop_setLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var temp;
var posA;
var posB;
var token;
var OPACITY;
var soundArray;
var path;
var _pj;
var beeps;
var BEEPDIRTARGET;
var BEEPDIRNONTARGET;
var beepDir;
var beep;
var rdkDir;
var RDKSIGNALDIR;
var RDKSIGOPPOSITEDIR;
var nonSignalPos;
var prepareComponents;
function prepareRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'prepare' ---
    t = 0;
    prepareClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from set_token
    util.shuffle(targets);
    util.shuffle(distractors);
    util.shuffle(positions);
    [posA, posB] = [positions[0], positions[1]];
    if ((posA > posB)) {
        temp = posA;
        posA = posB;
        posB = temp;
    }
    token = [];
    for (var x, _pj_c = 0, _pj_a = distractors.slice(0, posA), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        x = _pj_a[_pj_c];
        token.push(x);
    }
    token.push(targets[0]);
    for (var x, _pj_c = 0, _pj_a = distractors.slice(posA, posB), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        x = _pj_a[_pj_c];
        token.push(x);
    }
    token.push(targets[1]);
    for (var x, _pj_c = 0, _pj_a = distractors.slice(posB, 6), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        x = _pj_a[_pj_c];
        token.push(x);
    }
    
    // Run 'Begin Routine' code from set_opacity
    if ((enableVisual.toLowerCase() !== "yes")) {
        OPACITY = 0;
    } else {
        OPACITY = opacity;
    }
    
    // Run 'Begin Routine' code from set_sound
    soundArray = [];
    path = "";
    for (var tok, _pj_c = 0, _pj_a = token, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        tok = _pj_a[_pj_c];
        if ((enableAudio.toLowerCase() === "yes")) {
            path = (("audio/" + tok) + ".wav");
        } else {
            path = "audio/_.wav";
        }
        soundArray.push(path);
    }
    
    // Run 'Begin Routine' code from setBeeps
    var _pj;
    function _pj_snippets(container) {
        function in_es6(left, right) {
            if (((right instanceof Array) || ((typeof right) === "string"))) {
                return (right.indexOf(left) > (- 1));
            } else {
                if (((right instanceof Map) || (right instanceof Set) || (right instanceof WeakMap) || (right instanceof WeakSet))) {
                    return right.has(left);
                } else {
                    return (left in right);
                }
            }
        }
        container["in_es6"] = in_es6;
        return container;
    }
    _pj = {};
    _pj_snippets(_pj);
    beeps = [];
    BEEPDIRTARGET = 1;
    BEEPDIRNONTARGET = (- 1);
    if ((acousticTargetMatch !== "up")) {
        BEEPDIRTARGET = (- 1);
        BEEPDIRNONTARGET = 1;
    }
    beepDir = BEEPDIRNONTARGET;
    beep = [];
    for (var tok, _pj_c = 0, _pj_a = token, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        tok = _pj_a[_pj_c];
        if (_pj.in_es6(tok, targets)) {
            beepDir = BEEPDIRTARGET;
        } else {
            beepDir = BEEPDIRNONTARGET;
        }
        beep = generateAuditorySequence(nbins, initialFrequency, (deltaGauss * beepDir), toneDuration, interToneInterval, 48000, rampSize, stdevTone);
        beeps.push(beep);
    }
    
    // Run 'Begin Routine' code from setRDKDir
    var _pj;
    function _pj_snippets(container) {
        function in_es6(left, right) {
            if (((right instanceof Array) || ((typeof right) === "string"))) {
                return (right.indexOf(left) > (- 1));
            } else {
                if (((right instanceof Map) || (right instanceof Set) || (right instanceof WeakMap) || (right instanceof WeakSet))) {
                    return right.has(left);
                } else {
                    return (left in right);
                }
            }
        }
        container["in_es6"] = in_es6;
        return container;
    }
    _pj = {};
    _pj_snippets(_pj);
    rdkDir = [];
    RDKSIGNALDIR = "L";
    RDKSIGOPPOSITEDIR = "R";
    if ((rdkTargetMatch !== "L")) {
        RDKSIGNALDIR = "R";
        RDKSIGOPPOSITEDIR = "L";
    }
    nonSignalPos = [];
    for (var i, _pj_c = 0, _pj_a = util.range(token.length), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        i = _pj_a[_pj_c];
        if (_pj.in_es6(token[i], targets)) {
            rdkDir.push(RDKSIGNALDIR);
        } else {
            nonSignalPos.push(i);
            rdkDir.push("_");
        }
    }
    util.shuffle(nonSignalPos);
    rdkDir[nonSignalPos[0]] = RDKSIGOPPOSITEDIR;
    rdkDir[nonSignalPos[1]] = RDKSIGOPPOSITEDIR;
    
    // keep track of which components have finished
    prepareComponents = [];
    
    prepareComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function prepareRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'prepare' ---
    // get current time
    t = prepareClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    prepareComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function prepareRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'prepare' ---
    prepareComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "prepare" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var rdkIndex;
var rdkStatus;
var rdkNoise;
var rdkSignal;
var REALRDKSPEED;
var signalCount;
var SOURCES;
var SOURCE_STARTED;
var trialComponents;
function trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'trial' ---
    t = 0;
    trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    //rdkLifeTime = 4;
    //rdkSpeed = 0.01;
    //rdkCoherence = 1;
    //rdkDir = ['L', 'R', '_', 'L', 'R', '_', '_', '_'];
    
    rdkIndex = 0;
    rdkStatus = PsychoJS.Status.NOT_STARTED;
    
    rdkNoise = [];
    rdkSignal = [];
    
    REALRDKSPEED = 20/degHeight <=maxRDKSize ? (rdkSpeed * psychoJS.window.monitorFramePeriod)/degHeight : ((rdkSpeed * psychoJS.window.monitorFramePeriod)/degHeight)*maxRDKSize/(20/degHeight)
    
    signalCount = round(rdkDotCount*rdkCoherence);
    for(let i=0; i<signalCount; i++) {
        rdkSignal[i] = rdkAllDots[i];
    }
    
    for(let i=signalCount; i<rdkDotCount; i++) {
        rdkNoise[i-signalCount] = rdkAllDots[i];
    }
    SOURCES = [];
    SOURCE_STARTED = [];
    for(let i=0; i<beeps.length; i++) {
        if (enableAcoustic !== 'yes') {
            SOURCE_STARTED[i] = true;
        } else {
            SOURCES[i] = createSOURCE(beeps[i]);
            SOURCE_STARTED[i] = false;
        }
    }
    sound0.setValue(soundArray[0]);
    sound0.setVolume(1.0);
    token0.setOpacity(OPACITY);
    token0.setText(token[0]);
    sound1.setValue(soundArray[1]);
    sound1.setVolume(1.0);
    token1.setOpacity(OPACITY);
    token1.setText(token[1]);
    sound2.setValue(soundArray[2]);
    sound2.setVolume(1.0);
    token2.setOpacity(OPACITY);
    token2.setText(token[2]);
    sound3.setValue(soundArray[3]);
    sound3.setVolume(1.0);
    token3.setOpacity(OPACITY);
    token3.setText(token[3]);
    sound4.setValue(soundArray[4]);
    sound4.setVolume(1.0);
    token4.setOpacity(OPACITY);
    token4.setText(token[4]);
    sound5.setValue(soundArray[5]);
    sound5.setVolume(1.0);
    token5.setOpacity(OPACITY);
    token5.setText(token[5]);
    sound6.setValue(soundArray[6]);
    sound6.setVolume(1.0);
    token6.setOpacity(OPACITY);
    token6.setText(token[6]);
    sound7.setValue(soundArray[7]);
    sound7.setVolume(1.0);
    token7.setOpacity(OPACITY);
    token7.setText(token[7]);
    // keep track of which components have finished
    trialComponents = [];
    trialComponents.push(bigCircle);
    trialComponents.push(token_bg);
    trialComponents.push(sound0);
    trialComponents.push(token0);
    trialComponents.push(sound1);
    trialComponents.push(token1);
    trialComponents.push(sound2);
    trialComponents.push(token2);
    trialComponents.push(sound3);
    trialComponents.push(token3);
    trialComponents.push(sound4);
    trialComponents.push(token4);
    trialComponents.push(sound5);
    trialComponents.push(token5);
    trialComponents.push(sound6);
    trialComponents.push(token6);
    trialComponents.push(sound7);
    trialComponents.push(token7);
    
    trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'trial' ---
    // get current time
    t = trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    if (t >= rdkStartTime[rdkIndex] && rdkStatus !== PsychoJS.Status.STARTED) {
        for(const _dotComp of rdkSignal) {
            _dotComp.frameNStart = frameN;
            _dotComp.setPos(randomDotInCircle(rdkSize));
            _dotComp.setAutoDraw(true);
        }
        for(const _dotComp of rdkNoise) {
            _dotComp.frameNStart = frameN;
            _dotComp.setPos(randomDotInCircle(rdkSize));
            _dotComp.setAutoDraw(true);
        }
        rdkStatus = PsychoJS.Status.STARTED;
    }
    
    if(rdkStatus === PsychoJS.Status.STARTED) {
        for(const _dotComp of rdkSignal) {
            const oldPos = _dotComp.pos;
            const newPos = selectNewDirection(oldPos, rdkDir[rdkIndex], REALRDKSPEED);
            _dotComp.setPos(newPos);
            if(newPos[0]*newPos[0] + newPos[1]*newPos[1] > (rdkSize/2)*(rdkSize/2) || 
               frameN - _dotComp.frameNStart > rdkLifeTime) {
                _dotComp.frameNStart = frameN;
                _dotComp.setPos(randomDotInCircle(rdkSize));
            }  
        }
        for(const _dotComp of rdkNoise) {
            const oldPos = _dotComp.pos;
            const newPos = selectNewDirection(oldPos, '_', REALRDKSPEED);
            _dotComp.setPos(newPos);
            if(newPos[0]*newPos[0] + newPos[1]*newPos[1] > (rdkSize/2)*(rdkSize/2) || 
               frameN - _dotComp.frameNStart > rdkLifeTime) {
                _dotComp.frameNStart = frameN;
                _dotComp.setPos(randomDotInCircle(rdkSize));
            }
        }
    }
    
    frameRemains = rdkStartTime[rdkIndex] + rdkDuration - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (rdkStatus === PsychoJS.Status.STARTED && t >= frameRemains) {
        for(const _dotComp of rdkSignal) {
            _dotComp.setAutoDraw(false);
        } 
        for(const _dotComp of rdkNoise) {
            _dotComp.setAutoDraw(false);
        }
        rdkIndex = (rdkIndex + 1) % rdkStartTime.length;
        rdkStatus = PsychoJS.Status.STOPPED;
    }
    for(let i=0; i<SOURCE_START_TIME.length; i++) {
        if(t>= SOURCE_START_TIME[i] && SOURCE_STARTED[i]==false) {
            SOURCES[i].start(0);
            SOURCE_STARTED[i] = true;
        }
    }
    
    // *bigCircle* updates
    if (t >= 0.55 && bigCircle.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      bigCircle.tStart = t;  // (not accounting for frame time here)
      bigCircle.frameNStart = frameN;  // exact frame index
      
      bigCircle.setAutoDraw(true);
    }

    frameRemains = 5  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((bigCircle.status === PsychoJS.Status.STARTED || bigCircle.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      bigCircle.setAutoDraw(false);
    }
    
    // *token_bg* updates
    if (t >= 0.55 && token_bg.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      token_bg.tStart = t;  // (not accounting for frame time here)
      token_bg.frameNStart = frameN;  // exact frame index
      
      token_bg.setAutoDraw(true);
    }

    frameRemains = 5  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((token_bg.status === PsychoJS.Status.STARTED || token_bg.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      token_bg.setAutoDraw(false);
    }
    // start/stop sound0
    if (t >= 0.625 && sound0.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sound0.tStart = t;  // (not accounting for frame time here)
      sound0.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ sound0.play(); });  // screen flip
      sound0.status = PsychoJS.Status.STARTED;
    }
    if (t >= (sound0.getDuration() + sound0.tStart)     && sound0.status === PsychoJS.Status.STARTED) {
      sound0.stop();  // stop the sound (if longer than duration)
      sound0.status = PsychoJS.Status.FINISHED;
    }
    
    // *token0* updates
    if (t >= 0.625 && token0.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      token0.tStart = t;  // (not accounting for frame time here)
      token0.frameNStart = frameN;  // exact frame index
      
      token0.setAutoDraw(true);
    }

    frameRemains = 0.625 + 0.35 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (token0.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      token0.setAutoDraw(false);
    }
    // start/stop sound1
    if (t >= 1.175 && sound1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sound1.tStart = t;  // (not accounting for frame time here)
      sound1.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ sound1.play(); });  // screen flip
      sound1.status = PsychoJS.Status.STARTED;
    }
    if (t >= (sound1.getDuration() + sound1.tStart)     && sound1.status === PsychoJS.Status.STARTED) {
      sound1.stop();  // stop the sound (if longer than duration)
      sound1.status = PsychoJS.Status.FINISHED;
    }
    
    // *token1* updates
    if (t >= 1.175 && token1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      token1.tStart = t;  // (not accounting for frame time here)
      token1.frameNStart = frameN;  // exact frame index
      
      token1.setAutoDraw(true);
    }

    frameRemains = 1.175 + 0.35 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (token1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      token1.setAutoDraw(false);
    }
    // start/stop sound2
    if (t >= 1.725 && sound2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sound2.tStart = t;  // (not accounting for frame time here)
      sound2.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ sound2.play(); });  // screen flip
      sound2.status = PsychoJS.Status.STARTED;
    }
    if (t >= (sound2.getDuration() + sound2.tStart)     && sound2.status === PsychoJS.Status.STARTED) {
      sound2.stop();  // stop the sound (if longer than duration)
      sound2.status = PsychoJS.Status.FINISHED;
    }
    
    // *token2* updates
    if (t >= 1.725 && token2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      token2.tStart = t;  // (not accounting for frame time here)
      token2.frameNStart = frameN;  // exact frame index
      
      token2.setAutoDraw(true);
    }

    frameRemains = 1.725 + 0.35 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (token2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      token2.setAutoDraw(false);
    }
    // start/stop sound3
    if (t >= 2.275 && sound3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sound3.tStart = t;  // (not accounting for frame time here)
      sound3.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ sound3.play(); });  // screen flip
      sound3.status = PsychoJS.Status.STARTED;
    }
    if (t >= (sound3.getDuration() + sound3.tStart)     && sound3.status === PsychoJS.Status.STARTED) {
      sound3.stop();  // stop the sound (if longer than duration)
      sound3.status = PsychoJS.Status.FINISHED;
    }
    
    // *token3* updates
    if (t >= 2.275 && token3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      token3.tStart = t;  // (not accounting for frame time here)
      token3.frameNStart = frameN;  // exact frame index
      
      token3.setAutoDraw(true);
    }

    frameRemains = 2.275 + 0.35 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (token3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      token3.setAutoDraw(false);
    }
    // start/stop sound4
    if (t >= 2.825 && sound4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sound4.tStart = t;  // (not accounting for frame time here)
      sound4.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ sound4.play(); });  // screen flip
      sound4.status = PsychoJS.Status.STARTED;
    }
    if (t >= (sound4.getDuration() + sound4.tStart)     && sound4.status === PsychoJS.Status.STARTED) {
      sound4.stop();  // stop the sound (if longer than duration)
      sound4.status = PsychoJS.Status.FINISHED;
    }
    
    // *token4* updates
    if (t >= 2.825 && token4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      token4.tStart = t;  // (not accounting for frame time here)
      token4.frameNStart = frameN;  // exact frame index
      
      token4.setAutoDraw(true);
    }

    frameRemains = 2.825 + 0.35 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (token4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      token4.setAutoDraw(false);
    }
    // start/stop sound5
    if (t >= 3.375 && sound5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sound5.tStart = t;  // (not accounting for frame time here)
      sound5.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ sound5.play(); });  // screen flip
      sound5.status = PsychoJS.Status.STARTED;
    }
    if (t >= (sound5.getDuration() + sound5.tStart)     && sound5.status === PsychoJS.Status.STARTED) {
      sound5.stop();  // stop the sound (if longer than duration)
      sound5.status = PsychoJS.Status.FINISHED;
    }
    
    // *token5* updates
    if (t >= 3.375 && token5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      token5.tStart = t;  // (not accounting for frame time here)
      token5.frameNStart = frameN;  // exact frame index
      
      token5.setAutoDraw(true);
    }

    frameRemains = 3.375 + 0.35 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (token5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      token5.setAutoDraw(false);
    }
    // start/stop sound6
    if (t >= 3.925 && sound6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sound6.tStart = t;  // (not accounting for frame time here)
      sound6.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ sound6.play(); });  // screen flip
      sound6.status = PsychoJS.Status.STARTED;
    }
    if (t >= (sound6.getDuration() + sound6.tStart)     && sound6.status === PsychoJS.Status.STARTED) {
      sound6.stop();  // stop the sound (if longer than duration)
      sound6.status = PsychoJS.Status.FINISHED;
    }
    
    // *token6* updates
    if (t >= 3.925 && token6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      token6.tStart = t;  // (not accounting for frame time here)
      token6.frameNStart = frameN;  // exact frame index
      
      token6.setAutoDraw(true);
    }

    frameRemains = 3.925 + 0.35 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (token6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      token6.setAutoDraw(false);
    }
    // start/stop sound7
    if (t >= 4.475 && sound7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sound7.tStart = t;  // (not accounting for frame time here)
      sound7.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ sound7.play(); });  // screen flip
      sound7.status = PsychoJS.Status.STARTED;
    }
    if (t >= (sound7.getDuration() + sound7.tStart)     && sound7.status === PsychoJS.Status.STARTED) {
      sound7.stop();  // stop the sound (if longer than duration)
      sound7.status = PsychoJS.Status.FINISHED;
    }
    
    // *token7* updates
    if (t >= 4.475 && token7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      token7.tStart = t;  // (not accounting for frame time here)
      token7.frameNStart = frameN;  // exact frame index
      
      token7.setAutoDraw(true);
    }

    frameRemains = 4.475 + 0.35 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (token7.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      token7.setAutoDraw(false);
    }
    // Run 'Each Frame' code from makeRoutineEnd
    if ((t > 5)) {
        continueRoutine = false;
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'trial' ---
    trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    for(const _dotComp of rdkSignal) {
        if (typeof _dotComp.setAutoDraw === 'function') {
            _dotComp.setAutoDraw(false);
        }
    }
    
    for(const _dotComp of rdkNoise) {
        if (typeof _dotComp.setAutoDraw === 'function') {
            _dotComp.setAutoDraw(false);
        }
    }
    sound0.stop();  // ensure sound has stopped at end of routine
    sound1.stop();  // ensure sound has stopped at end of routine
    sound2.stop();  // ensure sound has stopped at end of routine
    sound3.stop();  // ensure sound has stopped at end of routine
    sound4.stop();  // ensure sound has stopped at end of routine
    sound5.stop();  // ensure sound has stopped at end of routine
    sound6.stop();  // ensure sound has stopped at end of routine
    sound7.stop();  // ensure sound has stopped at end of routine
    // the Routine "trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var answerComponents;
function answerRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'answer' ---
    t = 0;
    answerClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(3.000000);
    // update component parameters for each repeat
    answerBox.setText('');
    answerBox.refresh();
    document.addEventListener('keydown', event => {
        console.log(`User pressed: ${event.key}`);
        if(['0','1','2','3','4','5','6','7','8','9'].includes(event.key) && answerBox.text.length < 2) {
            return true;
        }
        if(event.key === "Backspace" || event.key === "Enter") {
            return true;
        }
        event.preventDefault();
        return false;
    });
    // keep track of which components have finished
    answerComponents = [];
    answerComponents.push(answerBox);
    
    answerComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function answerRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'answer' ---
    // get current time
    t = answerClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *answerBox* updates
    if (t >= 0.0 && answerBox.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      answerBox.tStart = t;  // (not accounting for frame time here)
      answerBox.frameNStart = frameN;  // exact frame index
      
      answerBox.setAutoDraw(true);
    }

    frameRemains = 0.0 + 3 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (answerBox.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      answerBox.setAutoDraw(false);
    }
    if (answerBox.text.includes('\n')) {
        continueRoutine = false;
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    answerComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var target;
function answerRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'answer' ---
    answerComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('answerBox.text',answerBox.text)
    // Run 'End Routine' code from onlyNumber
    
    
    if ((answerBox.text.length > 2)) {
        answerBox.text = answerBox.text.slice(0, 2);
    }
    
    // Run 'End Routine' code from addionalData
    trials.addData("answerTime", t);
    trials.addData("token", token);
    target = targets.slice(0, 2);
    trials.addData("target", target);
    if ((answerBox.text.length === 2)) {
        if (((answerBox.text[0] === target[0]) && (answerBox.text[1] === target[1]))) {
            trials.addData("correct", 1);
        } else {
            trials.addData("correct", 0);
        }
    } else {
        trials.addData("correct", 0);
    }
    trials.addData("taskType", ((expInfo["enableAudio"] === "yes") ? "audio" : "visual"));
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_resp_3_allKeys;
var endBlockComponents;
function endBlockRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'endBlock' ---
    t = 0;
    endBlockClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_resp_3.keys = undefined;
    key_resp_3.rt = undefined;
    _key_resp_3_allKeys = [];
    // keep track of which components have finished
    endBlockComponents = [];
    endBlockComponents.push(endBlockText);
    endBlockComponents.push(key_resp_3);
    
    endBlockComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function endBlockRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'endBlock' ---
    // get current time
    t = endBlockClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *endBlockText* updates
    if (t >= 0.0 && endBlockText.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      endBlockText.tStart = t;  // (not accounting for frame time here)
      endBlockText.frameNStart = frameN;  // exact frame index
      
      endBlockText.setAutoDraw(true);
    }

    
    // *key_resp_3* updates
    if (t >= 0.0 && key_resp_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_3.tStart = t;  // (not accounting for frame time here)
      key_resp_3.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_3.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_3.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_3.clearEvents(); });
    }

    if (key_resp_3.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_3.getKeys({keyList: ['y', 'n', 'left', 'right', 'space'], waitRelease: false});
      _key_resp_3_allKeys = _key_resp_3_allKeys.concat(theseKeys);
      if (_key_resp_3_allKeys.length > 0) {
        key_resp_3.keys = _key_resp_3_allKeys[_key_resp_3_allKeys.length - 1].name;  // just the last key pressed
        key_resp_3.rt = _key_resp_3_allKeys[_key_resp_3_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    endBlockComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function endBlockRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'endBlock' ---
    endBlockComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    key_resp_3.stop();
    // the Routine "endBlock" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_resp_allKeys;
var endScreenComponents;
function endScreenRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'endScreen' ---
    t = 0;
    endScreenClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_resp.keys = undefined;
    key_resp.rt = undefined;
    _key_resp_allKeys = [];
    // keep track of which components have finished
    endScreenComponents = [];
    endScreenComponents.push(text_3);
    endScreenComponents.push(key_resp);
    
    endScreenComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function endScreenRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'endScreen' ---
    // get current time
    t = endScreenClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_3* updates
    if (t >= 0.0 && text_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_3.tStart = t;  // (not accounting for frame time here)
      text_3.frameNStart = frameN;  // exact frame index
      
      text_3.setAutoDraw(true);
    }

    
    // *key_resp* updates
    if (t >= 0.0 && key_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp.tStart = t;  // (not accounting for frame time here)
      key_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp.clearEvents(); });
    }

    if (key_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp.getKeys({keyList: ['y', 'n', 'left', 'right', 'space'], waitRelease: false});
      _key_resp_allKeys = _key_resp_allKeys.concat(theseKeys);
      if (_key_resp_allKeys.length > 0) {
        key_resp.keys = _key_resp_allKeys[_key_resp_allKeys.length - 1].name;  // just the last key pressed
        key_resp.rt = _key_resp_allKeys[_key_resp_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    endScreenComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function endScreenRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'endScreen' ---
    endScreenComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    key_resp.stop();
    // the Routine "endScreen" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
