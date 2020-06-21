import * as React from "react";

export const RevealedField = ({ neighborCount }) => (
    <div className={`field revealed neighbor-count-${neighborCount}`}>
        <span>{neighborCount}</span>
    </div>
);
