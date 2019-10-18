import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Scrollbar from 'ui/components/Scrollbar';

import css from './input.scss';

/**
 * Select component
 */
export default class Select extends React.PureComponent {
    static propTypes = {
        /** Current selected value */
        value: PropTypes.string.isRequired,
        /** Selected value label */
        valueLabel: PropTypes.string,
        /** Select dropdown options */
        options: PropTypes.array.isRequired,
        /** Select item label */
        label: PropTypes.string,
        /** Is the component disabled */
        disabled: PropTypes.bool,
        /** Select event callback
         * @param {Bool} value - Current checkbox state
         * @returns {Void}
         */
        onChange: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.onClick = this.clickOutside.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this.onClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onClick);
    }

    choose = (value) => {
        this.setState({
            open: false,
        });
        this.props.onChange(value);
    };

    clickOutside(e) {
        if (this.state.open) {
            const area = this.select;
            if (!area.contains(e.target)) {
                this.setState({
                    open: false,
                });
            }
        }
    }

    render() {
        const { value, valueLabel, options, label, disabled, ...restProps } = this.props;
        const { open } = this.state;

        return (
            <div
                className={classNames(css.input, css.select, open ? css.open : null, disabled ? css.disabled : null)}
                {...restProps}
            >
                <fieldset
                    ref={(el) => {
                        this.select = el;
                    }}
                >
                    <div
                        onClick={() =>
                            this.setState({
                                open: !open,
                            })
                        }
                        className={css.selectable}
                    >
                        {valueLabel || value}
                    </div>
                    {open && (
                        <ul>
                            <Scrollbar>
                                {options.map((option) => (
                                    <li
                                        className={option.label === value ? css.selected : null}
                                        key={option.value}
                                        onClick={() => this.choose(option.value)}
                                    >
                                        {option.label || option.value}
                                    </li>
                                ))}
                            </Scrollbar>
                        </ul>
                    )}
                    <small>{label}</small>
                </fieldset>
            </div>
        );
    }
}
