import React from 'react';
import LoginLogoutButtons from '../buttons/LoginLogoutButtons';
import { Security, LoginCallback } from '@okta/okta-react';

const OktaLoginWidget = () => {

    const OKTA_DOMAIN = process.env.REACT_APP_OKTA_DOMAIN;
    const OKTA_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

    const config = {
        issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
        redirectUri: window.location.origin + '/implicit/callback',
        clientId: `${OKTA_CLIENT_ID}`,
        pkce: true
    };

    return (
        <div>
            
        </div>
    )
}

export default OktaLoginWidget;