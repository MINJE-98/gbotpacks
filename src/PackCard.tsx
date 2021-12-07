import React, {useEffect } from "react";
import { useTokenAllowance, useEthers } from "@usedapp/core";
import { CommonPack, gbotsSale, gmee } from "./contract";
import { useGetCommonAmount, usePurchaseFor } from "./hooks/Gbots";
import { formatUnits } from "ethers/lib/utils";
import { useToast } from "@chakra-ui/react";
import { Box, Grid, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import  legendary  from "./res/legendary.png"
import  epic  from "./res/epic.png"
import  rare  from "./res/rare.png"
import  common  from "./res/common.png"
import { useApprove } from "./hooks/gmee";
import { Button } from "@chakra-ui/button";


export default function PackCard({ packCode }: any) {
  const { account } = useEthers();
  const allowance = useTokenAllowance(gmee, account, gbotsSale);
  const commonAmount = useGetCommonAmount(packCode)
  const { state: statePurchaseFor, send: sendPurchaseFor } = usePurchaseFor();
  const { state: approveState, send: sendApprove } = useApprove();
  const toast = useToast();
  const buyBot = () =>{
    sendPurchaseFor(account, gmee, CommonPack,2 ,"0x00")
    }
    const approve = () =>{
        sendApprove(gbotsSale,"115792089237316195423570985008687907853269984665640564039457584007913129639935")
    }
    useEffect(()=>{
        if(approveState.status === "Mining" && statePurchaseFor.status === "Mining") {
            toast({
                title: "트랜젝션 제출됨",
                position: "top-right",
                description: "트랜젝션이 제출되었습니다.",
                status: "info",
                duration: 9000,
                isClosable: true,
              })
        }
        if(approveState.status === "Success" && statePurchaseFor.status === "Success") {
            toast({
                title: "트랜젝션 제출 확인됨",
                position: "top-right",
                description: "트랜젝션 제출 확인되었습니다!",
                status: "success",
                duration: 9000,
                isClosable: true,
              })
        }
        if(approveState.status === "Fail"&& statePurchaseFor.status === "Fail") {
            toast({
                title: "트랜젝션 실패",
                position: "top-right",
                description: approveState.errorMessage,
                status: "error",
                duration: 9000,
                isClosable: true,
              })
        }
        if(approveState.status === "Exception" && statePurchaseFor.status === "Exception") {
            toast({
                title: "트랜젝션 제출 실패",
                position: "top-right",
                description: approveState.errorMessage,
                status: "error",
                duration: 9000,
                isClosable: true,
              })
        }
    },[approveState])
    const RenderForGrade = ({packCode}: any) =>{
        const dataList = {
            Image: "",
            name: "",
            tag: "",
            price: 0
        }
        if('0x636f6d6d6f6e2d73616c652d676d656500000000000000000000000000000000' === packCode) {
            dataList.Image = common
            dataList.name = "Common Pack"
            dataList.price = 100
        }
        if('0x726172652d73616c652d676d6565000000000000000000000000000000000000' === packCode) {
            dataList.Image = rare
            dataList.name = "Rare Pack"
            dataList.price = 500
        }
        if('0x657069632d73616c652d676d6565000000000000000000000000000000000000' === packCode) {
            dataList.Image =  epic
            dataList.name = "Epic Pack"
            dataList.price = 2000
        }
        if('0x6c6567656e646172792d73616c652d676d656500000000000000000000000000' === packCode) {
            dataList.Image =  legendary
            dataList.name = "Legendary Pack"
            dataList.price = 5000
        }
        return(
        <Box>
            <Image w="200" h="200"  src={dataList.Image} />
            <Box>
                <Text color="white" fontSize='lg' fontWeight="800">
                    {dataList.name}
                </Text>
                <Text color="white" fontSize='lg' fontWeight="400">
                    {!commonAmount ? <></> : formatUnits(commonAmount,0)}개 남았습니다.
                </Text>
                <Text color="white" fontSize='lg' fontWeight="400">
                    {dataList.price}
                </Text>
                <Text>
                    {!allowance ? <></> : +(formatUnits(allowance, 0)) > 0 ? <Button onClick={buyBot}>구입</Button>: <Button onClick={approve}>승인</Button> }
                </Text>
            </Box>
        </Box>
        )
    }
    return(
        <RenderForGrade packCode={packCode} />
    )
}