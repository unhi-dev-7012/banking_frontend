import React from 'react';
import { Result } from 'antd';

interface INotFoundScreenProps {
  type?: 'not-found' | 'no-access';
}

const NotFoundScreen: React.FC<INotFoundScreenProps> = ({
  type = 'not-found',
}) => {
  if (type === 'no-access') {
    return (
      <div>
        <Result
          status="warning"
          title="Oops! You're not authorized to access this page"
        />
      </div>
    );
  }

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </div>
  );
};

NotFoundScreen.displayName = 'NotFoundScreen';

export default NotFoundScreen;
