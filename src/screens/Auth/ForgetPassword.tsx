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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type RootStackParamList = {
  OnboardingOne: undefined;
  OnboardingTwo: undefined;
  Signup: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'OnboardingOne'>;

const ForgetPassword: React.FC = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NavigationProps>();

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
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({...form, [key]: value});
    setErrors({...errors, [key]: false});
  };

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
          body: JSON.stringify({email: form.email, password: form.password}),
        },
      );

      const data = await response.json();

      if (response.ok) {
        console.log('Login Successful:', data);

        setForm({email: '', password: ''});
        setErrors({email: false, password: false});

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
          {/* Input Fields */}
          <View style={[styles.inputContainer, {width: width * 0.83}]}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter your email"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              value={form.email}
              onChangeText={text => handleChange('email', text)}
            />
          </View>

          <View style={[styles.inputContainer, {width: width * 0.83}]}>
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.passwordContainer,
                errors.password && styles.inputError,
              ]}>
              <TextInput
                style={[styles.passwordInput]}
                placeholder="Enter your password"
                placeholderTextColor="#A9A9A9"
                secureTextEntry={!passwordVisible}
                value={form.password}
                onChangeText={text => handleChange('password', text)}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}>
                <FontAwesome
                  name={passwordVisible ? 'eye' : 'eye-slash'}
                  size={20}
                  color="#000"
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}

          {/* Centered Buttons */}
          <View style={styles.centerContainer}>
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

            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.Signupbutton, loading && styles.buttonDisabled]}
              onPress={() => navigation.navigate('Signup')}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signupbuttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={styles.fingureContainer}>
              <Text style={styles.termsText}>
                Use <Text style={styles.boldText}>Fingerprint</Text> to access?
              </Text>
            </View>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {marginBottom: 12, marginTop: 20},
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFF7E2',
    borderRadius: 18,
    paddingHorizontal: 10,
  },
  passwordInput: {flex: 1, height: 41, color: '#0E3E3E'},
  eyeIcon: {marginLeft: 10},
  inputError: {borderWidth: 1, borderColor: 'red', backgroundColor: '#FFE5E5'},
  errorMessage: {color: 'red', fontSize: 12, textAlign: 'center', marginTop: 5},
  button: {
    backgroundColor: '#00D09E',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 10,
  },
  buttonDisabled: {backgroundColor: '#A5D6C5'},
  buttonText: {fontWeight: 'bold', color: '#fff'},
  forgotPasswordContainer: {marginTop: 16, marginBottom: 12},
  forgotPasswordText: {fontSize: 14, fontWeight: 'bold', color: '#093030'},
  Signupbutton: {
    backgroundColor: '#DFF7E2',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 10,
  },
  signupbuttonText: {fontWeight: 'bold', color: '#0E3E3E'},
  fingureContainer: {marginTop: 24},
  termsText: {fontSize: 16, color: '#0E3E3E'},
  boldText: {fontWeight: 'bold'},
});

export default ForgetPassword;
