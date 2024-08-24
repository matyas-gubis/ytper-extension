import { useState } from 'react';
import './App.css';
import {
  Button,
  ChakraProvider,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Progress,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import theme from './theme';

function App() {
  const [count, setCount] = useState(0);
  const [keyDelay, setKeyDelay] = useState({ min: 300, max: 600 });
  const [bckspDelay, setBckspDelay] = useState({ min: 10, max: 50 });

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" align="flex-start" gap={4} w="100%">
        <VStack alignItems="flex-start" gap={3}>
          <Heading size="lg">Options</Heading>
          <VStack gap={1} align="flex-start">
            <Checkbox>Show keyboard</Checkbox>
            <Checkbox textAlign="left" lineHeight={1}>
              Automap <small>(maps keys automatically when a new stage begins)</small>
            </Checkbox>
            <Checkbox textAlign="left">Autosolve</Checkbox>
          </VStack>
          <VStack gap={1} justify="flex-start" align="flex-start">
            <Text fontSize="md">Delay between keypresses</Text>
            <HStack width="100%">
              <Input
                value={keyDelay.min}
                size="xs"
                width="25%"
                px={1}
                type="number"
                onChange={(e) => setKeyDelay({ ...keyDelay, min: Number(e.target.value) })}
              />
              <RangeSlider
                aria-label={['min', 'max']}
                min={0}
                max={1000}
                onChange={([min, max]) => setKeyDelay({ min, max })}
                defaultValue={[keyDelay.min, keyDelay.max]}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <Input
                value={keyDelay.max}
                size="xs"
                width="25%"
                px={1}
                type="number"
                onChange={(e) => setKeyDelay({ ...keyDelay, max: Number(e.target.value) })}
              />
            </HStack>
          </VStack>
          <VStack gap={1} justify="flex-start" align="flex-start">
            <Text fontSize="md">Delay between backspaces</Text>
            <HStack width="100%" gap={5}>
              <Input
                value={bckspDelay.min}
                size="xs"
                width="25%"
                type="number"
                px={1}
                onChange={(e) => setBckspDelay({ ...bckspDelay, min: Number(e.target.value) })}
              />
              <RangeSlider
                aria-label={['min', 'max']}
                min={0}
                max={1000}
                onChange={([min, max]) => setBckspDelay({ min, max })}
                value={[bckspDelay.min, bckspDelay.max]}
                defaultValue={[bckspDelay.min, bckspDelay.max]}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <Input
                value={bckspDelay.max}
                size="xs"
                width="25%"
                px={1}
                type="number"
                onChange={(e) => setBckspDelay({ ...bckspDelay, max: Number(e.target.value) })}
              />
            </HStack>
          </VStack>
        </VStack>
        <Flex direction="column" alignItems="flex-start" w="100%" gap={3}>
          <Heading size="lg">Controls</Heading>
          <Flex w="100%" grow={1} gap={3}>
            <Button w="50%" isDisabled={true}>
              Map keys
            </Button>
            <Button w="50%">Solve!</Button>
          </Flex>
          <Progress w="100%" value={50} rounded={4}></Progress>
        </Flex>
        <VStack alignItems="flex-start" w="100%">
          <Heading size="lg">Stats</Heading>
          <VStack fontSize="md" w="100%">
            <HStack justify="space-between" w="100%">
              <Text>Last stage time:</Text>
              <Text>12.4 ms</Text>
            </HStack>
            <HStack justify="space-between" w="100%">
              <Text>Average time to finish:</Text>
              <Text>12.4 ms</Text>
            </HStack>
            <HStack justify="space-between" w="100%">
              <Text>Quickest solve:</Text>
              <Text>12.4 ms</Text>
            </HStack>
            <HStack justify="space-between" w="100%">
              <Text>Slowest solve:</Text>
              <Text>12.4 ms</Text>
            </HStack>
          </VStack>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
