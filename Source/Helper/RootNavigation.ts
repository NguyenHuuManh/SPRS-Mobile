import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();
export function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

export function reset(name, params?: any) {
    console.log('navigationRef', navigationRef.current);
    if (navigationRef.isReady()) {
        console.log('dasdsas ')
        navigationRef.reset({
            index: 1,
            routes: [{ name: name }]
        });
    }
}

export function getCurrentRoute() {
    const route = navigationRef.getCurrentRoute();
    return route;
}

export function getStateRoute() {
    const route = navigationRef.getState();
    return route;
}
export function getParentRoute() {
    const route = navigationRef.getParent();
    return route;
}