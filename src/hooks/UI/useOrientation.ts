import { useMediaQuery } from "@mui/material";

/** ==============================================
 * !               Monkey Patch
 * The library says that `useMediaQuery` hook only
 * returns boolean, but when `window.matchMedia()`
 * is not available it returns undefined which is not
 * a boolean! to fix this problem I added this return
 * type to catch errors before runtime.
 *
 *============================================= */

interface OrientationHookReturn {
  isLandscape: boolean | undefined;
  isMobileLandscape: boolean | undefined;
  isMobilePortrait: boolean | undefined;
  isPortrait: boolean | undefined;
  isMobile: boolean | undefined;
  isDesktop: boolean | undefined;
}

function useOrientation(): OrientationHookReturn {
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const hasNarrowHeight = useMediaQuery("(max-height: 36em)");
  const hasNarrowWidth = useMediaQuery("(max-width: 36em)");

  const isPortrait = checkIfUndefined(!isLandscape, isLandscape);
  const isMobileLandscape = checkIfUndefined(
    isLandscape === true && hasNarrowHeight === true,
    isLandscape
  );
  const isMobilePortrait = checkIfUndefined(
    isPortrait === true && hasNarrowWidth === true,
    isPortrait
  );
  const isMobile = checkIfUndefined(
    isMobileLandscape || isMobilePortrait,
    isMobileLandscape
  );
  const isDesktop = checkIfUndefined(!isMobile, isMobile);

  return {
    isLandscape,
    isMobileLandscape,
    isMobilePortrait,
    isPortrait,
    isMobile,
    isDesktop,
  };
}

export default useOrientation;

/**
 * checks if the second value is not undefined and then returns the statement
 */
function checkIfUndefined(statement?: boolean, valueToCheck?: boolean) {
  if (valueToCheck === undefined) return undefined;
  return statement;
}
