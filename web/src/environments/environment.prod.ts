export const environment = {
  production: true,
  keys: {
    userToken: 'USER_TOKEN',
  },
  apiBaseUrl: 'https://todo-group-api.herokuapp.com',
  apiEndpoints: {
    user: '/users',
    auth: {
      local: '/auth/local'
    }
  }
};
