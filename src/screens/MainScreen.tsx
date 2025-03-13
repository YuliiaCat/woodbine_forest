import MainCard from '../components/MainCard';
import UsersForest from '../components/UsersForest';
import { useAppSelector } from '../redux/hooks';
import { selectForest } from '../redux/forest/selectors';
import SharedLayout from '../components/SharedLayout/SharedLayout';

const MainScreen = () => {
  const trees = useAppSelector(selectForest);

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
