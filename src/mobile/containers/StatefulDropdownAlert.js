import { translate } from 'react-i18next';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { disposeOffAlert } from 'iota-wallet-shared-modules/actions/alerts';
import { connect } from 'react-redux';
import tinycolor from 'tinycolor2';
import DropdownAlert from 'react-native-dropdownalert/DropdownAlert';
import { width, height } from '../utils/dimensions';

const styles = StyleSheet.create({
    dropdownTitle: {
        fontSize: width / 25.9,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'transparent',
        fontFamily: 'Lato-Regular',
    },
    dropdownTextContainer: {
        flex: 1,
        paddingLeft: width / 20,
        paddingRight: width / 15,
        paddingVertical: height / 30,
    },
    dropdownMessage: {
        fontSize: width / 29.6,
        textAlign: 'left',
        fontWeight: 'normal',
        color: 'white',
        backgroundColor: 'transparent',
        fontFamily: 'Lato-Regular',
        paddingTop: height / 60,
    },
    dropdownImage: {
        marginLeft: width / 25,
        width: width / 12,
        height: width / 12,
        alignSelf: 'center',
    },
});

class StatefulDropdownAlert extends Component {
    static propTypes = {
        alerts: PropTypes.object.isRequired,
        disposeOffAlert: PropTypes.func.isRequired,
        closeInterval: PropTypes.number,
        backgroundColor: PropTypes.string.isRequired,
        onRef: PropTypes.func,
    };

    static defaultProps = {
        closeInterval: 5500,
    };

    constructor() {
        super();
        this.refFunc = this.refFunc.bind(this);
    }

    componentWillReceiveProps(newProps) {
        const { alerts } = this.props;
        const hasAnAlert = newProps.alerts.category && newProps.alerts.title && newProps.alerts.message;
        const alertIsNew = alerts.message !== newProps.alerts.message;
        const shouldGenerateAlert = hasAnAlert && alertIsNew;

        if (shouldGenerateAlert) {
            if (this.dropdown) {
                this.dropdown.alertWithType(newProps.alerts.category, newProps.alerts.title, newProps.alerts.message);
            }
        }
    }

    componentWillUnmount() {
        this.props.disposeOffAlert();
    }

    refFunc = (ref) => {
        this.dropdown = ref;
    };

    render() {
        const { closeInterval } = this.props.alerts;
        const { backgroundColor, onRef } = this.props;
        const closeAfter = closeInterval;
        const statusBarStyle = tinycolor(backgroundColor).isDark() ? 'light-content' : 'dark-content';

        return (
            <DropdownAlert
                ref={onRef || this.refFunc}
                elevation={120}
                successColor="#009f3f"
                errorColor="#A10702"
                titleStyle={styles.dropdownTitle}
                defaultTextContainer={styles.dropdownTextContainer}
                messageStyle={styles.dropdownMessage}
                imageStyle={styles.dropdownImage}
                inactiveStatusBarStyle={statusBarStyle}
                inactiveStatusBarBackgroundColor={backgroundColor}
                onCancel={this.props.disposeOffAlert}
                onClose={this.props.disposeOffAlert}
                closeInterval={closeAfter}
                translucent
            />
        );
    }
}

const mapStateToProps = ({ alerts }) => ({ alerts });

const mapDispatchToProps = { disposeOffAlert };

export default translate(['global'])(connect(mapStateToProps, mapDispatchToProps)(StatefulDropdownAlert));