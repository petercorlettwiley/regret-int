import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from 'aws-amplify';
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
} from '@aws-amplify/ui-react';
import { listRegrets } from "./graphql/queries";
import {
  createRegret as createRegretMutation,
  deleteRegret as deleteRegretMutation,
} from "./graphql/mutations";
import { MapComponent } from "./components/map.component.js";
import {
  Wrapper,
  Status
} from "@googlemaps/react-wrapper";

const App = () => {
  const [regrets, setRegrets] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    fetchRegrets();
    getLocation();
  }, []);

  async function fetchRegrets() {
    const apiData = await API.graphql({ query: listRegrets });
    const regretsFromAPI = apiData.data.listRegrets.items;
    await Promise.all(
      regretsFromAPI.map(async (regret) => {
        return regret;
      })
    );
    setRegrets(regretsFromAPI);
  }

  async function createRegret(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      text: form.get("text"),
      latitude: latitude,
      longitude: longitude
    };
    await API.graphql({
      query: createRegretMutation,
      variables: { input: data },
    });
    fetchRegrets();
    event.target.reset();
  }

  async function deleteRegret({ id, text }) {
    const newRegrets = regrets.filter((regret) => regret.id !== id);
    setRegrets(newRegrets);
    await Storage.remove(text);
    await API.graphql({
      query: deleteRegretMutation,
      variables: { input: { id } },
    });
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  return (
    <View className="App">
      <Heading level={1}>My Regrets App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createRegret}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="text"
            placeholder="Regret Text"
            label="Regret Text"
            labelHidden
            variation="quiet"
            required
          />
          {latitude && <p>Latitude: {latitude}</p>}
          {longitude && <p>Longitude: {longitude}</p>}
          <Button type="submit" variation="primary">
            Create Regret
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Regrets</Heading>
      <View margin="3rem 0">
        {regrets.map((regret) => (
          <Flex
            key={regret.id || regret.text}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {regret.text}
            </Text>
            <Text as="span">{regret.latitude}</Text>
            <Text as="span">{regret.longitude}</Text>
            <Wrapper apiKey={""} >
              <MapComponent
                center={{ lat: parseFloat(regret.latitude), lng: parseFloat(regret.longitude) }}
                zoom={13}
              >
                <Marker position={position} />
              </MapComponent>
            </Wrapper>
            <Button variation="link" onClick={() => deleteRegret(regret)}>
              Delete regret
            </Button>
          </Flex>
        ))}
      </View>
    </View>
  );
};

export default App;