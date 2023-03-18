export const environment = {
  production: true
};

export const AUTH_ENDPOINT = {
  baseEndpoint: 'http://lbn-dermo-app-web-84168d11e474aa03.elb.us-east-1.amazonaws.com:3000', // load balancer
  signupPath: '/auth/register',
  loginPath: '/auth/login',
  profilePersonalPath: '/profile/personal',
  profileMedicPath: '/profile/medic'
}

export const DIAGNOSTIC_ENDPOINT = {
  baseEndpoint: 'http://lbn-dermo-app-web-84168d11e474aa03.elb.us-east-1.amazonaws.com:3001', // load balancer
  registerPath: '/diagnostic/register',
  queryInjuryPath: '/diagnostic/injury'
}

export const INJURY_REPORT_ENDPOINT = {
  baseEndpoint: 'http://dermoappmovil-env.eba-vqrznmv9.us-east-1.elasticbeanstalk.com',
  getLessonsByEmailPath: '/injury/getall',
  getAllLessonsPath: '/injury/get/all',
  getAllPatientsPath: '/user/profile/get/all'
}
