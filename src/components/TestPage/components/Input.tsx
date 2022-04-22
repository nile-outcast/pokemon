import React from 'react';
// import sanitize from 'sanitize-html';
// import sanitizeHtml from 'sanitize-html';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = ({ onChange, ...props }: Props): JSX.Element => {
  const customOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // const value = sanitize(e.target.value);
    // e.target.value = value;

    if (onChange) onChange(e);
  };

  return <input {...props} onChange={customOnChange} />;
};
