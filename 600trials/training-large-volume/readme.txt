Experiment works only on web browser.

Reference for RDK parameters: https://www.psychopy.org/builder/components/dots.html
- rdkLifeTime: unit in number of frame (the same as from PsychoPy). PsychoPy web version always run at 60 frames per second.
- rdkSpeed: unit in a fraction of screen height per frame, as in relative to the height of the screen. (ex. 0.01 means a dot move 1% of screen height per frame. In other words, 0.01 means for each frame a dot move 0.01*(height of the screen)).
	- https://www.psychopy.org/general/units.html#height-units
- rdkCoherence: it is RDK coherence (the same as from PsychoPy). (ex. 0.75 means 75% of dots moving right/left, 25% are noise moving randomly).
- total number of dots: currently 100. Can be changed by going to trial tab->rdk->Begin Experiment and change line 4 "rdkDotCount=100".
- "spatial dispalcement between dot frames" is 0.01 of the height of the screen. 
- field size = 0.9 of the height of the screen.
- dot size = currently has diameter of 0.01 of the height of the screen.
- motion algorithm: Scase, Braddick & Raymond (1996) algorithm.
	- http://www.sciencedirect.com/science/article/pii/0042698995003258
    - It is the same one PsychoPy use. https://www.psychopy.org/builder/components/dots.html
    - It is the top rightmost one in this image: https://ars.els-cdn.com/content/image/1-s2.0-0042698995003258-gr1_lrg.gif

# other parameters
- nBlocks: Number of blocks per session
- nreps:  Number of trials per block for the training experiment
- tokenAudio/Visual: present auditory tokens (yes or no) and present visual tokens (yes or no)
- enableAudio: Present auditory tokens for the attended task
- enableVisual: Present visual tokens for the attended task
- distractorsSetting: Controls the distractors and what direction the number targets should be paired with. For "aco-yes-up/rdk-yes-L", aco-yes-up means plays acoustic sequence and targets are paired with direction up. Likewise, rdk-yes-L means show RDK and number targets are paired with the direction left. yes/no, up/down must all be lowercase. L/R must be capitalized.
- screenHeightCM: height of the monitor in cm
- viewingDistanceCM: distance between pupil and monitor
- maxRDKSize: a multiplier that limits the RDK size when the calculated RDK is larger than the screen's height; 1.0 = the detected screen's full height
- Highpass cutoffFreq was fixed to 2899 Hz. Audio files were pre-generated, so there is no parameter to adjust

    

# to edit 
1) The dot density for training will need to be identical to that used for pretest/posttest. Can you go ahead and do 16.7 dots per deg^2/s the same way that you did for pretest/posttest?? Whatever changes that you made to the RDK in pretest/posttest, can you double check that they are also made for the RDKs in training? The only except is that rdkCoherence for training will be fixed to 5%.
--- I still haven't change anything related to dot density


2) Can you remind me, what was the filter slope used in the high pass filter? I know filter order = 5 and high pass cutoffFreq = 2899 Hz. Just need the slope.
--- From Wikipedia on Butterworth filter.
"Note that the slope is 20n dB/decade where n is the filter order."
https://en.wikipedia.org/wiki/Butterworth_filter



3) (GO AHEAD AND DO THIS) Remove the text hint on screen during the experiment that shows token and RDK direction.







#######################################################################
# Leave this alone for now. I need to come back to this when I decide on actual values to use.
#######################################################################
2) Right now, you set rdkLifeTime to 4 and rdkSpeed to 0.01. Where did you get these numbers from? Did you just put in randomly selected numbers for now? I think part of it is that I don't really understand what the rdkLifeTime parameter is doing. Based on Psychopy website, it sounds like dots move in one direction, eventually, the dots fall out of the black circle and disappear, so random dot gets added in a random location to replace the first one that disappeared. But what is the rdkLifeTime parameter actually changing? I changed it from 4 to 1 to test it and it looks the same.
	--I didn't randomly seclected for the speed. It was the default speed PsychoPy used for RDK in Python version. As for rdkLifeTime, It is randomly selected. The default number of PsychoPy is 3.
	--For me changin rdkLifeTime to 1 would make everything look random. I think the browser might cache the old value. That's why you didn't see the difference. It was because the change you made hasn't been used. I put text showing rdk parameters on the screen for now. If the parameters aren't reflected the change, you just need to refresh the browser.
	--From what I tried myself(for 1.0 coherence), having high rdkLifeTime would make dots become concentrate on one side (left/right side). Since dots are trying to move to the side, the dots that are on the other side are mostly the one that just appear(And soon they will go to the side). Setting small rdkLifeTime make dots disappear before it has a chance to clump together on the side.
	--I made a sample for you to try them out to easily see the difference.


    
