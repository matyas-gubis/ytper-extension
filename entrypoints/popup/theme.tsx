import { extendTheme, StyleFunctionProps, ThemeConfig, defineStyle, defineStyleConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Heading: {
      baseStyle: {
        textColor: 'blue.200',
      },
    },
    Button: {
      variants: {
        ghost: (props: StyleFunctionProps) => ({
          bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
          _hover: {
            color: 'blue.100',
            bg: 'blue.700',
          },
        }),
      },
      defaultProps: {
        variant: 'ghost',
        colorScheme: 'blue',
      },
    },
  },
});

export default theme;
