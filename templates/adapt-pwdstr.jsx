import React, { useState, useEffect } from 'react';
import { classes } from 'core/js/reactHelpers';

export default function PwdStr(props) {
  const {
    description
  } = props;

  return (
    <div>{description}</div>
  );
}
