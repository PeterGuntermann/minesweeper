import * as React from "react";
import { Field } from "./Field";

export class FieldContainer extends React.Component {
    state = {
        isRevealed: false,
    };

    handleReveal = () => {
        this.setState({ isRevealed: true });
    };


    render() {
        const { isRevealed } = this.state;
        const { neighborCount } = this.props;
        return <Field neighborCount={neighborCount} isRevealed={isRevealed} onReveal={this.handleReveal}/>;
    }
}
