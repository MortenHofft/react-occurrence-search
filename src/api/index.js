import compose from "./compose";
//import _ from 'lodash';
import axios from './axios';

const esEndpoint = '//es1.gbif-dev.org/some_fungi'
// const esEndpoint = '//c6n1.gbif.org:9200/occurrence'

const query = (filters, size, from) => {
  let body = compose(filters)
    .size(size)
    .from(from)
    .build();
  return axios.post(`${esEndpoint}/_search`, body, {});
};

export default {
  query
};
