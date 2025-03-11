import MainCard from '../components/MainCard';
import UsersForest from '../components/UsersForest';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectForest } from '../redux/forest/selectors';
import { getTrees } from '../redux/forest/operations';
import SharedLayout from '../components/SharedLayout/SharedLayout';
import { useEffect } from 'react';

const MainScreen = () => {
  const trees = useAppSelector(selectForest);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!trees.length) {
      console.log('there are no trees in array');
      return;
    }

    setTimeout(() => {
      dispatch(getTrees());
    }, 1000);
  }, [dispatch, trees.length]);

  console.log('trees', trees);

  return (
    <SharedLayout
      title={'Woodbine Forest'}
      isForest={true}
    >
      {!trees.length ? (
        <MainCard />
      ) : (
        <UsersForest trees={trees} />
      )}
    </SharedLayout>
  );
};

export default MainScreen;
