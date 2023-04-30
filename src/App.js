import axios from 'axios';
import React, {useEffect, useState} from 'react';

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  const [karakterler, setKarakterler] = useState([]);
  const [seciliKarakter, setSeciliKarakter] = useState(null);

  useEffect(() => {
    axios.get('https://swapi.dev/api/people/')
    .then(response => {
      setKarakterler(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  const karakterSec = (karakter) => {
    if (seciliKarakter && seciliKarakter.url === karakter.url) {
      setSeciliKarakter(null);
    } else {
      setSeciliKarakter(karakter);
    }
  };

  return (
    <div className="App">
      <h1 className="Header">Karakterler</h1>
      <div>
        {karakterler.map(karakter => (
          <div key={karakter.url}>
            <p onClick={() => karakterSec(karakter)}>
              {karakter.name}
            </p>
            {seciliKarakter && seciliKarakter.url === karakter.url && (
              <div>
                <p>Gender : {karakter.gender}</p>
                <p>Height : {karakter.height}</p>
                <p>Mass : {karakter.mass}</p>
                <p>Birth Year : {karakter.birth_year}</p>
                <p>Eye Color : {karakter.eye_color}</p>
                <p>Hair Color : {karakter.hair_color}</p>
                <p>Skin Color : {karakter.skin_color}</p>
                <p>Films : {karakter.films}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
