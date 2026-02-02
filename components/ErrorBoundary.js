import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error to an error reporting service if needed
    console.error(error, info);
  }

  handleRestart = () => {
    this.setState({ hasError: false });
    if (this.props.onRestart) this.props.onRestart();
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong.</Text>
          <Text style={styles.message}>Please try restarting the app.</Text>
          <Button title="Restart app" onPress={this.handleRestart} />
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#b00020',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
});

export default ErrorBoundary;
