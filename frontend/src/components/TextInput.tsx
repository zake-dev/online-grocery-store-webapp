import * as React from 'react';

import { ReactComponent as InvalidInputIcon } from '@assets/icons/invalid-input.svg';
import classNames from 'classnames';

type Props = React.HTMLProps<HTMLInputElement> & {
  label?: string;
  supportingMessage?: string;
  invalidMessage?: string;
  validator?: (value: string) => boolean;
};

export default function TextInput({
  label,
  supportingMessage,
  invalidMessage,
  validator,
  onInput,
  required,
  ...props
}: Props) {
  const [isValid, setIsValid] = React.useState(true);

  const _onInput = (event: React.FormEvent<HTMLInputElement>) => {
    setIsValid(validator?.call(null, event.currentTarget.value) ?? true);
    onInput?.call(null, event);
  };

  return (
    <div className="flex-1 flex flex-col items-start gap-[4px]">
      {label ? (
        <div className="w-full px-1 flex flex-row items-center gap-[4px] text-black-500 validate">
          <span
            className={classNames('text-caption text-inherit', {
              'text-point-red': !isValid,
            })}
          >
            {label}
          </span>
          {required ? (
            <span className="text-caption text-point-red">*</span>
          ) : null}
        </div>
      ) : null}

      <input
        className={classNames(
          'w-full h-[48px] px-4 border border-black-400 rounded-[4px] text-body-2 text-black-700 focus:text-black',
          {
            'border-point-red': !isValid,
            'focus:outline-point-red': !isValid,
          },
        )}
        onInput={_onInput}
        {...props}
      />

      {isValid ? (
        <div className="w-full h-[18px] flex flex-row items-center gap-[4px]">
          <span className="px-1 text-caption text-black-500">
            {supportingMessage}
          </span>
        </div>
      ) : (
        <div className="w-full h-[18px] flex flex-row items-center gap-[4px]">
          <InvalidInputIcon />
          <span className="text-caption text-point-red">{invalidMessage}</span>
        </div>
      )}
    </div>
  );
}
