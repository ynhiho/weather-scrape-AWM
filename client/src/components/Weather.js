import React, { Component } from "react";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationSearch: "",
      locationsResponse: [],
      weather: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.locationSearch);
    fetch(`/search/${this.state.locationSearch}`)
      .then(res => res.json())
      .then(locationsResponse => this.setState({ locationsResponse }));
  };

  handleInputChange = event => {
    this.setState({
      locationSearch: event.target.value
    });
  };

  handleClickedLocation = id => {
    console.log("ID of chosen location: " + id);

    fetch(`/search/weather/${id}`)
      .then(res => res.json())
      .then(weather => this.setState({ weather }));
  };

  render() {
    const { locationsResponse } = this.state;
    const { weather } = this.state;
    return (
      <div>
        <h2>Das Wetter für Ihren Ort</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Suche nach PLZ oder Ort"
            name="name"
            value={this.state.locationSearch}
            onChange={this.handleInputChange}
          />

          <button type="submit">Suchen</button>
        </form>
        <ul>
          {locationsResponse.map(({ name, id }) => (
            <li style={{ listStyleType: "none" }}>
              <a
                href="#"
                onClick={() => {
                  this.handleClickedLocation(id);
                }}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
        <p>{weather}</p>
      </div>
    );
  }
}

export default Weather;
