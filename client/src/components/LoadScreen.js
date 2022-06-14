import CurateifyLoad from '../images/CurateifyLoad.png'

function LoadScreen() {
  return (
    <div className='load-screen'>
      <img alt='Spinning Record Load Screen' style={{width: '100%'}} src={CurateifyLoad} />
    </div>
  );
}

export default LoadScreen;