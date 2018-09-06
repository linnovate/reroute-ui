import React from 'react';
import RuleEditor from '../rule-editor/rule-editor';
import './style.css';

class RightSection extends React.Component {
    components = {
        'RuleEditor': RuleEditor
    }
    render() {
        const TagName = this.components[this.props.component];
        return(
            <div className="right-section">
            <TagName loadRules={this.props.loadRules} data={this.props.data}/>
            </div>
        )
    }
}

export default RightSection;
