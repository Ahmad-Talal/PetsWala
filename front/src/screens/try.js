import React from "react";
import photo from "./download.jpg" 
import {Image,Row,Col} from 'react-bootstrap';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
// import "./index.css"

const libraries = ["places"];
const mapContainerStyle = {
  height: "45vh",
  width: "40vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Try(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyC3ALwqrIwXFt9C8iGfrBXxUkLYV-Uiccg",
    libraries,
  });
  let windowFeatures = "popup";
  
  const [markers, setMarkers] = React.useState({});
  const [selected, setSelected] = React.useState(null);
  const onMapClick = React.useCallback((e) => {
    setMarkers(
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    );
  }, []);
  const [ currentPosition, setCurrentPosition ] = React.useState({
    lat: 31.5204,
    lng: 74.3587,
  });
  const [selectedCurr, setSelectedCurr] = React.useState(currentPosition);
 const handleCurrPosition=(val)=>{
      setCurrentPosition(val);
      props.handler(val);
  }
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <h1>
        PetsWala{""}
        <span role="img" aria-label="dog">
        🐕
        </span>
      </h1>

      <Locate panTo={panTo} handler={handleCurrPosition}/>
      <Search panTo={panTo} currentPosition />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={currentPosition}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Marker
            key={`${markers.lat}-${markers.lng}`}
            position={{ lat: markers.lat, lng: markers.lng }}
            onClick={() => {
              setSelected(markers);
            }}
            icon={{
              url: `/bear.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
        />
        <Marker
            key={`${currentPosition.lat}-${currentPosition.lng}`}
            position={{ lat: currentPosition.lat, lng: currentPosition.lng }}
            onClick={() => {
                setSelectedCurr(currentPosition);
              }}
            icon={{
              url: `/bear.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        {selectedCurr ? (
          <InfoWindow
            position={{ lat: selectedCurr.lat, lng: selectedCurr.lng }}
            onCloseClick={() => {
              setSelectedCurr(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear">
                  🐻
                </span>{" "}
                current position
              </h2>
            </div>
          </InfoWindow>
        ) : null}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear">
                  🐻
                </span>{" "}
                Destination
              </h2>
              <p> {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    
    </div>

  );
}

function Locate(props) {
    const success = position => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        props.handler(currentPosition);
        props.panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
      };

  return (
    <div>
    <Row>
      <Col md={2}>
      <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(success);
      }}
    >
   
          <Image fluid src={photo} alt="compass" />
   
    </button>
    <br></br>
    <br></br>
    
      </Col>
      <></>
    </Row>
   
    </div>
  );
}

function Search(props) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => props.currentPosition.lat, lng: () => props.currentPosition.lng },
      radius: 200 * 1000,
    },
  });
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      props.panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <br></br>
        <br></br>
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>

    </div>
  );
}