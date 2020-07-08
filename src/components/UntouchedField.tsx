import * as React from 'react';

interface UntouchedFieldProps {
    onReveal: any;
}

export const UntouchedField = (props: UntouchedFieldProps) => (
    <div className="field untouched" onClick={props.onReveal} />
);
