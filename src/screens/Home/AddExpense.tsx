import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Text,
  Modal,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format} from 'date-fns';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type RootStackParamList = {
  HomeTabs: undefined;
  AddIncome: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'HomeTabs'>;

const AddExpense: React.FC = () => {
  const {height, width} = useWindowDimensions();
  const WHITE_BG_HEIGHT = height * 0.85;
  const INPUT_WIDTH = width * 0.74;
  const navigation = useNavigation<NavigationProps>();

  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [amount, setAmount] = useState('');
  const [expenseTitle, setExpenseTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://finwisedevapi.onrender.com/api/expense/getallcategory',
        );
        const data = await response.json();
        if (data.statusCode === 200) {
          setCategories(data.categories);
        } else {
          Alert.alert('Error', 'Failed to fetch categories');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = useMemo(
    () =>
      categories.filter(category =>
        category.toLowerCase().includes(searchText.toLowerCase()),
      ),
    [categories, searchText],
  );

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    setCategoryModalVisible(false);
    setSearchText('');
  }, []);

  // ✅ Expense Title Validation: Must start with a letter and contain only alphabets
  const validateExpenseTitle = (text: string) => {
    const titleRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/; // Allows only alphabets and spaces
    if (text === '' || titleRegex.test(text)) {
      setExpenseTitle(text);
    }
  };

  // ✅ Automatically format amount with ₹ symbol and allow only valid numbers
  const handleAmountChange = (text: string) => {
    const formattedText = text.replace(/[^\d.]/g, ''); // Remove non-numeric characters except .
    const amountRegex = /^\d*\.?\d{0,2}$/; // Allows numbers with up to 2 decimal places

    if (amountRegex.test(formattedText)) {
      setAmount(formattedText ? `₹${formattedText}` : ''); // Prefix ₹
    }
  };

  const handleSaveExpense = async () => {
    const titleRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

    if (!expenseTitle || !amount || !selectedCategory) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!titleRegex.test(expenseTitle.trim())) {
      setErrorMessage(
        'Expense Title must start with an alphabet and contain only alphabets.',
      );
      return;
    }

    const numericAmount = amount.replace('₹', ''); // Remove ₹ symbol for API submission
    if (!amountRegex.test(numericAmount.trim())) {
      setErrorMessage('Amount must be a valid number.');
      return;
    }

    const expenseData = {
      userId: '67cdd972b76432efa9a23101',
      title: expenseTitle,
      amount: parseFloat(numericAmount),
      category: selectedCategory,
      description: description || '',
    };

    try {
      const response = await fetch(
        'https://finwisedevapi.onrender.com/api/expense/addexpense',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(expenseData),
        },
      );

      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok && result.statusCode === 200) {
        setErrorMessage('Expense added successfully!');
        setExpenseTitle('');
        setAmount('');
        setSelectedCategory('');
        setDescription('');
      } else {
        setErrorMessage(result.message || 'Failed to add expense.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            {/* Page Heading */}
            <View style={styles.headingContainer}>
              <Text style={styles.headingTitle}>Add Income</Text>
            </View>

            {/* White Background Section */}
            <View style={[styles.whiteBackground, {height: WHITE_BG_HEIGHT}]}>
              <View style={styles.centerContent}>
                {/* Date Picker */}
                <View style={[styles.inputContainer, {width: INPUT_WIDTH}]}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Select Date"
                    value={format(date, 'dd/MM/yyyy')}
                    editable={false}
                    placeholderTextColor="#666"
                  />
                  <TouchableOpacity
                    onPress={() => setOpenDatePicker(true)}
                    style={styles.iconContainer}>
                    <Icon name="event" size={18} color="#00A86B" />
                  </TouchableOpacity>
                </View>

                {/* Category Picker */}
                <View style={[styles.inputContainer, {width: INPUT_WIDTH}]}>
                  <Text
                    style={[
                      styles.textInput,
                      {color: selectedCategory ? '#333' : '#666'},
                    ]}>
                    {selectedCategory || 'Select Category'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setCategoryModalVisible(true)}
                    style={styles.iconContainer}>
                    <Icon name="arrow-drop-down" size={24} color="#00A86B" />
                  </TouchableOpacity>
                </View>

                {/* Expense Title Input */}
                <TextInput
                  style={[styles.inputContainer, {width: INPUT_WIDTH}]}
                  placeholder="Expense Title"
                  value={expenseTitle}
                  onChangeText={validateExpenseTitle}
                  placeholderTextColor="#666"
                />

                {/* Amount Input */}
                <TextInput
                  style={[styles.inputContainer, {width: INPUT_WIDTH}]}
                  placeholder="Amount"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={handleAmountChange}
                  placeholderTextColor="#666"
                />

                {/* Description Input */}
                <TextInput
                  style={[
                    styles.inputContainer,
                    {width: INPUT_WIDTH, height: 80},
                  ]}
                  placeholder="Description"
                  multiline
                  value={description}
                  onChangeText={setDescription}
                  placeholderTextColor="#666"
                />

                {/* Error Message Display */}
                {errorMessage ? (
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : null}

                {/* Save Button */}
                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    (!expenseTitle || !amount || !selectedCategory) &&
                      styles.disabledButton,
                  ]}
                  onPress={handleSaveExpense}
                  disabled={!expenseTitle || !amount || !selectedCategory}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.incomeButton}
                  onPress={() => navigation.navigate('AddIncome')}>
                  <Text style={styles.incomeButtonText}>Add Income</Text>
                </TouchableOpacity>
              </View>

              {/* Date Picker Modal */}
              <DatePicker
                modal
                open={openDatePicker}
                date={date}
                mode="date"
                onConfirm={selectedDate => {
                  setOpenDatePicker(false);
                  setDate(selectedDate);
                }}
                onCancel={() => setOpenDatePicker(false)}
              />

              {/* Category Modal */}
              <Modal
                visible={categoryModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setCategoryModalVisible(false)}>
                <View style={styles.modalOverlay}>
                  <View style={[styles.modalContent, {width: INPUT_WIDTH}]}>
                    <Text style={styles.modalTitle}>Select Category</Text>

                    {/* Search Category Input */}
                    <View style={styles.searchContainer}>
                      <Icon
                        name="search"
                        size={16}
                        color="#666"
                        style={{marginRight: 8}}
                      />
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Search category"
                        placeholderTextColor="#999"
                        value={searchText}
                        onChangeText={setSearchText}
                      />
                    </View>

                    {/* Category List */}
                    {loading ? (
                      <ActivityIndicator
                        size="large"
                        color="#00A86B"
                        style={{marginVertical: 20}}
                      />
                    ) : (
                      <FlatList
                        data={filteredCategories}
                        keyExtractor={item => item}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            style={styles.categoryItem}
                            onPress={() => handleCategorySelect(item)}>
                            <Text style={styles.categoryText}>{item}</Text>
                          </TouchableOpacity>
                        )}
                        showsVerticalScrollIndicator={false}
                        style={{maxHeight: 300}}
                      />
                    )}
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E',
  },

  headingContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },

  headingTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0E3E3E',
  },

  whiteBackground: {
    flex: 1, // Removed absolute positioning
    width: '100%',
    backgroundColor: '#F5FFF9',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: '5%',
    paddingVertical: 20,
    alignItems: 'center',
  },

  centerContent: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 10,
    marginTop: 44,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFF7E2',
    borderRadius: 18,
    paddingHorizontal: 10,
    height: 41,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'space-between',
    width: '100%', // Ensures proper width
  },

  textInput: {
    fontSize: 16,
    flex: 1,
    color: '#0E3E3E',
    paddingVertical: 8, // Improved padding for better UX
  },

  iconContainer: {
    padding: 10,
  },

  errorMessage: {
    color: 'green', // Changed to red for better error indication
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%', // Adjusted for better modal sizing
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    width: '100%',
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  categoryItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  categoryText: {
    fontSize: 16,
    color: '#333',
  },

  saveButton: {
    backgroundColor: '#00D09E',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  incomeButton: {
    backgroundColor: '#DFF7E2',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  incomeButtonText: {
    color: '#093030',
    fontSize: 16,

    textAlign: 'center',
  },

  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
});

export default AddExpense;
