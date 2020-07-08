import * as React from 'react';

interface RevealedFieldProps {
    neighborCount: number;
}

export const RevealedField = (props: RevealedFieldProps) => (
    <div className={`field revealed neighbor-count-${props.neighborCount}`}>
        <span>{props.neighborCount}</span>
    </div>
);
