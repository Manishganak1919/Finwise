import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

type RootStackParamList = {
  OnboardingOne: undefined;
  OnboardingTwo: undefined;
  Signup: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'Signup'>;

const SignIn: React.FC = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NavigationProps>();

  // Form State
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Input Change
  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({...form, [key]: value});
    setErrors({...errors, [key]: false});
  };

  // Handle Submit
  const handleSubmit = async () => {
    let newErrors = {
      email: form.email.trim() === '',
      password: form.password.trim() === '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(
        'https://finwisedevapi.onrender.com/api/auth/signin',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        },
      );

      const data = await response.json();

      if (response.status === 200) {
        console.log('Login Successful:', data);

        // Reset form after successful login
        setForm({
          email: '',
          password: '',
        });

        setErrors({
          email: false,
          password: false,
        });

        // Navigate to the next screen or dashboard (modify as needed)
        navigation.navigate('OnboardingOne');
      } else {
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar backgroundColor="#00D09E" barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.headingContainer}>
          <Text style={styles.headingTitle}>Sign In</Text>
        </View>

        <View style={styles.whiteBackground}>
          {/* Email Input */}
          <View style={[styles.inputContainer, {width: width * 0.83}]}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={form.email}
              onChangeText={text => handleChange('email', text)}
            />
          </View>

          {/* Password Input */}
          <View style={[styles.inputContainer, {width: width * 0.83}]}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Enter your password"
              secureTextEntry
              value={form.password}
              onChangeText={text => handleChange('password', text)}
            />
          </View>

          {/* Error Message */}
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.termsText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#00D09E'},
  scrollContainer: {flexGrow: 1},
  headingContainer: {alignItems: 'center', marginTop: 100, marginBottom: 20},
  headingTitle: {fontSize: 30, fontWeight: '800', color: '#0E3E3E'},
  whiteBackground: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FFF9',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 20,
  },
  inputContainer: {marginBottom: 12},
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0E3E3E',
    marginBottom: 5,
    marginLeft: 10,
  },
  input: {
    height: 41,
    backgroundColor: '#DFF7E2',
    borderRadius: 18,
    paddingHorizontal: 10,
    color: '#0E3E3E',
  },
  inputError: {borderWidth: 1, borderColor: 'red', backgroundColor: '#FFE5E5'},
  errorMessage: {color: 'red', fontSize: 12, textAlign: 'center', marginTop: 5},
  forgotPasswordContainer: {
    marginTop: 5,
    alignSelf: 'flex-end',
    marginRight: 30,
  },
  forgotPasswordText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00D09E',
    textDecorationLine: 'underline',
  },
  termsText: {fontSize: 12, color: '#000', textAlign: 'center', marginTop: 10},
  button: {
    backgroundColor: '#00D09E',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 10,
  },
  buttonDisabled: {backgroundColor: '#A5D6C5'},
  buttonText: {fontWeight: 'bold', color: '#fff'},
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  signupText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00D09E',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default SignIn;
