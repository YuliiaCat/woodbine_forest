import React, { useEffect, useState } from 'react';
import AddPhoto from '../components/AddTree/AddPhoto';
import InitialScreen from '../components/AddTree/InitialScreen';
import ScreensLayout from '../components/SharedLayout/ScreensLayout';
import TreeInfo from '../components/AddTree/TreeInfo';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addNewTree } from '../redux/forest/operations';
import { selectForest, selectTreeData } from '../redux/forest/selectors';
import ITree from '../types/tree';
import { setTreeData } from '../redux/forest/slice';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../navigation/types';

const AddTreeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();
  const treeData = useAppSelector(selectTreeData);
  const trees = useAppSelector(selectForest);
  const [step, setStep] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setTreeData({
        id: Date.now(),
        title: '',
        date: new Date().toISOString(),
        image: null,
        location: { latitude: null, longitude: null, address: '' },
        description: '',
        locationName: '',
        event: [],
        isFavorite: false,
      }));
    }, [dispatch])
  );

  useEffect(() => {
    if (step === 1) {
      setIsDisabled(!treeData.title || !treeData.date);
    } else if (step === 2) {
      setIsDisabled(!treeData.image);
    } else if (step === 3) {
      setIsDisabled(!treeData.description || !treeData.location);
    }
  }, [step, treeData]);

  // const handleNext = () => {
  //   if (step < 3) {
  //     setStep(step + 1);
  //   } else {
  //     const treeToSave: ITree = {
  //       ...treeData,
  //       id: treeData.id ?? Date.now(),
  //     };

  //     if (!trees.some(t => t.id === treeToSave.id)) {
  //       dispatch(addNewTree(treeToSave));
  //       navigation.navigate('MAIN_SCREEN');
  //     } else {
  //       console.warn('Tree already exists, skipping duplicate addition');
  //     }
  //   }
  // };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      const treeToSave: ITree = {
        ...treeData,
        id: treeData.id ?? Date.now(),
      };

      const currentTrees = [...trees];

      if (!currentTrees.some(t => t.id === treeToSave.id)) {
        dispatch(addNewTree(treeToSave)).then(() => {
          navigation.navigate('MAIN_SCREEN');
        });
      } else {
        console.warn('Tree already exists, skipping duplicate addition');
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScreensLayout
        title={'Add tree'}
        onNext={handleNext}
        isDisabled={isDisabled}
        onBack={handleBack}
        btnText={'Next'}
    >
      {step === 1 && <InitialScreen setIsDisabled={setIsDisabled} /> }
      {step === 2 && <AddPhoto setIsDisabled={setIsDisabled} /> }
      {step === 3 && <TreeInfo setIsDisabled={setIsDisabled} />}
    </ScreensLayout>
  );
};

export default AddTreeScreen;
