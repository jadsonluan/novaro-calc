import React from 'react';
import './index.css';

interface TooltipLabelProps {
  label: string;
  align?: 'left' | 'center' | 'right';
  tooltip?: string;
}

const TooltipLabel = (props: TooltipLabelProps) => {
  const { label, tooltip, align = 'left' } = props;
  return (
    <div className="tooltip-label" style={{ justifyContent: align }}>
      <span>{label}</span>
      {tooltip && <span className="material-symbols-outlined optional-info" title={tooltip}>
        info
      </span>}
    </div>
  );
}

export default TooltipLabel;