import * as React from "react";
import './field.css';
import { RevealedField } from "./RevealedField";
import { UntouchedField } from "./UntouchedField";

export class Field extends React.Component {
    state = {
        isRevealed: false,
    };

    handleReveal = () => {
        this.setState({ isRevealed: true });
    };

    render() {
        const { isRevealed } = this.state;
        const { neighborCount } = this.props;
        return isRevealed
            ? <RevealedField neighborCount={neighborCount}/>
            : <UntouchedField onReveal={this.handleReveal}/>;
    }
}
