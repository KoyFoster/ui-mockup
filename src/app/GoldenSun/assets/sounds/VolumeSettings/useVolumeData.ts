import { useState } from "react";

// VOLUME
const VOLUME: Volume = {
    properties: {
        master: { key: 'master', label: 'Master', value: 0.5 },
        music: { key: 'music', label: 'Music', value: 0.5 },
        generalFX: { key: 'generalFX', label: 'General Sound Effects', value: 0.5 },
        menuFX: { key: 'menuFX', label: 'Menu Sound Effects', value: 0.5 },
        battleFX: { key: 'battleFX', label: 'Battle Sound Effects', value: 0.5 },
    },
    calls: {
        props: undefined,
        getMusic: function (this) {
            if (!this.props) return 0.5;
            return this.props?.master.value * this.props?.music.value;
        },
        getGeneralFX: function (this) {
            if (!this.props) return 0.5;
            return this.props.master.value * this.props.generalFX.value;
        },
        getMenuFX: function (this) {
            if (!this.props) return 0.5;
            return this.props.master.value * this.props.menuFX.value;
        },
    },
};
VOLUME.calls.props = VOLUME.properties;

const useVolumeData = () => {
    const [volume, setVolume] = useState({ ...VOLUME });

    const handleChange = (vol?: VolumeValue | null | undefined, volumeProps?: VolumeProperties | null | undefined) => {
        setVolume((v) => {
            if (vol) v.properties[vol.key].value = vol.value;
            else if (volumeProps) {
                Object.keys(v.properties).forEach((key) => {
                    v.properties[key] = volumeProps[key];
                });
            }

            return { ...v };
        });
    }

    return { volume, setVolume, handleChange }
}

export default useVolumeData;