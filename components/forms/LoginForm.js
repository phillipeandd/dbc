import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { Input, Button, Typography } from '../common';
import { useTheme } from '../../hooks/useTheme';
import { validateEmail } from '../../utils/helpers';

const LoginForm = memo(({ 
  onSubmit, 
  loading = false, 
  initialEmail = '', 
  initialPassword = '' 
}) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [errors, setErrors] = useState({});

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password]);

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      onSubmit({ email: email.trim(), password });
    }
  }, [email, password, validateForm, onSubmit]);

  const containerStyle = {
    gap: theme.spacing.md,
  };

  return (
    <View style={containerStyle}>
      <Typography variant="h2" weight="bold" align="center">
        Welcome Back
      </Typography>
      
      <Typography variant="body" color="secondary" align="center">
        Sign in to your Digital Business Card
      </Typography>

      <Input
        label="Email Address"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        error={errors.email}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Input
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        error={errors.password}
      />

      <Button
        title="Sign In"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={{ marginTop: theme.spacing.md }}
      />
    </View>
  );
});

export default LoginForm;