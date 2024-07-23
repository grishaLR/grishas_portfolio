import React from 'react';
import { useDataFetching } from '@hooks';
import { ERROR_TEXT, LOADING_TEXT } from '@consts';
import { RequestStatus } from '@enums';
import { Home } from '@pages';

export default (() => {
  const { requestStatus } = useDataFetching();

  switch (requestStatus) {
    case RequestStatus.PENDING:
      return <p>{LOADING_TEXT}</p>;
    case RequestStatus.ERROR:
      return <p>{ERROR_TEXT}</p>;
    case RequestStatus.SUCCESS:
      return <Home />;
    case RequestStatus.DORMANT:
    default:
      return <Home />;
  }
}) as React.FC;
