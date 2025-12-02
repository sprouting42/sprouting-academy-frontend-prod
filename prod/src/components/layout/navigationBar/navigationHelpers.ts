export const isDrawerOpen = (): boolean => {
  const drawerElement = document.querySelector(
    '[role="dialog"][aria-modal="true"][data-drawer-open="true"]',
  );
  return !!drawerElement;
};
