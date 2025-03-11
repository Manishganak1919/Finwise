import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import {RootState} from '../../redux/store';
import {useSelector, useDispatch} from 'react-redux';
import {
  setEmailVerified,
  setMobileVerified,
} from '../../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MobileVerify: React.FC = () => {
  const {width, height} = useWindowDimensions();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [otpError, setOtpError] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [remainingTime, setRemainingTime] = useState(600);
  const otpRefs = useRef<TextInput[]>([]);
  const dispatch = useDispatch();

  const isMobileVerified = useSelector(
    (state: RootState) => state.user.isMobileVerified,
  );

  useEffect(() => {
    if (step === 'otp') {
      otpRefs.current[0]?.focus(); // ✅ Auto-focus on first box initially
    }
  }, [step]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (step === 'otp' && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
    }

    if (remainingTime === 0 && timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [remainingTime, step]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar backgroundColor="#00D09E" barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.headingContainer}>
          <Text style={styles.headingTitle}>
            {step === 'mobile' ? 'Mobile Verification' : 'Enter OTP'}
          </Text>
        </View>

        <View style={styles.whiteBackground}>
          {step === 'mobile' ? (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                  style={[
                    styles.input,
                    errorMessage ? styles.inputError : null,
                  ]}
                  placeholder="Enter your Mobile Number"
                  placeholderTextColor="#A9A9A9"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={mobile}
                  onChangeText={text => {
                    setMobile(text);
                    setErrorMessage('');
                  }}
                />
              </View>
              {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              ) : null}

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>GET OTP</Text>
                )}
              </TouchableOpacity>

              <Text style={styles.termsText}>
                By continuing, you agree to {'\n'}
                <Text style={styles.linkText}>Terms of Use</Text> and{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>.
              </Text>
            </>
          ) : (
            <>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.subtitle}>OTP has been sent to</Text>
                <Text
                  style={[
                    styles.subtitle,
                    {fontWeight: 'bold', color: '#00D09E'},
                  ]}>
                  {mobile}
                </Text>
              </View>

              <View style={styles.otpContainer}>
                {otp?.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={el => {
                      if (el) otpRefs.current[index] = el;
                    }}
                    style={[
                      styles.otpInput,
                      otpError[index] && styles.inputError,
                    ]}
                    // style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    // onChangeText={text => handleOtpChange(text, index)}
                    // onKeyPress={event => handleKeyPress(event, index)}
                  />
                ))}
              </View>

              {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              ) : null}

              {successMessage ? (
                <Text style={styles.successMessage}>{successMessage}</Text>
              ) : null}

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                // onPress={verifyOtp}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>VERIFY OTP</Text>
                )}
              </TouchableOpacity>

              {/* <Text style={styles.timerText}>
                {remainingTime > 0
                  ? `Resend OTP in ${formatTime(remainingTime)}`
                  : ''}
              </Text> */}

              {remainingTime === 0 && (
                <TouchableOpacity>
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </>
          )}
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
    justifyContent: 'center',
    backgroundColor: '#F5FFF9',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 20,
    width: '100%',
  },
  subtitle: {fontSize: 14, color: '#0E3E3E', marginBottom: 10},
  inputContainer: {marginBottom: 20, marginTop: 30, width: '80%'},
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0E3E3E',
    marginBottom: 5,
    marginLeft: 10,
  },
  input: {
    height: 45,
    backgroundColor: '#DFF7E2',
    borderRadius: 18,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#00D09E',
    color: '#0E3E3E',
    letterSpacing: 1,
  },
  inputError: {
    borderColor: 'red', // ✅ Error styling
    borderWidth: 2,
    backgroundColor: '#FFE5E5',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 14,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
  },
  successMessage: {
    color: 'green',
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: '#E6F9E6',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  termsText: {fontSize: 12, color: '#000', textAlign: 'center', marginTop: 16},
  linkText: {fontWeight: 'bold', textDecorationLine: 'underline'},

  /** 🔹 Added styles for OTP container & OTP input fields */
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  otpInput: {
    width: 40,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00D09E',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 5,
    color: '#0E3E3E',
  },

  button: {
    backgroundColor: '#00D09E',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginTop: 20,
  },
  buttonDisabled: {backgroundColor: '#A5D6C5'},
  buttonText: {fontWeight: 'bold', color: '#fff', fontSize: 16},
  resendText: {marginTop: 15, color: '#00D09E', fontWeight: '600'},
  timerText: {marginTop: 10, fontSize: 14, color: 'gray'},
});

export default MobileVerify;
