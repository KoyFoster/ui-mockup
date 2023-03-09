function loadSpriteSheet(url: string) {
  return new Promise((r) => {
    const i = new Image();
    i.onload = () => r(i);
    i.src = url;
  });
}

async function getSprites(spriteSheet: string, maps?: [number, number, number, number][]) {
  if(!maps?.length) return [];
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas?.getContext('2d');
  const img = (await loadSpriteSheet(spriteSheet)) as CanvasImageSource;

  const batch = maps.map(map => {
    canvas.width = map[2];
    canvas.height = map[3];
    ctx?.drawImage(img, map[0], map[1], map[2], map[3], 0, 0, map[2], map[3]);
    return canvas.toDataURL('image/jpg');
  })

  return batch;
}

export default getSprites;