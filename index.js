import config from "./config";

register("chat", (message, event) => {
    if (!config.toggled) return;
    cancel(event);

    if (config.bypassMethod === 0) {
        const fullwidthMessage = message.replace(/./g, char => {
            const code = char.charCodeAt(0);
            return (code >= 33 && code <= 126)
                ? String.fromCharCode(0xFF00 + code - 0x20)
                : (char === ' ') ? '　' : char;
        });
        ChatLib.say(fullwidthMessage);
    }

    if (config.bypassMethod === 1) ChatLib.say(message.split('').join(' '));
    if (config.bypassMethod === 2) ChatLib.say(message.split('').join('.'));
    if (config.bypassMethod === 3) ChatLib.say(message.split('').join('*'));
    if (config.bypassMethod === 4) ChatLib.say(message.split('').join('-'));
}).setCriteria("We blocked your comment \"${message}\" because it ${*}. https://www.hypixel.net/rules/");

register("command", () => config.openGUI()).setName("chatfilterbypass").setAliases(["cfb", "bypass"]);