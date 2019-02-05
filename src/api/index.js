import bodybuilder from "bodybuilder";
//import _ from 'lodash';
import axios from './axios';

const esEndpoint = '//es1.gbif-dev.org/some_fungi'
const query = () => {
  return axios.post(`${esEndpoint}/_search`, {}, {
  });
};

export default {
  query
};
