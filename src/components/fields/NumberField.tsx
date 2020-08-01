import * as React from 'react';

interface RevealedFieldProps {
    neighborCount: number;
}

export const NumberField = (props: RevealedFieldProps) => (
    <div className={`revealed neighbor-count-${props.neighborCount}`}>
        <span>{props.neighborCount}</span>
    </div>
);
