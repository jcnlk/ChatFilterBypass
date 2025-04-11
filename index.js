register("chat", (message, event) => {
    cancel(event);
    ChatLib.say(message.replace(/./g, char => {
        const code = char.charCodeAt(0);
        return (code >= 33 && code <= 126) ? String.fromCharCode(0xFF00 + code - 0x20) : (char === ' ') ? '　' : char;
    }));
}).setCriteria("We blocked your comment \"${message}\" because it ${*}. https://www.hypixel.net/rules/");