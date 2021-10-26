import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import StateButton from './StateButton';
import StateInfoRow from './StateInfoRow';
import SelectedState from './SelectedState';

export default class State extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      states: [],
      stateInfo: [],
      filtered: [],
      searchYear: '201812',
      searchZipcode: '1',
      limit:"5",
      selectedState : [<SelectedState key="sel" id="sel" selected = "N/A"/>]
    }

    this.fetchStateResults = this.fetchStateResults.bind(this);
    this.updateSearchZipcode = this.updateSearchZipcode.bind(this);
    this.updateSearchYear = this.updateSearchYear.bind(this);
    this.updatelimit = this.updatelimit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8081/states",
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        return res.json();
      }, err => {
        console.log(err);
      }).then(stateList => {
        if (!stateList) return;
        console.log(stateList)
        let stateDivs = stateList.map((stateObj, i) =>
          <StateButton key={"button-" + stateObj.state_name} id={"button-" + stateObj.state_name} onClick={() => this.fetchStateResults(stateObj.state_name)} state_name={stateObj.state_name}/>
        );
        this.setState({
          states: stateDivs
        });
      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }


  fetchStateResults(stateName) {
    this.setState({
      selectedState: [<SelectedState key="sel" id="sel" selected =  {stateName}/>]
    });
    fetch("http://localhost:8081/State/" + stateName,
      {
        method: "GET"
      }).then(res => {
        return res.json();
      }, err => {
        console.log(err);
      }).then(stateInfolist => {
        if (!stateInfolist) return;
        const listInfoItem = stateInfolist.map((infoItem, i) =>
          <StateInfoRow key={i} id={i} infoItem={infoItem} />)
        this.setState({
          stateInfo: listInfoItem
        });
      })
  }

  updateSearchYear(event) {
    this.setState({ searchYear: event.target.value.substr(0, 20) });
  }

  updateSearchZipcode(event) {
    this.setState({ searchZipcode: event.target.value.substr(0, 20) });
  }

  updatelimit(event) {
    this.setState({ limit: event.target.value.substr(0, 20) });
  }

  handleSubmit(event) {
    event.preventDefault();
    let filteredInfo = this.state.stateInfo.filter(
      (selctedInfo) => this.state.searchYear === selctedInfo.props.infoItem.yearmonth
    );
    filteredInfo = filteredInfo.filter(
      (selctedInfo) => selctedInfo.props.infoItem.zipcode.toString().includes(this.state.searchZipcode)
    );
    if (this.state.limit !== 'All'){
      var limit = Number(this.state.limit);
      filteredInfo = filteredInfo.slice(0,limit)
    }
    this.setState({
      filtered: filteredInfo
    });
    if (filteredInfo.length === 0) {
      alert("There is no relative data");
    }
  }

  render() {
    return (
      <div className="Dashboard">
        <PageNavbar active="dashboard" />
        <br></br>
        <div className="container stateInfo-container">
          <div className="jumbotron">
            <div className="h5">State</div>
            <div className="states-container">
              {this.state.states}
            </div>
          </div>

          <div className="jumbotron">
          <div className="h6">
          Please input year, month, zip code, and limit after submitting state to output the respective median property values.
          </div>
          </div>

          <div className="jumbotron">
            {this.state.selectedState}
            <br></br>
            <div className="stateInfo-container">
              <form onSubmit={this.handleSubmit}>
                <label>Year Month:</label>

                <input type="text"
                  value={this.state.searchYear}
                  onChange={this.updateSearchYear} />
                <label>Zipcode:</label>
                <input type="text"
                  value={this.state.searchZipcode}
                  onChange={this.updateSearchZipcode} />
                <label>Limit:
                <select value={this.state.limit} onChange={this.updatelimit}>
                  <option value="5">5</option>
                  <option value="20">20</option>
                  <option value="35">35</option>
                  <option value="50">50</option>
                  <option value="75">75</option>
                  <option value="All">All</option>
                </select>
                </label>
                <input type="submit" value="Submit" />
              </form>
              <div className="stateInfo-header">
                <div className="header"><strong>Zipcode</strong></div>
                <div className="header"><strong>City</strong></div>
                <div className="header"><strong>Year Month</strong></div>
                <div className="header"><strong>Median Property Value ($US)</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.filtered}

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
