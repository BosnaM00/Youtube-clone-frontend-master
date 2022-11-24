import { NgModule } from '@angular/core';
import { AuthModule} from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev-hzduvqdtil7y2zek.us.auth0.com',
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: 'spY85x7ZpeEXPCmjLI9746fe1fco6mMR',
            usePushedAuthorisationRequests: true,
            scope: 'please-enter-scopes', // 'openid profile offline_access ' + your scopes
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            ignoreNonceAfterRefresh: true,
            customParamsAuthRequest: {
              prompt: 'consent', // login, consent
            },
    }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
