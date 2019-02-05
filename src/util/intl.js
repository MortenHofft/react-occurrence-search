import React from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
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

export { RelativeDate as FormattedRelative, Message as FormattedMessage };