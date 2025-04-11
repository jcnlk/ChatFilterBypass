import { registerWhen } from "../BloomCore/utils/Utils";
import config from "./config";

registerWhen(register("chat", (message, event) => {
  cancel(event);

  if (config.bypassMethod === 0) {
    const bypassMsg = message.replace(/./g, (char) => {
      const code = char.charCodeAt(0);
      return code >= 33 && code <= 126
        ? String.fromCharCode(0xff00 + code - 0x20) : char === " "
        ? "　" : char;
    });
    ChatLib.say(bypassMsg);
  }

  if (config.bypassMethod === 1) ChatLib.say(message.split("").join(" "));
  if (config.bypassMethod === 2) ChatLib.say(message.split("").join("."));
  if (config.bypassMethod === 3) ChatLib.say(message.split("").join("*"));
  if (config.bypassMethod === 4) ChatLib.say(message.split("").join("-"));
}).setCriteria('We blocked your comment "${message}" because it ${*}. https://www.hypixel.net/rules/'), () => config.toggle);

register("command", () => config.openGUI()).setName("chatfilterbypass").setAliases(["cfb", "bypass"]);


register("messageSent" ( => {
  
}))