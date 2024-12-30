import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'https://192.168.49.2:31559',
    realm: 'quarkus',
    clientId: 'quarkus-client',

});



export default keycloak;