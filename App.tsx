import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

export default function App() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = () => {
    const trimmedAccount = account.trim();

    if (!trimmedAccount || !password) {
      setErrorMsg('請輸入帳號與密碼');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('密碼至少需要 6 個字元');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // 模擬登入請求（之後可替換成真實 API）
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('登入成功', `歡迎回來，${trimmedAccount}！`);
    }, 600);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>冒險者登入</Text>
        <Text style={styles.subtitle}>輸入帳號密碼進入你的旅程</Text>

        <Text style={styles.label}>帳號 / Email</Text>
        <TextInput
          style={styles.input}
          placeholder="請輸入帳號或 Email"
          value={account}
          onChangeText={setAccount}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>密碼</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="請輸入密碼（至少 6 碼）"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.toggleBtn}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Text style={styles.toggleText}>{showPassword ? '隱藏' : '顯示'}</Text>
          </TouchableOpacity>
        </View>

        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

        <TouchableOpacity
          style={[styles.loginBtn, isSubmitting && styles.loginBtnDisabled]}
          onPress={handleLogin}
          disabled={isSubmitting}
        >
          <Text style={styles.loginBtnText}>
            {isSubmitting ? '登入中...' : '開始登入'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121622',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#1E2538',
    borderRadius: 16,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#E2E8F0',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 14,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  passwordInput: {
    flex: 1,
    marginBottom: 0,
    marginRight: 10,
  },
  toggleBtn: {
    backgroundColor: '#334155',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
  },
  toggleText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: '#F87171',
    fontSize: 13,
    marginBottom: 12,
  },
  loginBtn: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  loginBtnDisabled: {
    opacity: 0.6,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});