import { AuthserviceService } from '../_services/authservice.service';

export function appInitializer(authenticationService: AuthserviceService) {
    return () => new Promise(resolve => {
        // authenticationService.tokenRefresh()
        //     .subscribe()
        //     .add(resolve);
    });
}
