import { @Vigilant, @SwitchProperty } from "Vigilance";

@Vigilant("ChatFilterBypass", "ChatFilterBypass")

class Config {
  @SwitchProperty({
    name: "font bypass",
    description: "different font for messages",
    category: "General"
  })
  toggled = true;

  @SwitchProperty({
    name: "space bypass",
    description: "add a space between every message",
    category: "General"
  })
  toggled2 = true;

  @SwitchProperty({
    name: ". bypass",
    description: "use . between every letter",
    category: "General"
  })
  toggled3 = true;

  @SwitchProperty({
    name: "* bypass",
    description: "use * between every letter",
    category: "General"
  })
  toggled4 = true;

  @SwitchProperty({
    name: "- bypass",
    description: "use - between every letter",
    category: "General"
  })
  toggled5 = true;

  constructor() {
    this.initialize(this);
  }
}
export default new Config();