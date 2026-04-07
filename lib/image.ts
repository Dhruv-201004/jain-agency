export function normalizeImageSrc(src: string) {
  try {
    const parsedUrl = new URL(src);

    if (parsedUrl.pathname === "/_next/image") {
      const nestedUrl = parsedUrl.searchParams.get("url");

      if (nestedUrl) {
        return normalizeImageSrc(decodeURIComponent(nestedUrl));
      }
    }
  } catch {
    // Ignore invalid URLs and fall through to the other normalizers.
  }

  const driveFileMatch = src.match(
    /drive\.google\.com\/file\/d\/([^/]+)\/view/i,
  );

  if (driveFileMatch?.[1]) {
    return `https://drive.google.com/uc?export=view&id=${driveFileMatch[1]}`;
  }

  const drivePreviewMatch = src.match(
    /drive\.google\.com\/file\/d\/([^/]+)\//i,
  );

  if (drivePreviewMatch?.[1]) {
    return `https://drive.google.com/uc?export=view&id=${drivePreviewMatch[1]}`;
  }

  return src;
}
