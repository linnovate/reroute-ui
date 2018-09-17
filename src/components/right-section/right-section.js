import React from 'react';
import RuleEditor from '../rule-editor/rule-editor';
import PushNotification from '../push-notification/push-notification';
import './style.css';

class RightSection extends React.Component {
    components = {
        'RuleEditor': RuleEditor,
        'PushNotification': PushNotification
    }
    render() {
        const TagName = this.components[this.props.component];
        return(
            <div className="right-section">
            <TagName loadRules={this.props.loadRules} data={this.props.data} loadComponent={this.props.loadComponent} />
            </div>
        )
    }
}

export default RightSection;
