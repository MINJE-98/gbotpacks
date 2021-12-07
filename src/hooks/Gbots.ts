import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall } from "@usedapp/core";
import gbotsContractAbi from "../abi/gbotsSale.json";
import { gbotsSale } from "../contract";
import { useContractFunction } from "./workaround";

declare const window: any;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const gbotsSaleContractInterface = new ethers.utils.Interface(gbotsContractAbi);
const contract = new Contract(gbotsSale, gbotsSaleContractInterface, signer);

export function useGetPaused() {
  const [isPaused] =
    useContractCall({
      abi: gbotsSaleContractInterface,
      address: gbotsSale,
      method: "paused",
      args: [],
    }) ?? [];
  return !isPaused ? "O" : "X";
}

// 등급 종류
export function useGetSkuList() {
  let [skuList] =
    useContractCall({
      abi: gbotsSaleContractInterface,
      address: gbotsSale,
      method: "getSkus",
      args: [],
    }) ?? [];
  if (!!skuList) skuList = skuList.slice(4);
  return skuList;
}

// 일단 등급
export function useGetCommonAmount(packCode: any) {
  const [commonAmount] =
    useContractCall({
      abi: gbotsSaleContractInterface,
      address: gbotsSale,
      method: "getSkuInfo",
      args: [packCode],
    }) ?? [];
  return commonAmount;
}
// 레어 등급
export function useGetRareAmount(packCode: any) {
  const [rareAmount] =
    useContractCall({
      abi: gbotsSaleContractInterface,
      address: gbotsSale,
      method: "getSkuInfo",
      args: [packCode],
    }) ?? [];
  return rareAmount;
}
//  에픽 등급
export function useGetEpicAmount(packCode: any) {
  const [epicAmount] = useContractCall({
    abi: gbotsSaleContractInterface,
    address: gbotsSale,
    method: "getSkuInfo",
    args: [packCode],
  }) ?? [packCode];
  return epicAmount;
}
// 레전더리 등급
export function useGetLegendaryAmount(packCode: any) {
  const [legendaryAmount] =
    useContractCall({
      abi: gbotsSaleContractInterface,
      address: gbotsSale,
      method: "getSkuInfo",
      args: [packCode],
    }) ?? [];
  return legendaryAmount;
}

export function usePurchaseFor() {
  const { state, send } = useContractFunction(contract, "purchaseFor", 137);
  return { state, send };
}
