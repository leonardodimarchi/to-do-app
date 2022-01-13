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
    user: {
      base: '/users',
      getMe: '/users/me',
    },
    groups: {
      base: '/task-group',
    },
    tasks: {
      base: '/tasks'
    }
  }
};
