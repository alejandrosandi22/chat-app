import Button from './button';

function ControlPanel({
  play,
  isPlaying,
}: {
  play: () => void;
  isPlaying: boolean;
  currentTime: number;
}) {
  return (
    <div className='control-panel'>
      <Button play={play} isPlaying={isPlaying} />
    </div>
  );
}
export default ControlPanel;
