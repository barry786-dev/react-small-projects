import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong!</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
