import * as React from "react";
import '../styles/field.css';
import { MineField } from "./MineField";
import { RevealedField } from "./RevealedField";
import { UntouchedField } from "./UntouchedField";

export class Field extends React.Component {
    state = {
        isRevealed: true, // set this to false for production
    };

    handleReveal = () => {
        this.setState({ isRevealed: true });
    };

    render() {
        const { isRevealed } = this.state;
        const { neighborCount, hasMine } = this.props;

        if (isRevealed) {
            return hasMine
                ? <MineField/>
                : <RevealedField neighborCount={neighborCount}/>;
        }

        return <UntouchedField onReveal={this.handleReveal}/>;
    }
}
