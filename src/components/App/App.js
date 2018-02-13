import React, { Component } from "react";
// import "./index.css";
import Table from "../Table";
import Search from "../Search";
import Button from "../Button";
import withLoading from "../HOC/withLoading";
import {
  DEFAULT_QUERY,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HITS_PER_PAGE
} from "../../constants";

const ButtonWithLoading = withLoading(Button);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: DEFAULT_QUERY,
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false
    };
  }

  setSearchTopStories = result => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      },
      isLoading: false
    });
  };

  fetchSearchTopStories = (searchTerm, page = 0, HPP = 3) => {
    this.setState({
      isLoading: true
    });
    fetch(
      `${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HITS_PER_PAGE}${HPP}`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({ error: e }));
  };

  needsToSearchTopStories = searchTerm => {
    return !this.state.results[searchTerm];
  };
  onDismiss = id => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = ele => {
      return ele.objectID !== id;
    };
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  };

  onSearchSubmit = event => {
    const { searchTerm } = this.state;
    this.setState({
      searchKey: searchTerm
    });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  };

  onSearchChange = event => {
    const searchTerm = event.target.value;
    this.setState({
      searchTerm
    });
  };

  componentDidMount() {
    const { searchTerm, searchKey } = this.state;
    this.fetchSearchTopStories(searchTerm);
    this.setState({
      searchTerm: searchKey
    });
  }
  render() {
    const { searchTerm, results, searchKey, error } = this.state;
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];
    return (
      <div>
        <h3>
          A few good points for me to remember during making this simple
          Hackernews web client:
        </h3>
        <ol>
          <li>
            Client Side Cache Result: search "123" and change to "456" then
            search "123" again.
          </li>
          <li>
            Sorting list technique: Click the green label such as "Title",
            "COMMENTS".....
          </li>
          <li>
            Higher Order Function technique used: the bttom "Load 3 more" button
            is &lt;ButtonWithLoading&gt; component, which is a new component
            return by &lt;withLoading&gt;( High Order Component )
          </li>
          <li>
            Credit to this awesome free book{" "}
            <a href="https://github.com/the-road-to-learn-react/the-road-to-learn-react">
              "The Road To learn React"{" "}
            </a>
          </li>
        </ol>
        <Search
          searchTerm={searchTerm}
          onSearchChange={this.onSearchChange}
          onSearchSubmit={this.onSearchSubmit}
        >
          Search on Hacker News
        </Search>

        {error ? (
          <h1> Error Occured !! </h1>
        ) : (
          <Table list={list} onDismiss={this.onDismiss} />
        )}

        <div className="loading-more">
          <ButtonWithLoading
            isLoading={this.state.isLoading}
            className={"button"}
            onClick={() => {
              this.fetchSearchTopStories(searchTerm, page + 1, 3);
            }}
          >
            Load 3 More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;
