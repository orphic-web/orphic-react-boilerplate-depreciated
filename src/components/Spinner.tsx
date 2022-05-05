import './Spinner.css';
import { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';
import { css } from '@emotion/react';

interface ContainerProps {
  show: boolean,
  customClass?: string
}

const override = css`
  display: block;
  margin: 0 auto;
`;

const Spinner: React.FC<ContainerProps> = ({
  show, customClass,
}) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    try {
      if (show) setShowSpinner(true);
      else setShowSpinner(false);
    } catch (e: any) {
      console.error(e);
    }
  }, [show]);

  return (
    showSpinner
      ? <div className={`spinner__container ${customClass}`}>
        <DotLoader css={override} loading={showSpinner} size={150}/>
      </div>
      : <></>
  );
};

export default Spinner;
