import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ITree from '../../types/tree';
import SharedAddForm from '../SharedComponents/SharedAddForm';
import { selectTreeData } from '../../redux/forest/selectors';
import { setTreeDataOperation } from '../../redux/forest/operations';


interface IInitialScreenProps {
  setIsDisabled: (disabled: boolean) => void;
}

const InitialScreen: React.FC<IInitialScreenProps> = ({ setIsDisabled }) => {
  const dispatch = useAppDispatch();
  const treeData = useAppSelector(selectTreeData);

  useEffect(() => {
    setIsDisabled(!(treeData.title && treeData.date));
  }, [treeData, setIsDisabled]);

  const handleInputChange = (key: keyof ITree, value: string | Date | null) => {
    if (treeData[key] === value) {
      return;
    }

    else if (key === 'date' && value === null) {
      return;
    }

    const formattedValue = key === 'date' && value instanceof Date ? value.toISOString() : value;
    dispatch(setTreeDataOperation({
      ...treeData,
      [key]: formattedValue,
    }));
  };

  return (
    <SharedAddForm
      title={'Tree info'}
      nameKey={'title'}
      nameSubtitle={'Name of tree'}
      dateSubtitle={'Select date for planting tree'}
      namePlaceholder={'Enter name of tree'}
      datePlaceholder={'-'}
      handleInputChange={handleInputChange}
      nameValue={treeData?.title ?? ''}
      dateValue={treeData?.date
        ? new Date(treeData.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          }).replaceAll('/', '-')
        : ''}
      selectedDate={treeData?.date ? new Date(treeData.date) : null}
    />
  );
};

export default InitialScreen;
