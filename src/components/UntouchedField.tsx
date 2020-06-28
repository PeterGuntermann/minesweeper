import * as React from "react";

interface Props {
    onReveal: any
}

export const UntouchedField = (props: Props) => (
    <div className="field untouched" onClick={props.onReveal}/>
);
