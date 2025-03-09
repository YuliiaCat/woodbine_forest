import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Title from '../Title';
import NavBar from '../NavBar/NavBar';
import { ReactNode } from 'react';
import IconPlus from '../../assets/icons/IconPlus';
import TreeImage from '../TreeImage/TreeImage';
import SharedButton from '../SharedButton';

interface IGoalLayout {
  children: ReactNode;
  title?: string;
  isGoalPage?: boolean;
  isAddGoal?: boolean;
  onPress?: () => void;
  showArrow?: boolean;
  style?: StyleProp<ViewStyle>;
}

const GoalLayout: React.FC<IGoalLayout> = ({ title, children, isGoalPage, onPress, isAddGoal, showArrow, style }) => {
  return (
    <View style={[styles.container, style]}>
      {!isAddGoal && (
        (isGoalPage ? (
          <View style={styles.titleContainer}>
            <Title
              title={title}
            />
            <SharedButton
              onPress={onPress}
            >
              <IconPlus fill={'#fdf9f9'} />
            </SharedButton>
          </View>
        ) : (
          <Title
            title={title}
          />
        ))
      )}
      {isGoalPage && !showArrow && (
        <TreeImage
          source={require('../../assets/img/goal/arrow.webp')}
          style={styles.arrow}
        />
      )}
      <TreeImage
        source={require('../../assets/img/goal/background-1.webp')}
        style={styles.stumpLeft}
      />
      {children}
      <TreeImage
        source={require('../../assets/img/goal/background-2.webp')}
        style={styles.stumpRight}
      />
      {!isAddGoal && <NavBar />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    width: 105,
    height: 284,
    top: 58,
    right: 40,
  },
  stumpLeft: {
    width: 150,
    height: 209,
    zIndex: -3,
    position: 'absolute',
    bottom: 125,
    left: 0,
  },
  stumpRight: {
    width: 140,
    height: 209,
    zIndex: -3,
    position: 'absolute',
    top: 126,
    right: 0,
  },
});

export default GoalLayout;
