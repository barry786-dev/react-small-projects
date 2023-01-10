import { Fragment, useState, useEffect, Component } from 'react';
import usersContext from '../store/users-context';
import Users from './Users';
import classes from './UserFinder.module.css';
import ErrorBoundary from './ErrorBoundary';

class UserFinder extends Component {
  static contextType = usersContext;
  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: '',
      error : false,
    };
  }
  componentDidMount() {
    // Send http request...
    console.log('componentDidMount');
    this.setState({ filteredUsers: this.context.users });
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  searchChangeHandler = (event) => {
    this.setState((curState) => {
      return {
        searchTerm: event.target.value,
      };
    });
  };

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary searchTerm={this.state.searchTerm}>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

/* const UserFinder = (props) => {
  const [filteredUsers, setFilteredUsers] = useState(props.DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredUsers(
      DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
    );
  }, [searchTerm]);

  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Fragment>
      <div className={classes.finder}>
        <input type='search' onChange={searchChangeHandler} />
      </div>
      <Users users={filteredUsers} />
    </Fragment>
  );
}; */

export default UserFinder;
