import { getNewId } from '../services/idService';

export default function SelectInput({
  selectDescription = 'Descrição do select',
  selectOptions = [],
  selectValue = null,
  id = getNewId(),
  onSelectChange = null,
}) {
  function handleSelectChange({ currentTarget }) {
    if (onSelectChange) {
      const newValue = currentTarget.value;
      onSelectChange(newValue);
    }
  }

  return (
    <div className="flex flex-col my-4">
      <label htmlFor={id} className="text-md mb-1">
        {selectDescription}
      </label>

      <select id={id} onChange={handleSelectChange} className="shadow-lg mt-2">
        {selectOptions.map(option => {
          return (
            <option value={option.id} key={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
