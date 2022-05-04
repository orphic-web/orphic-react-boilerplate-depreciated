import { useEffect } from 'react';

interface ContainerProps {
  defaultState: boolean;
}

const PWAPrompt: React.FC<ContainerProps> = ({ defaultState }) => {
  useEffect(() => {
    console.log('asdasd');
  }, []);

  return (
    <div className="container">
      <p>a;sldkal;skd</p>
    </div>
  );
};

export default PWAPrompt;
