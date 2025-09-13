import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaWrapper, Container } from '../common';
import { useTheme } from '../../hooks/useTheme';

const ScreenLayout = ({
  children,
  scrollable = true,
  keyboardAvoiding = true,
  padding = true,
  style,
  contentContainerStyle,
  ...props
}) => {
  const { theme } = useTheme();

  const Wrapper = keyboardAvoiding ? KeyboardAvoidingView : React.Fragment;
  const wrapperProps = keyboardAvoiding ? {
    behavior: Platform.OS === 'ios' ? 'padding' : 'height',
    style: { flex: 1 },
  } : {};

  const Content = scrollable ? ScrollView : React.Fragment;
  const contentProps = scrollable ? {
    contentContainerStyle: [
      { flexGrow: 1 },
      contentContainerStyle,
    ],
    keyboardShouldPersistTaps: 'handled',
    showsVerticalScrollIndicator: false,
  } : {};

  return (
    <SafeAreaWrapper>
      <Wrapper {...wrapperProps}>
        <Content {...contentProps}>
          <Container padding={padding} style={style} {...props}>
            {children}
          </Container>
        </Content>
      </Wrapper>
    </SafeAreaWrapper>
  );
};

export default ScreenLayout;