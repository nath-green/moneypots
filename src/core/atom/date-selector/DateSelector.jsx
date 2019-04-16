import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import DatePicker from 'react-datepicker';

export const DateSelector = ({ id, className, transactionTimestamp, onChange, selectToday }) => {
  const todayDate = new Date();
  const handleDateChangeRaw = e => {
    e.preventDefault();
  };

  const customDateMarkupClasses = transactionTimestamp
    ? 'c-date-selector__card c-date-selector__card--selected'
    : 'c-date-selector__card ';

  const customDateMarkup = (
    <div>
      <div className={customDateMarkupClasses}>
        <span className="c-date-selector__checkmark">
          <ion-icon name="checkmark-circle" />
        </span>
        <p className="u-text-primary">
          <strong>
            {transactionTimestamp ? (
              <Moment format="D MMM">{transactionTimestamp}</Moment>
            ) : (
              'Other date'
            )}
          </strong>
        </p>
        <p className="u-margin-bottom--none u-text-ash">Select</p>
      </div>
    </div>
  );

  return (
    <div className={classNames('c-date-selector', className)}>
      <DatePicker
        customInput={customDateMarkup}
        id={id}
        selected={transactionTimestamp}
        onChange={onChange}
        dateFormat="do MMMM YYYY"
        className="c-date-selector"
        onChangeRaw={handleDateChangeRaw}
        shouldCloseOnSelect
        popperClassName="c-date-selector__calendar"
        popperModifiers={{
          offset: {
            enabled: true,
            offset: '5px, 10px'
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: 'viewport'
          }
        }}
        maxDate={new Date()}
        showTimeSelect
        fixedHeight
        popperPlacement="top-end"
      />
      <div className="u-margin-left--half">
        <button
          type="button"
          onClick={selectToday}
          className={classNames('c-date-selector__card', {
            'c-date-selector__card--selected': !transactionTimestamp
          })}
        >
          <span className="c-date-selector__checkmark">
            <ion-icon name="checkmark-circle" />
          </span>
          <p className="u-text-primary">
            <strong>Just now</strong>
          </p>
          <p className="u-margin-bottom--none u-text-ash">
            <Moment format="LT">{todayDate}</Moment>
          </p>
        </button>
      </div>
    </div>
  );
};
