import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const error = this.state.error;
      let message = 'Unknown error';
      if (error) {
        if (error.message) {
          message = error.message;
        } else if (error.statusText) {
          message = error.statusText;
        }
        // Specific handling for WebSocket connection errors
        if (message.includes('WebSocket')) {
          message = 'WebSocket connection failed. Please ensure the backend server is running.';
        }
      }
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h2>Something went wrong.</h2>
          <p>{message}</p>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
