import { registerWhen } from "../BloomCore/utils/Utils";
import config from "./config";

let lastMessageInfo = {
  command: null,
  recipient: null,
  timestamp: 0,
};

function applyBypassMethod(message) {
  switch (config.bypassMethod) {
    case 0: // Font
      return message.replace(/./g, (char) => {
        const code = char.charCodeAt(0);
        return code >= 33 && code <= 126
          ? String.fromCharCode(0xff00 + code - 0x20)
          : char === " "
          ? "　"
          : char;
      });
    case 1: // Add spaces
      return message.split("").join(" ");
    case 2: // Add .
      return message.split("").join(".");
    case 3: // Add *
      return message.split("").join("*");
    case 4: // Add -
      return message.split("").join("-");
    default:
      return message;
  }
}

registerWhen(register("messageSent", (fullMessage, event) => {
  if (!fullMessage.startsWith("/")) return;
  const currentTime = Date.now();
  let command = null;
  let recipient = null;

  if (fullMessage.startsWith("/pc ") || fullMessage.startsWith("/party chat ")) command = "/pc";
  if (fullMessage.startsWith("/ac ") || fullMessage.startsWith("/achat ")) command = "/ac";
  if (fullMessage.startsWith("/gc ") || fullMessage.startsWith("/guild chat ")) command = "/gc";
  if (fullMessage.startsWith("/cc ") || fullMessage.startsWith("/coopchat ")) command = "/cc"
  if (fullMessage.match(/^\/(w|whisper|msg|message|tell) \w+ /)) {
    const parts = fullMessage.split(" ");

    command = parts[0].startsWith("/w")
      ? "/w"
      : parts[0].startsWith("/whisper")
      ? "/whisper"
      : parts[0].startsWith("/msg")
      ? "/msg"
      : "/message";

    recipient = parts[1];
  }

  if (!command) return;
  lastMessageInfo = {
    command: command,
    recipient: recipient,
    timestamp: currentTime,
  };
}), () => config.toggle);

registerWhen(register("chat", (message, event) => {
    cancel(event);

    ChatLib.chat("&c[ChatFilterBypass] &fBypassing blocked message...");

    const bypassedMessage = applyBypassMethod(message);
    const currentTime = Date.now();
    const isRecentMessage = currentTime - lastMessageInfo.timestamp < 1000;

    if (lastMessageInfo.command && isRecentMessage) {
      if (lastMessageInfo.command === "/w" || lastMessageInfo.command === "/whisper" ||
        lastMessageInfo.command === "/msg" || lastMessageInfo.command === "/message") {
        if (lastMessageInfo.recipient) {
          const cmdWithoutSlash = lastMessageInfo.command.substring(1);
          setTimeout(() => ChatLib.command(`${cmdWithoutSlash} ${lastMessageInfo.recipient} ${bypassedMessage}`), 500);
        }
      }
      else ChatLib.command(lastMessageInfo.command.substring(1) + ` ${bypassedMessage}`);
    } else ChatLib.say(bypassedMessage);
  }).setCriteria('We blocked your comment "${message}" because it ${*}. https://www.hypixel.net/rules/'), () => config.toggle);

register("command", () => config.openGUI()).setName("chatfilterbypass").setAliases(["cfb", "bypass"]);