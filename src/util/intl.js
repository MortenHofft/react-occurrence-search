import React from 'react';
import { FormattedMessage, FormattedRelative, FormattedNumber } from 'react-intl';
import PropTypes from 'prop-types';

const RelativeDate = ({ value }) => {
  if (!value) return null;
  return <FormattedRelative value={value}/>;
};
RelativeDate.propTypes = {
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const Message = ({ id }) => {
  return <FormattedMessage id={id} defaultMessage={id}/>;
};
Message.propTypes = {
  id: PropTypes.string
};

const Number = ({ count }) => {
  return <FormattedNumber value={count}/>;
};
Number.propTypes = {
  count: PropTypes.Number
};

export { RelativeDate as FormattedRelative, Message as FormattedMessage, Number as FormattedNumber };