import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'
import styled from "styled-components";
import SplitPane from 'react-split-pane';
import {Note, getInfo, getNotes, deleteNote, addNote} from '../services/WestService';
import { Sensor } from "../services/SensorService";
import {Link} from 'react-router-dom';
import '../styles/Sensor.css';

type RequestStateInfo =
  | { state: "LOADING" }
  | { state: "ERROR"; error: string }
  | { state: "LOADED"; info: Sensor};

type RequestStateNotes =
  | { state: "LOADING" }
  | { state: "ERROR"; error: string }
  | { state: "LOADED"; notes: Note[] }; 

const WestSensor: React.FC = () => {
    // states to store info for sensor, list of notes and the displayed note's text
    const [requestInfo, setRequestInfo] = useState<RequestStateInfo>({ state: "LOADING" });
    const [requestNotes, setRequestNotes] = useState<RequestStateNotes>({ state: "LOADING" });
    const [currentNoteDisplayedText, setNoteDisplayedText] = useState("Pick a note to display or add some notes!")

    // updates list of notes displayed when a change happens
    const fetchNotesFromServerAndUpdateState = async () => {
      getNotes()
        .then((notes) => setRequestNotes({ notes, state: "LOADED" }))
        .catch((err) => {
          console.error(err);
          setRequestNotes({ error: err.message, state: "ERROR" });
        });
    };  

    // gets info to display on top
    useEffect(() => {
        getInfo()
          .then(info => setRequestInfo({ info, state: "LOADED" }))
          .catch(err => {
            console.error(err);
            setRequestInfo({ error: err.message, state: "ERROR" });
          });
      }, []);

    useEffect(() => {
      fetchNotesFromServerAndUpdateState()
    }, []);

    if (requestInfo.state === "ERROR") {
        return <ErrorText>{requestInfo.error}</ErrorText>;
    }
    if (requestInfo.state === "LOADING") {
        return <LoadingText>Loading...</LoadingText>;
    }
    if (requestNotes.state === "ERROR") {
        return <ErrorText>{requestNotes.error}</ErrorText>;
    }
    if (requestNotes.state === "LOADING") {
        return <LoadingText>Loading...</LoadingText>;
    }

    return (
        <div>
            <div className = "top">
                <Helmet>
                    <title>West Sensor</title>
                </Helmet>
                <Header>
                <Description> <Link to="/">Go Home</Link></Description>
                    <Title>West Sensor</Title>
                    <Description>{requestInfo.info.description}</Description>
                </Header>
            </div>
            <div className = "panes">
                <SplitPane split="vertical" allowResize={false} defaultSize="20%">
                    <div className = "noteList">
                      <div className = "addNote">
                        <button onClick={() => addNote(prompt("Enter note text!") || "No Text Entered").then(fetchNotesFromServerAndUpdateState)}>Add Note</button>
                      </div>
                        {requestNotes.notes.map(({_id, text, timestamp}) => (
                            <SensorCard key={_id}>
                              <Name>
                                {`Note @${timestamp}`}
                              </Name>
                              {`${text.substring(0,10)}...`}
                              <div><button onClick={() => setNoteDisplayedText(text)}>View</button> <button onClick={() => deleteNote(_id).then(fetchNotesFromServerAndUpdateState)}>Delete</button></div>
                            </SensorCard>
                        ))}
                    </div>
                    <div className = "noteDisplay">
                        <Title>{currentNoteDisplayedText}</Title>
                    </div>
                </SplitPane>
            </div>
        </div>
    )
}

const Title = styled.h1`
  font-size: 2em;
`;

const Description = styled.h2`
  font-size: 1em;
`;

const SensorCard = styled.div`
  background: white;
  margin: auto;
  margin-top: 24px;
  max-width: auto;
  text-align: left;
  padding: 10px;
  border-radius: 0px 8px 8px 0px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  border-left: 6px solid #87c38f;
`;

const Name = styled.div`
  font-size: 1.0rem;
`;

const Header = styled.header`
  background-color: #226f54;
  height: 110px;
  padding: 20px;
  color: white;
`;

const ErrorText = styled.div`
  margin: 24px;
`;

const LoadingText = styled.div`
  margin: 24px;
`;

export default WestSensor;