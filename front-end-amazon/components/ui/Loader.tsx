import { FC } from 'react';

interface ILoder{
  width?:number
  height?:number
}

const Loader: FC<ILoder> = ({height = 100, width = 100}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{
        background: 'transparent',
        display: 'block',
        shapeRendering: 'auto',

      }}
      width={`${width}px`}
      height={`${height}px`}
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
    >
      <path
        fill='none'
        stroke='#e90c59'
        strokeWidth='8'
        strokeDasharray='146.25568908691406 110.33323913574219'
        d='M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z'
        strokeLinecap='round'
        style={{
          transform: 'scale(0.6900000000000001)',
          transformOrigin: '50px 50px',
        }}
      >
        <animate
          attributeName='stroke-dashoffset'
          repeatCount='indefinite'
          dur='1.4925373134328357s'
          keyTimes='0;1'
          values='0;256.58892822265625'
        ></animate>
      </path>
    </svg>
  );
};

export default Loader;
