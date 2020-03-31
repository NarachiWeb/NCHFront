import { XHRBackend } from '@angular/http';
import { JwtRequestOptions } from './jwt.options';
import { JwtService } from './jwt.service';
import { AuthenticationService } from './../services/auth.service'

function httpServiceFactory(backend: XHRBackend, options: JwtRequestOptions, authService: AuthenticationService) {
    return new JwtService(backend, options, authService);
}
export { httpServiceFactory };
