import React from 'react';
import { Spin, SpinProps } from 'antd';

type ISpinnerProps = SpinProps;

export const Spinner: React.FC<ISpinnerProps> = ({ size }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    }}>
      <Spin size={size} />
    </div>
  );
};
