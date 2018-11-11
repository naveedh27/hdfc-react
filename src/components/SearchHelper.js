import _ from 'lodash';
import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'

class SearchHelper extends Component {

    state = {
        value: '',
        isLoading: '',
        results: '',
    }

    handleChange = (event) => {
        this.setState({ keyword: event.target.value });
        this.props.filterData(this.state.keyword.toLowerCase());
    }

    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => {
        this.setState({ isLoading: false, results: [], value: '' });
        console.log('rest')
        this.props.filterData(this.props.source)
    }

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(this.props.source, isMatch),
            })
            this.props.filterData(this.state.results)
        }, 300)
    }


    render() {

        return (
            <Search
                loading={this.state.isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={this.state.results}
                value={this.state.value}
            />
        );

    }
}


export default SearchHelper;