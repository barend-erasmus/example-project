export class ExampleProjectError extends Error {

    constructor(
        public code: string,
        public detailedMessage: string,
    ) {
        super(detailedMessage);
    }

}
