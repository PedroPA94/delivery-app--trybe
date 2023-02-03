import ClipLoader from 'react-spinners/ClipLoader';
import { emphasisColor } from '../styles/GlobalStyles';
import SpinnerContainer from '../styles/Loading';

function Loading() {
  return (
    <SpinnerContainer>
      <ClipLoader color={ emphasisColor } size={ 52 } />
    </SpinnerContainer>
  );
}

export default Loading;
