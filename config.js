import { @Vigilant, @SwitchProperty, @SelectorProperty } from "Vigilance";

@Vigilant("ChatFilterBypass", "ChatFilterBypass")

class Config {
  @SwitchProperty({
    name: "Toggle",
    description: "Turn this module §aon§r or §coff§r.",
    category: "General"
  })
  toggle = true;

  @SelectorProperty({
    name: "Bypass Method",
    description: "Use this method to bypass:",
    category: "General",
    options: ["Font", "Add spaces", "Add .", "Add *", "Add -"]
  })
  bypassMethod = 0;

  constructor() {
    this.initialize(this);
    this.addDependency("Bypass Method", "Toggle");
  }
}
export default new Config();