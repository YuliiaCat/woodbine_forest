import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SharedButton from './SharedButton';
import ArrowIcon from '../assets/icons/ArrowIcon';
import ChevronRight from '../assets/icons/ChevronRight';
import { fonts } from '../constants/fonts';

interface IDayPicker {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

const DatePickerComponent: React.FC<IDayPicker> = ({ selectedDate, onSelectDate }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(selectedDate || today);
  const parsedSelectedDate = selectedDate ? new Date(selectedDate) : today;
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

  useEffect(() => {
    if (!selectedDate) {
      onSelectDate(today);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, onSelectDate]);

  const daysArray = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const changeMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.header}>
        <View style={styles.monthBox}>
          <Text style={styles.monthText}>
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </Text>
          <SharedButton
            onPress={() => changeMonth(1)}
          >
            <ChevronRight fill={'#C80D0D'} height={11} />
          </SharedButton>
        </View>

        <View style={styles.arrowBox}>
          <SharedButton
            onPress={() => changeMonth(-1)}
          >
            <ArrowIcon fill={'#C80D0D'} height={18} />
          </SharedButton>
          <SharedButton
            onPress={() => changeMonth(1)}
          >
            <ChevronRight fill={'#C80D0D'} height={18} />
          </SharedButton>
        </View>
      </View>

      <View style={styles.weekRow}>
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
          <Text key={day} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.daysBox}>
        <View style={styles.daysGrid}>
          {daysArray.map((day, index) => {
            const isToday = day && today.getDate() === day && today.getMonth() === currentMonth.getMonth() && today.getFullYear() === currentMonth.getFullYear();
            const isSelected = day && parsedSelectedDate.getDate() === day && parsedSelectedDate.getMonth() === currentMonth.getMonth() && parsedSelectedDate.getFullYear() === currentMonth.getFullYear();

            return (
              <TouchableOpacity
                key={index}
                style={[styles.day, (isSelected || (!selectedDate && isToday)) && styles.selectedDay]}
                onPress={() => {
                  if (day) {
                    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    onSelectDate(newDate);
                  }
                }}
                disabled={!day}
              >
                <Text style={day ? styles.dayText : styles.emptyDay}>{day ? day.toString() : ''}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#101010',
    boxShadow: '0px 10px 60px 0px #0000001A',
    borderRadius: 13,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 11,
    marginBottom: 2,
  },
  monthBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  monthText: {
    color: '#FDF9F9',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  arrowBox: {
    flexDirection: 'row',
    gap: 30,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 5,
  },
  weekDay: {
    fontFamily: fonts.DMSansBold,
    color: '#fdf9f9',
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  daysBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'flex-start',
    gap: 4,
  },
  day: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  selectedDay: {
    fontFamily: fonts.DMSansBold,
    backgroundColor: '#C80D0D',
    borderRadius: '50%',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0.38,
  },
  dayText: {
    fontFamily: fonts.DMSansMedium,
    color: '#fdf9f9',
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0.38,
  },
  emptyDay: {
    color: 'transparent',
  },
});

export default DatePickerComponent;
