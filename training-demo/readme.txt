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


    

# to edit 
1) Can you add parameters that allow me to control number of trials and number of blocks? Right now, I'm thinking 600 trials/session, 10 blocks. I might increase this depending on how long it takes. 
--- I put in as parameters. There are too many parameters on the screen. If you can't click Ok button to start experiment, just zoom out to about 80%. When the experiment start on full screen, it will ignore zoom and reset to 100%. 

>>>> Follow Up: nreps, nBlocks, deltaGauss, and rdkCoherence will be fixed numbers. To make space, can you move these parameters to read from the difficulties.csv and then delete them from the box that pops up before experiment start? Participant laptop screen might be tiny and they are doing this online, so I want to minimize chances of having to help them troublehsoot. Plus we need to make space for #2 below.
--- I move nreps and nBlocks to "parameters.csv" and deltaGauss and rdkCoherence to "difficulties.csv". 



2) See readme from pretest/posttest about converting units to the units that are used in the Huang 2012 paper. In the box that pop up before experiment, we will need to add boxes for participant to enter these parameters: (1) screen height, (2) distance between montior and eyes, and (3) screen resolution. 
--- Done

3) Right now, text box allows > 2 numbers. Can we restrict text box to allow a max of two numbers to be entered?
--- Done


4) (TO DO ONCE PRELIMINARY3 IS DONE) Pre-generate tokens that are already filtered in Python using the same code before put them online. 


5) (REMINDER TO DO AT THE END) Remove the text hint on screen during the experiment that shows token and RDK direction.







#######################################################################
# Leave this alone for now. I need to come back to this when I decide on actual values to use.
#######################################################################
2) Right now, you set rdkLifeTime to 4 and rdkSpeed to 0.01. Where did you get these numbers from? Did you just put in randomly selected numbers for now? I think part of it is that I don't really understand what the rdkLifeTime parameter is doing. Based on Psychopy website, it sounds like dots move in one direction, eventually, the dots fall out of the black circle and disappear, so random dot gets added in a random location to replace the first one that disappeared. But what is the rdkLifeTime parameter actually changing? I changed it from 4 to 1 to test it and it looks the same.
	--I didn't randomly seclected for the speed. It was the default speed PsychoPy used for RDK in Python version. As for rdkLifeTime, It is randomly selected. The default number of PsychoPy is 3.
	--For me changin rdkLifeTime to 1 would make everything look random. I think the browser might cache the old value. That's why you didn't see the difference. It was because the change you made hasn't been used. I put text showing rdk parameters on the screen for now. If the parameters aren't reflected the change, you just need to refresh the browser.
	--From what I tried myself(for 1.0 coherence), having high rdkLifeTime would make dots become concentrate on one side (left/right side). Since dots are trying to move to the side, the dots that are on the other side are mostly the one that just appear(And soon they will go to the side). Setting small rdkLifeTime make dots disappear before it has a chance to clump together on the side.
	--I made a sample for you to try them out to easily see the difference.


    
