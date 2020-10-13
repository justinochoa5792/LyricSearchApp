import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import Header from "./component/Header";

function App() {
  const [term, setTerm] = useState([]);
  const [lyrics, setLyrics] = useState([]);

  const renderLyrics = async () => {
    const response = await Axios.get(`https://api.lyrics.ovh/suggest/${term}`);
    console.log(response.data);
    setLyrics(response.data.data);
  };

  const submitLyrics = (e) => {
    e.preventDefault();
    renderLyrics();
  };

  return (
    <div className="App">
      <Header />
      <form onSubmit={submitLyrics}>
        <input
          type="text"
          placeholder="Enter Lyrics"
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
      {lyrics.map((eachLyric) => {
        return (
          <ul>
            <img
              src={eachLyric.album.cover_medium}
              alt={eachLyric.album.title}
            />
            <li>Album Title: {eachLyric.album.title}</li>
            <li>Track Name: {eachLyric.title}</li>
            <li>Artist Name: {eachLyric.artist.name}</li>
          </ul>
        );
      })}
    </div>
  );
}

export default App;
