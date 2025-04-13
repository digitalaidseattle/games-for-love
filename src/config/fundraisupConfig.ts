// FundraisUp campaign and element configuration
export const FUNDRAISUP_CONFIG = {
  ORGANIZATION_ID: "AWALQQAB",
  CAMPAIGN_ID: "FUNTTDHCELT",
  DEFAULT_ELEMENT_ID: "XWQCRFLJ", // General donation form ID
  HOSPITALS: {
    "Christus Children's Hospital": {
      elementId: "XWQYLMLX",
      designationId: "recg19lQn1pf3YY9L",
    },
    "Eagle Rock Boy's Home": {
      elementId: "XTZGSNGP",
      designationId: "recA4OgEi7CeYSNjf",
    },
    "General Donation": {
      elementId: "XWQCRFLJ",
      designationId: "",
    },
    "Lowell General Hospital": {
      elementId: "XWPRLJJR",
      designationId: "recghhDRKrmOOFcHL",
    },
    "RMH Germany Essen": {
      elementId: "XTEFMUSJ",
      designationId: "recbnUzD6RWoRfvmj",
    },
    "RMH St. Louis": {
      elementId: "XNSJNKVK",
      designationId: "recFcSV43QD7RvQsV",
    },
    "West Penn. Children's Hospital": {
      elementId: "XLGBZUGV",
      designationId: "recdtG1ZcYUEybjm2",
    },
    "Wexford Hospital": {
      elementId: "XHEMMJEY",
      designationId: "recRBUCCvYzFHpyZX",
    },
  },
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