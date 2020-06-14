import React from 'react';
import { View, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useMutation, gql } from '@apollo/client';
import UserForm from '../components/UserForm';
import Loading from '../components/Loading';

import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache
  } from '@apollo/client';
  import { setContext } from 'apollo-link-context';
  // import SecureStore for retrieving the token value
  import * as SecureStore from 'expo-secure-store';

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const storeToken = token => {
    SecureStore.setItemAsync('token', token).then(
      props.navigation.navigate('App')
    );
  };

  const SignIn = props => {
    const storeToken = token => {
      SecureStore.setItemAsync('token', token).then(
        props.navigation.navigate('App')
      );
    };
  
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
      onCompleted: data => {
        storeToken(data.signIn)
      }
    });
  
    // if loading, return a loading indicator
    if (loading) return <Loading />;
    return (
      <React.Fragment>
        {error && <Text>Error signing in!</Text>}
        <UserForm
          action={signIn}
          formType="signIn"
          navigation={props.navigation}
        />
      </React.Fragment>
    );
  };

const uri = API_URI;
const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri });

// return the headers to the context
const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: (await SecureStore.getItemAsync('token')) || ''
    }
  };
});

// configure Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});