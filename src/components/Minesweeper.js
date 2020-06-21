import * as React from "react";

export class Minesweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<>
            <FieldContainer value={3}/>
            <FieldContainer value={2}/>
            <FieldContainer value={6}/>
            <FieldContainer value={1}/>
            <FieldContainer value={0}/>
            <FieldContainer value={0}/>
            <FieldContainer value={0}/>
            <FieldContainer value={0}/>
            <FieldContainer value={1}/>
            <FieldContainer value={5}/>
            <FieldContainer value={2}/>
            <FieldContainer value={3}/>
            <FieldContainer value={6}/>
            <FieldContainer value={8}/>
            <FieldContainer value={3}/>
            <FieldContainer value={6}/>
            <FieldContainer value={3}/>
            <FieldContainer value={1}/>
            <FieldContainer value={2}/>
        </>);
    }
}

class FieldContainer extends React.Component {
    state = {
        isRevealed: false
    };

    handleReveal = () => {
        this.setState({isRevealed: true})
    }


    render() {
        const {isRevealed} = this.state;
        const {value} = this.props;
        return <Field value={value} isRevealed={isRevealed} onReveal={this.handleReveal}/>;
    }
}

const Field = ({isRevealed, value, onReveal}) => (
    isRevealed
        ? <RevealedField value={value}/>
        : <UnrevealedField onReveal={onReveal}/>
);

const RevealedField = ({value}) => (
    <div className={`revealed-field neighbor-count-${value}`}>
        <span>{value}</span>
    </div>
);

const UnrevealedField = ({onReveal}) => (
    <div className="unrevealed-field" onClick={onReveal}>
        ?
    </div>
);
