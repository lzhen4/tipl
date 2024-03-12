#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2023.1.2),
    on February 24, 2024, at 12:43
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

import psychopy
psychopy.useVersion('2023.1.2')


# --- Import packages ---
from psychopy import locale_setup
from psychopy import prefs
from psychopy import plugins
plugins.activatePlugins()
prefs.hardware['audioLib'] = 'ptb'
prefs.hardware['audioLatencyMode'] = '1'
from psychopy import sound, gui, visual, core, data, event, logging, clock, colors, layout
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle, choice as randchoice
import os  # handy system and path functions
import sys  # to get file system encoding

import psychopy.iohub as io
from psychopy.hardware import keyboard

# Run 'Before Experiment' code from setBeeps
def generateWave(frequency, duration,sampling=48000) :
    # frequency : in Hz
    # duration : in seconds
    _clockTicks = range(int(sampling*duration))
    _sineSignal = []
    for i in _clockTicks :
        _sineSignal.append(sin((2*pi*frequency/sampling)*i))
    return _sineSignal
    
def generateInterval(duration, sampling=48000) :
    _signal = []
    for i in range(int(duration*sampling)) :
        _signal.append(0)
    return _signal

def hann (i,N) :
    return 0.5*(1 - cos(6.283185307179586*i/(N-1)))

def hannWindow(N) :
    _window = []
    for i in range(N) :
        _window.append(hann(i,N))
    return _window

def apodize(soundArray, rampSize=0.005, sampleRate=48000) :
    # rampSize in seconds
    _hwSize = int(sampleRate * rampSize)
    _window = hannWindow(2*_hwSize + 1)
    _length = len(soundArray)
    for i in range(_hwSize) :
        soundArray[i] *= _window[i]
        soundArray[_length-_hwSize+i] *= _window[_hwSize+1+i]
    return soundArray    

def generateSoundbin(frequency, duration, interval, sampling=48000, rampSize=0.005) :
    # Generate a pip
    _sineWave = generateWave(frequency, duration, sampling)
    #
    #sine_wave = apply_compensation(sine_wave, sampling=sampling)
    # apply hann window
    _sineWave = apodize(_sineWave, rampSize, sampling)
    # add inter-pip interval
    _silent = generateInterval(interval, sampling)
    
    _soundBin = []
    for v in _sineWave :
        _soundBin.append(v)
    for v in _silent :
        _soundBin.append(v)
    return _soundBin
    
def gaussianRandom(mean=0, stdev=1) :
    _u = 1 - random() # Converting [0,1) to (0,1]
    _v = random()
    _z = sqrt( -2.0 * log( _u ) ) * cos( 2.0 * pi * _v )
    # Transform to the desired mean and standard deviation:
    return _z * stdev + mean
    
def generateAuditorySequence(nbins, initialFrequency, 
                               deltaGauss, toneDuration, 
                               interToneInterval, 
                               sampling=48000, 
                               rampSize=0.005,
                               std=1.0) :
    _sequence = []
    for i in range(nbins) :
        selected = gaussianRandom(initialFrequency + deltaGauss*i, std)
        abin = generateSoundbin(selected, 
                                toneDuration, 
                                interToneInterval, 
                                sampling, 
                                rampSize)
        for v in abin :
            _sequence.append(v)
    return _sequence



# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_thisDir)
# Store info about the experiment session
psychopyVersion = '2023.1.2'
expName = 'training'  # from the Builder filename that created this script
expInfo = {
    'participant': f"{randint(0, 999999):06.0f}",
    'session': '001',
    'tokenAudio/Visual': 'no/yes',
    'distractorsSetting': 'aco-yes-up/rdk-yes-L',
    'deltaGauss': '20',
    'rdkCoherence': '0.75',
}
# --- Show participant info dialog --
dlg = gui.DlgFromDict(dictionary=expInfo, sortKeys=False, title=expName)
if dlg.OK == False:
    core.quit()  # user pressed cancel
expInfo['date'] = data.getDateStr()  # add a simple timestamp
expInfo['expName'] = expName
expInfo['psychopyVersion'] = psychopyVersion

# Data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
filename = _thisDir + os.sep + u'data/%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])

# An ExperimentHandler isn't essential but helps with data saving
thisExp = data.ExperimentHandler(name=expName, version='',
    extraInfo=expInfo, runtimeInfo=None,
    originPath='C:\\Users\\waris\\Desktop\\training\\training_lastrun.py',
    savePickle=True, saveWideText=True,
    dataFileName=filename)
# save a log file for detail verbose info
logFile = logging.LogFile(filename+'.log', level=logging.EXP)
logging.console.setLevel(logging.WARNING)  # this outputs to the screen, not a file

endExpNow = False  # flag for 'escape' or other condition => quit the exp
frameTolerance = 0.001  # how close to onset before 'same' frame

# Start Code - component code to be run after the window creation

# --- Setup the Window ---
win = visual.Window(
    size=[1280, 720], fullscr=True, screen=3, 
    winType='pyglet', allowStencil=True,
    monitor='testMonitor', color=[0,0,0], colorSpace='rgb',
    backgroundImage='', backgroundFit='none',
    blendMode='avg', useFBO=True, 
    units='height')
win.mouseVisible = False
# store frame rate of monitor if we can measure it
expInfo['frameRate'] = win.getActualFrameRate()
if expInfo['frameRate'] != None:
    frameDur = 1.0 / round(expInfo['frameRate'])
else:
    frameDur = 1.0 / 60.0  # could not measure, so guess
# --- Setup input devices ---
ioConfig = {}

# Setup iohub keyboard
ioConfig['Keyboard'] = dict(use_keymap='psychopy')

ioSession = '1'
if 'session' in expInfo:
    ioSession = str(expInfo['session'])
ioServer = io.launchHubServer(window=win, **ioConfig)
eyetracker = None

# create a default keyboard (e.g. to check for escape)
defaultKeyboard = keyboard.Keyboard(backend='iohub')

# --- Initialize components for Routine "welcome" ---
key_resp_2 = keyboard.Keyboard()
text_2 = visual.TextStim(win=win, name='text_2',
    text='Press space to start',
    font='Arial',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);

# --- Initialize components for Routine "prepare" ---
# Run 'Begin Experiment' code from set_token
targets = ['1','2','3','4','5','6','8','9']
distractors = ['F','G','H','J','K','M','N','P','Q','R','S','X','Y']
positions = [1,2,3,4,5] # available positions for targets



# Run 'Begin Experiment' code from set_opacity
enableVisual = expInfo['tokenAudio/Visual'].split('/')[1]
# Run 'Begin Experiment' code from set_sound
enableAudio = expInfo['tokenAudio/Visual'].split('/')[0]
# Run 'Begin Experiment' code from setBeeps
distractorsSetting = expInfo['distractorsSetting'].split('/')

acousticSetting = distractorsSetting[0].split('-')

enableAcoustic = acousticSetting[1]
acousticTargetMatch = acousticSetting[2]

deltaGauss = float(expInfo['deltaGauss'])


# Run 'Begin Experiment' code from setRDKDir
rdkSetting = distractorsSetting[1].split('-')

enableRDK = rdkSetting[1]
rdkTargetMatch = rdkSetting[2]

rdkCoherence = float(expInfo['rdkCoherence'])

# --- Initialize components for Routine "trial" ---
token_bg = visual.ShapeStim(
    win=win, name='token_bg',
    size=(0.15, 0.15), vertices='circle',
    ori=0.0, pos=(0, 0), anchor='center',
    lineWidth=1.0,     colorSpace='rgb',  lineColor='gray', fillColor='gray',
    opacity=None, depth=-2.0, interpolate=True)
sound0 = sound.Sound('A', secs=-1, stereo=True, hamming=False,
    name='sound0')
sound0.setVolume(1.0)
token0 = visual.TextStim(win=win, name='token0',
    text='',
    font='Arial',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=1.0, 
    languageStyle='LTR',
    depth=-4.0);
sound1 = sound.Sound('A', secs=-1, stereo=True, hamming=False,
    name='sound1')
sound1.setVolume(1.0)
token1 = visual.TextStim(win=win, name='token1',
    text='',
    font='Arial',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=1.0, 
    languageStyle='LTR',
    depth=-6.0);
sound2 = sound.Sound('A', secs=-1, stereo=True, hamming=False,
    name='sound2')
sound2.setVolume(1.0)
token2 = visual.TextStim(win=win, name='token2',
    text='',
    font='Arial',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=1.0, 
    languageStyle='LTR',
    depth=-8.0);
sound3 = sound.Sound('A', secs=-1, stereo=True, hamming=False,
    name='sound3')
sound3.setVolume(1.0)
token3 = visual.TextStim(win=win, name='token3',
    text='',
    font='Arial',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=1.0, 
    languageStyle='LTR',
    depth=-10.0);
sound4 = sound.Sound('A', secs=-1, stereo=True, hamming=False,
    name='sound4')
sound4.setVolume(1.0)
token4 = visual.TextStim(win=win, name='token4',
    text='',
    font='Arial',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=1.0, 
    languageStyle='LTR',
    depth=-12.0);
sound5 = sound.Sound('A', secs=-1, stereo=True, hamming=False,
    name='sound5')
sound5.setVolume(1.0)
token5 = visual.TextStim(win=win, name='token5',
    text='',
    font='Arial',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=1.0, 
    languageStyle='LTR',
    depth=-14.0);
sound6 = sound.Sound('A', secs=-1, stereo=True, hamming=False,
    name='sound6')
sound6.setVolume(1.0)
token6 = visual.TextStim(win=win, name='token6',
    text='',
    font='Arial',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=1.0, 
    languageStyle='LTR',
    depth=-16.0);
sound7 = sound.Sound('A', secs=-1, stereo=True, hamming=False,
    name='sound7')
sound7.setVolume(1.0)
token7 = visual.TextStim(win=win, name='token7',
    text='',
    font='Arial',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=1.0, 
    languageStyle='LTR',
    depth=-18.0);
tokenText = visual.TextStim(win=win, name='tokenText',
    text='',
    font='Arial',
    pos=(0, 0.3), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-19.0);
opacity_text = visual.TextStim(win=win, name='opacity_text',
    text='',
    font='Arial',
    pos=(0, -0.3), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-20.0);
rdkDirectionText = visual.TextStim(win=win, name='rdkDirectionText',
    text='',
    font='Arial',
    pos=(0, 0.2), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-21.0);
rdkParamText = visual.TextStim(win=win, name='rdkParamText',
    text='',
    font='Open Sans',
    pos=(0, -0.4), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-23.0);

# --- Initialize components for Routine "answer" ---
answerBox = visual.TextBox2(
     win, text=None, placeholder=None, font='Arial',
     pos=(0, 0),     letterHeight=0.05,
     size=(0.2, 0.07), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=True,
     name='answerBox',
     depth=0, autoLog=False,
)

# --- Initialize components for Routine "endBlock" ---
endBlockText = visual.TextStim(win=win, name='endBlockText',
    text='End of the  block\n\nPress Space to continue',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
key_resp_3 = keyboard.Keyboard()

# --- Initialize components for Routine "endScreen" ---
text_3 = visual.TextStim(win=win, name='text_3',
    text='Thank you\n\nPress space',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
key_resp = keyboard.Keyboard()

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.Clock()  # to track time remaining of each (possibly non-slip) routine 

# --- Prepare to start Routine "welcome" ---
continueRoutine = True
# update component parameters for each repeat
key_resp_2.keys = []
key_resp_2.rt = []
_key_resp_2_allKeys = []
# keep track of which components have finished
welcomeComponents = [key_resp_2, text_2]
for thisComponent in welcomeComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "welcome" ---
routineForceEnded = not continueRoutine
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *key_resp_2* updates
    waitOnFlip = False
    
    # if key_resp_2 is starting this frame...
    if key_resp_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_resp_2.frameNStart = frameN  # exact frame index
        key_resp_2.tStart = t  # local t and not account for scr refresh
        key_resp_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_resp_2, 'tStartRefresh')  # time at next scr refresh
        # update status
        key_resp_2.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_resp_2.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_resp_2.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_resp_2.status == STARTED and not waitOnFlip:
        theseKeys = key_resp_2.getKeys(keyList=['y','n','left','right','space'], waitRelease=False)
        _key_resp_2_allKeys.extend(theseKeys)
        if len(_key_resp_2_allKeys):
            key_resp_2.keys = _key_resp_2_allKeys[-1].name  # just the last key pressed
            key_resp_2.rt = _key_resp_2_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # *text_2* updates
    
    # if text_2 is starting this frame...
    if text_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        text_2.frameNStart = frameN  # exact frame index
        text_2.tStart = t  # local t and not account for scr refresh
        text_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(text_2, 'tStartRefresh')  # time at next scr refresh
        # update status
        text_2.status = STARTED
        text_2.setAutoDraw(True)
    
    # if text_2 is active this frame...
    if text_2.status == STARTED:
        # update params
        pass
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
        if eyetracker:
            eyetracker.setConnectionState(False)
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in welcomeComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "welcome" ---
for thisComponent in welcomeComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# the Routine "welcome" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# set up handler to look after randomisation of conditions etc
blocks = data.TrialHandler(nReps=2.0, method='random', 
    extraInfo=expInfo, originPath=-1,
    trialList=[None],
    seed=None, name='blocks')
thisExp.addLoop(blocks)  # add the loop to the experiment
thisBlock = blocks.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisBlock.rgb)
if thisBlock != None:
    for paramName in thisBlock:
        exec('{} = thisBlock[paramName]'.format(paramName))

for thisBlock in blocks:
    currentLoop = blocks
    # abbreviate parameter names if possible (e.g. rgb = thisBlock.rgb)
    if thisBlock != None:
        for paramName in thisBlock:
            exec('{} = thisBlock[paramName]'.format(paramName))
    
    # set up handler to look after randomisation of conditions etc
    trials = data.TrialHandler(nReps=20.0, method='fullRandom', 
        extraInfo=expInfo, originPath=-1,
        trialList=data.importConditions('difficulties.csv'),
        seed=None, name='trials')
    thisExp.addLoop(trials)  # add the loop to the experiment
    thisTrial = trials.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisTrial.rgb)
    if thisTrial != None:
        for paramName in thisTrial:
            exec('{} = thisTrial[paramName]'.format(paramName))
    
    for thisTrial in trials:
        currentLoop = trials
        # abbreviate parameter names if possible (e.g. rgb = thisTrial.rgb)
        if thisTrial != None:
            for paramName in thisTrial:
                exec('{} = thisTrial[paramName]'.format(paramName))
        
        # --- Prepare to start Routine "prepare" ---
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from set_token
        
        shuffle(targets)
        shuffle(distractors)
        shuffle(positions)
        
        [posA, posB] = [positions[0], positions[1]]
        if posA > posB :
            temp = posA
            posA = posB
            posB = temp
        
        token = []
        for x in distractors[0:posA] :
            token.append(x)
        token.append(targets[0])
        for x in distractors[posA:posB] :
            token.append(x)
        token.append(targets[1])
        for x in distractors[posB:6] :
            token.append(x)
                
        # Run 'Begin Routine' code from set_opacity
        
        if enableVisual.lower() != 'yes' :
            OPACITY = 0
        else :
            OPACITY = opacity
        # Run 'Begin Routine' code from set_sound
        
        soundArray = []
        path = ''
        for tok in token :
            if enableAudio.lower() == 'yes' :
                path = 'audio/' + tok + '.wav'
            else :
                path = 'audio/_.wav'
            soundArray.append(path)
            
        # Run 'Begin Routine' code from setBeeps
        beeps = []
        
        BEEPDIRTARGET = 1
        BEEPDIRNONTARGET = -1
        
        if acousticTargetMatch != 'up' :
            BEEPDIRTARGET = -1
            BEEPDIRNONTARGET = 1
        
        
        beepDir = BEEPDIRNONTARGET
        beep = []
        for tok in token :
            if tok in targets :
                beepDir = BEEPDIRTARGET
            else :
                beepDir = BEEPDIRNONTARGET
            beep = generateAuditorySequence(nbins, 
                                 initialFrequency, 
                                 deltaGauss * beepDir, 
                                 toneDuration, 
                                 interToneInterval, 
                                 48000, 
                                 rampSize,
                                 stdevTone)
            beeps.push(beep)
        # Run 'Begin Routine' code from setRDKDir
        rdkDir = []
        
        RDKSIGNALDIR = 'L'
        RDKSIGOPPOSITEDIR = 'R'
        if rdkTargetMatch != 'L' :
            RDKSIGNALDIR = 'R'
            RDKSIGOPPOSITEDIR = 'L'
        
        nonSignalPos = []
        for i in range(len(token)) :
            if token[i] in targets :
                rdkDir.append(RDKSIGNALDIR)
            else :
                nonSignalPos.append(i)
                rdkDir.append('_')
        
        shuffle(nonSignalPos)
        
        rdkDir[nonSignalPos[0]] = RDKSIGOPPOSITEDIR
        rdkDir[nonSignalPos[1]] = RDKSIGOPPOSITEDIR
        # keep track of which components have finished
        prepareComponents = []
        for thisComponent in prepareComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "prepare" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # check for quit (typically the Esc key)
            if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                core.quit()
                if eyetracker:
                    eyetracker.setConnectionState(False)
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in prepareComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "prepare" ---
        for thisComponent in prepareComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # the Routine "prepare" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # --- Prepare to start Routine "trial" ---
        continueRoutine = True
        # update component parameters for each repeat
        sound0.setSound(soundArray[0], hamming=False)
        sound0.setVolume(1.0, log=False)
        token0.setOpacity(OPACITY)
        token0.setText(token[0])
        sound1.setSound(soundArray[1], hamming=False)
        sound1.setVolume(1.0, log=False)
        token1.setOpacity(OPACITY)
        token1.setText(token[1])
        sound2.setSound(soundArray[2], hamming=False)
        sound2.setVolume(1.0, log=False)
        token2.setOpacity(OPACITY)
        token2.setText(token[2])
        sound3.setSound(soundArray[3], hamming=False)
        sound3.setVolume(1.0, log=False)
        token3.setOpacity(OPACITY)
        token3.setText(token[3])
        sound4.setSound(soundArray[4], hamming=False)
        sound4.setVolume(1.0, log=False)
        token4.setOpacity(OPACITY)
        token4.setText(token[4])
        sound5.setSound(soundArray[5], hamming=False)
        sound5.setVolume(1.0, log=False)
        token5.setOpacity(OPACITY)
        token5.setText(token[5])
        sound6.setSound(soundArray[6], hamming=False)
        sound6.setVolume(1.0, log=False)
        token6.setOpacity(OPACITY)
        token6.setText(token[6])
        sound7.setSound(soundArray[7], hamming=False)
        sound7.setVolume(1.0, log=False)
        token7.setOpacity(OPACITY)
        token7.setText(token[7])
        tokenText.setText(token)
        opacity_text.setText(('opacity:'+opacity))
        rdkDirectionText.setText(rdkDir)
        rdkParamText.setText(('rdk:rdkLifeTime=' + rdkLifeTime + ',rdkSpeed=' + rdkSpeed + ',rdkCoherence=' + rdkCoherence))
        # keep track of which components have finished
        trialComponents = [token_bg, sound0, token0, sound1, token1, sound2, token2, sound3, token3, sound4, token4, sound5, token5, sound6, token6, sound7, token7, tokenText, opacity_text, rdkDirectionText, rdkParamText]
        for thisComponent in trialComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "trial" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *token_bg* updates
            
            # if token_bg is starting this frame...
            if token_bg.status == NOT_STARTED and tThisFlip >= 0.55-frameTolerance:
                # keep track of start time/frame for later
                token_bg.frameNStart = frameN  # exact frame index
                token_bg.tStart = t  # local t and not account for scr refresh
                token_bg.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(token_bg, 'tStartRefresh')  # time at next scr refresh
                # update status
                token_bg.status = STARTED
                token_bg.setAutoDraw(True)
            
            # if token_bg is active this frame...
            if token_bg.status == STARTED:
                # update params
                pass
            
            # if token_bg is stopping this frame...
            if token_bg.status == STARTED:
                # is it time to stop? (based on local clock)
                if tThisFlip > 5-frameTolerance:
                    # keep track of stop time/frame for later
                    token_bg.tStop = t  # not accounting for scr refresh
                    token_bg.frameNStop = frameN  # exact frame index
                    # update status
                    token_bg.status = FINISHED
                    token_bg.setAutoDraw(False)
            
            # if sound0 is starting this frame...
            if sound0.status == NOT_STARTED and tThisFlip >= 0.625-frameTolerance:
                # keep track of start time/frame for later
                sound0.frameNStart = frameN  # exact frame index
                sound0.tStart = t  # local t and not account for scr refresh
                sound0.tStartRefresh = tThisFlipGlobal  # on global time
                # update status
                sound0.status = STARTED
                sound0.play(when=win)  # sync with win flip
            # update sound0 status according to whether it's playing
            if sound0.isPlaying:
                sound0.status = STARTED
            elif sound0.isFinished:
                sound0.status = FINISHED
            
            # *token0* updates
            
            # if token0 is starting this frame...
            if token0.status == NOT_STARTED and tThisFlip >= 0.625-frameTolerance:
                # keep track of start time/frame for later
                token0.frameNStart = frameN  # exact frame index
                token0.tStart = t  # local t and not account for scr refresh
                token0.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(token0, 'tStartRefresh')  # time at next scr refresh
                # update status
                token0.status = STARTED
                token0.setAutoDraw(True)
            
            # if token0 is active this frame...
            if token0.status == STARTED:
                # update params
                pass
            
            # if token0 is stopping this frame...
            if token0.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > token0.tStartRefresh + 0.350-frameTolerance:
                    # keep track of stop time/frame for later
                    token0.tStop = t  # not accounting for scr refresh
                    token0.frameNStop = frameN  # exact frame index
                    # update status
                    token0.status = FINISHED
                    token0.setAutoDraw(False)
            
            # if sound1 is starting this frame...
            if sound1.status == NOT_STARTED and tThisFlip >= 1.175-frameTolerance:
                # keep track of start time/frame for later
                sound1.frameNStart = frameN  # exact frame index
                sound1.tStart = t  # local t and not account for scr refresh
                sound1.tStartRefresh = tThisFlipGlobal  # on global time
                # update status
                sound1.status = STARTED
                sound1.play(when=win)  # sync with win flip
            # update sound1 status according to whether it's playing
            if sound1.isPlaying:
                sound1.status = STARTED
            elif sound1.isFinished:
                sound1.status = FINISHED
            
            # *token1* updates
            
            # if token1 is starting this frame...
            if token1.status == NOT_STARTED and tThisFlip >= 1.175-frameTolerance:
                # keep track of start time/frame for later
                token1.frameNStart = frameN  # exact frame index
                token1.tStart = t  # local t and not account for scr refresh
                token1.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(token1, 'tStartRefresh')  # time at next scr refresh
                # update status
                token1.status = STARTED
                token1.setAutoDraw(True)
            
            # if token1 is active this frame...
            if token1.status == STARTED:
                # update params
                pass
            
            # if token1 is stopping this frame...
            if token1.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > token1.tStartRefresh + 0.350-frameTolerance:
                    # keep track of stop time/frame for later
                    token1.tStop = t  # not accounting for scr refresh
                    token1.frameNStop = frameN  # exact frame index
                    # update status
                    token1.status = FINISHED
                    token1.setAutoDraw(False)
            
            # if sound2 is starting this frame...
            if sound2.status == NOT_STARTED and tThisFlip >= 1.725-frameTolerance:
                # keep track of start time/frame for later
                sound2.frameNStart = frameN  # exact frame index
                sound2.tStart = t  # local t and not account for scr refresh
                sound2.tStartRefresh = tThisFlipGlobal  # on global time
                # update status
                sound2.status = STARTED
                sound2.play(when=win)  # sync with win flip
            # update sound2 status according to whether it's playing
            if sound2.isPlaying:
                sound2.status = STARTED
            elif sound2.isFinished:
                sound2.status = FINISHED
            
            # *token2* updates
            
            # if token2 is starting this frame...
            if token2.status == NOT_STARTED and tThisFlip >= 1.725-frameTolerance:
                # keep track of start time/frame for later
                token2.frameNStart = frameN  # exact frame index
                token2.tStart = t  # local t and not account for scr refresh
                token2.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(token2, 'tStartRefresh')  # time at next scr refresh
                # update status
                token2.status = STARTED
                token2.setAutoDraw(True)
            
            # if token2 is active this frame...
            if token2.status == STARTED:
                # update params
                pass
            
            # if token2 is stopping this frame...
            if token2.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > token2.tStartRefresh + 0.350-frameTolerance:
                    # keep track of stop time/frame for later
                    token2.tStop = t  # not accounting for scr refresh
                    token2.frameNStop = frameN  # exact frame index
                    # update status
                    token2.status = FINISHED
                    token2.setAutoDraw(False)
            
            # if sound3 is starting this frame...
            if sound3.status == NOT_STARTED and tThisFlip >= 2.275-frameTolerance:
                # keep track of start time/frame for later
                sound3.frameNStart = frameN  # exact frame index
                sound3.tStart = t  # local t and not account for scr refresh
                sound3.tStartRefresh = tThisFlipGlobal  # on global time
                # update status
                sound3.status = STARTED
                sound3.play(when=win)  # sync with win flip
            # update sound3 status according to whether it's playing
            if sound3.isPlaying:
                sound3.status = STARTED
            elif sound3.isFinished:
                sound3.status = FINISHED
            
            # *token3* updates
            
            # if token3 is starting this frame...
            if token3.status == NOT_STARTED and tThisFlip >= 2.275-frameTolerance:
                # keep track of start time/frame for later
                token3.frameNStart = frameN  # exact frame index
                token3.tStart = t  # local t and not account for scr refresh
                token3.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(token3, 'tStartRefresh')  # time at next scr refresh
                # update status
                token3.status = STARTED
                token3.setAutoDraw(True)
            
            # if token3 is active this frame...
            if token3.status == STARTED:
                # update params
                pass
            
            # if token3 is stopping this frame...
            if token3.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > token3.tStartRefresh + 0.350-frameTolerance:
                    # keep track of stop time/frame for later
                    token3.tStop = t  # not accounting for scr refresh
                    token3.frameNStop = frameN  # exact frame index
                    # update status
                    token3.status = FINISHED
                    token3.setAutoDraw(False)
            
            # if sound4 is starting this frame...
            if sound4.status == NOT_STARTED and tThisFlip >= 2.825-frameTolerance:
                # keep track of start time/frame for later
                sound4.frameNStart = frameN  # exact frame index
                sound4.tStart = t  # local t and not account for scr refresh
                sound4.tStartRefresh = tThisFlipGlobal  # on global time
                # update status
                sound4.status = STARTED
                sound4.play(when=win)  # sync with win flip
            # update sound4 status according to whether it's playing
            if sound4.isPlaying:
                sound4.status = STARTED
            elif sound4.isFinished:
                sound4.status = FINISHED
            
            # *token4* updates
            
            # if token4 is starting this frame...
            if token4.status == NOT_STARTED and tThisFlip >= 2.825-frameTolerance:
                # keep track of start time/frame for later
                token4.frameNStart = frameN  # exact frame index
                token4.tStart = t  # local t and not account for scr refresh
                token4.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(token4, 'tStartRefresh')  # time at next scr refresh
                # update status
                token4.status = STARTED
                token4.setAutoDraw(True)
            
            # if token4 is active this frame...
            if token4.status == STARTED:
                # update params
                pass
            
            # if token4 is stopping this frame...
            if token4.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > token4.tStartRefresh + 0.350-frameTolerance:
                    # keep track of stop time/frame for later
                    token4.tStop = t  # not accounting for scr refresh
                    token4.frameNStop = frameN  # exact frame index
                    # update status
                    token4.status = FINISHED
                    token4.setAutoDraw(False)
            
            # if sound5 is starting this frame...
            if sound5.status == NOT_STARTED and tThisFlip >= 3.375-frameTolerance:
                # keep track of start time/frame for later
                sound5.frameNStart = frameN  # exact frame index
                sound5.tStart = t  # local t and not account for scr refresh
                sound5.tStartRefresh = tThisFlipGlobal  # on global time
                # update status
                sound5.status = STARTED
                sound5.play(when=win)  # sync with win flip
            # update sound5 status according to whether it's playing
            if sound5.isPlaying:
                sound5.status = STARTED
            elif sound5.isFinished:
                sound5.status = FINISHED
            
            # *token5* updates
            
            # if token5 is starting this frame...
            if token5.status == NOT_STARTED and tThisFlip >= 3.375-frameTolerance:
                # keep track of start time/frame for later
                token5.frameNStart = frameN  # exact frame index
                token5.tStart = t  # local t and not account for scr refresh
                token5.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(token5, 'tStartRefresh')  # time at next scr refresh
                # update status
                token5.status = STARTED
                token5.setAutoDraw(True)
            
            # if token5 is active this frame...
            if token5.status == STARTED:
                # update params
                pass
            
            # if token5 is stopping this frame...
            if token5.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > token5.tStartRefresh + 0.350-frameTolerance:
                    # keep track of stop time/frame for later
                    token5.tStop = t  # not accounting for scr refresh
                    token5.frameNStop = frameN  # exact frame index
                    # update status
                    token5.status = FINISHED
                    token5.setAutoDraw(False)
            
            # if sound6 is starting this frame...
            if sound6.status == NOT_STARTED and tThisFlip >= 3.925-frameTolerance:
                # keep track of start time/frame for later
                sound6.frameNStart = frameN  # exact frame index
                sound6.tStart = t  # local t and not account for scr refresh
                sound6.tStartRefresh = tThisFlipGlobal  # on global time
                # update status
                sound6.status = STARTED
                sound6.play(when=win)  # sync with win flip
            # update sound6 status according to whether it's playing
            if sound6.isPlaying:
                sound6.status = STARTED
            elif sound6.isFinished:
                sound6.status = FINISHED
            
            # *token6* updates
            
            # if token6 is starting this frame...
            if token6.status == NOT_STARTED and tThisFlip >= 3.925-frameTolerance:
                # keep track of start time/frame for later
                token6.frameNStart = frameN  # exact frame index
                token6.tStart = t  # local t and not account for scr refresh
                token6.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(token6, 'tStartRefresh')  # time at next scr refresh
                # update status
                token6.status = STARTED
                token6.setAutoDraw(True)
            
            # if token6 is active this frame...
            if token6.status == STARTED:
                # update params
                pass
            
            # if token6 is stopping this frame...
            if token6.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > token6.tStartRefresh + 0.350-frameTolerance:
                    # keep track of stop time/frame for later
                    token6.tStop = t  # not accounting for scr refresh
                    token6.frameNStop = frameN  # exact frame index
                    # update status
                    token6.status = FINISHED
                    token6.setAutoDraw(False)
            
            # if sound7 is starting this frame...
            if sound7.status == NOT_STARTED and tThisFlip >= 4.475-frameTolerance:
                # keep track of start time/frame for later
                sound7.frameNStart = frameN  # exact frame index
                sound7.tStart = t  # local t and not account for scr refresh
                sound7.tStartRefresh = tThisFlipGlobal  # on global time
                # update status
                sound7.status = STARTED
                sound7.play(when=win)  # sync with win flip
            # update sound7 status according to whether it's playing
            if sound7.isPlaying:
                sound7.status = STARTED
            elif sound7.isFinished:
                sound7.status = FINISHED
            
            # *token7* updates
            
            # if token7 is starting this frame...
            if token7.status == NOT_STARTED and tThisFlip >= 4.475-frameTolerance:
                # keep track of start time/frame for later
                token7.frameNStart = frameN  # exact frame index
                token7.tStart = t  # local t and not account for scr refresh
                token7.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(token7, 'tStartRefresh')  # time at next scr refresh
                # update status
                token7.status = STARTED
                token7.setAutoDraw(True)
            
            # if token7 is active this frame...
            if token7.status == STARTED:
                # update params
                pass
            
            # if token7 is stopping this frame...
            if token7.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > token7.tStartRefresh + 0.350-frameTolerance:
                    # keep track of stop time/frame for later
                    token7.tStop = t  # not accounting for scr refresh
                    token7.frameNStop = frameN  # exact frame index
                    # update status
                    token7.status = FINISHED
                    token7.setAutoDraw(False)
            
            # *tokenText* updates
            
            # if tokenText is starting this frame...
            if tokenText.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                tokenText.frameNStart = frameN  # exact frame index
                tokenText.tStart = t  # local t and not account for scr refresh
                tokenText.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(tokenText, 'tStartRefresh')  # time at next scr refresh
                # update status
                tokenText.status = STARTED
                tokenText.setAutoDraw(True)
            
            # if tokenText is active this frame...
            if tokenText.status == STARTED:
                # update params
                pass
            
            # if tokenText is stopping this frame...
            if tokenText.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > tokenText.tStartRefresh + 5-frameTolerance:
                    # keep track of stop time/frame for later
                    tokenText.tStop = t  # not accounting for scr refresh
                    tokenText.frameNStop = frameN  # exact frame index
                    # update status
                    tokenText.status = FINISHED
                    tokenText.setAutoDraw(False)
            
            # *opacity_text* updates
            
            # if opacity_text is starting this frame...
            if opacity_text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                opacity_text.frameNStart = frameN  # exact frame index
                opacity_text.tStart = t  # local t and not account for scr refresh
                opacity_text.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(opacity_text, 'tStartRefresh')  # time at next scr refresh
                # update status
                opacity_text.status = STARTED
                opacity_text.setAutoDraw(True)
            
            # if opacity_text is active this frame...
            if opacity_text.status == STARTED:
                # update params
                pass
            
            # if opacity_text is stopping this frame...
            if opacity_text.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > opacity_text.tStartRefresh + 5-frameTolerance:
                    # keep track of stop time/frame for later
                    opacity_text.tStop = t  # not accounting for scr refresh
                    opacity_text.frameNStop = frameN  # exact frame index
                    # update status
                    opacity_text.status = FINISHED
                    opacity_text.setAutoDraw(False)
            
            # *rdkDirectionText* updates
            
            # if rdkDirectionText is starting this frame...
            if rdkDirectionText.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                rdkDirectionText.frameNStart = frameN  # exact frame index
                rdkDirectionText.tStart = t  # local t and not account for scr refresh
                rdkDirectionText.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(rdkDirectionText, 'tStartRefresh')  # time at next scr refresh
                # update status
                rdkDirectionText.status = STARTED
                rdkDirectionText.setAutoDraw(True)
            
            # if rdkDirectionText is active this frame...
            if rdkDirectionText.status == STARTED:
                # update params
                pass
            
            # if rdkDirectionText is stopping this frame...
            if rdkDirectionText.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > rdkDirectionText.tStartRefresh + 5-frameTolerance:
                    # keep track of stop time/frame for later
                    rdkDirectionText.tStop = t  # not accounting for scr refresh
                    rdkDirectionText.frameNStop = frameN  # exact frame index
                    # update status
                    rdkDirectionText.status = FINISHED
                    rdkDirectionText.setAutoDraw(False)
            # Run 'Each Frame' code from makeRoutineEnd
            if t > 5 :
                continueRoutine = False
            
            # *rdkParamText* updates
            
            # if rdkParamText is starting this frame...
            if rdkParamText.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                rdkParamText.frameNStart = frameN  # exact frame index
                rdkParamText.tStart = t  # local t and not account for scr refresh
                rdkParamText.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(rdkParamText, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'rdkParamText.started')
                # update status
                rdkParamText.status = STARTED
                rdkParamText.setAutoDraw(True)
            
            # if rdkParamText is active this frame...
            if rdkParamText.status == STARTED:
                # update params
                pass
            
            # if rdkParamText is stopping this frame...
            if rdkParamText.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > rdkParamText.tStartRefresh + 5-frameTolerance:
                    # keep track of stop time/frame for later
                    rdkParamText.tStop = t  # not accounting for scr refresh
                    rdkParamText.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'rdkParamText.stopped')
                    # update status
                    rdkParamText.status = FINISHED
                    rdkParamText.setAutoDraw(False)
            
            # check for quit (typically the Esc key)
            if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                core.quit()
                if eyetracker:
                    eyetracker.setConnectionState(False)
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in trialComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "trial" ---
        for thisComponent in trialComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        sound0.stop()  # ensure sound has stopped at end of routine
        sound1.stop()  # ensure sound has stopped at end of routine
        sound2.stop()  # ensure sound has stopped at end of routine
        sound3.stop()  # ensure sound has stopped at end of routine
        sound4.stop()  # ensure sound has stopped at end of routine
        sound5.stop()  # ensure sound has stopped at end of routine
        sound6.stop()  # ensure sound has stopped at end of routine
        sound7.stop()  # ensure sound has stopped at end of routine
        # the Routine "trial" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # --- Prepare to start Routine "answer" ---
        continueRoutine = True
        # update component parameters for each repeat
        answerBox.reset()
        # keep track of which components have finished
        answerComponents = [answerBox]
        for thisComponent in answerComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "answer" ---
        routineForceEnded = not continueRoutine
        while continueRoutine and routineTimer.getTime() < 3.0:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *answerBox* updates
            
            # if answerBox is starting this frame...
            if answerBox.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                answerBox.frameNStart = frameN  # exact frame index
                answerBox.tStart = t  # local t and not account for scr refresh
                answerBox.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(answerBox, 'tStartRefresh')  # time at next scr refresh
                # update status
                answerBox.status = STARTED
                answerBox.setAutoDraw(True)
            
            # if answerBox is active this frame...
            if answerBox.status == STARTED:
                # update params
                pass
            
            # if answerBox is stopping this frame...
            if answerBox.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > answerBox.tStartRefresh + 3-frameTolerance:
                    # keep track of stop time/frame for later
                    answerBox.tStop = t  # not accounting for scr refresh
                    answerBox.frameNStop = frameN  # exact frame index
                    # update status
                    answerBox.status = FINISHED
                    answerBox.setAutoDraw(False)
            
            # check for quit (typically the Esc key)
            if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                core.quit()
                if eyetracker:
                    eyetracker.setConnectionState(False)
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in answerComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "answer" ---
        for thisComponent in answerComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        trials.addData('answerBox.text',answerBox.text)
        # Run 'End Routine' code from onlyNumber
        if len(answerBox.text) > 2 :
            answerBox.text = answerBox.text[:2]
        # Run 'End Routine' code from addionalData
        trials.addData("answerTime", t)
        trials.addData("token", token)
        target = targets[0:2]
        trials.addData("target", target)
        
        if len(answerBox.text) == 2 :
            if answerBox.text[0] == target[0] and answerBox.text[1] == target[1] :
                trials.addData("correct", 1)
            else :
                trials.addData("correct", 0)
        else :
            trials.addData("correct", 0)
            
            
        trials.addData('taskType','audio' if expInfo['enableAudio']=='yes' else 'visual')
        # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
        if routineForceEnded:
            routineTimer.reset()
        else:
            routineTimer.addTime(-3.000000)
        thisExp.nextEntry()
        
    # completed 20.0 repeats of 'trials'
    
    
    # --- Prepare to start Routine "endBlock" ---
    continueRoutine = True
    # update component parameters for each repeat
    key_resp_3.keys = []
    key_resp_3.rt = []
    _key_resp_3_allKeys = []
    # keep track of which components have finished
    endBlockComponents = [endBlockText, key_resp_3]
    for thisComponent in endBlockComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "endBlock" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *endBlockText* updates
        
        # if endBlockText is starting this frame...
        if endBlockText.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            endBlockText.frameNStart = frameN  # exact frame index
            endBlockText.tStart = t  # local t and not account for scr refresh
            endBlockText.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(endBlockText, 'tStartRefresh')  # time at next scr refresh
            # update status
            endBlockText.status = STARTED
            endBlockText.setAutoDraw(True)
        
        # if endBlockText is active this frame...
        if endBlockText.status == STARTED:
            # update params
            pass
        
        # *key_resp_3* updates
        waitOnFlip = False
        
        # if key_resp_3 is starting this frame...
        if key_resp_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            key_resp_3.frameNStart = frameN  # exact frame index
            key_resp_3.tStart = t  # local t and not account for scr refresh
            key_resp_3.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(key_resp_3, 'tStartRefresh')  # time at next scr refresh
            # update status
            key_resp_3.status = STARTED
            # keyboard checking is just starting
            waitOnFlip = True
            win.callOnFlip(key_resp_3.clock.reset)  # t=0 on next screen flip
            win.callOnFlip(key_resp_3.clearEvents, eventType='keyboard')  # clear events on next screen flip
        if key_resp_3.status == STARTED and not waitOnFlip:
            theseKeys = key_resp_3.getKeys(keyList=['y','n','left','right','space'], waitRelease=False)
            _key_resp_3_allKeys.extend(theseKeys)
            if len(_key_resp_3_allKeys):
                key_resp_3.keys = _key_resp_3_allKeys[-1].name  # just the last key pressed
                key_resp_3.rt = _key_resp_3_allKeys[-1].rt
                # a response ends the routine
                continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
            if eyetracker:
                eyetracker.setConnectionState(False)
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in endBlockComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "endBlock" ---
    for thisComponent in endBlockComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # the Routine "endBlock" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
# completed 2.0 repeats of 'blocks'


# --- Prepare to start Routine "endScreen" ---
continueRoutine = True
# update component parameters for each repeat
key_resp.keys = []
key_resp.rt = []
_key_resp_allKeys = []
# keep track of which components have finished
endScreenComponents = [text_3, key_resp]
for thisComponent in endScreenComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "endScreen" ---
routineForceEnded = not continueRoutine
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *text_3* updates
    
    # if text_3 is starting this frame...
    if text_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        text_3.frameNStart = frameN  # exact frame index
        text_3.tStart = t  # local t and not account for scr refresh
        text_3.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(text_3, 'tStartRefresh')  # time at next scr refresh
        # update status
        text_3.status = STARTED
        text_3.setAutoDraw(True)
    
    # if text_3 is active this frame...
    if text_3.status == STARTED:
        # update params
        pass
    
    # *key_resp* updates
    waitOnFlip = False
    
    # if key_resp is starting this frame...
    if key_resp.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_resp.frameNStart = frameN  # exact frame index
        key_resp.tStart = t  # local t and not account for scr refresh
        key_resp.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_resp, 'tStartRefresh')  # time at next scr refresh
        # update status
        key_resp.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_resp.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_resp.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_resp.status == STARTED and not waitOnFlip:
        theseKeys = key_resp.getKeys(keyList=['y','n','left','right','space'], waitRelease=False)
        _key_resp_allKeys.extend(theseKeys)
        if len(_key_resp_allKeys):
            key_resp.keys = _key_resp_allKeys[-1].name  # just the last key pressed
            key_resp.rt = _key_resp_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
        if eyetracker:
            eyetracker.setConnectionState(False)
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in endScreenComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "endScreen" ---
for thisComponent in endScreenComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# the Routine "endScreen" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# --- End experiment ---
# Flip one final time so any remaining win.callOnFlip() 
# and win.timeOnFlip() tasks get executed before quitting
win.flip()

# these shouldn't be strictly necessary (should auto-save)
thisExp.saveAsWideText(filename+'.csv', delim='auto')
thisExp.saveAsPickle(filename)
logging.flush()
# make sure everything is closed down
if eyetracker:
    eyetracker.setConnectionState(False)
thisExp.abort()  # or data files will save again on exit
win.close()
core.quit()
