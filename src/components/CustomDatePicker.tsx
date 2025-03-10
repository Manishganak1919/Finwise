import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Feather from 'react-native-vector-icons/Feather';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>(selectedDate || new Date());

  // Format date to DD/MM/YYYY
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB'); // 'en-GB' formats date as DD/MM/YYYY
  };

  return (
    <View>
      {/* Button with Calendar Icon on the Right */}
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>
          {selectedDate ? formatDate(selectedDate) : 'Select Date'}
        </Text>
        {/* Calendar Icon on Right */}
        <Feather
          name="calendar"
          size={20}
          color="#0E3E3E"
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <Modal transparent visible={open} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <DatePicker
              mode="date"
              date={date}
              onDateChange={setDate}
              maximumDate={new Date()}
            />
            <TouchableOpacity
              onPress={() => {
                onDateChange(date);
                setOpen(false);
              }}
              style={styles.confirmButton}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
    backgroundColor: '#DFF7E2',
    borderRadius: 18,
    paddingHorizontal: 15,
  },
  icon: {
    marginLeft: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#0E3E3E',
    opacity: 0.8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  confirmButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomDatePicker;
