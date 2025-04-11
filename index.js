import config from "./config";

register("chat", (message, event) => {
    if (!config.toggled && !config.toggled2 && !config.toggled3 && !config.toggled4 && !config.toggled5) return;
    cancel(event);

    if (config.toggled) {
        const fullwidthMessage = message.replace(/./g, char => {
            const code = char.charCodeAt(0);
            return (code >= 33 && code <= 126)
                ? String.fromCharCode(0xFF00 + code - 0x20)
                : (char === ' ') ? '　' : char;
        });
        ChatLib.say(fullwidthMessage);
    }

    if (config.toggled2) {
        const spacedMessage = message.split('').join(' ');
        ChatLib.say(spacedMessage);
    }

    if (config.toggled3) {
        const dottedMessage = message.split('').join('.');
        ChatLib.say(dottedMessage);
    }

    if (config.toggled4) {
        const sigmaMessage = message.split('').join('*');
        ChatLib.say(sigmaMessage);
    }

    if (config.toggled5) {
        const dashedMessage = message.split('').join('-');
        ChatLib.say(dashedMessage);
    }
}).setCriteria("We blocked your comment \"${message}\" because it ${*}. https://www.hypixel.net/rules/");

register("command", () => config.openGUI()).setName("chatfilterbypass").setAliases(["cfb", "bypass"]);