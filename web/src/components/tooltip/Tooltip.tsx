import React, { FC, useState } from 'react';

import { Manager, Reference, Popper } from 'react-popper';

export const Tooltip: FC<TooltipProps> = ({
  message,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <button
            type="button"
            className="tooltip-toggle"
            ref={ref}
            onClick={() => setOpen(!open)}
          >
            ?
          </button>
        )}
      </Reference>
      <Popper
        placement="bottom-end"
        modifiers={[{
          name: 'preventOverflow',
          options: {
            rootBoundary: 'document',
            padding: 20,
          },
        },
        {
          name: 'offset',
          options: {
            offset: [5, 5],
          },
        }]}
      >
        {({
          ref, style, placement,
        }) => (
          <div
            ref={ref}
            style={style}
            data-placement={placement}
            className={open ? 'tooltip is-open' : 'tooltip'}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
      </Popper>
    </Manager>
  );
};

interface TooltipProps {
  message: string;
}
