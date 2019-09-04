export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function isDevelopEnv() {
  return process.env.NODE_ENV === 'development';
}

export function getImageDimension(imageUrl: string) {
  const img = new Image();
  img.src = imageUrl;
  return new Promise((resolve, reject) => {
    let set: any;
    const check = () => {
      if (img.width > 0 || img.height > 0) {
        if (set) clearInterval(set);
        resolve({
          width: img.width,
          height: img.height,
        });
      }
    };
    set = setInterval(check, 40);
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = () => {
      reject(new Error(`load ${imageUrl} fail.`));
    };
  });
}

export function sizeOfFile(file: File) {
  const { size } = file;
  return size;
}
