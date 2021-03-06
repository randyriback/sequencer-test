import React, { memo, useContext, useState, useEffect } from "react";
import Note from "./Note";
import "./components.css";
import { Context } from "../hooks/useStore";
import midiNotes from "../utils/midiNotes";

const Track = ({ trackID, currentStepID, noteCount, onNotes }) => {
  const {
    selectMidi,
    sequence: { trackList },
  } = useContext(Context);
  const midiNote = trackList[trackID].midiNote;

  const notes = [...Array(noteCount)].map((el, i) => {
    const isNoteOn = onNotes.indexOf(i) !== -1;
    const isNoteOnCurrentStep = currentStepID === i;
    const stepID = i;

    return (
      <Note
        key={i}
        trackID={trackID}
        stepID={stepID}
        isNoteOn={isNoteOn}
        isNoteOnCurrentStep={isNoteOnCurrentStep}
        midiNote={midiNote}
      />
    );
  });

  const midi = useContext(Context);
  const [disabled, setDisabled] = useState(false);

  const handleSelect = (e) => {
    selectMidi({ trackID, midiNote: apiFriendly(e.target.value) });
    console.log(e.target.value, "MIDINOTE!!");
  };

  const apiFriendly = (str) => {
    if (str.slice(2, 3) === "-" && str.slice(1, 2) === "#") {
      let newNum = Number(str.slice(-2)) + 1;
      return str.slice(0, 2) + newNum.toString();
    } else if (str.slice(1, 2) === "#") {
      let newNum = Number(str.slice(2, 3)) + 1;
      return str.slice(0, 2) + newNum.toString();
    } else {
      let newNum = Number(str.slice(1)) + 1;
      return str.slice(0, 1) + newNum.toString();
    }
  };

  const deviceCheck = () => {
    if (!midi.midiDevice) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };
  useEffect(deviceCheck, [midi]);

  return (
    <div
      className="track"
      style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
    <div className="selecttrackdiv">
      <select onChange={handleSelect} className="selecttrack">
        {midiNotes.map((x, index) => (
          <option value={x} key={index}>
            {x}
          </option>
        ))}
      </select>
      </div>
      <main className="track_notes">{notes}</main>
    </div>
  );
};

export default memo(Track);
