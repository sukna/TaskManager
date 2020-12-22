import axios from 'axios';
import { environment } from '../../../environments/environment';

let $axios_auth = axios.create({
  baseURL: environment.apiUrl,
});

$axios_auth.interceptors.request.use((config) => {
  let user = JSON.parse(localStorage.getItem('currentUser'));
  config.headers.common['Authorization'] = 'Bearer ' + (user ? user.token : '');
  config.headers.common['Access-Control-Allow-Origin'] = '*';
  return config;
});

export default $axios_auth;
