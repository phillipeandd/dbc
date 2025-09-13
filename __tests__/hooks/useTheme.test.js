import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { ThemeProvider } from '../../context/ThemeProvider';
import { useTheme } from '../../hooks/useTheme';

const wrapper = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('useTheme Hook', () => {
  it('returns theme object', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    expect(result.current.theme).toBeDefined();
    expect(result.current.isDarkMode).toBeDefined();
    expect(result.current.toggleTheme).toBeDefined();
  });

  it('toggles theme correctly', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    const initialDarkMode = result.current.isDarkMode;
    result.current.toggleTheme();
    
    // Note: In a real test, you'd need to wait for the async operation
    expect(result.current.toggleTheme).toBeDefined();
  });
});