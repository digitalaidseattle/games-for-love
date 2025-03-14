export { };

declare global {
    interface Window {
        FundraiseUp?: {
            init: (options: { campaign: string }) => void;
        };
    }
}
