export const environment = {
  production: true,
  keys: {
    userToken: 'USER_TOKEN',
  },
  apiBaseUrl: 'https://todo-group-api.herokuapp.com',
  apiEndpoints: {
    auth: {
      local: '/auth/local'
    },
    user: '/users',
    groups: {
      getAll: '/task-group',
    },
  }
};
