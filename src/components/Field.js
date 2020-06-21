import * as React from "react";
import { RevealedField } from "./RevealedField";
import { UntouchedField } from "./UntouchedField";

export const Field = ({ isRevealed, neighborCount, onReveal }) => (
    isRevealed
        ? <RevealedField neighborCount={neighborCount}/>
        : <UntouchedField onReveal={onReveal}/>
);
