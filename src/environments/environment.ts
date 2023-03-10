export const environment = {
  production: false,
};

export const AUTH_ENDPOINT = {
  // baseEndpoint: 'https://fvuknp64n6.execute-api.us-east-1.amazonaws.com/dev', // api gw
  baseEndpoint: 'http://lbn-dermo-app-web-84168d11e474aa03.elb.us-east-1.amazonaws.com:3000', // load balancer
  // baseEndpoint: 'http://localhost:3000',
  signupPath: '/auth/register',
  loginPath: '/auth/login',
  profilePersonalPath: '/profile/personal',
  profileMedicPath: '/profile/medic'
}

export const DIAGNOSTIC_ENDPOINT = {
  // baseEndpoint: 'https://fvuknp64n6.execute-api.us-east-1.amazonaws.com/dev', // api gw
  baseEndpoint: 'http://lbn-dermo-app-web-84168d11e474aa03.elb.us-east-1.amazonaws.com:3001', // load balancer
  // baseEndpoint: 'http://localhost:3001',
  registerPath: '/diagnostic/register',
  queryInjuryPath: '/diagnostic/injury'
}

export const INJURY_REPORT_ENDPOINT = {
  baseEndpoint: 'http://dermoappmovil-env.eba-vqrznmv9.us-east-1.elasticbeanstalk.com',
  getLessonsByEmailPath: '/injury/getall',
  getAllLessonsPath: '/injury/get/all',
  getAllPatientsPath: '/user/profile/get/all'
}

