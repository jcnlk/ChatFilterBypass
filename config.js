import { @Vigilant, @SwitchProperty } from "Vigilance";

@Vigilant("ChatFilterBypass", "ChatFilterBypass")

class Config {
  @SwitchProperty({
    name: "Toggle",
    description: "Turn this module §aon§r or §coff§r.",
    category: "General"
  })
  toggled = true;

  constructor() {
    this.initialize(this);
  }
}
export default new Config();