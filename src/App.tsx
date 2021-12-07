
import { useBlockNumber, useTokenAllowance, useEthers } from '@usedapp/core';
import { useGetCommonAmount, useGetPaused, useGetSkuList, usePurchaseFor } from './hooks/Gbots';
import React, { useEffect, useState } from 'react';
import { CommonPack, gbotsSale, gmee, whitelist } from './contract';
import { formatUnits } from "ethers/lib/utils";
import PackCard from './PackCard';
import { Box, Center, Flex, SimpleGrid, Stack, StackDivider, Text, VStack } from '@chakra-ui/layout';
import { Grid } from '@chakra-ui/react';

function App() {
  // const [commonAmount, setCommonAmount] = useState(1)
  // const [rareAmount, setRareAmount] = useState(1)
  // const [epicAmount, setEpicAmount] = useState(1)
  // const [legendaryAmount, setLegendaryAmount] = useState(1)
  const skuList = useGetSkuList();
  const blockNumber = useBlockNumber();
  const isPaused = useGetPaused();
  const { account } = useEthers();
  return (
    <Center bg="blackAlpha.900">
      <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
      >
        <Stack spacing={3}>
            <Text color="white" fontSize='lg' fontWeight="500" fontFamily="IM_Hyemin-Bold">
              현재 블럭 : {blockNumber}
            </Text>
            <Text color="white"  fontSize='lg' fontWeight="500" fontFamily="IM_Hyemin-Bold">
              지봇 판매 상태: {isPaused}
            </Text>
        </Stack>
        <SimpleGrid columns={2} spacing={10}>
          {
          !!whitelist.find(v=> v === account) ? !skuList ? <></> : skuList.map((v:any)=> <PackCard packCode={v} />): <Text color="white" fontSize='lg' fontWeight="500" fontFamily="IM_Hyemin-Bold">서비스 이용 불가.</Text>
          }
        </SimpleGrid>
        </VStack>
    </Center>
  );
}

export default App;
