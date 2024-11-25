import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'quarkus',
    clientId: 'quarkus-client',

});



export default keycloak;