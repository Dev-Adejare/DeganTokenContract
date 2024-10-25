import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";



const DeganTokenModule = buildModule("DeganTokenModule", (m) => {
  const DeganToken = m.contract("DegenToken");

  return { DeganToken };
});

export default DeganTokenModule;