import * as React from 'react'
import { classnames } from 'utils/classnames'
import { Input } from './Input'
import { isOption, OptionProps } from './Option'
import { useClickOutside } from 'hooks/useClickOutside'
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
  const liRef = React.useRef<HTMLLIElement[]>([])
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    liRef.current[currentElementIndex]?.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    })
  }, [currentElementIndex])

  useClickOutside(rootRef, () => setIsOpen(false))

  const chooseOption = (value: string) => {
    setIsOpen(false)
    props.onOptionClick(value)
  }

  const renderOptions = () => {
    const children = filterOptions(props.children)

    return React.Children.map(children, (child, index) => {
      const additionalProps: Pick<OptionProps, 'onClick' | 'onHover' | 'onRef' | 'isSelected' | 'isHighlighted'> = {
        onClick: (event) => {
          event.preventDefault()
          chooseOption(child.props.value)
        },
        onHover: () => {
          setCurrentElementIndex(index)
        },
        onRef: (ref) => liRef.current.push(ref),
        isSelected: child.props.value === props.value,
        isHighlighted: index === currentElementIndex
      }

      return React.cloneElement(child, additionalProps)
    })
  }

  const chooseOptionByIndex = (index: number) => {
    const children = filterOptions(props.children)
    const currentlyHighlightedChild = children.find((element, elementIndex) => elementIndex === index)

    if (currentlyHighlightedChild) {
      setIsOpen(false)
      chooseOption(currentlyHighlightedChild.props.value)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isOpen) {
      const childrenCount = React.Children.count(props.children)
      switch (event.key) {
        case 'Escape':
          setIsOpen(false)
          return
        case 'ArrowDown':
          setCurrentElementIndex(currentElementIndex + 1 >= childrenCount ? childrenCount - 1 : currentElementIndex + 1)
          return
        case 'ArrowUp':
          setCurrentElementIndex(currentElementIndex - 1 < 0 ? 0 : currentElementIndex - 1)
          return
        case 'Enter':
          event.preventDefault()
          chooseOptionByIndex(currentElementIndex)
          return
        default:
          return
      }
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      setIsOpen(!isOpen)
    }
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
      onKeyDown={handleKeyDown}
    >
      <div className={dropdownClass} ref={rootRef}>
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
