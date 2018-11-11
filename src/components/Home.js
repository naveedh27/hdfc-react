import React, { Component } from 'react';
import SearchHelper from './SearchHelper';
import axios from 'axios';
import { Grid, Button, Progress, Header, Icon, Flag, Divider, Segment, Label } from 'semantic-ui-react';

class Home extends Component {

    constructor(props) {

        super(props);

        this.state = {
            apiData: {},
            popData: '',
            initLoader: 10,
            columns: 3,
            currFilertData: {},
            loading: true
        }

    }

    filterData = (_filteredData) => {
        console.log(_filteredData.length);
        if (_filteredData.length === 0) {
            _filteredData = [];
        }
        this.setState({ currFilertData: _filteredData });
        this.projectIterator(this.state.currFilertData);
    }

    sortFilterDataByPercent = (_reverse) => {
        let sortedData = this.state.currFilertData.sort((a, b) => {
            return parseFloat(a["percentage.funded"] - b["percentage.funded"]);
        });
        if (_reverse)
            this.projectIterator(sortedData.reverse());
        else
            this.projectIterator(sortedData);
    }

    sortFilterDataByDate = (_reverse) => {
        let sortedData = this.state.currFilertData.sort((a, b) => {
            let aDate = new Date(Date.parse(a["end.time"]))
            let bDate = new Date(Date.parse(b["end.time"]))
            return parseFloat(aDate-bDate);
        });
        if (_reverse)
            this.projectIterator(sortedData.reverse());
        else
            this.projectIterator(sortedData);
    }


    async componentDidMount() {
        let _apiData = await axios.get('http://starlord.hackerearth.com/kickstarter')
        this.setState({ apiData: _apiData.data, currFilertData: _apiData.data, loading: false });
        this.projectIterator(this.state.apiData);
    }

    projectIterator = (_actData) => {
        let _itr = 1, _loopData = [], _allData = [], element = '', _curr = '', _hasCollected = '', _endDate = '';
        let status = '';
        let _lCopy = _actData;
        if (_lCopy.length > 0) {
            for (element in _lCopy) {

                _lCopy[element]["num.backers"] = (_lCopy[element]["num.backers"] > 1000) ? ((_lCopy[element]["num.backers"] / 1000).toFixed(1) + 'K') : (_lCopy[element]["num.backers"]);

                _lCopy[element]["amt.pledged"] = (_lCopy[element]["amt.pledged"] > 1000) ? ((_lCopy[element]["amt.pledged"] / 1000).toFixed(1) + 'K') : (_lCopy[element]["amt.pledged"]);

                _endDate = new Date(Date.parse(_lCopy[element]["end.time"]));

                if (_lCopy[element]["percentage.funded"] >= 100) {
                    _hasCollected = true;
                    status = 'Goal Reached';
                } else {
                    _hasCollected = false;
                    status = 'Yet to Reach Goal';
                }

                switch (_lCopy[element]["currency"]) {
                    case "usd":
                        _curr = 'dollar sign'
                        break;
                    case "gbp":
                        _curr = 'pound sign'
                        break;
                    case "cad":
                        _curr = 'dollar sign'
                        break;
                    case "aud":
                        _curr = 'dollar sign'
                        break;
                    default:
                        _curr = 'money bill alternate outline'
                }

                _loopData.push(
                    <Grid.Column key={_lCopy[element]["s.no"]}>
                        <Segment>
                            <Label as='a' color={(_hasCollected ? 'green' : 'blue')} ribbon='right' >{status}</Label>
                            <Grid.Row>
                                <Header className='headerRow' as='h3'><a> {_lCopy[element]["title"]} </a></Header>
                                <span> <Header as='h5'>- {_lCopy[element]["by"]}</Header>  <span style={{ float: `right` }}><Flag name={_lCopy[element]["country"].toLowerCase()} /></span></span>
                                <div><Icon name='map marker alternate' />{_lCopy[element]["location"].split(',')[0]},{_lCopy[element]["state"]}</div>
                                <Divider />
                            </Grid.Row>
                            <Grid.Row className='projContent'>
                                <span>
                                    {_lCopy[element]["blurb"]}
                                </span>
                            </Grid.Row>
                            <Grid.Row className='amtCont'>
                                <Header as='h5'> Amount Pledged : <Icon name={_curr} >{_lCopy[element]["amt.pledged"]}</Icon></Header>
                            </Grid.Row>
                            <Grid.Row className='amtCont'>
                                <Header as='h5'> Percentage Funded: {_lCopy[element]["percentage.funded"]} %</Header>
                                <Progress percent={_lCopy[element]["percentage.funded"]} color={(_hasCollected ? 'green' : 'blue')} active={!_hasCollected} />
                            </Grid.Row>
                            <Grid.Row>
                                <span style={{ display: `inline` }}> <Header as='h5'> Ends on : {_endDate.toLocaleString().split(',')[0]} </Header> </span>
                            </Grid.Row>
                            <Grid.Row>
                                <span style={{ display: `inline` }}> <Header as='h5'> Supported By : {_lCopy[element]["num.backers"]}  <Icon name='users' /> </Header> </span>
                                <Header style={{ display: `inline`, color: `#4183c4` }}> <a href={'https://www.kickstarter.com/' + _lCopy[element]["url"]} rel="noopener noreferrer" target='_blank'>More</a></Header>
                            </Grid.Row>

                        </Segment>
                    </Grid.Column>
                )
                if (_itr % this.state.columns == 0) {
                    _allData.push(<Grid.Row key={_lCopy[element]["s.no"]} columns={this.state.columns}> {_loopData} </Grid.Row>);
                    _loopData = [];
                }
                ++_itr;
            }
            _allData.push(<Grid.Row key={_lCopy[element]["title"]} columns={this.state.columns}> {_loopData} </Grid.Row>);

        } else {
            _allData.push(
                <Grid.Row columns={16} key="no-op">
                    <Grid.Column width={16}>
                        <Segment inverted fluid='true'>
                            {(this.state.loading) ? 'Loading Data...' : 'No Data Found'}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>);
        }
        this.setState({ popData: _allData })
    }




    render() {
        return (
            <Grid>
                <Grid.Row columns={16}>
                    <Grid.Column width={6}>
                        <Button.Group>
                            <Button primary onClick={() => this.sortFilterDataByPercent(false)}><Icon name='angle up' /></Button>
                            <Button secondary>Percentage Funded</Button>
                            <Button primary onClick={() => this.sortFilterDataByPercent(true)}><Icon name='angle down' /></Button>
                        </Button.Group>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Button.Group>
                            <Button primary onClick={() => this.sortFilterDataByDate(false)}><Icon name='angle up' /></Button>
                            <Button secondary>Ends On</Button>
                            <Button primary onClick={() => this.sortFilterDataByDate(true)}><Icon name='angle down' /></Button>
                        </Button.Group>

                    </Grid.Column>
                    <Grid.Column width={4}>
                        <SearchHelper filterData={this.filterData} source={this.state.apiData} />
                    </Grid.Column>
                </Grid.Row>
                {this.state.popData}
            </Grid>

        )
    }

}




export default Home;