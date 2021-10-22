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

const searchedStringIndex = (search: string, array: string[]): number => {
  return array.map(item => item
    .toLowerCase()
    .indexOf(search?.toLowerCase())
  )
    .map((matchIndex) => (matchIndex !== -1 ? matchIndex : array.length))
    .reduce((bestMatchIndex, current, i, arr) => (
      current < arr[bestMatchIndex] ? i : bestMatchIndex), 0)
}

const Select: React.FC<SelectProps> = (props) => {
  const [searched, setSearched] = React.useState<string>('')
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [currentElementIndex, setCurrentElementIndex] = React.useState<number>(0)
  const [hoverElementIndex, setHoverElementIndex] = React.useState<number>(0)
  const liRef = React.useRef<HTMLLIElement[]>([])
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    liRef.current[currentElementIndex]?.scrollIntoView({
      block: 'center',
      behavior: searched ? 'auto' : 'smooth'
    })
  }, [currentElementIndex, searched])

  useClickOutside(rootRef, () => setIsOpen(false))

  React.useEffect(() => {
    const children = filterOptions(props.children)
    const array = React.Children.map(children, (child) => child.props.value)
    setCurrentElementIndex(searchedStringIndex(searched, array))
  }, [searched, props.children])

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
          setHoverElementIndex(index)
        },
        onRef: (ref) => liRef.current.push(ref),
        isSelected: child.props.value === props.value,
        isHighlighted: index === hoverElementIndex
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
        case 'Backspace':
          props.onOptionClick('')
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
      value={props.value || searched}
      placeholder={props.placeholder}
      validateMessage={props.validateMessage}
      onClick={() => setIsOpen(!isOpen)}
      onKeyDown={handleKeyDown}
      onInputChange={(event) => setSearched(String(event.target.value))}
      autoComplete="off"
      readOnly={!isOpen}
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
