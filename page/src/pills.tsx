import { styled } from 'goober';

const Group = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1em -0.5em 2em -0.5em;
`;

const Pill = styled('label')`
  margin: 0.5em;
  position: relative;
  border-radius: 1ex;
  background: #44596f;
  color: #44596f;
  box-shadow: 4px 5px 8px #e7e9eb, -4px -5px 8px #ffffff;
  padding: 1.3ex 2ch 1ex 2ch;
  background: ${p => p.selected ? 'linear-gradient(145deg, #3d5064, #495f77)' : 'none'};
  color: ${p => p.selected ? '#ffffff' : '#44596f'};
`;

const Radio = styled('input')`
  appearance: none;
  -webkit-appearance: none;
  display: block;
  position: absolute;
  inset: 0;
  cursor: pointer;
  outline: none;
  border: none;
`;

interface PillsProps<T extends Record<string, string>> {
  options: T;
  selected: keyof T;
  onChange?(option: keyof T): void;
}

export const Pills = <T extends Record<string, string>>(props: PillsProps<T>) => {
  return (
    <Group role="radiogroup">
      {Object.keys(props.options).map(option => (
        <Pill key={option} selected={props.selected === option}>
          <Radio
            type="radio"
            checked={props.selected === option}
            onChange={event => {
              event.preventDefault();
              if (props.onChange) props.onChange(option);
            }}
          />
          {props.options[option]}
        </Pill>
      ))}
    </Group>
  );
};
