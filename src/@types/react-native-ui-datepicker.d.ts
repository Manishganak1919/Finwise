declare module 'react-native-ui-datepicker' {
  import {FC} from 'react';
  import {ViewProps} from 'react-native';

  interface DatePickerProps extends ViewProps {
    value: Date | string;
    mode?: 'calendar' | 'spinner';
    onChange: (date: Date | string) => void;
    locale?: string;
    style?: object;
  }

  const DatePicker: FC<DatePickerProps>;
  export default DatePicker;
}
