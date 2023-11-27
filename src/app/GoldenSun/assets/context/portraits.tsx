const Portraits = {
    Isaac: () => import(`src/app/GoldenSun/assets/sprites/icons/characters/Isaac2.gif`),
    Garet: () => import(`src/app/GoldenSun/assets/sprites/icons/characters/Garet2.gif`),
    Ivan: () => import(`src/app/GoldenSun/assets/sprites/icons/characters/Ivan.gif`),
    Mia: () => import(`src/app/GoldenSun/assets/sprites/icons/characters/Mia.gif`),
} as {
    [index: string]: () => Promise<typeof import("*.gif")>;
}

function getPortrait(name: string, callback: (img: HTMLImageElement) => void) {
    const call = Portraits[name];
    if (call) call().then(module => {
        const imageUrl = module.default;
        const img = new Image();
        img.onload = () => {
            callback(img);
        };
        img.src = imageUrl;
    })
        .catch((error: Error) => {
            console.error(error);
        });
    else
        console.error(`No profile asset for given name: ${name}`);
}

export default getPortrait;