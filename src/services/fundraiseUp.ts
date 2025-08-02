/**
 *  fundraiseUp.tsx
 *
 *  @copyright 2025 Digital Aid Seattle
 *
 */

export type FundraiseUpWidgetConfig = {
  elementId: string;
  designationId?: string;
  campaign?: string;
}

declare global {
  interface Window {
    FundraiseUp?: {
      widget: {
        show: (options: {
          elementId: string;
          designationId?: string;
          campaign?: string;
        }) => void;
        hide: () => void;
        destroy?: () => void;
      };
      configure: (options: { token: string }) => void;
    };
    FundraiseUpQ?: Array<() => void>;
  }
}

// Helper function to clean up FundraiseUp state
export const cleanupFundraiseUp = () => {
  // Hide and destroy widget if it exists
  if (window.FundraiseUp?.widget) {
    if (window.FundraiseUp.widget.hide) {
      window.FundraiseUp.widget.hide();
    }
    if (window.FundraiseUp.widget.destroy) {
      window.FundraiseUp.widget.destroy();
    }
  }

  // Clean up global state
  delete window.FundraiseUp;
  window.FundraiseUpQ = [];

  // Remove scripts and iframes
  document
    .querySelectorAll('script[src*="fundraiseup.com"]')
    .forEach((script) => script.remove());
  document
    .querySelectorAll('iframe[src*="fundraiseup.com"]')
    .forEach((iframe) => iframe.remove());
};

export function loadFundraiseUpWidget(organizationId: string, widgetConfig: FundraiseUpWidgetConfig, handleClose: () => void) {
  window.FundraiseUpQ = window.FundraiseUpQ || [];

  window.FundraiseUpQ.push(() => {
    window.FundraiseUp!.configure({
      token: organizationId,
    });
  });

  window.FundraiseUpQ.push(() => {
    window.FundraiseUp?.widget.show(widgetConfig);
  });

  const script = document.createElement("script");

  script.src = `https://cdn.fundraiseup.com/widget/${organizationId}`;
  script.async = true;
  script.setAttribute("as", "script");
  script.setAttribute("importance", "high");
  script.onerror = () => {
    console.error("Failed to load FundraiseUp script");
    handleClose();
  };
  document.body.appendChild(script);
}
