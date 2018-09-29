import Eventbus from "./Eventbus"

export default class ServiceFactory {
    private static _eventbus: Eventbus

    public static get Eventbus(): Eventbus {
        if (!ServiceFactory._eventbus) {
            ServiceFactory._eventbus = new Eventbus()
        }

        return ServiceFactory._eventbus
    }
}