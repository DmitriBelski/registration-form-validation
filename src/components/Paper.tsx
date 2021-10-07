import * as React from 'react'
import './Paper.scss'

interface PaperProps {
  children: React.ReactNode;
}

const Paper: React.FC<PaperProps> = (props) => {
  return (
    <div className="paper">
      { props.children }
    </div>
  )
}

export { Paper }
