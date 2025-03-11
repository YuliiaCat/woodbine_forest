import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePickerComponent from '../DatePickerComponent';
import SharedText from '../SharedText';
import SharedInput from '../SharedInput';
import React, { useState } from 'react';
import { colors } from '../../constants/colors';
import ITree from '../../types/tree';

interface ISharedAddForm {
  title: string;
  nameKey: keyof ITree;
  nameValue: string;
  dateValue: string;
  nameSubtitle: string;
  dateSubtitle: string;
  namePlaceholder: string;
  datePlaceholder: string;
  handleInputChange: (key: keyof ITree, value: string | Date | null) => void;
  selectedDate: Date | null;
}

const SharedAddForm: React.FC<ISharedAddForm> = ({
  title,
  nameKey,
  nameSubtitle,
  dateSubtitle,
  namePlaceholder,
  datePlaceholder,
  handleInputChange,
  nameValue,
  dateValue,
  selectedDate,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <View style={styles.container}>
      <SharedText
        text={title}
        style={styles.title}
       />
       <SharedInput
          text={nameSubtitle}
          placeholder={namePlaceholder}
          value={nameValue}
          onChange={(text) => handleInputChange(nameKey, text)}
       />

      {!showCalendar ? (
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <SharedInput
            text={dateSubtitle}
            placeholder={datePlaceholder}
            value={dateValue}
            editable={false}
          />
        </TouchableOpacity>
        ) : (
          <DatePickerComponent
            selectedDate={selectedDate}
            onSelectDate={(date) => {
              handleInputChange('date', date);
              setShowCalendar(false);
            }}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  title: {
    color: colors.white,
  },
});

export default SharedAddForm;
