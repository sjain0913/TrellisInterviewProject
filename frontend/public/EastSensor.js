import React, { useState, useEffect, Component } from 'react';
import { Helmet } from 'react-helmet'
import styled from "styled-components";
import SplitPane from 'react-split-pane';
import { Note, getInfo, getNotes, getNoteNumber} from '../services/EastService';
import { Sensor } from "../services/SensorService";
import axios from 'axios';
import '../styles/East.css';

  
function EastSensor() {
    const [notes, setNotes] = useState(null);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null); 

    const fetchList = async() => {
        const response = await(axios.get("http://localhost:9000/sensors/" + this.props.name)
        );
    setNotes(response.data);
    }

    const top = async() => {
        const response = await(axios.get("httm://localhost:9000/sensors/east"))
        setDescription(response.data.description)
    }

    
    return(
        <div>
            <div className = "top">
                <Helmet>
                    <title>East Sensor</title>
                </Helmet>
                <Header>
                    <Title>East Sensor</Title>
                    <Description>{description}</Description>
                </Header>
            </div>
            <div className = "panes">
                <SplitPane split="vertical" allowResize={false} defaultSize="20%">
                    <div className = "noteList">
                        {/* {notes.map(({number}) => (
                            <SensorCard key={number}>
                                <Name>
                                    {`Note #${number}`}
                                </Name>
                                <div><button>View</button> <button>Delete</button></div>
                            </SensorCard>
                        ))} */}
                        {notes}
                    </div>
                    <div className = "noteDisplay">
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
