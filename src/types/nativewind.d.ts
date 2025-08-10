/// <reference types="nativewind/types" />

import { ViewProps, TextProps, ScrollViewProps, TouchableOpacityProps } from 'react-native';

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  
  interface TextProps {
    className?: string;
  }
  
  interface ScrollViewProps {
    className?: string;
  }
  
  interface TouchableOpacityProps {
    className?: string;
  }
  
  interface SafeAreaViewProps {
    className?: string;
  }
  
  interface FlatListProps<ItemT> {
    className?: string;
  }
  
  interface TextInputProps {
    className?: string;
  }
}
