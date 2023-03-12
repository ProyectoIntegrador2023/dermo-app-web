export const environment = {
  production: true
};

export const AUTH_ENDPOINT = {
  baseEndpoint: 'https://fvuknp64n6.execute-api.us-east-1.amazonaws.com/dev', // api gw
  signupPath: '/auth/register',
  loginPath: '/auth/login',
  profilePersonalPath: '/profile/personal',
  profileMedicPath: '/profile/medic'
}

export const DIAGNOSTIC_ENDPOINT = {
  baseEndpoint: 'https://fvuknp64n6.execute-api.us-east-1.amazonaws.com/dev', // api gw
  registerPath: '/profile/personal'
}
