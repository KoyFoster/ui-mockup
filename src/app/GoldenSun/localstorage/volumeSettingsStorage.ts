const VOLUME_SETTINGS_KEY = 'soundSettings';

export function saveVolumeSettings(settings: VolumeProperties) {
    localStorage.setItem(VOLUME_SETTINGS_KEY, JSON.stringify(settings));
}

export function getVolumeSettings(): VolumeProperties | null {
    const storedSettings = localStorage.getItem(VOLUME_SETTINGS_KEY);
    if(storedSettings) return JSON.parse(storedSettings);
    return null;
}