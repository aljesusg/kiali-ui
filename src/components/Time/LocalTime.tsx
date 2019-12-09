import * as React from 'react';
import { Tooltip } from '@patternfly/react-core';
import { KialiIcon } from '../../config/KialiIcon';
import { TimeInMilliseconds } from 'types/Common';

interface TimeProps {
  time: string;
}

const defaultOptions = {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
} as any;

export const toString = (time: TimeInMilliseconds, options?: any): string => {
  const formatOptions = { ...defaultOptions };
  const date = new Date(time);
  if (date.getFullYear() !== new Date().getFullYear()) {
    formatOptions.year = 'numeric';
  }
  return date.toLocaleString('en-US', { ...formatOptions, ...options });
};

export const toRangeString = (
  start: TimeInMilliseconds,
  end: TimeInMilliseconds,
  startOptions?: any,
  endOptions?: any
): string => {
  let options = { ...defaultOptions };
  const startDate = new Date(start);
  const currentYear = new Date().getFullYear();
  const startYear = startDate.getFullYear();
  if (startYear !== currentYear) {
    options.year = 'numeric';
  }
  startOptions = !!startOptions ? startOptions : {};
  const startStr = startDate.toLocaleString('en-US', { ...options, ...startOptions });

  options = { ...defaultOptions };
  const endDate = new Date(end);
  const endYear = endDate.getFullYear();
  if (startYear !== endYear) {
    options.year = 'numeric';
  }
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();
  const startDay = startDate.getDay();
  const endDay = endDate.getDay();
  if (startMonth === endMonth && startDay === endDay) {
    delete options.month;
    delete options.day;
  }
  endOptions = !!endOptions ? endOptions : {};
  const endStr = endDate.toLocaleString('en-US', { ...options, ...endOptions });
  return `${startStr} ... ${endStr}`;
};

export default class LocalTime extends React.Component<TimeProps> {
  render() {
    let renderedTime: string;

    if (this.props.time) {
      renderedTime = toString(new Date(this.props.time).valueOf());
    } else {
      renderedTime = '-';
    }

    return (
      <Tooltip content={<>{this.props.time}</>}>
        <span>
          {KialiIcon.LocalTime({})} {renderedTime}
        </span>
      </Tooltip>
    );
  }
}
