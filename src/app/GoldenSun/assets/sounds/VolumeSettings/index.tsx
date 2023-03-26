import { useEffect, useState } from 'react';
import no from 'src/app/GoldenSun/assets/sprites/icons/buttons/no.gif';
import yes from 'src/app/GoldenSun/assets/sprites/icons/buttons/yes.gif';
import options from 'src/app/GoldenSun/assets/sprites/icons/buttons/Options.gif';
import ActionButton from 'src/app/GoldenSun/components/ActionButton';
import {
  getVolumeSettings,
  saveVolumeSettings
} from 'src/app/GoldenSun/localstorage/volumeSettingsStorage';
import './index.scss';

const VolumeSetting = ({
  volume,
  onChange,
}: {
  volume: VolumeValue;
  onChange: (vol: VolumeValue) => void;
}) => {
  return (
    <>
      <label htmlFor={`${volume.key}-slider`}>{volume.label}</label>
      <input
        id={`${volume.key}-slider`}
        type="range"
        min="0"
        max="100"
        value={`${volume.value * 100}`}
        onChange={(e) => {
          if (onChange)
            onChange({ ...volume, value: Number(e.target.value) * 0.01 });
        }}
      />
    </>
  );
};

/** This component takes whatever settings you feed it, and allows for the changing, restoring, and reverting of said settings. */
const VolumeSettings = ({
  volume,
  defaultVolume,
  onChange,
}: {
  volume: VolumeProperties;
  defaultVolume: VolumeProperties;
  onChange: (
    vol?: VolumeValue | null,
    volumeProps?: VolumeProperties | null
  ) => void;
}) => {
  const [changed, setChanged] = useState(false);
  const [expand, setExpand] = useState(false);
  const revert = () => {
    if (onChange) {
      const settings = getVolumeSettings();
      onChange(null, settings ? settings : structuredClone(defaultVolume));
      setChanged(false);
    }
  };

  // load previous settings
  useEffect(() => {
    if (onChange) {
      const settings = getVolumeSettings();
      onChange(null, settings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log({expand});

  return (
    <div className={"volume-settings menu-frame" + (expand ? ' expand' : ' collapse')}>
      <ActionButton className='expand-button' src={options} onClick={() => {
        setExpand(!expand);
      }} />
      Volume Settings
      {Object.keys(volume).map((key) => {
        return (
          <VolumeSetting
            key={key}
            volume={volume[key]}
            onChange={(vol) => {
              setChanged(true);
              if (onChange) onChange(vol);
            }}
          />
        );
      })}
      <div>
        <ActionButton
          id="Save"
          type="submit"
          src={yes}
          disabled={!changed}
          onClick={() => {
            saveVolumeSettings(volume);
            setChanged(false);
          }}
        />
        <ActionButton
          id="Save"
          negative
          src={no}
          disabled={!changed}
          type="reset"
          onClick={() => {
            revert();
          }}
        />
      </div>
    </div>
  );
};

export default VolumeSettings;
