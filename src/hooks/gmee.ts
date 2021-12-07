import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import gmeeAbi from "../abi/gmee.json";
import { gmee } from "../contract";
import { useContractFunction } from "./workaround";

declare const window: any;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const gbotsSaleContractInterface = new ethers.utils.Interface(gmeeAbi);
const contract = new Contract(gmee, gbotsSaleContractInterface, signer);

export function useApprove() {
  const { state, send } = useContractFunction(contract, "approve", 137);
  return { state, send };
}
