import React, { useState, useEffect } from 'react'
import Dropdowns from './components/Dropdowns'
import Buttons from './components/Buttons'
import TrackList from './components/TrackList'
import { Provider } from './hooks/useStore'
import useTimer from './hooks/useTimer'


function App() {

    const baseBPMPerOneSecond = 30
    const stepsPerBar = 8
    const beatsPerBar = 4
    const barsPerSequence = 2
    const totalSteps = stepsPerBar * barsPerSequence
    const totalBeats = beatsPerBar * barsPerSequence
    const [BPM, setBPM] = useState(120)
    const [startTime, setStartTime] = useState(null)
    const [pastLapsedTime, setPastLapse] = useState(0)
    const [currentStepID, setCurrentStep] = useState(null)
    const timePerSequence = baseBPMPerOneSecond / BPM * 1000 * totalBeats
    const timePerStep = timePerSequence / totalSteps
    const isSequencePlaying = startTime !== null
    const playerTime = useTimer(isSequencePlaying)
    const lapsedTime = isSequencePlaying ? Math.max(0, playerTime - startTime) : 0
    const totalLapsedTime = pastLapsedTime + lapsedTime

    useEffect(() => {
        if (isSequencePlaying) {
            setCurrentStep(Math.floor(totalLapsedTime / timePerStep) % totalSteps)
        } else {
            setCurrentStep(null)
        }
    }, [isSequencePlaying, timePerStep, totalLapsedTime, totalSteps])

    const playPauseProps = {
        setStartTime,
        setPastLapse,
        setBPM,
        isSequencePlaying,
        startTime,
        BPM
    }



    return (
        <Provider>
            <main className="app">
                <header className="app_header">
                    <Dropdowns/>
                </header>
                <div className="app_content">
                    <Buttons {...playPauseProps} />
                    <TrackList currentStepID={currentStepID} />
                </div>
            </main >
        </Provider>
    )
}

export default App
