// FundraisUp campaign and element configuration
export const FUNDRAISUP_CONFIG = {
  ORGANIZATION_ID: "AWALQQAB",
  GENERAL_ELEMENT_ID: "XWQCRFLJ",
  HOSPITAL_ELEMENT_ID: "XHEMMJEY",
} as const;

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
