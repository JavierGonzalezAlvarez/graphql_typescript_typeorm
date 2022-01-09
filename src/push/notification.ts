/* documentation
https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.notification.html#addeventlistener
*/

export interface Push {
    body: string;
    icon: string;
}

export class Notification {
    model: any;

    async new_push(push: any) {
        /*
        do some validations and return value from the game
        if we get data, return the value of data(body & data (icon)
        -> push.body = data(body)
        -> push.icon = data(icon)
        */
        let message: Push = {
            body: push.body,
            icon: push.icon,
        };
        return await this.model.push(message);
    }

}

//new notification
export function push_front() {
    const element_in_HTML = document.getElementById("notification");
    element_in_HTML?.addEventListener("message_event", listenerNotification);
}

//link to the front.
function listenerNotification(this: HTMLElement, ev: Event) {
    let pushNotification = new Notification();
    let message = pushNotification.new_push({
        title: 'title',
        body: 'your points are ...',
        icon: 'path_to_icon',
    });
    ev.preventDefault();
    return message;
}
