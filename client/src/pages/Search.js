import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Alert from "../components/Alert";



class Search extends Component {
    state = {
      search: "",
      yardsales: [],
      results: [],
      error: ""
    };


    componentDidMount() {
        API.getPost()
        .then(res => this.setState({ yardsales: res.data }))
        .catch(err => console.log(err));
    }

    handleInputChange = event => {
        this.setState({ search: event.target.value });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        API.getPost(this.state.search)
        .then(res => {
            if (res.data.status === "error") {
            throw new Error(res.data);
            }
            this.setState({ results: res.data, error: "" });
        })
        .catch(err => this.setState({ error: err.message }));
    };

    render() {
        return (
        <div>
            <Container style={{ minHeight: "80%" }}>
            <h1 className="text-center">Search Yardsales!</h1>
            <Alert
                type="danger"
                style={{ opacity: this.state.error ? 1 : 0, marginBottom: 10 }}
            >
                {this.state.error}
            </Alert>
            <SearchForm
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleInputChange}
                yardsales={this.state.yardsales}
            />
            <SearchResults results={this.state.results} />
            </Container>
        </div>
        );
    }
}

export default Search;