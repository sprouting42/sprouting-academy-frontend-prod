export function convertGoogleDriveToDirectDownload(shareLink: string): string {
  if (!shareLink || typeof shareLink !== "string") {
    return shareLink;
  }

  if (shareLink.includes("/uc?export=download")) {
    return shareLink;
  }

  let fileId: string | null = null;

  const fileDPattern = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const fileDMatch = shareLink.match(fileDPattern);
  if (fileDMatch) {
    fileId = fileDMatch[1];
  }

  if (!fileId) {
    const idPattern = /[?&]id=([a-zA-Z0-9_-]+)/;
    const idMatch = shareLink.match(idPattern);
    if (idMatch) {
      fileId = idMatch[1];
    }
  }

  if (fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  return shareLink;
}

export function isGoogleDriveLink(url: string): boolean {
  if (!url || typeof url !== "string") {
    return false;
  }
  return url.includes("drive.google.com");
}
