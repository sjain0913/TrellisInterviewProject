import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'
import styled from "styled-components";
import SplitPane from 'react-split-pane';
import { Note, getInfo, getNotes, getNoteNumber} from '../services/EastService';
import { Sensor } from "../services/SensorService";
import '../styles/East.css';

type RequestStateInfo =
  | { state: "LOADING" }
  | { state: "ERROR"; error: string }
  | { state: "LOADED"; info: Sensor};

type RequestStateNotes =
  | { state: "LOADING" }
  | { state: "ERROR"; error: string }
  | { state: "LOADED"; notes: Note[] }; 
  
type RequestStateNoteNumber =
  | { state: "LOADING" }
  | { state: "ERROR"; error: string }
  | { state: "LOADED"; note: Note};  

const EastSensor: React.FC = () => {
    const [requestInfo, setRequestInfo] = useState<RequestStateInfo>({ state: "LOADING" });
    const [requestNotes, setRequestNotes] = useState<RequestStateNotes>({ state: "LOADING" });
    const [requestNoteNumber, setRequestNoteNumber] = useState<RequestStateNoteNumber>({ state: "LOADING" });
    var noteNumber = 1;

    useEffect(() => {
        getInfo()
          .then(info => setRequestInfo({ info, state: "LOADED" }))
          .catch(err => {
            console.error(err);
            setRequestInfo({ error: err.message, state: "ERROR" });
          });
      }, []);

    useEffect(() => {
        getNotes()
        .then(notes => setRequestNotes({ notes, state: "LOADED" }))
        .catch(err => {
        console.error(err);
        setRequestNotes({ error: err.message, state: "ERROR" });
        });
    }, []);

    useEffect(() => {
        getNoteNumber(noteNumber)
        .then(note => setRequestNoteNumber({ note, state: "LOADED" }))
        .catch(err => {
        console.error(err);
        setRequestNotes({ error: err.message, state: "ERROR" });
        });
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
    if (requestNoteNumber.state === "ERROR") {
        return <ErrorText>{requestNoteNumber.error}</ErrorText>;
    }
    if (requestNoteNumber.state === "LOADING") {
        return <LoadingText>Loading...</LoadingText>;
    }
    

    return (
        <div>
            <div className = "top">
                <Helmet>
                    <title>East Sensor</title>
                </Helmet>
                <Header>
                    <Title>East Sensor</Title>
                    <Description>{requestInfo.info.description}</Description>
                </Header>
            </div>
            <div className = "panes">
                <SplitPane split="vertical" allowResize={false} defaultSize="20%">
                    <div className = "noteList">
                        {requestNotes.notes.map(({number, text, _id}) => (
                            <SensorCard key={number}>
                                <Name>
                                    {`Note #${number}`}
                                </Name>
                                <div><button>View</button> <button>Delete</button></div>
                            </SensorCard>
                        ))}
                    </div>
                    <div className = "noteDisplay">
                        <Title>Note# {requestNoteNumber.note.number}</Title>
                        <Description>{requestNoteNumber.note.text}</Description>
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
  font-size: 2rem;
`;

const Header = styled.header`
  background-color: #226f54;
  height: 80px;
  padding: 20px;
  color: white;
`;

const ErrorText = styled.div`
  margin: 24px;
`;

const LoadingText = styled.div`
  margin: 24px;
`;

export default EastSensor;