import * as React from 'react'
import { classnames } from 'utils/classnames'
import { Input } from './Input'
import { isOption, OptionProps } from './Option'
import './Select.scss'

interface SelectProps {
  name?: string;
  label?: string;
  placeholder?: string;
  validateMessage?: string;
  requiredMessage?: string;
  children?: React.ReactNode;
  value?: string;
  onOptionClick: (value: string) => void;
}

const filterOptions = (children: React.ReactNode): React.FunctionComponentElement<OptionProps>[] => React.Children.toArray(children)
  .reduce<React.FunctionComponentElement<OptionProps>[]>((acc, node) => isOption(node) ? [...acc, node] : acc, [])

const Select: React.FC<SelectProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [currentElementIndex, setCurrentElementIndex] = React.useState(0)

  const chooseOption = (value: string) => {
    props.onOptionClick(value)
  }

  const renderOptions = () => {
    const children = filterOptions(props.children)

    return React.Children.map(children, (child, index) => {
      const additionalProps: Pick<OptionProps, 'onClick' | 'onHover' | 'isSelected' | 'isHighlighted'> = {
        onClick: (event) => {
          chooseOption(child.props.value)
        },
        onHover: () => {
          setCurrentElementIndex(index)
        },
        isSelected: child.props.value === props.value,
        isHighlighted: index === currentElementIndex
      }

      return React.cloneElement(child, additionalProps)
    })
  }

  const dropdownClass = classnames({
    select: true,
    'select--open': isOpen
  })

  return (
    <Input
      name={props.name}
      label={props.label}
      inputType="text"
      value={props.value}
      placeholder={props.placeholder}
      validateMessage={props.validateMessage}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={dropdownClass}>
        {props.children && (
          <div className="select__dropdown">
            <ul className="select__dropdown-list">
              {renderOptions()}
            </ul>
          </div>
        )}
      </div>
    </Input>
  )
}

export { Select }
