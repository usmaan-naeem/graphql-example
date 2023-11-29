import { Client } from '@elastic/elasticsearch';

const esClient = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'kknmo6NOrqB761AIy5xn'
  },
  tls: {
    rejectUnauthorized: false // Disables SSL certificate verification
  }
});

export default esClient;
