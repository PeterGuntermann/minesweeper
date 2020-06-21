import * as React from "react";

export class Minesweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div className="board">
            <FieldContainer neighborCount={0}/>
            <FieldContainer neighborCount={1}/>
            <FieldContainer neighborCount={2}/>
            <FieldContainer neighborCount={3}/>
            <FieldContainer neighborCount={4}/>
            <FieldContainer neighborCount={5}/>
            <FieldContainer neighborCount={6}/>
            <FieldContainer neighborCount={7}/>
            <FieldContainer neighborCount={8}/>
        </div>);
    }
}

class FieldContainer extends React.Component {
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

const Field = ({ isRevealed, neighborCount, onReveal }) => (
    isRevealed
        ? <RevealedField neighborCount={neighborCount}/>
        : <UntouchedField onReveal={onReveal}/>
);

const RevealedField = ({ neighborCount }) => (
    <div className={`field revealed neighbor-count-${neighborCount}`}>
        <span>{neighborCount}</span>
    </div>
);

const UntouchedField = ({ onReveal }) => (
    <div className="field untouched" onClick={onReveal}></div>
);
