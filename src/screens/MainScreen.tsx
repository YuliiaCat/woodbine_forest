import { useCallback } from 'react';
import MainCard from '../components/MainCard';
import SharedLayout from '../components/SharedLayout';
import UsersForest from '../components/UsersForest';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectForest } from '../redux/forest/selectors';
import { getTrees } from '../redux/forest/operations';
import { useFocusEffect } from '@react-navigation/native';

const MainScreen = () => {
  const trees = useAppSelector(selectForest);
  const dispatch = useAppDispatch();

    useFocusEffect(
      useCallback(() => {
        dispatch(getTrees());
        return () => {};
      }, [dispatch])
    );

  return (
    <SharedLayout
      title={'Woodbine Forest'}
      isForest={true}
    >
      {!trees.length ? (
        <MainCard />
      ) : (
        <UsersForest />
      )}
    </SharedLayout>
  );
};

export default MainScreen;
