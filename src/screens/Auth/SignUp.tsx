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
  SignIn: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'OnboardingOne'>;

const Signup: React.FC = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NavigationProps>();

  // Form State
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    mobileno: '',
    dateofbirth: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    fullname: false,
    email: false,
    mobileno: false,
    dateofbirth: false,
    password: false,
    confirmPassword: false,
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
      fullname: form.fullname.trim() === '',
      email: form.email.trim() === '',
      mobileno: form.mobileno.trim() === '',
      dateofbirth: form.dateofbirth.trim() === '',
      password: form.password.trim() === '',
      confirmPassword:
        form.confirmPassword.trim() === '' ||
        form.password !== form.confirmPassword,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(
        'https://finwisedevapi.onrender.com/api/auth/signup',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            fullname: form.fullname,
            email: form.email,
            mobileno: form.mobileno,
            dateofbirth: form.dateofbirth,
            password: form.password,
          }),
        },
      );

      const data = await response.json();

      if (response.status === 200) {
        console.log('Signup Successful:', data);

        // Reset form data after successful signup
        setForm({
          fullname: '',
          email: '',
          mobileno: '',
          dateofbirth: '',
          password: '',
          confirmPassword: '',
        });

        setErrors({
          fullname: false,
          email: false,
          mobileno: false,
          dateofbirth: false,
          password: false,
          confirmPassword: false,
        });

        // Navigate to the next screen or show success message
      } else {
        setErrorMessage(data.message || 'Signup failed. Please try again.');
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
          <Text style={styles.headingTitle}>Create Account</Text>
        </View>

        <View style={styles.whiteBackground}>
          {[
            'fullname',
            'email',
            'mobileno',
            'dateofbirth',
            'password',
            'confirmPassword',
          ].map(key => (
            <View
              key={key}
              style={[styles.inputContainer, {width: width * 0.83}]}>
              <Text style={styles.label}>
                {key === 'confirmPassword'
                  ? 'Confirm Password'
                  : key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errors[key as keyof typeof errors] && styles.inputError,
                ]}
                placeholder={`Enter your ${key}`}
                secureTextEntry={key.includes('password')}
                keyboardType={key === 'mobileno' ? 'phone-pad' : 'default'}
                value={form[key as keyof typeof form]}
                onChangeText={text =>
                  handleChange(key as keyof typeof form, text)
                }
              />
            </View>
          ))}

          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}

          <Text style={styles.termsText}>
            By continuing, you agree to {'\n'}
            <Text style={styles.linkText}>Terms of Use</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.termsText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.loginText}>Log in</Text>
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
  errorMessage: {
    color: '#29bf12',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  termsText: {fontSize: 12, color: '#000', textAlign: 'center', marginTop: 10},
  linkText: {fontWeight: 'bold', textDecorationLine: 'underline'},
  button: {
    backgroundColor: '#00D09E',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 10,
  },
  buttonDisabled: {backgroundColor: '#A5D6C5'},
  buttonText: {fontWeight: 'bold', color: '#fff'},
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  loginText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00D09E',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default Signup;
