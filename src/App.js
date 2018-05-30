import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBN7XCp5NuWMLeeAmk9I-tLn3UI_YQbbLk',
            authDomain: 'auth-b1f3b.firebaseapp.com',
            databaseURL: 'https://auth-b1f3b.firebaseio.com',
            projectId: 'auth-b1f3b',
            storageBucket: 'auth-b1f3b.appspot.com',
            messagingSenderId: '90780314716'
          });

        //  Determines if the user has signed in or not
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (<CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                Log out 
                            </Button>
                        </CardSection>
                        );
            case false:
                return <LoginForm />;
            default:
                return <Spinner />;

        }
    }
    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
