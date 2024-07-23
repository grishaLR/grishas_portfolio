import { useEffect, useState } from 'react';
import { fetchFPLData } from '@services';
import { DEFAULT_TEXT, DORMANT_TIMEOUT } from '@consts';
import { RequestStatus } from '@enums';

// Hook for managing service and request status
export default (): { requestStatus: RequestStatus; content: string } => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.DORMANT);
  const [content, setContent] = useState<string>(DEFAULT_TEXT);

  useEffect(() => {
    const fetchData = async () => {
      setRequestStatus(RequestStatus.PENDING);
      setContent('');

      try {
        const htmlString: string = await fetchFPLData();

        setContent(htmlString);
        setRequestStatus(RequestStatus.SUCCESS);
        setTimeout(() => {
          setRequestStatus(RequestStatus.DORMANT);
        }, DORMANT_TIMEOUT);
      } catch (error) {
        setRequestStatus(RequestStatus.ERROR);
        setContent('');
      }
    };
    // initialize data fetching
    fetchData();
  }, []);

  return { requestStatus, content };
};
