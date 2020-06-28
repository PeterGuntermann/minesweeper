import * as React from "react";

interface Props {
    neighborCount: number
}

export const RevealedField = (props: Props) => (
    <div className={`field revealed neighbor-count-${props.neighborCount}`}>
        <span>{props.neighborCount}</span>
    </div>
);
